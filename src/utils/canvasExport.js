import { FILTERS } from './filters.js'
import { getContrastText } from './color.js'

const CANVAS_W = 1000
const PADDING = 60
const PHOTO_SIZE = CANVAS_W - PADDING * 2
const CAPTION_HEIGHT = 220
const CANVAS_H = PADDING + PHOTO_SIZE + CAPTION_HEIGHT

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })
}

/** Draws a random-noise overlay blended over the photo to simulate film grain. */
function drawGrain(ctx, x, y, size) {
  const noiseCanvas = document.createElement('canvas')
  noiseCanvas.width = size
  noiseCanvas.height = size
  const nctx = noiseCanvas.getContext('2d')
  const imageData = nctx.createImageData(size, size)
  for (let i = 0; i < imageData.data.length; i += 4) {
    const value = Math.random() * 255
    imageData.data[i] = value
    imageData.data[i + 1] = value
    imageData.data[i + 2] = value
    imageData.data[i + 3] = 40
  }
  nctx.putImageData(imageData, 0, 0)

  ctx.save()
  ctx.globalCompositeOperation = 'overlay'
  ctx.drawImage(noiseCanvas, x, y, size, size)
  ctx.restore()
}

/**
 * Composites the base photo (with the same filter used in the live preview),
 * grain overlay, decorations, and caption onto a single canvas and resolves
 * a PNG blob. Decoration coordinates are fractions (0-1) of the photo window,
 * matching how they're stored for the DOM preview.
 */
export async function exportPolaroid({
  photoUrl,
  filterId,
  decorations,
  caption,
  captionFont = 'Caveat',
  frameColor = '#ffffff',
}) {
  const preset = FILTERS.find((filter) => filter.id === filterId) ?? FILTERS[0]
  const img = await loadImage(photoUrl)
  await document.fonts.ready

  const canvas = document.createElement('canvas')
  canvas.width = CANVAS_W
  canvas.height = CANVAS_H
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = frameColor
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

  const side = Math.min(img.width, img.height)
  const sx = (img.width - side) / 2
  const sy = (img.height - side) / 2

  ctx.save()
  ctx.filter = preset.css
  ctx.drawImage(img, sx, sy, side, side, PADDING, PADDING, PHOTO_SIZE, PHOTO_SIZE)
  ctx.restore()

  if (preset.grain) {
    drawGrain(ctx, PADDING, PADDING, PHOTO_SIZE)
  }

  decorations.forEach((decoration) => {
    ctx.save()
    const cx = PADDING + decoration.xFrac * PHOTO_SIZE
    const cy = PADDING + decoration.yFrac * PHOTO_SIZE
    ctx.translate(cx, cy)
    ctx.rotate((decoration.rotation * Math.PI) / 180)
    ctx.scale(decoration.scale, decoration.scale)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = '64px sans-serif'
    ctx.fillText(decoration.content, 0, 0)
    ctx.restore()
  })

  if (caption) {
    ctx.font = `56px '${captionFont}', cursive`
    ctx.fillStyle = getContrastText(frameColor)
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
