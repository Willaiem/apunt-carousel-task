import { useEffect } from "react"

type UseWheelParams = {
  ref: React.RefObject<HTMLElement>
  targetWheelRef?: React.RefObject<HTMLElement>
  onListener: (e: WheelEvent) => void
}

export const useWheel = ({ onListener, ref, targetWheelRef }: UseWheelParams) => {
  const addWheelListener = () => {
    (targetWheelRef ?? ref).current?.addEventListener('wheel', onListener)
  }

  const removeWheelListener = () => {
    (targetWheelRef ?? ref).current?.removeEventListener('wheel', onListener)
  }

  useEffect(() => {
    if (!ref.current) return

    ref.current.addEventListener('mouseenter', addWheelListener)
    ref.current.addEventListener('mouseleave', removeWheelListener)

    return () => {
      ref.current?.removeEventListener('mouseenter', addWheelListener)
      ref.current?.removeEventListener('mouseleave', removeWheelListener)
    }
  }, [])
}
