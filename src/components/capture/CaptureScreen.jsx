import { useState } from 'react'
import CameraView from './CameraView.jsx'
import UploadDropzone from './UploadDropzone.jsx'
import styles from './CaptureScreen.module.css'

export default function CaptureScreen({ initialMode, onCapture, onBack }) {
  const [mode, setMode] = useState(initialMode ?? 'camera')

  return (
    <section className={styles.screen}>
      <div className={styles.tabs}>
        <button
          type="button"
          className={mode === 'camera' ? styles.tabActive : styles.tab}
          onClick={() => setMode('camera')}
        >
          Camera
        </button>
        <button
          type="button"
          className={mode === 'upload' ? styles.tabActive : styles.tab}
          onClick={() => setMode('upload')}
        >
          Upload
        </button>
      </div>

      {mode === 'camera' ? (
        <CameraView onCapture={onCapture} onUnavailable={() => setMode('upload')} />
      ) : (
        <UploadDropzone onUpload={onCapture} />
      )}

      <button type="button" className={styles.back} onClick={onBack}>
        ← Back
      </button>
    </section>
  )
}
