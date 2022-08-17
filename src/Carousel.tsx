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
      <div className={styles.carouselHeader}>
        <h2 className={styles.carouselHeading}>Wyjątkowe i unikalne</h2>
        <a href="https://allegrolokalnie.pl/">Zobacz więcej</a>
      </div>
      <div className={styles.offers}>
        {offers.map(offer => (
          <Card key={offer.id} offer={offer} />
        ))}
      </div>

      <button
        className={`${styles.button} ${styles.left}`}
        aria-label='Previous slide'
        title='Previous slide'
      >
        <span className={`${styles.arrowSkeleton} ${styles.leftArrowTop}`} />
        <span className={`${styles.arrowSkeleton} ${styles.leftArrowBottom}`} />
      </button>

      <button
        className={`${styles.button} ${styles.right}`}
        aria-label='Next slide'
        title='Next slide'
      >
        <span className={`${styles.arrowSkeleton} ${styles.rightArrowTop}`} />
        <span className={`${styles.arrowSkeleton} ${styles.rightArrowBottom}`} />
      </button>
    </section>
  )
}
