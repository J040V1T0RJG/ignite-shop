import * as Dialog from '@radix-ui/react-dialog'
import { Minus, Plus, X } from '@phosphor-icons/react'
import Image from 'next/image'
import { useShoppingCart } from 'use-shopping-cart'

import { formatPriceToInteger } from '../utils/format'
import {
  CloseButton,
  ClothingParts,
  Content,
  Overlay,
} from '../styles/components/cart'
import { useState } from 'react'
import axios from 'axios'
import { PulseLoader } from 'react-spinners'

export function Cart() {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState<boolean>(false)
  const cart = useShoppingCart()
  const {
    cartCount,
    cartDetails,
    totalPrice,
    removeItem,
    incrementItem,
    decrementItem,
    clearCart,
  } = cart

  async function handleBuyProducts() {
    if (cartCount === 0) {
      alert('Falha ao redirecionar ao checkout, o carrinho está vazio')
      return
    }

    const productsId = Object.values(cartDetails).map((element) => {
      return { prod_id: element.id, quantity: element.quantity }
    })

    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', { productsId })
      const { checkoutUrl } = response.data

      clearCart()
      window.location.href = checkoutUrl
    } catch (error) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout')
    }
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <Dialog.Title>Sacola de compras</Dialog.Title>
        <ClothingParts>
          {Object.values(cartDetails).map((pieceOfClothing) => {
            return (
              <div className="pieceOfClothing" key={pieceOfClothing.id}>
                <div className="productImageBackground">
                  <Image
                    src={pieceOfClothing.imageUrl}
                    width={102}
                    height={94}
                    alt=""
                  />
                </div>
                <div className="infoSummary">
                  <p>
                    {pieceOfClothing.name} <br />
                    <strong>
                      {formatPriceToInteger(pieceOfClothing.price)}
                    </strong>
                  </p>
                  <span>
                    <button
                      onClick={() => removeItem(pieceOfClothing.id)}
                      disabled={isCreatingCheckoutSession}
                    >
                      <p>Remover</p>
                    </button>
                    <div className="incrementAndDecrement">
                      <button
                        onClick={() => incrementItem(pieceOfClothing.id)}
                        disabled={isCreatingCheckoutSession}
                      >
                        <Plus />
                      </button>
                      {pieceOfClothing.quantity}
                      <button
                        onClick={() => decrementItem(pieceOfClothing.id)}
                        disabled={isCreatingCheckoutSession}
                      >
                        <Minus />
                      </button>
                    </div>
                  </span>
                </div>
              </div>
            )
          })}
        </ClothingParts>
        <footer>
          <div className="secondaryGeneralSummary">
            <p>Quantidade</p>
            <p>
              {cartCount} {cartCount > 1 ? 'itens' : 'item'}
            </p>
          </div>
          <div className="primaryGeneralSummary">
            <p>Valor total</p>
            <p>
              <strong>{formatPriceToInteger(totalPrice)}</strong>
            </p>
          </div>
          <button
            disabled={isCreatingCheckoutSession}
            onClick={() => handleBuyProducts()}
          >
            {isCreatingCheckoutSession ? (
              <PulseLoader color="white" />
            ) : (
              <p>Finalizar compra</p>
            )}
          </button>
        </footer>
      </Content>
    </Dialog.Portal>
  )
}
