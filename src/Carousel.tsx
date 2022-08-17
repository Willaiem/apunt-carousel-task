import { Offer } from './types'
import styles from './Carousel.module.css'

type CarouselProps = {
  offers: Offer[]
  itemsPerPage?: number
}

export const Carousel = ({ offers }: CarouselProps) => {
  return (
    <section className={styles.carousel}>

    </section>
  )
}