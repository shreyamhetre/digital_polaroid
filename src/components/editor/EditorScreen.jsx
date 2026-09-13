import { useRef, useState } from 'react'
import PolaroidFrame from './PolaroidFrame.jsx'
import FilterPicker from './FilterPicker.jsx'
import StickerTray from './StickerTray.jsx'
import DecorationLayer from './DecorationLayer.jsx'
import { FILTERS } from '../../utils/filters.js'
import { exportPolaroid, downloadBlob } from '../../utils/canvasExport.js'
import styles from './EditorScreen.module.css'

export default function EditorScreen({ photo, onStartOver }) {
  const [filterId, setFilterId] = useState('original')
  const [decorations, setDecorations] = useState([])
  const [caption, setCaption] = useState('')
  const [isExporting, setIsExporting] = useState(false)
  const photoWindowRef = useRef(null)
  const nextIdRef = useRef(1)

  const activeFilter = FILTERS.find((filter) => filter.id === filterId) ?? FILTERS[0]

  const addSticker = (emoji) => {
    setDecorations((prev) => [
      ...prev,
      {
        id: nextIdRef.current++,
        type: 'sticker',
        content: emoji,
        xFrac: 0.5,
        yFrac: 0.5,
        rotation: 0,
        scale: 1,
      },
    ])
  }

  const addText = () => {
    const text = window.prompt('Caption text:')
    if (!text) return
    setDecorations((prev) => [
      ...prev,
      {
        id: nextIdRef.current++,
        type: 'text',
        content: text,
        xFrac: 0.5,
        yFrac: 0.5,
        rotation: 0,
        scale: 1,
      },
    ])
  }

  const moveDecoration = (id, xFrac, yFrac) => {
    setDecorations((prev) => prev.map((d) => (d.id === id ? { ...d, xFrac, yFrac } : d)))
  }

  const removeDecoration = (id) => {
    setDecorations((prev) => prev.filter((d) => d.id !== id))
  }

  const handleDownload = async () => {
    setIsExporting(true)
    try {
      const blob = await exportPolaroid({ photoUrl: photo.url, filterId, decorations, caption })
      if (blob) downloadBlob(blob, 'polaroid.png')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <section className={styles.screen}>
      <PolaroidFrame
        photoUrl={photo.url}
        filterCss={activeFilter.css}
        grain={activeFilter.grain}
        caption={caption}
        photoWindowRef={photoWindowRef}
      >
        {decorations.map((decoration) => (
          <DecorationLayer
            key={decoration.id}
            decoration={decoration}
            containerRef={photoWindowRef}
            onMove={moveDecoration}
            onRemove={removeDecoration}
          />
        ))}
      </PolaroidFrame>

      <input
        type="text"
        placeholder="Add a caption..."
        value={caption}
        onChange={(event) => setCaption(event.target.value)}
        className={styles.captionInput}
      />

      <FilterPicker photoUrl={photo.url} selectedId={filterId} onSelect={setFilterId} />
      <StickerTray onPick={addSticker} />

      <div className={styles.actions}>
        <button type="button" className={styles.secondaryButton} onClick={addText}>
          + Text
        </button>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={handleDownload}
          disabled={isExporting}
        >
          {isExporting ? 'Preparing…' : 'Download'}
        </button>
      </div>

      <button type="button" className={styles.back} onClick={onStartOver}>
        Start Over
      </button>
    </section>
  )
}
