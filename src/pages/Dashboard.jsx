import { useMemo, useState } from 'react'
import FilterBar from '../components/FilterBar'
import KpiCard from '../components/KpiCard'
import TrendChart from '../components/TrendChart'
import SentimentDonut from '../components/SentimentDonut'
import AspectChart from '../components/AspectChart'
import AspectRadar from '../components/AspectRadar'
import Heatmap from '../components/Heatmap'
import Authenticity from '../components/Authenticity'
import Insights from '../components/Insights'
import MapCard from '../components/MapCard'
import ReviewTable from '../components/ReviewTable'
import { mockAnalysis } from '../data/mockAnalysis'
import { DAY, aspectStats, countryStats, summarize, weekly } from '../lib/analytics'
import { C } from '../lib/theme'

const DEFAULTS = { aspect: 'all', source: 'all', country: 'all', sentiment: 'all', range: 'all', hidePromo: false }
const signed = (n) => `${n > 0 ? '+' : ''}${n}`

export default function Dashboard() {
  const { subject, generatedAt, summary, reviews, sources, countries, sales } = mockAnalysis
  const latest = useMemo(() => new Date(generatedAt), [generatedAt])
  const [filters, setFilters] = useState(DEFAULTS)
  const [percent, setPercent] = useState(false)
  const [copied, setCopied] = useState(false)

  const patch = (c) => setFilters((f) => ({ ...f, ...c }))
  const toggle = (key, val) => setFilters((f) => ({ ...f, [key]: f[key] === val ? 'all' : val }))
  const pickCell = (aspect, source) =>
    setFilters((f) => (f.aspect === aspect && f.source === source ? { ...f, aspect: 'all', source: 'all' } : { ...f, aspect, source }))

  // Each chart can ignore the filter it controls, so it never collapses to a single slice or bar.
  const apply = (skip = []) =>
    reviews.filter(
      (r) =>
        (skip.includes('aspect') || filters.aspect === 'all' || r.aspect === filters.aspect) &&
        (skip.includes('source') || filters.source === 'all' || r.source === filters.source) &&
        (skip.includes('country') || filters.country === 'all' || r.country === filters.country) &&
        (skip.includes('sentiment') || filters.sentiment === 'all' || r.sentiment === filters.sentiment) &&
        (filters.range === 'all' || (latest - new Date(r.date)) / DAY <= Number(filters.range)) &&
        !(filters.hidePromo && r.promotional),
    )

  const visible = apply()
  const forDonut = apply(['sentiment'])
  const forAspects = apply(['aspect'])
  const forHeat = apply(['aspect', 'source'])
  const mapData = countryStats(apply(['country']), countries, sales)

  const stats = summarize(visible)
  const series = weekly(visible, latest)
  const aspectData = aspectStats(forAspects)
  const allAspects = [...new Set(reviews.map((r) => r.aspect))]

  const win = (from, to) => visible.filter((r) => { const d = (latest - new Date(r.date)) / DAY; return d >= from && d < to })
  const recent = summarize(win(0, 14))
  const prior = summarize(win(14, 28))
  const hasPrior = prior.total > 0
  const volumeDelta = hasPrior ? Math.round(((recent.total - prior.total) / prior.total) * 100) : null

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard unavailable */ }
  }

  return (
    <main className="px-4 md:px-8 pb-10 max-w-7xl mx-auto">
      <header className="flex flex-wrap items-start justify-between gap-4 pt-6 pb-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-[#14123B]">{subject}</h1>
          <p className="text-sm text-[#6E6B8A] mt-1">
            {reviews.length} reviews from {sources.length} sources, analyzed {latest.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={share} className="rounded-lg border border-[#5B3FE3]/20 bg-white px-4 py-2 text-sm font-medium text-[#14123B] hover:bg-[#EDE9FE] transition-colors">
            {copied ? 'Link copied' : 'Share'}
          </button>
          <button type="button" onClick={() => window.print()} className="rounded-lg bg-[#5B3FE3] px-4 py-2 text-sm font-medium text-white hover:bg-[#4529C4] transition-colors">
            Export PDF
          </button>
        </div>
      </header>

      <FilterBar filters={filters} onChange={patch} onReset={() => setFilters(DEFAULTS)} aspects={allAspects} sources={sources} countries={countries.map((c) => c.name)} />

      <div className="flex flex-col gap-6 mt-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard label="Net sentiment score" value={signed(stats.score)} delta={hasPrior ? recent.score - prior.score : null} data={series} dataKey="score" color={C.primary} />
          <KpiCard label="Reviews analyzed" value={stats.total} delta={volumeDelta} unit="%" data={series} dataKey="total" color="#8B7BEA" />
          <KpiCard label="Positive share" value={`${stats.pos}%`} delta={hasPrior ? recent.pos - prior.pos : null} data={series} dataKey="posPct" color={C.positive} />
          <KpiCard label="Flagged by SENTIO" value={`${stats.flaggedPct}%`} delta={hasPrior ? recent.flaggedPct - prior.flaggedPct : null} goodWhenUp={false} data={series} dataKey="flaggedPct" color={C.accent} highlight />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><TrendChart data={series} percent={percent} onModeChange={setPercent} /></div>
          <SentimentDonut list={forDonut} selected={filters.sentiment} onSelect={(s) => toggle('sentiment', s)} score={summarize(forDonut).score} />
        </div>

        <MapCard data={mapData} selected={filters.country} onSelect={(c) => toggle('country', c)} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><AspectChart data={aspectData} selected={filters.aspect} onSelect={(a) => toggle('aspect', a)} /></div>
          <AspectRadar data={aspectData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Heatmap list={forHeat} aspects={allAspects} sources={sources} selectedAspect={filters.aspect} selectedSource={filters.source} onPick={pickCell} />
          </div>
          <Authenticity list={visible} hidePromo={filters.hidePromo} onToggleHide={() => patch({ hidePromo: !filters.hidePromo })} />
        </div>

        <Insights summary={summary} aspects={aspectData} onSelect={(a) => toggle('aspect', a)} />

        <ReviewTable key={JSON.stringify(filters)} reviews={visible} />
      </div>
    </main>
  )
}