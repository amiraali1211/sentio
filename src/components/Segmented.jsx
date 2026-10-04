export default function Segmented({ options, value, onChange }) {
  return (
    <div className="inline-flex rounded-lg bg-[#EDE9FE] p-0.5 text-xs font-medium">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-md px-3 py-1 transition-colors ${value === o.value ? 'bg-white text-[#5B3FE3] shadow-sm' : 'text-[#6E6B8A]'}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
