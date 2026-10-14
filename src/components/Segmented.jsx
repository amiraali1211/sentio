export default function Segmented({ options, value, onChange }) {
  return (
    <div className="inline-flex rounded-lg bg-[#EDE9FE] p-0.5 text-xs font-medium">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-md px-3 py-1 transition-colors ${value === o.value ? 'bg-[#5737f4] text-white shadow-sm' : 'text-[#5737f4]/80 hover:text-[#5737f4]'}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}