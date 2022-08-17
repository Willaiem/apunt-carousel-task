import styles from './Arrows.module.css'

export const LeftArrow = () => {
  return (
    <>
      <span className={`${styles.arrowSkeleton} ${styles.leftArrowTop}`} />
      <span className={`${styles.arrowSkeleton} ${styles.leftArrowBottom}`} />
    </>
  )
}

export const RightArrow = () => {
  return (
    <>
      <span className={`${styles.arrowSkeleton} ${styles.rightArrowTop}`} />
      <span className={`${styles.arrowSkeleton} ${styles.rightArrowBottom}`} />
    </>
  )
}
