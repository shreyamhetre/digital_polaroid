import { FILTERS } from './filters.js'
import { FRAME_PATTERNS, getPatternDataUri } from './framePatterns.js'
import { GRAIN_DATA_URI } from './grainTexture.js'

const CANVAS_W = 1000
const PADDING = 60
const PHOTO_SIZE = CANVAS_W - PADDING * 2
const CAPTION_HEIGHT = 220
const CANVAS_H = PADDING + PHOTO_SIZE + CAPTION_HEIGHT

// Tile sizes (e.g. a 24px Checks tile) are tuned by eye against the live
// preview, where the polaroid frame renders at roughly this CSS width
// (see PolaroidFrame.module.css). Tiles are fixed-pixel images, so without
// scaling them up by the same factor the canvas is larger than the DOM
// preview, a 1000px export would fit far more tile repeats than the ~360px
// on-screen frame did — patterns would look "denser"/bolder once downloaded.
const REFERENCE_FRAME_WIDTH = 360
const EXPORT_SCALE = CANVAS_W / REFERENCE_FRAME_WIDTH

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })
}

/**
 * Draws the same grain texture used in the live CSS preview, blended the
 * same way (overlay, 0.5 opacity), so the export matches what was shown.
 */
async function drawGrain(ctx, x, y, size) {
  const tileImg = await loadImage(GRAIN_DATA_URI)
  const grainPattern = ctx.createPattern(tileImg, 'repeat')
  grainPattern.setTransform(new DOMMatrix().scale(EXPORT_SCALE))
  ctx.save()
  ctx.globalCompositeOperation = 'overlay'
  ctx.globalAlpha = 0.5
  ctx.fillStyle = grainPattern
  ctx.fillRect(x, y, size, size)
  ctx.restore()
}

async function fillFrameBackground(ctx, { frameMode, frameColor, framePatternId, framePatternColor }) {
  if (frameMode === 'pattern' || frameMode === 'fruit') {
    const pattern = FRAME_PATTERNS.find((item) => item.id === framePatternId)
    if (pattern) {
      const tileImg = await loadImage(getPatternDataUri(pattern, framePatternColor))
      const tileW = (tileImg.naturalWidth || pattern.tile) * EXPORT_SCALE
      const tileH = (tileImg.naturalHeight || pattern.tile) * EXPORT_SCALE
      const canvasPattern = ctx.createPattern(tileImg, 'repeat')
      canvasPattern.setTransform(new DOMMatrix().scale(EXPORT_SCALE))
      // Matches CSS background-position: center — splits the leftover,
      // non-full-tile margin evenly on both edges instead of always
      // starting a full tile at the top-left corner.
      const offsetX = (CANVAS_W % tileW) / 2
      const offsetY = (CANVAS_H % tileH) / 2
      ctx.save()
      ctx.translate(offsetX, offsetY)
      ctx.fillStyle = canvasPattern
      ctx.fillRect(-offsetX, -offsetY, CANVAS_W, CANVAS_H)
      ctx.restore()
      return
    }
  }
  ctx.fillStyle = frameColor
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
}

/**
 * Composites the border (solid color or tiled pattern), the base photo
 * (with the same filter used in the live preview), grain overlay, and
 * caption onto a single canvas and resolves a PNG blob.
 */
export async function exportPolaroid({
  photoUrl,
  filterId,
  caption,
  captionFont = 'Caveat',
  captionColor = '#2b2622',
  frameMode = 'color',
  frameColor = '#ffffff',
  framePatternId,
  framePatternColor,
}) {
  const preset = FILTERS.find((filter) => filter.id === filterId) ?? FILTERS[0]
  const img = await loadImage(photoUrl)
  await document.fonts.ready

  const canvas = document.createElement('canvas')
  canvas.width = CANVAS_W
  canvas.height = CANVAS_H
  const ctx = canvas.getContext('2d')

  await fillFrameBackground(ctx, { frameMode, frameColor, framePatternId, framePatternColor })

  const side = Math.min(img.width, img.height)
  const sx = (img.width - side) / 2
  const sy = (img.height - side) / 2

  ctx.save()
  ctx.filter = preset.css
  ctx.drawImage(img, sx, sy, side, side, PADDING, PADDING, PHOTO_SIZE, PHOTO_SIZE)
  ctx.restore()

  if (preset.grain) {
    await drawGrain(ctx, PADDING, PADDING, PHOTO_SIZE)
  }

  if (caption) {
    ctx.font = `56px '${captionFont}', cursive`
    ctx.fillStyle = captionColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(caption, CANVAS_W / 2, PADDING + PHOTO_SIZE + CAPTION_HEIGHT / 2)
  }

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png')
  })
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}
