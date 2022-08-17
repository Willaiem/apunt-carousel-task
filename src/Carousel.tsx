import { useState, useRef } from 'react'

import { Card } from './Card'
import { Offer } from './types'
import styles from './Carousel.module.css'

type CarouselProps = {
  offers: Offer[]
}

const DELAY_BETWEEN_SCROLLS = 250

export const Carousel = ({ offers }: CarouselProps) => {
  const [isScrolling, setIsScrolling] = useState(false)
  const offersRef = useRef<HTMLDivElement>(null)

  const moveCarousel = (to: 'left' | 'right') => {
    if (!offersRef.current) return

    const widthToScroll = offersRef.current.offsetWidth

    offersRef.current.scrollBy({ behavior: 'smooth', left: to == 'left' ? -widthToScroll : widthToScroll })

    setIsScrolling(true)
    const timeout = setTimeout(() => {
      setIsScrolling(false)
      clearTimeout(timeout)
    }, DELAY_BETWEEN_SCROLLS)
  }

  return (
    <section className={styles.carouselWrapper}>
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
        disabled={isScrolling}
        className={`${styles.button} ${styles.left}`}
        onClick={() => moveCarousel('left')}
        aria-label='Previous slide'
        title='Previous slide'
      >
        <span className={`${styles.arrowSkeleton} ${styles.leftArrowTop}`} />
        <span className={`${styles.arrowSkeleton} ${styles.leftArrowBottom}`} />
      </button>

      <button
        disabled={isScrolling}
        className={`${styles.button} ${styles.right}`}
        onClick={() => moveCarousel('right')}
        aria-label='Next slide'
        title='Next slide'
      >
        <span className={`${styles.arrowSkeleton} ${styles.rightArrowTop}`} />
        <span className={`${styles.arrowSkeleton} ${styles.rightArrowBottom}`} />
      </button>
    </section>
  )
}
