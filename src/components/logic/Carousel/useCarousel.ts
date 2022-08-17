import { useState, useRef } from "react"
import { useWheel } from "./useWheel"

type UseCarouselButtonParams = {
  isScrolling: boolean
  offersRef: React.RefObject<HTMLElement>
}

type CarouselState = 'first' | 'between' | 'last'

const SCROLL_LEFT_THRESHOLD = 250
const DELAY_BETWEEN_SCROLLS = 250

const useCarouselButtons = ({ isScrolling, offersRef }: UseCarouselButtonParams) => {
  const [carouselState, setCarouselState] = useState<CarouselState>('first')

  const isPreviousButtonDisabled = isScrolling || carouselState === 'first'
  const isNextButtonDisabled = isScrolling || carouselState === 'last'


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

  return { isPreviousButtonDisabled, isNextButtonDisabled, setButtons }
}


export const useCarousel = () => {
  const [isScrolling, setIsScrolling] = useState(false)

  const offersRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const { isNextButtonDisabled, isPreviousButtonDisabled, setButtons } = useCarouselButtons({ isScrolling, offersRef })

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

  useWheel({
    onListener: (e: WheelEvent) => {
      if (isScrolling) return

      const isScrollingUp = e.deltaY < 0
      if (isScrollingUp) {
        moveCarousel('left')
        return;
      }
      moveCarousel('right')
    },
    ref: sectionRef,
    targetWheelRef: offersRef
  })

  const moveLeft = () => moveCarousel('left')
  const moveRight = () => moveCarousel('right')

  return { isPreviousButtonDisabled, isNextButtonDisabled, moveLeft, moveRight, offersRef, sectionRef }
}
