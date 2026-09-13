export const STICKERS = ['🌸', '✨', '🦋', '🌙', '🍃', '🎀', '💫']

// Cycled through as stickers are added so consecutive picks land in
// different spots on the photo instead of stacking on top of each other.
export const STICKER_POSITIONS = [
  { xFrac: 0.2, yFrac: 0.2 },
  { xFrac: 0.8, yFrac: 0.2 },
  { xFrac: 0.2, yFrac: 0.8 },
  { xFrac: 0.8, yFrac: 0.8 },
  { xFrac: 0.5, yFrac: 0.15 },
  { xFrac: 0.15, yFrac: 0.5 },
  { xFrac: 0.85, yFrac: 0.5 },
]
