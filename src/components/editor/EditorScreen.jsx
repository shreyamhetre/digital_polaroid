import { useRef, useState } from 'react'
import PolaroidFrame from './PolaroidFrame.jsx'
import FilterPicker from './FilterPicker.jsx'
import { FILTERS } from '../../utils/filters.js'
import { FRAME_COLORS } from '../../utils/frameColors.js'
import {
  FRAME_PATTERNS,
  PATTERN_COLOR_OPTIONS,
  getPatternDataUri,
} from '../../utils/framePatterns.js'
import { CAPTION_FONTS } from '../../utils/captionFonts.js'
import { getContrastText } from '../../utils/color.js'
import { exportPolaroid, downloadBlob } from '../../utils/canvasExport.js'
import styles from './EditorScreen.module.css'

const PATTERN_ITEMS = FRAME_PATTERNS.filter((item) => item.category === 'pattern')
const FRUIT_ITEMS = FRAME_PATTERNS.filter((item) => item.category === 'fruit')

function initialPatternColors() {
  return Object.fromEntries(
    FRAME_PATTERNS.filter((pattern) => pattern.customizable).map((pattern) => [
      pattern.id,
      pattern.defaultColor,
    ]),
  )
}

export default function EditorScreen({ photo, onStartOver }) {
  const [filterId, setFilterId] = useState('original')
  const [caption, setCaption] = useState('')
  const [captionFont, setCaptionFont] = useState(CAPTION_FONTS[0].id)
  const [frameMode, setFrameMode] = useState('color')
  const [frameColor, setFrameColor] = useState(FRAME_COLORS[0].value)
  const [framePatternId, setFramePatternId] = useState(PATTERN_ITEMS[0].id)
  const [patternColors, setPatternColors] = useState(initialPatternColors)
  const [isExporting, setIsExporting] = useState(false)
  const photoWindowRef = useRef(null)

  const activeFilter = FILTERS.find((filter) => filter.id === filterId) ?? FILTERS[0]
  const activePattern = FRAME_PATTERNS.find((pattern) => pattern.id === framePatternId)
  const activePatternColor = activePattern?.customizable
    ? patternColors[activePattern.id]
    : undefined
  const isTiledMode = frameMode === 'pattern' || frameMode === 'fruit'

  const frameStyle =
    isTiledMode && activePattern
      ? {
          backgroundImage: `url(${getPatternDataUri(activePattern, activePatternColor)})`,
          backgroundSize: `${activePattern.tile}px ${activePattern.tile}px`,
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
        }
      : { background: frameColor }

  const captionColor = frameMode === 'color' ? getContrastText(frameColor) : '#2b2622'

  const selectTab = (mode) => {
    setFrameMode(mode)
    if (mode === 'pattern') setFramePatternId(PATTERN_ITEMS[0].id)
    if (mode === 'fruit') setFramePatternId(FRUIT_ITEMS[0].id)
  }

  const handleDownload = async () => {
    setIsExporting(true)
    try {
      const blob = await exportPolaroid({
        photoUrl: photo.url,
        filterId,
        caption,
        captionFont,
        captionColor,
        frameMode,
        frameColor,
        framePatternId,
        framePatternColor: activePatternColor,
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
        captionColor={captionColor}
        frameStyle={frameStyle}
        photoWindowRef={photoWindowRef}
      />

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

      <div className={styles.frameSection}>
        <div className={styles.tabs}>
          <button
            type="button"
            className={frameMode === 'color' ? styles.tabActive : styles.tab}
            onClick={() => selectTab('color')}
          >
            Color
          </button>
          <button
            type="button"
            className={frameMode === 'pattern' ? styles.tabActive : styles.tab}
            onClick={() => selectTab('pattern')}
          >
            Pattern
          </button>
          <button
            type="button"
            className={frameMode === 'fruit' ? styles.tabActive : styles.tab}
            onClick={() => selectTab('fruit')}
          >
            Fruits
          </button>
        </div>

        {frameMode === 'color' && (
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
        )}

        {frameMode === 'pattern' && (
          <>
            <div className={styles.patternRow}>
              {PATTERN_ITEMS.map((pattern) => (
                <button
                  key={pattern.id}
                  type="button"
                  className={
                    pattern.id === framePatternId ? styles.patternActive : styles.pattern
                  }
                  onClick={() => setFramePatternId(pattern.id)}
                >
                  <img
                    src={getPatternDataUri(pattern, patternColors[pattern.id])}
                    alt=""
                    className={styles.patternThumb}
                  />
                  <span>{pattern.label}</span>
                </button>
              ))}
            </div>

            <div className={styles.colorRow}>
              {PATTERN_COLOR_OPTIONS.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  aria-label={color.id}
                  className={
                    color.value === activePatternColor ? styles.swatchActive : styles.swatch
                  }
                  style={{ background: color.value }}
                  onClick={() =>
                    setPatternColors((prev) => ({ ...prev, [activePattern.id]: color.value }))
                  }
                />
              ))}
              <label className={styles.customSwatch}>
                <input
                  type="color"
                  value={activePatternColor}
                  onChange={(event) =>
                    setPatternColors((prev) => ({
                      ...prev,
                      [activePattern.id]: event.target.value,
                    }))
                  }
                />
              </label>
            </div>
          </>
        )}

        {frameMode === 'fruit' && (
          <div className={styles.patternRow}>
            {FRUIT_ITEMS.map((pattern) => (
              <button
                key={pattern.id}
                type="button"
                className={pattern.id === framePatternId ? styles.patternActive : styles.pattern}
                onClick={() => setFramePatternId(pattern.id)}
              >
                <img src={pattern.dataUri} alt="" className={styles.patternThumb} />
                <span>{pattern.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

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
