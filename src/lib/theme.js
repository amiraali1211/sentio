// Hex colors so charts render even if Tailwind's theme isn't loaded.
export const C = {
  positive: '#22C55E', neutral: '#94A3B8', negative: '#EF4444',
  primary: '#5B3FE3', primarySoft: '#EDE9FE', accent: '#F4A261',
  ink: '#14123B', muted: '#6E6B8A', grid: '#E7E3F5',
}
export const SENT = { Positive: C.positive, Neutral: C.neutral, Negative: C.negative }
export const SENTIMENTS = ['Positive', 'Neutral', 'Negative']
export const tip = {
  contentStyle: { borderRadius: 12, border: 'none', fontSize: 12, boxShadow: '0 8px 24px -8px rgba(91,63,227,0.35)' },
  cursor: { fill: 'rgba(91,63,227,0.06)' },
}
export const axis = { fontSize: 12, fill: C.muted }
