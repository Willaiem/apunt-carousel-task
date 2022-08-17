import { Offer } from "./types"
import styles from "./Card.module.css"
import { LocationIcon } from "./components/ui/LocationIcon"
import { HeartIcon } from "./components/ui/HeartIcon"
import { OfferTag } from "./components/logic/OfferTag/OfferTag"
import { PriceTag } from "./components/logic/PriceTag/PriceTag"

type CardProps = {
  offer: Offer
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
