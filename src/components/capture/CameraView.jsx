import { useEffect } from 'react'
import { useCamera } from '../../hooks/useCamera.js'
import styles from './CameraView.module.css'

export default function CameraView({ onCapture, onUnavailable }) {
  const { videoRef, isActive, error, start, stop, capture } = useCamera()

  useEffect(() => {
    start()
    return stop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (error) onUnavailable?.(error)
  }, [error, onUnavailable])

  const handleShutter = async () => {
    const result = await capture()
    if (result) onCapture(result)
  }

  if (error) {
    return <p className={styles.message}>Camera unavailable — try uploading a photo instead.</p>
  }

  return (
    <div className={styles.wrapper}>
      <video ref={videoRef} className={styles.video} playsInline muted />
      <button
        type="button"
        className={styles.shutter}
        onClick={handleShutter}
        disabled={!isActive}
        aria-label="Take photo"
      />
    </div>
  )
}
