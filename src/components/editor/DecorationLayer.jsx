import { useRef } from 'react'
import styles from './DecorationLayer.module.css'

export default function DecorationLayer({ decoration, containerRef, onMove, onRemove }) {
  const isDragging = useRef(false)

  const handlePointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    isDragging.current = true
  }

  const handlePointerMove = (event) => {
    if (!isDragging.current || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const xFrac = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
    const yFrac = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height))
    onMove(decoration.id, xFrac, yFrac)
  }

  const handlePointerUp = () => {
    isDragging.current = false
  }

  return (
    <div
      className={styles.decoration}
      style={{
        left: `${decoration.xFrac * 100}%`,
        top: `${decoration.yFrac * 100}%`,
        transform: `translate(-50%, -50%) rotate(${decoration.rotation}deg) scale(${decoration.scale})`,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <span className={decoration.type === 'text' ? `wordmark ${styles.text}` : styles.sticker}>
        {decoration.content}
      </span>
      <button
        type="button"
        className={styles.remove}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={() => onRemove(decoration.id)}
      >
        ×
      </button>
    </div>
  )
}
