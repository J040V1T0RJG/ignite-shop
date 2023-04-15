import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Stripe from 'stripe'
import { useShoppingCart } from 'use-shopping-cart'
import { Skeleton } from '@mui/material'

import { stripe } from '@/src/libs/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/src/styles/pages/product'
import { formatPriceToInteger } from '@/src/utils/format'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
    description: string
    defaultPriceId: string
    sku: string
    currency: string
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()
  const cart = useShoppingCart()
  const { addItem } = cart

  if (isFallback) {
    return (
      <>
        <Head>
          <title> Camiseta | Ignite Shop</title>
        </Head>

        <ProductContainer>
          <Skeleton
            variant="rounded"
            width={576}
            height={656}
            animation="wave"
            sx={{ bgcolor: '#202024' }}
          />
          <ProductDetails>
            <Skeleton
              variant="text"
              height={46}
              animation="wave"
              sx={{ bgcolor: '#202024' }}
            />
            <Skeleton
              variant="text"
              width={124}
              animation="wave"
              sx={{ bgcolor: '#202024' }}
            />
            <Skeleton
              variant="text"
              height={174}
              animation="wave"
              sx={{ bgcolor: '#202024' }}
            />
            <Skeleton
              variant="rounded"
              height={70}
              animation="wave"
              style={{ marginTop: 'auto' }}
              sx={{ bgcolor: '#202024' }}
            />
          </ProductDetails>
        </ProductContainer>
      </>
    )
  }

  const itemProduct = {
    id: product.id,
    name: product.name,
    imageUrl: product.imageUrl,
    price: product.price,
    sku: product.sku,
    currency: product.currency,
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{formatPriceToInteger(product.price)}</span>
          <p>{product.description}</p>
          <button onClick={() => addItem(itemProduct)}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_NGsShPbBL7xENK' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  const timeInHours = 60 * 60 * 1 // 1 hour

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount,
        description: product.description,
        sku: product.id,
        currency: 'BRL',
        defaultPriceId: price.id,
      },
    },
    revalidate: timeInHours,
  }
}
