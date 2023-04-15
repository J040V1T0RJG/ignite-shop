import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

import { stripe } from '@/src/libs/stripe'

type ProductsType = {
  prod_id: string
  quantity: number
}[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { productsId }: { productsId: ProductsType } = req.body

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (productsId.length === 0) {
    return res.status(400).json({ error: 'Price not found' })
  }

  const items: Stripe.Checkout.SessionCreateParams.LineItem[] =
    await Promise.all(
      productsId.map(async (element) => {
        const product = await stripe.products.retrieve(element.prod_id, {
          expand: ['default_price'],
        })

        const price = product.default_price as Stripe.Price

        return { price: price.id, quantity: element.quantity }
      }),
    )

  const successUrl = `${process.env.NEXT_URL}/sucess?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: items,
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
