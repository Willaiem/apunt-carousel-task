import { Offer } from "./types"
import styles from "./Card.module.css"
type CardProps = {
  offer: Offer
}
export const Card = ({ offer }: CardProps) => {
  const { images: [img], sellingMode, view: { url } } = offer
  const { location: { label: city } } = offer.allegroLocally

  return (
    <article className={styles.card}>
      
    </article>
  )
}
