import { useState } from 'react'
import FeedbackPanel from './FeedbackPanel.jsx'
import styles from './Header.module.css'

export default function Header() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)

  return (
    <header className={styles.header}>
      <span className={`wordmark ${styles.brand}`}>Digital Polaroid</span>
      <button
        type="button"
        className={styles.feedbackButton}
        onClick={() => setIsFeedbackOpen(true)}
      >
        Feedback
      </button>
      {isFeedbackOpen && <FeedbackPanel onClose={() => setIsFeedbackOpen(false)} />}
    </header>
  )
}
