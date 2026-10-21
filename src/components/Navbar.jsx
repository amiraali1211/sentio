import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import LogoMark from './LogoMark'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
  { path: '/analyses', label: 'Analyses', icon: 'bi-graph-up-arrow' },
  { path: '/reports', label: 'Reports', icon: 'bi-file-earmark-bar-graph' },
  { path: '/sources', label: 'Sources', icon: 'bi-diagram-3' },
  { path: '/settings', label: 'Settings', icon: 'bi-gear' },
  { path: '/pricing', label: 'Pricing', icon: 'bi-tag' },
]

const GRADIENT =
  'linear-gradient(90deg, #3d26bd 0%, #5737f4 30%, #9b4fe8 58%, #ff6b93 85%, #ffc229 100%)'

const linkStyle = ({ isActive }) => ({ textDecoration: 'none', color: isActive ? '#ffffff' : 'rgba(21,16,61,0.7)' })
const ctaStyle = ({ isActive }) => ({ textDecoration: 'none', color: isActive ? '#ffffff' : '#15103d' })

const base = 'inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors'

const linkClass = ({ isActive }) =>
  `${base} ${isActive ? 'bg-[#5737f4] text-white font-semibold shadow-[0_4px_12px_-4px_rgba(87,55,244,0.6)]' : 'text-[#15103d]/70 hover:bg-[#ECE8FE]/70 hover:text-[#15103d]'}`
const ctaClass = ({ isActive }) =>
  `${base} font-semibold ${isActive ? 'bg-[#5737f4] text-white shadow-[0_4px_12px_-4px_rgba(87,55,244,0.6)]' : 'bg-[#ffc229] text-[#15103d] hover:bg-[#ffb300]'}`

export default function Navbar({ onMenuClick }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token'))
  const navigate = useNavigate()

  useEffect(() => {
    const syncAuth = () => setIsLoggedIn(!!localStorage.getItem('token'))
    window.addEventListener('storage', syncAuth)
    window.addEventListener('authchange', syncAuth)
    return () => {
      window.removeEventListener('storage', syncAuth)
      window.removeEventListener('authchange', syncAuth)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('accountType')
    window.dispatchEvent(new Event('authchange'))
    navigate('/login')
  }

  return (
    <nav
      className="sticky top-0 h-16 flex items-center justify-between px-4 md:px-6 shadow-[0_8px_24px_-12px_rgba(61,38,189,0.6)]"
      style={{ zIndex: 997, background: GRADIENT }}
    >
      <NavLink to="/" className="sentio-logo-link inline-flex items-center gap-2.5" style={{ textDecoration: 'none', color: '#ffffff' }}>
        <LogoMark className="block h-11 w-auto" />
        <span className="font-display text-[26px] font-semibold leading-none text-white">
          Sentio<span className="text-[#ffc229]">.</span>
        </span>
      </NavLink>

      <ul
        className="desktop-nav flex items-center gap-1 list-none rounded-full bg-white shadow-[0_6px_18px_-8px_rgba(21,16,61,0.55)]"
        style={{ margin: 0, padding: 6 }}
      >
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink to={item.path} className={linkClass} style={linkStyle}>
              <i className={`bi ${item.icon}`}></i>
              {item.label}
            </NavLink>
          </li>
        ))}

        <li className="mx-1.5 h-6 w-px bg-[#15103d]/10" aria-hidden="true" />

        {isLoggedIn ? (
          <>
            <li>
              <NavLink to="/profile" className={linkClass} style={linkStyle}>
                <i className="bi bi-person-circle"></i>
                My Profile
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className={`${base} text-[#15103d]/70 hover:bg-[#ECE8FE]/70 hover:text-[#15103d] cursor-pointer`} style={{ borderRadius: 999, color: 'rgba(21,16,61,0.7)', textDecoration: 'none' }}>
                <i className="bi bi-box-arrow-right"></i>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login" className={linkClass} style={linkStyle}>
                <i className="bi bi-box-arrow-in-right"></i>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className={ctaClass} style={ctaStyle}>
                <i className="bi bi-person-plus"></i>
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>

      <button
        type="button"
        className="hamburger flex-col gap-[5px] p-2 cursor-pointer bg-transparent border-0"
        style={{ display: 'none' }}
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <span className="block h-[3px] w-[22px] rounded bg-white" />
        <span className="block h-[3px] w-[22px] rounded bg-white" />
        <span className="block h-[3px] w-[22px] rounded bg-[#ffc229]" />
      </button>
    </nav>
  )
}