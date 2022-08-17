import { Card } from '../Card/Card'
import { LeftArrow, RightArrow } from '../../ui/Arrows/Arrows'
import { useCarousel } from './useCarousel'
import { Offer } from '../../../types'
import styles from './Carousel.module.css'

type CarouselProps = {
  offers: Offer[]
}

export const Carousel = ({ offers }: CarouselProps) => {
  const { isPreviousButtonDisabled, isNextButtonDisabled, moveLeft, moveRight, offersRef, sectionRef } = useCarousel()

  const previousButtonHidden = isPreviousButtonDisabled ? styles.hidden : ''
  const nextButtonHidden = isNextButtonDisabled ? styles.hidden : ''

  return (
    <section ref={sectionRef} className={styles.carouselWrapper}>
      <div className={styles.carouselHeader}>
        <h2 className={styles.carouselHeading}>Wyjątkowe i unikalne</h2>
        <a href="https://allegrolokalnie.pl/">Zobacz więcej</a>
      </div>
      <div ref={offersRef} className={styles.offers}>
        {offers.map(offer => (
          <Card key={offer.id} offer={offer} />
        ))}
      </div>

      <button
        disabled={isPreviousButtonDisabled}
        className={`${styles.button} ${styles.left} ${previousButtonHidden}`}
        onClick={moveLeft}
        aria-label='Previous slide'
        title='Previous slide'
      >
        <LeftArrow />
      </button>

      <button
        disabled={isNextButtonDisabled}
        className={`${styles.button} ${styles.right} ${nextButtonHidden}`}
        onClick={moveRight}
        aria-label='Next slide'
        title='Next slide'
      >
        <RightArrow />
      </button>
    </section>
  )
}
