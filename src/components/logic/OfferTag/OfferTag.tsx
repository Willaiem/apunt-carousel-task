import { Offer } from '../../../types'
import styles from './OfferTag.module.css'

type OfferTypeProps = {
  sellingMode: Offer['sellingMode']
}

export const OfferTag = ({ sellingMode: { advertisement, auction, buyNow } }: OfferTypeProps) => {
  if (advertisement) {
    return <p className={`${styles.tag} ${styles.advertisementTag}`}>Ogłoszenie</p>
  }

  if (auction) {
    return <p className={`${styles.tag} ${styles.auctionTag}`}>Licytacja</p>
  }

  if (buyNow) {
    return <p className={`${styles.tag} ${styles.buyNowTag}`}>Kup teraz</p>
  }

  return null
}
