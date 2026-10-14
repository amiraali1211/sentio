const TONES = {
  white: { style: { background: '#ffffff' }, text: 'text-[#15103d]', sub: 'text-[#6E6B8A]', shadow: 'shadow-[0_4px_16px_-4px_rgba(21,16,61,0.1)]' },
  purple: { style: { background: 'linear-gradient(155deg, #5737f4 0%, #3d26bd 100%)' }, text: 'text-white', sub: 'text-white/70', shadow: 'shadow-[0_12px_28px_-14px_rgba(61,38,189,0.7)]' },
  yellow: { style: { background: '#ffc229' }, text: 'text-[#15103d]', sub: 'text-[#15103d]/70', shadow: 'shadow-[0_12px_28px_-14px_rgba(180,130,0,0.6)]' },
}

export default function Card({ title, subtitle, action, tone = 'white', className = '', children }) {
  const t = TONES[tone]
  return (
    <section style={t.style} className={`rounded-[1.25rem] p-5 ${t.shadow} ${t.text} ${className}`}>
      {(title || action) && (
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="font-display text-lg font-semibold">{title}</h3>
            {subtitle && <p className={`text-xs mt-0.5 ${t.sub}`}>{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  )
}
