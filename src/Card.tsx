import { Offer } from "./types"
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
