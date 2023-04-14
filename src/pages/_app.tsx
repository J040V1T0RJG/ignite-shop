import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import { Container } from '../styles/pages/app'
import { Header } from '../components/Header'
import { CartProvider } from 'use-shopping-cart'

globalStyles()

const stripeKey = process.env.STRIPE_PUBLIC_KEY

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={stripeKey}
      successUrl={`${process.env.NEXT_URL}/sucess?session_id={CHECKOUT_SESSION_ID}`}
      cancelUrl={`${process.env.NEXT_URL}/`}
      currency="BRL"
      allowedCountries={['BR']}
      billingAddressCollection={true}
      shouldPersist={true}
    >
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}
