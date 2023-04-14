export function formatPriceToInteger(priceInCents: number) {
  const priceInBRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(priceInCents! / 100)

  return priceInBRL
}
