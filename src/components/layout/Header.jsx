import { useState } from 'react'
import FeedbackPanel from './FeedbackPanel.jsx'
import styles from './Header.module.css'

export default function Header() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.brandGroup}>
        <span className={`wordmark ${styles.brand}`}>Dear Snap</span>
        <span className={styles.tagline}>little moments, kept forever.</span>
      </div>
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
