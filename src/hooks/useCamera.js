import { useCallback, useRef, useState } from 'react'

/**
 * Manages a getUserMedia camera stream and frame capture.
 * The stream is only requested when `start()` is called, not on mount,
 * so the browser permission prompt never fires until the user opts in.
 */
export function useCamera() {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const [error, setError] = useState(null)

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    setIsActive(false)
  }, [])

  const start = useCallback(async () => {
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setIsActive(true)
    } catch (err) {
      setError(err)
      setIsActive(false)
    }
  }, [])

  /** Draws the current video frame to a canvas and resolves a PNG blob URL. */
  const capture = useCallback(() => {
    const video = videoRef.current
    if (!video) return null

    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')

    // Mirror horizontally so the captured photo matches the selfie preview.
    ctx.translate(canvas.width, 0)
    ctx.scale(-1, 1)
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          resolve(null)
          return
        }
        resolve({
          url: URL.createObjectURL(blob),
          width: canvas.width,
          height: canvas.height,
          source: 'camera',
        })
      }, 'image/png')
    })
  }, [])

  return { videoRef, isActive, error, start, stop, capture }
}
