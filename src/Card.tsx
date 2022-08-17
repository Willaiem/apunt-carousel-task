import { Offer } from "./types"
import styles from "./Card.module.css"
import { LocationIcon } from "./components/ui/LocationIcon"

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
          <div className={styles.heartIcon}>
            <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5 0C17.538 0 20 2.5 20 6C20 13 12.5 17 10 18.5C7.5 17 0 13 0 6C0 2.5 2.5 0 5.5 0C7.36 0 9 1 10 2C11 1 12.64 0 14.5 0ZM10.934 15.604C11.815 15.048 12.61 14.495 13.354 13.903C16.335 11.533 18 8.943 18 6C18 3.64 16.463 2 14.5 2C13.424 2 12.26 2.57 11.414 3.414L10 4.828L8.586 3.414C7.74 2.57 6.576 2 5.5 2C3.56 2 2 3.656 2 6C2 8.944 3.666 11.533 6.645 13.903C7.39 14.495 8.185 15.048 9.066 15.603C9.365 15.792 9.661 15.973 10 16.175C10.339 15.973 10.635 15.792 10.934 15.604Z" fill="#00A790" />
            </svg>
          </div>
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
