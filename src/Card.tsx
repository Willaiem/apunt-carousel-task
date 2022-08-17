import { Offer } from "./types"
import styles from "./Card.module.css"
import { LocationIcon } from "./components/ui/LocationIcon"
import { HeartIcon } from "./components/ui/HeartIcon"

type CardProps = {
  offer: Offer
}

type OfferTypeProps = {
  sellingMode: Offer['sellingMode']
}

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

const PriceTag = ({ sellingMode }: PriceTagProps) => {
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


const OfferTag = ({ sellingMode: { advertisement, auction, buyNow } }: OfferTypeProps) => {
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

export const Card = ({ offer }: CardProps) => {
  const { images: [img], sellingMode, view: { url } } = offer
  const { location: { label: city } } = offer.allegroLocally

  return (
    <article className={styles.cardWrapper}>
      <a href={url} aria-label={offer.name}>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={img.url} alt={img.alt} />
          <HeartIcon className={styles.heartIcon} />
        </div>
        <div className={styles.details}>
          <h4 className={styles.title}>{offer.name}</h4>
          <div className={styles.tagWrapper}>
            <PriceTag sellingMode={sellingMode} />
            <OfferTag sellingMode={sellingMode} />
          </div>
          <div className={styles.location}>
            <LocationIcon />
            <p>{city}</p>
          </div>
        </div>
      </a>
    </article>
  )
}
