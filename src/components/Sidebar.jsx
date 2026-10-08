import { NavLink, Link } from 'react-router-dom'
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
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 flex flex-col px-4 py-5 rounded-r-3xl shadow-2xl transform transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-end mb-4 px-2">
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="w-9 h-9 rounded-full bg-[#ECE8FE] text-[#5737f4] flex items-center justify-center hover:bg-[#ffc229] hover:text-[#15103d] transition-colors"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <ul className="flex flex-col gap-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors hover:bg-[#ffc229] active:bg-[#ffc229] focus:bg-[#ffc229] ${
                    isActive ? 'bg-[#ECE8FE]' : ''
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#ffc229]" />
                    )}
                    <span
                      className={`w-9 h-9 rounded-lg flex items-center justify-center text-base transition-colors group-hover:bg-[#15103d] group-hover:text-[#ffc229] group-active:bg-[#15103d] group-active:text-[#ffc229] ${
                        isActive ? 'bg-[#5737f4] text-white' : 'bg-[#ECE8FE] text-[#5737f4]'
                      }`}
                    >
                      <i className={`bi ${item.icon}`}></i>
                    </span>
                    <span
                      className={`text-base font-semibold transition-all duration-200 group-hover:text-[#15103d] group-hover:translate-x-1 group-active:text-[#15103d] ${
                        isActive ? 'text-[#5737f4]' : 'text-[#15103d]/70'
                      }`}
                    >
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mt-auto bg-[#ffc229] rounded-2xl p-4 text-[#15103d]">
          <div className="flex items-center gap-2 mb-1">
            <i className="bi bi-stars"></i>
            <p className="font-semibold">Go Premium</p>
          </div>
          <p className="text-xs text-[#15103d]/70 mb-3">
            Unlimited opinions, saved reports, and sarcasm filtering.
          </p>
          <Link
            to="/pricing"
            onClick={onClose}
            className="block text-center bg-[#15103d] text-white rounded-lg py-2 text-sm font-medium hover:bg-[#5737f4] transition-colors"
          >
            See plans
          </Link>
        </div>
      </aside>
    </>
  )
}