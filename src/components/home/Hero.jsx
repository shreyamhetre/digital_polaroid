import { motion } from 'framer-motion'
import { CameraIcon, UploadIcon, HeartIcon, SparkleIcon } from '../icons/Icons.jsx'
import styles from './Hero.module.css'

function Burst({ className }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M8 28 Q3 20 8 12" fill="none" stroke="var(--color-accent)" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M19 33 Q14 22 19 11" fill="none" stroke="var(--color-accent)" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M30 29 Q26 20 30 10" fill="none" stroke="var(--color-accent)" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

function CameraIllustration({ className }) {
  return (
    <svg viewBox="0 0 160 130" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="34" width="144" height="82" rx="26" fill="var(--color-surface)" stroke="var(--color-text)" strokeWidth="4" />
      <rect x="58" y="14" width="46" height="24" rx="8" fill="var(--color-surface)" stroke="var(--color-text)" strokeWidth="4" />
      <circle cx="26" cy="34" r="6" fill="var(--color-surface)" stroke="var(--color-text)" strokeWidth="3" />
      <rect x="55" y="110" width="50" height="10" rx="5" fill="var(--color-surface)" stroke="var(--color-text)" strokeWidth="3" />
      <circle cx="80" cy="76" r="26" fill="var(--color-surface)" stroke="var(--color-text)" strokeWidth="4" />
      <circle cx="80" cy="76" r="19" fill="none" stroke="var(--color-accent)" strokeWidth="7" />
      <circle cx="80" cy="76" r="11" fill="var(--color-text)" />
      <circle cx="126" cy="50" r="7" fill="var(--color-muted-green)" stroke="var(--color-text)" strokeWidth="2" />
    </svg>
  )
}

export default function Hero({ onStart }) {
  return (
    <section className={styles.hero}>
      <div className={styles.blobTopLeft} aria-hidden="true" />
      <div className={styles.blobBottomRight} aria-hidden="true" />

      <svg className={styles.doodleHeartLine} viewBox="0 0 140 100" aria-hidden="true">
        <path
          d="M4 70 C15 88 38 88 38 62 C38 45 40 38 44 30"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M44 34c-3-3-8-1-8 3c0 3 4 6 8 9c4-3 8-6 8-9c0-4-5-6-8-3z"
          fill="var(--color-accent)"
        />
      </svg>

      <Burst className={styles.doodleDashes} />

      <motion.div
        className={styles.illustration}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.span
          className={styles.sparkle}
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <SparkleIcon className={styles.sparkleIcon} />
        </motion.span>

        <Burst className={styles.burstCameraLeft} />
        <Burst className={styles.burstCameraRight} />

        <motion.div
          className={styles.cameraWrap}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <CameraIllustration className={styles.camera} />
        </motion.div>

        <motion.div
          className={styles.photoCard}
          animate={{ rotate: [6, 11, 6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className={styles.tape} />
          <HeartIcon className={styles.cardHeart} />
        </motion.div>
      </motion.div>

      <motion.h1
        className={`wordmark ${styles.heading}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
      >
        <Burst className={styles.burstHeading} />
        Dear Snap{' '}
        <motion.span
          className={styles.headingHeart}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <HeartIcon className={styles.headingHeartIcon} />
        </motion.span>
        <svg className={styles.underline} viewBox="0 0 220 20" aria-hidden="true">
          <path
            d="M4 12 Q55 2 110 12 T216 10"
            stroke="var(--color-accent)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </motion.h1>

      <motion.p
        className={styles.tagline}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
      >
        little moments, kept forever.
      </motion.p>

      <motion.p
        className={styles.description}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
      >
        Snap a photo or upload one, dress it up with stickers, captions, and filters, and take
        home a polaroid worth keeping.
      </motion.p>

      <motion.div
        className={styles.actions}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45, ease: 'easeOut' }}
      >
        <motion.button
          type="button"
          className={styles.primary}
          onClick={() => onStart('camera')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          <CameraIcon className={styles.buttonIcon} />
          Use Camera
        </motion.button>
        <motion.button
          type="button"
          className={styles.secondary}
          onClick={() => onStart('upload')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          <UploadIcon className={styles.buttonIcon} />
          Upload Photo
        </motion.button>
      </motion.div>
    </section>
  )
}
