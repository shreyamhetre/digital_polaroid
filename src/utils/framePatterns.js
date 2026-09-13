function toDataUri(svg) {
  // Base64 avoids characters like the unescaped '(' / ')' that
  // encodeURIComponent leaves alone — those break CSS url(...) parsing
  // when the SVG itself contains e.g. patternTransform="rotate(45)".
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

function ginghamSvg(color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" fill="#fbeef0"/><rect width="20" height="20" fill="${color}"/><rect x="20" y="20" width="20" height="20" fill="${color}"/></svg>`
}

function polkaSvg(color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" fill="#fdf6ec"/><circle cx="10" cy="10" r="4" fill="${color}"/><circle cx="30" cy="30" r="4" fill="${color}"/></svg>`
}

function wavySvg(color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><rect width="60" height="60" fill="${color}"/><path d="M0 15 Q15 0 30 15 T60 15" stroke="#ffffff" stroke-width="2.5" fill="none" opacity="0.9"/><path d="M0 40 Q15 25 30 40 T60 40" stroke="#ffffff" stroke-width="2.5" fill="none" opacity="0.9"/></svg>`
}

function checksSvg(color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="#f4f8fc"/><rect width="24" height="12" fill="${color}" opacity="0.55"/><rect width="12" height="24" fill="${color}" opacity="0.55"/></svg>`
}

function stripeSvg(color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><defs><pattern id="s" width="14" height="14" patternTransform="rotate(45)" patternUnits="userSpaceOnUse"><rect width="7" height="14" fill="${color}"/><rect x="7" width="7" height="14" fill="#fdf3ea"/></pattern></defs><rect width="40" height="40" fill="url(#s)"/></svg>`
}

// Small, tightly-packed tiles so the icon shows in full even on the
// thin top/side border strips, instead of being bisected by the crop.
const STATIC_FRUITS = [
  {
    id: 'strawberry',
    label: 'Strawberry',
    tile: 20,
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><rect width="20" height="20" fill="#fbe4e4"/><g transform="translate(10 11)"><path d="M0 8 C-6 4 -6 -2 0 -2 C6 -2 6 4 0 8 Z" fill="#e5484d"/><circle cx="-2" cy="2" r="0.7" fill="#fff"/><circle cx="2" cy="2" r="0.7" fill="#fff"/><circle cx="0" cy="5" r="0.7" fill="#fff"/><path d="M-3 -2 L0 -5 L3 -2 Z" fill="#4caf6d"/></g></svg>',
  },
  {
    id: 'cherry',
    label: 'Cherry',
    tile: 20,
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><rect width="20" height="20" fill="#fdeef0"/><g transform="translate(10 12)"><circle cx="-3" cy="2" r="3.2" fill="#c8273c"/><circle cx="3" cy="3.5" r="3.2" fill="#c8273c"/><path d="M-3 -1 C-2 -6 2 -7 3.5 -8" fill="none" stroke="#4caf6d" stroke-width="1.3"/><path d="M3 0.3 C3 -4 4 -6 3.5 -8" fill="none" stroke="#4caf6d" stroke-width="1.3"/></g></svg>',
  },
]

const CUSTOMIZABLE_PATTERNS = [
  { id: 'gingham', label: 'Gingham', tile: 40, buildSvg: ginghamSvg, defaultColor: '#eab6c2' },
  { id: 'checks', label: 'Checks', tile: 24, buildSvg: checksSvg, defaultColor: '#7fa5d6' },
  { id: 'polka', label: 'Polka Dot', tile: 40, buildSvg: polkaSvg, defaultColor: '#e8a8bb' },
  { id: 'stripe', label: 'Stripe', tile: 40, buildSvg: stripeSvg, defaultColor: '#e3a97e' },
  { id: 'wavy', label: 'Wavy', tile: 60, buildSvg: wavySvg, defaultColor: '#8fa789' },
]

export const FRAME_PATTERNS = [
  ...CUSTOMIZABLE_PATTERNS.map((pattern) => ({
    ...pattern,
    category: 'pattern',
    customizable: true,
  })),
  ...STATIC_FRUITS.map((pattern) => ({
    ...pattern,
    category: 'fruit',
    customizable: false,
    dataUri: toDataUri(pattern.svg),
  })),
]

/** Resolves a pattern's data URI, generating it on the fly for colorizable patterns. */
export function getPatternDataUri(pattern, color) {
  if (!pattern.customizable) return pattern.dataUri
  return toDataUri(pattern.buildSvg(color ?? pattern.defaultColor))
}

export const PATTERN_COLOR_OPTIONS = [
  { id: 'sage', value: '#8fa789' },
  { id: 'terracotta', value: '#d97a52' },
  { id: 'blush', value: '#e8a0ad' },
  { id: 'mustard', value: '#e0b355' },
  { id: 'dusty-blue', value: '#7fa5d6' },
  { id: 'plum', value: '#a888b5' },
]
