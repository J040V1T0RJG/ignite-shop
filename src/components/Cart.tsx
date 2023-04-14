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

export function Cart() {
  const cart = useShoppingCart()
  const {
    cartCount,
    cartDetails,
    totalPrice,
    removeItem,
    incrementItem,
    decrementItem,
  } = cart

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
                    <button onClick={() => removeItem(pieceOfClothing.id)}>
                      <p>Remover</p>
                    </button>
                    <div className="incrementAndDecrement">
                      <button onClick={() => incrementItem(pieceOfClothing.id)}>
                        <Plus />
                      </button>
                      {pieceOfClothing.quantity}
                      <button onClick={() => decrementItem(pieceOfClothing.id)}>
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
          <button type="submit">
            <p>Finalizar compra</p>
          </button>
        </footer>
      </Content>
    </Dialog.Portal>
  )
}
