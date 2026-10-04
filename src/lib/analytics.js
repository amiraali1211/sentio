import { SENTIMENTS } from './theme'

export const DAY = 86400000
const isFlagged = (r) => r.promotional || r.sarcasm

export function summarize(list) {
  const total = list.length
  const n = (s) => list.filter((r) => r.sentiment === s).length
  const pct = (x) => (total ? Math.round((x / total) * 100) : 0)
  const flagged = list.filter(isFlagged).length
  return {
    total, flagged,
    pos: pct(n('Positive')), neu: pct(n('Neutral')), neg: pct(n('Negative')),
    score: total ? Math.round(((n('Positive') - n('Negative')) / total) * 100) : 0,
    flaggedPct: pct(flagged),
  }
}

export function weekly(list, latest) {
  if (!list.length) return []
  const idx = list.map((r) => Math.floor((latest - new Date(r.date)) / (7 * DAY)))
  const maxW = Math.max(...idx)
  return Array.from({ length: maxW + 1 }, (_, i) => {
    const w = maxW - i
    const l = list.filter((_, j) => idx[j] === w)
    const s = summarize(l)
    const row = { label: w === 0 ? 'This week' : `${w}w ago`, total: l.length, score: s.score, posPct: s.pos, flaggedPct: s.flaggedPct }
    SENTIMENTS.forEach((k) => (row[k] = l.filter((r) => r.sentiment === k).length))
    return row
  })
}

export function aspectStats(list) {
  const m = {}
  list.forEach((r) => {
    const a = (m[r.aspect] ||= { aspect: r.aspect, Positive: 0, Neutral: 0, Negative: 0, total: 0 })
    a[r.sentiment]++
    a.total++
  })
  return Object.values(m)
    .map((a) => ({ ...a, score: Math.round(((a.Positive - a.Negative) / a.total) * 100) }))
    .sort((a, b) => b.total - a.total)
}

// Joins sales (size) with review sentiment (color) per country. score is null when no reviews match.
export function countryStats(list, countries, sales = []) {
  return countries
    .map((c) => {
      const l = list.filter((r) => r.country === c.name)
      const s = sales.find((x) => x.country === c.name)
      return {
        country: c.name, lat: c.lat, lng: c.lng,
        reviews: l.length,
        score: l.length ? summarize(l).score : null,
        units: s?.units ?? 0,
        revenue: s?.revenue ?? 0,
        growth: s?.prevUnits ? Math.round(((s.units - s.prevUnits) / s.prevUnits) * 100) : null,
      }
    })
    .filter((c) => c.units > 0)
}