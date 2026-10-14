import { createElement } from 'react'

export const C = {
  page: '#F6F4FE',
  ink: '#15103d',
  primary: '#5737f4',
  primaryDark: '#3d26bd',
  yellow: '#ffc229',
  lavender: '#B9ACFB',
  rose: '#FF6B93',
  roseText: '#D63A68',
  soft: '#EDE9FE',
  muted: '#6E6B8A',
  grid: '#E7E3F5',
}

export const SENT = { Positive: C.primary, Neutral: C.lavender, Negative: C.rose }
export const SENTIMENTS = ['Positive', 'Neutral', 'Negative']

export const tip = {
  contentStyle: {
    borderRadius: 12, border: 'none', fontSize: 12,
    background: C.ink, color: '#fff', boxShadow: '0 10px 24px -8px rgba(21,16,61,0.5)',
  },
  itemStyle: { color: '#fff' },
  labelStyle: { color: '#C9BFFF', marginBottom: 2 },
  cursor: { fill: 'rgba(87,55,244,0.07)' },
}

export const axis = { fontSize: 12, fill: C.muted }
export const legendText = (value) => createElement('span', { style: { color: C.ink } }, value)