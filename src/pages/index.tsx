import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { GetStaticProps } from 'next'
import Stripe from 'stripe'
import Link from 'next/link'
import Head from 'next/head'
import { Handbag } from '@phosphor-icons/react'
import { useShoppingCart } from 'use-shopping-cart'

import { HomeContainer, Product } from '../styles/pages/home'
import { stripe } from '../libs/stripe'
import { formatPriceToInteger } from '../utils/format'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
    sku: string
    currency: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 'auto',
      spacing: 48,
    },
  })
  const cart = useShoppingCart()
  const { addItem } = cart

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Product className="keen-slider__slide" key={product.id}>
              <Image src={product.imageUrl} width={520} height={480} alt="" />
              <footer>
                <Link
                  href={`product/${product.id}`}
                  prefetch={false}
                  className="infoBox"
                >
                  <strong>{product.name}</strong>
                  <span>{formatPriceToInteger(product.price)}</span>
                </Link>
                <button onClick={() => addItem(product)}>
                  <Handbag size={32} weight="bold" color="white" />
                </button>
              </footer>
            </Product>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
      sku: product.id,
      currency: 'BRL',
    }
  })

  const timeInHours = 60 * 60 * 2

  return {
    props: {
      products,
    },
    revalidate: timeInHours,
  }
}
