import { Offer } from "./types"
import styles from "./Card.module.css"

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
    <article className={styles.card}>
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
            <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 14.8187L1.75734 10.576C0.918228 9.73689 0.346791 8.66779 0.115286 7.5039C-0.11622 6.34002 0.00260456 5.13362 0.456732 4.03727C0.91086 2.94092 1.6799 2.00385 2.66659 1.34457C3.65328 0.685281 4.81332 0.333389 6 0.333389C7.18669 0.333389 8.34672 0.685281 9.33342 1.34457C10.3201 2.00385 11.0891 2.94092 11.5433 4.03727C11.9974 5.13362 12.1162 6.34002 11.8847 7.5039C11.6532 8.66779 11.0818 9.73689 10.2427 10.576L6 14.8187ZM9.3 9.63334C9.9526 8.98067 10.397 8.14915 10.577 7.24392C10.7571 6.33869 10.6646 5.4004 10.3114 4.54771C9.95817 3.69501 9.36003 2.96621 8.59261 2.45345C7.82519 1.94069 6.92296 1.66701 6 1.66701C5.07704 1.66701 4.17481 1.94069 3.40739 2.45345C2.63997 2.96621 2.04183 3.69501 1.68861 4.54771C1.33539 5.4004 1.24294 6.33869 1.42297 7.24392C1.603 8.14915 2.04741 8.98067 2.7 9.63334L6 12.9333L9.3 9.63334ZM6 7.66667C5.64638 7.66667 5.30724 7.52619 5.05719 7.27615C4.80715 7.0261 4.66667 6.68696 4.66667 6.33334C4.66667 5.97971 4.80715 5.64058 5.05719 5.39053C5.30724 5.14048 5.64638 5 6 5C6.35362 5 6.69276 5.14048 6.94281 5.39053C7.19286 5.64058 7.33334 5.97971 7.33334 6.33334C7.33334 6.68696 7.19286 7.0261 6.94281 7.27615C6.69276 7.52619 6.35362 7.66667 6 7.66667Z" fill="#767676" />
            </svg>
            <p>{city}</p>
          </div>
        </div>
      </a>
    </article>
  )
}
