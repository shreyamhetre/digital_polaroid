import { getContrastText } from '../../utils/color.js'
import styles from './PolaroidFrame.module.css'

export default function PolaroidFrame({
  photoUrl,
  filterCss = 'none',
  grain = false,
  caption,
  captionFont,
  frameColor = '#ffffff',
  photoWindowRef,
  children,
}) {
  return (
    <div className={styles.frame} style={{ background: frameColor }}>
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
      <p
        className={styles.caption}
        style={{ fontFamily: captionFont, color: getContrastText(frameColor) }}
      >
        {caption}
      </p>
    </div>
  )
}
