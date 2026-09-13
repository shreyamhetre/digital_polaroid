import styles from './StickerTray.module.css'

const STICKERS = ['❤️', '⭐', '✨', '🌸', '😊', '🎉', '🌈', '🔥']

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
