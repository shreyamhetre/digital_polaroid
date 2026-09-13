export const FILTERS = [
  { id: 'original', label: 'Original', css: 'none' },
  {
    id: 'vintage',
    label: 'Vintage',
    css: 'sepia(0.35) contrast(1.1) saturate(1.3) hue-rotate(-8deg)',
    grain: true,
  },
  { id: 'bw', label: 'B&W', css: 'grayscale(1)' },
  { id: 'sepia', label: 'Sepia', css: 'sepia(0.8)' },
  { id: 'warm', label: 'Warm', css: 'saturate(1.2) hue-rotate(-6deg) brightness(1.03)' },
  { id: 'cool', label: 'Cool', css: 'saturate(1.1) hue-rotate(10deg)' },
  { id: 'grain', label: 'Grain', css: 'contrast(1.05)', grain: true },
]
