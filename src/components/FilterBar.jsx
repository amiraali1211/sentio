const selectClass =
  'rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary'

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1 text-xs text-muted">
      {label}
      {children}
    </label>
  )
}

export default function FilterBar({ filters, onChange, onReset, aspects, sources, countries = [] }) {
  const isDirty =
    filters.aspect !== 'all' ||
    filters.source !== 'all' ||
    filters.country !== 'all' ||
    filters.sentiment !== 'all' ||
    filters.range !== 'all' ||
    filters.hidePromo

  return (
    <div className="sticky top-0 z-10 -mx-4 md:-mx-8 px-4 md:px-8 py-3 bg-[#F5F3FC]/90 backdrop-blur border-b border-[#5B3FE3]/10">
      <div className="flex flex-wrap items-end gap-3">
        <Field label="Aspect">
          <select className={selectClass} value={filters.aspect} onChange={(e) => onChange({ aspect: e.target.value })}>
            <option value="all">All aspects</option>
            {aspects.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </Field>

        <Field label="Source">
          <select className={selectClass} value={filters.source} onChange={(e) => onChange({ source: e.target.value })}>
            <option value="all">All sources</option>
            {sources.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>

        <Field label="Country">
          <select className={selectClass} value={filters.country} onChange={(e) => onChange({ country: e.target.value })}>
            <option value="all">All countries</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>

        <Field label="Sentiment">
          <select className={selectClass} value={filters.sentiment} onChange={(e) => onChange({ sentiment: e.target.value })}>
            <option value="all">All sentiments</option>
            <option value="Positive">Positive</option>
            <option value="Neutral">Neutral</option>
            <option value="Negative">Negative</option>
          </select>
        </Field>

        <Field label="Date range">
          <select className={selectClass} value={filters.range} onChange={(e) => onChange({ range: e.target.value })}>
            <option value="all">All time</option>
            <option value="14">Last 14 days</option>
            <option value="30">Last 30 days</option>
          </select>
        </Field>

        <label className="flex items-center gap-2 text-sm text-ink pb-2 cursor-pointer">
          <input
            type="checkbox"
            className="h-4 w-4 accent-primary"
            checked={filters.hidePromo}
            onChange={(e) => onChange({ hidePromo: e.target.checked })}
          />
          Hide promotional reviews
        </label>

        {isDirty && (
          <button
            type="button"
            onClick={onReset}
            className="ml-auto pb-2 text-sm font-medium text-primary hover:text-primary-dark"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}