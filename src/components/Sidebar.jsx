import { NavLink } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
  { path: '/analyses', label: 'Analyses', icon: 'bi-graph-up-arrow' },
  { path: '/reports', label: 'Reports', icon: 'bi-file-earmark-bar-graph' },
  { path: '/sources', label: 'Sources', icon: 'bi-diagram-3' },
  { path: '/settings', label: 'Settings', icon: 'bi-gear' },
  { path: '/pricing', label: 'Pricing', icon: 'bi-tag' },
  { path: '/profile', label: 'Profile', icon: 'bi-person-circle' },
]

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-ink z-50 px-5 py-6 transform transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h5 className="text-white font-display font-semibold text-lg">Sentio Menu</h5>
          <button onClick={onClose} aria-label="Close menu" className="p-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive ? 'bg-primary text-white' : 'text-white/70 hover:bg-white/10'
                  }`
                }
              >
                <i className={`bi ${item.icon}`}></i>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
    </>
  )
}