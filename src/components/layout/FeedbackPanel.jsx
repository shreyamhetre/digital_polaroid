import styles from './FeedbackPanel.module.css'

export default function FeedbackPanel({ onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(event) => event.stopPropagation()}>
        <div className={styles.panelHeader}>
          <h2>Feedback</h2>
          <button type="button" className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <p className={styles.placeholder}>Reviews are coming soon — check back shortly.</p>
      </div>
    </div>
  )
}
