import PolaroidFrame from './PolaroidFrame.jsx'
import styles from './EditorScreen.module.css'

export default function EditorScreen({ photo, onStartOver }) {
  return (
    <section className={styles.screen}>
      <PolaroidFrame photoUrl={photo.url} caption="" />
      <p className={styles.note}>Decorations and filters are coming soon.</p>
      <button type="button" className={styles.back} onClick={onStartOver}>
        Start Over
      </button>
    </section>
  )
}
