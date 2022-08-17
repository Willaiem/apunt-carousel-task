import { Card } from './Card'
import { Offer } from './types'
import styles from './Carousel.module.css'

type CarouselProps = {
  offers: Offer[]
  itemsPerPage?: number
}

export const Carousel = ({ offers }: CarouselProps) => {
  return (
    <section className={styles.carouselWrapper}>
      <div className={styles.offers}>
        {offers.map(offer => (
          <Card key={offer.id} offer={offer} />
        ))}
      </div>
    </section>
  )
}
