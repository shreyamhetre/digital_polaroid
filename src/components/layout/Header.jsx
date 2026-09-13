import { useState } from 'react'
import { motion } from 'framer-motion'
import { CameraIcon, HeartIcon } from '../icons/Icons.jsx'
import FeedbackPanel from './FeedbackPanel.jsx'
import styles from './Header.module.css'

export default function Header() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)

  return (
    <motion.header
      className={styles.header}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className={styles.brandGroup}>
        <span className={styles.logoMark}>
          <CameraIcon className={styles.logoIcon} />
        </span>
        <div>
          <span className={`wordmark ${styles.brand}`}>
            Dear Snap <HeartIcon className={styles.brandHeart} />
          </span>
          <span className={styles.tagline}>little moments, kept forever.</span>
        </div>
      </div>
      <motion.button
        type="button"
        className={styles.feedbackButton}
        onClick={() => setIsFeedbackOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
      >
        Feedback
      </motion.button>
      {isFeedbackOpen && <FeedbackPanel onClose={() => setIsFeedbackOpen(false)} />}
    </motion.header>
  )
}
