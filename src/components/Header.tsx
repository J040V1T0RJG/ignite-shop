import Link from 'next/link'
import Image from 'next/image'
import { Handbag } from '@phosphor-icons/react'
import { useShoppingCart } from 'use-shopping-cart'
import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../assets/logo.svg'
import { HeaderContainer } from '../styles/components/header'
import { Cart } from './Cart'

export function Header() {
  const cart = useShoppingCart()
  const { cartCount } = cart

  return (
    <HeaderContainer>
      <Link href={'/'}>
        <Image src={logoImg.src} alt="" width={130} height={52} />
      </Link>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          {cartCount > 0 ? (
            <button>
              <div className="cartProductCountCicle">{cartCount}</div>
              <Handbag size={32} weight="bold" color="rgba(255, 255, 255, 1)" />
            </button>
          ) : (
            <button>
              <Handbag
                size={32}
                weight="bold"
                color="rgba(255, 255, 255, 0.5)"
              />
            </button>
          )}
        </Dialog.Trigger>
        <Cart />
      </Dialog.Root>
    </HeaderContainer>
  )
}
