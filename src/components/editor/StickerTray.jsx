import { STICKERS } from '../../utils/stickers.js'
import styles from './StickerTray.module.css'

export default function StickerTray({ onPick }) {
  return (
    <div className={styles.tray}>
      {STICKERS.map((emoji) => (
        <button
          key={emoji}
          type="button"
          className={styles.sticker}
          onClick={() => onPick(emoji)}
        >
          {emoji}
        </button>
      ))}
    </div>
  )
}
