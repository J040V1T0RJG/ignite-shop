import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'

import { stripe } from '../libs/stripe'
import {
  ImageContainer,
  ImagesContainer,
  SucessContainer,
} from '../styles/pages/sucess'

interface SucessProps {
  customerName: String
  products: {
    quantity: number
    image: string
  }[]
}

export default function Sucess({ customerName, products }: SucessProps) {
  let totalAmount = 0
  for (const value of products) {
    totalAmount += value.quantity
  }

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SucessContainer>
        <h1>Compra efetuada!</h1>
        <ImagesContainer>
          {products.map((element, index) => {
            return (
              <ImageContainer key={element.image[0]} style={{ zIndex: index }}>
                <Image src={element.image} width={120} height={110} alt="" />
              </ImageContainer>
            )
          })}
        </ImagesContainer>

        <p>
          Uhull <strong>{customerName}</strong>, sua compra de {totalAmount}{' '}
          {totalAmount > 1 ? 'camisetas' : 'camiseta'} já está a caminho da sua
          casa.
        </p>
        <Link href="/">Voltar ao catalogo</Link>
      </SucessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details.name
  const products = session.line_items.data

  const filteredProductData = products.map((product) => {
    const image = product.price.product as Stripe.Product
    return { quantity: product.quantity, image: image.images[0] }
  })

  return {
    props: {
      customerName,
      products: filteredProductData,
    },
  }
}
