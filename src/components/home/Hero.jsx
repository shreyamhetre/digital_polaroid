import styles from './Hero.module.css'

export default function Hero({ onStart }) {
  return (
    <section className={styles.hero}>
      <div className={styles.camera} aria-hidden="true">
        <div className={styles.cameraBody}>
          <div className={styles.lens} />
          <div className={styles.flash} />
        </div>
        <div className={styles.cameraFoot} />
      </div>

      <h1 className={styles.heading}>Your moment, framed.</h1>
      <p className={styles.subheading}>
        Snap a photo or upload one, dress it up, and take home a polaroid worth keeping.
      </p>

      <div className={styles.actions}>
        <button type="button" className={styles.primary} onClick={() => onStart('camera')}>
          Use Camera
        </button>
        <button type="button" className={styles.secondary} onClick={() => onStart('upload')}>
          Upload Photo
        </button>
      </div>
    </section>
  )
}
