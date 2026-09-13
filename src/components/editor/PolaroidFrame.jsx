import styles from './PolaroidFrame.module.css'

export default function PolaroidFrame({
  photoUrl,
  filterCss = 'none',
  grain = false,
  caption,
  photoWindowRef,
  children,
}) {
  return (
    <div className={styles.frame}>
      <div className={styles.photoWindow} ref={photoWindowRef}>
        <img
          src={photoUrl}
          alt="Captured polaroid"
          className={styles.photo}
          style={{ filter: filterCss }}
        />
        {grain && <div className={styles.grain} aria-hidden="true" />}
        {children}
      </div>
      <p className={`wordmark ${styles.caption}`}>{caption}</p>
    </div>
  )
}
