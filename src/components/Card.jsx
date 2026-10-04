export default function Card({ title, subtitle, action, className = '', children }) {
  return (
    <section className={`bg-white rounded-[1.25rem] shadow-[0_4px_16px_-4px_rgba(20,18,59,0.08)] p-5 ${className}`}>
      {(title || action) && (
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="font-display text-lg font-semibold text-[#14123B]">{title}</h3>
            {subtitle && <p className="text-xs text-[#6E6B8A] mt-0.5">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  )
}
