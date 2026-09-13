import { useRef, useState } from 'react'
import PolaroidFrame from './PolaroidFrame.jsx'
import FilterPicker from './FilterPicker.jsx'
import StickerTray from './StickerTray.jsx'
import DecorationLayer from './DecorationLayer.jsx'
import { FILTERS } from '../../utils/filters.js'
import { FRAME_COLORS } from '../../utils/frameColors.js'
import { CAPTION_FONTS } from '../../utils/captionFonts.js'
import { STICKER_POSITIONS } from '../../utils/stickers.js'
import { exportPolaroid, downloadBlob } from '../../utils/canvasExport.js'
import styles from './EditorScreen.module.css'

export default function EditorScreen({ photo, onStartOver }) {
  const [filterId, setFilterId] = useState('original')
  const [decorations, setDecorations] = useState([])
  const [caption, setCaption] = useState('')
  const [frameColor, setFrameColor] = useState(FRAME_COLORS[0].value)
  const [captionFont, setCaptionFont] = useState(CAPTION_FONTS[0].id)
  const [isExporting, setIsExporting] = useState(false)
  const photoWindowRef = useRef(null)
  const nextIdRef = useRef(1)
  const placementRef = useRef(0)

  const activeFilter = FILTERS.find((filter) => filter.id === filterId) ?? FILTERS[0]

  const addSticker = (emoji) => {
    const position = STICKER_POSITIONS[placementRef.current % STICKER_POSITIONS.length]
    placementRef.current += 1
    setDecorations((prev) => [
      ...prev,
      {
        id: nextIdRef.current++,
        content: emoji,
        xFrac: position.xFrac,
        yFrac: position.yFrac,
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
      const blob = await exportPolaroid({
        photoUrl: photo.url,
        filterId,
        decorations,
        caption,
        captionFont,
        frameColor,
      })
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
        captionFont={captionFont}
        frameColor={frameColor}
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
        style={{ fontFamily: captionFont }}
      />

      <div className={styles.fontRow}>
        {CAPTION_FONTS.map((font) => (
          <button
            key={font.id}
            type="button"
            className={font.id === captionFont ? styles.fontOptionActive : styles.fontOption}
            style={{ fontFamily: font.id }}
            onClick={() => setCaptionFont(font.id)}
          >
            Aa
          </button>
        ))}
      </div>

      <FilterPicker photoUrl={photo.url} selectedId={filterId} onSelect={setFilterId} />

      <div className={styles.colorRow}>
        {FRAME_COLORS.map((color) => (
          <button
            key={color.id}
            type="button"
            aria-label={color.label}
            className={color.value === frameColor ? styles.swatchActive : styles.swatch}
            style={{ background: color.value }}
            onClick={() => setFrameColor(color.value)}
          />
        ))}
        <label className={styles.customSwatch}>
          <input
            type="color"
            value={frameColor}
            onChange={(event) => setFrameColor(event.target.value)}
          />
        </label>
      </div>

      <StickerTray onPick={addSticker} />

      <div className={styles.actions}>
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
