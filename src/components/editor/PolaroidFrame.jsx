import styles from './PolaroidFrame.module.css'

export default function PolaroidFrame({ photoUrl, caption }) {
  return (
    <div className={styles.frame}>
      <div className={styles.photoWindow}>
        <img src={photoUrl} alt="Captured polaroid" className={styles.photo} />
      </div>
      <p className={`wordmark ${styles.caption}`}>{caption}</p>
    </div>
  )
}
