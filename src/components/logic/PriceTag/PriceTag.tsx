import { Offer } from "../../../types"
import styles from './PriceTag.module.css'

type PriceTagProps = {
  sellingMode: Offer['sellingMode']
}

const getPrice = ({ advertisement, auction, buyNow }: Offer['sellingMode']) => {
  const prices = advertisement?.price ?? auction?.price.current ?? buyNow?.price.sale

  if (!prices) {
    return null
  }

  return prices
}

export const PriceTag = ({ sellingMode }: PriceTagProps) => {
  const price = getPrice(sellingMode)

  if (!price) {
    return null
  }

  const { amount } = price

  const [headAmount, tailAmount] = amount.split('.')

  return (
    <p className={styles.priceTag}>
      <span className={styles.headPriceTag}>{headAmount}</span>,{tailAmount} zł
    </p>
  )
}
