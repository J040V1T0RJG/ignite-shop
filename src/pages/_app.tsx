import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import logoImg from '../assets/logo.svg'
import Image from 'next/image'
import { Container, Header } from '../styles/pages/app'
import Link from 'next/link'
import { Handbag } from '@phosphor-icons/react'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Link href={'/'}>
          <Image src={logoImg.src} alt="" width={130} height={52} />
        </Link>
        <div className="handbagBox">
          <Handbag size={32} weight="bold" color="white" />
        </div>
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
