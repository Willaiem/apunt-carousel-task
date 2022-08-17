import { useState, useRef, useEffect } from 'react'

import { Card } from './Card'
import { Offer } from './types'
import styles from './Carousel.module.css'

type CarouselProps = {
  offers: Offer[]
}

type CarouselState = 'first' | 'between' | 'last'

const SCROLL_LEFT_THRESHOLD = 250
const DELAY_BETWEEN_SCROLLS = 250

export const Carousel = ({ offers }: CarouselProps) => {
  const [isScrolling, setIsScrolling] = useState(false)
  const [carouselState, setCarouselState] = useState<CarouselState>('first')
  const offersRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const setButtons = () => {
    if (!offersRef.current) return

    const SCROLL_LEFT_MAX = offersRef.current.scrollWidth - offersRef.current.clientWidth

    if (offersRef.current.scrollLeft <= SCROLL_LEFT_THRESHOLD) {
      setCarouselState('first')
      return
    }

    if (offersRef.current.scrollLeft >= SCROLL_LEFT_MAX - SCROLL_LEFT_THRESHOLD) {
      setCarouselState('last')
      return
    }

    setCarouselState('between')
  }

  const moveCarousel = (to: 'left' | 'right') => {
    if (!offersRef.current) return

    const widthToScroll = offersRef.current.offsetWidth

    offersRef.current.scrollBy({ behavior: 'smooth', left: to == 'left' ? -widthToScroll : widthToScroll })

    setIsScrolling(true)
    const timeout = setTimeout(() => {
      setIsScrolling(false)
      setButtons()
      clearTimeout(timeout)
    }, DELAY_BETWEEN_SCROLLS)
  }

  const onWheel = (e: WheelEvent) => {
    if (isScrolling) return

    const isScrollingUp = e.deltaY < 0
    if (isScrollingUp) {
      moveCarousel('left')
      return;
    }
    moveCarousel('right')
  }

  const addWheelListener = () => {
    offersRef.current?.addEventListener('wheel', onWheel)
  }

  const removeWheelListener = () => {
    offersRef.current?.removeEventListener('wheel', onWheel)
  }

  useEffect(() => {
    if (!sectionRef.current) return

    sectionRef.current.addEventListener('mouseenter', addWheelListener)
    sectionRef.current.addEventListener('mouseleave', removeWheelListener)

    return () => {
      sectionRef.current?.removeEventListener('mouseenter', addWheelListener)
      sectionRef.current?.removeEventListener('mouseleave', removeWheelListener)
    }
  }, [])

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
        disabled={isScrolling || carouselState === 'first'}
        className={`${styles.button} ${styles.left}`}
        onClick={() => moveCarousel('left')}
        aria-label='Previous slide'
        title='Previous slide'
      >
        <span className={`${styles.arrowSkeleton} ${styles.leftArrowTop}`} />
        <span className={`${styles.arrowSkeleton} ${styles.leftArrowBottom}`} />
      </button>

      <button
        disabled={isScrolling || carouselState === 'last'}
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
