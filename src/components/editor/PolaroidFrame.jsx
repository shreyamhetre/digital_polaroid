import { GRAIN_DATA_URI, GRAIN_TILE } from '../../utils/grainTexture.js'
import styles from './PolaroidFrame.module.css'

export default function PolaroidFrame({
  photoUrl,
  filterCss = 'none',
  grain = false,
  caption,
  captionFont,
  captionColor,
  frameStyle,
  photoWindowRef,
}) {
  return (
    <div className={styles.frame} style={frameStyle}>
      <div className={styles.photoWindow} ref={photoWindowRef}>
        <img
          src={photoUrl}
          alt="Captured polaroid"
          className={styles.photo}
          style={{ filter: filterCss }}
        />
        {grain && (
          <div
            className={styles.grain}
            aria-hidden="true"
            style={{
              backgroundImage: `url("${GRAIN_DATA_URI}")`,
              backgroundSize: `${GRAIN_TILE}px ${GRAIN_TILE}px`,
            }}
          />
        )}
      </div>
      <p className={styles.caption} style={{ fontFamily: captionFont, color: captionColor }}>
        {caption}
      </p>
    </div>
  )
}
