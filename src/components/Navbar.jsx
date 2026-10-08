import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
  { path: '/analyses', label: 'Analyses', icon: 'bi-graph-up-arrow' },
  { path: '/reports', label: 'Reports', icon: 'bi-file-earmark-bar-graph' },
  { path: '/sources', label: 'Sources', icon: 'bi-diagram-3' },
  { path: '/settings', label: 'Settings', icon: 'bi-gear' },
  { path: '/pricing', label: 'Pricing', icon: 'bi-tag' },
]

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

  const linkClass = ({ isActive }) => `nav-item-link${isActive ? ' active' : ''}`

  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: 'linear-gradient(90deg, #5737f4, #ffc229)',
      padding: '14px 24px', position: 'sticky', top: 0,
      zIndex: 997, boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
    }}>
      <NavLink to="/" style={{ fontSize: '26px', fontWeight: 500, color: 'white', textDecoration: 'none' }}>
        Sentio<span style={{ color: 'rgba(255,255,255,0.4)' }}>.</span>
      </NavLink>

      <ul className="desktop-nav" style={{ display: 'flex', gap: '28px', listStyle: 'none', margin: 0, alignItems: 'center' }}>
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink to={item.path} className={linkClass}>
              <i className={`bi ${item.icon}`}></i>
              {item.label}
            </NavLink>
          </li>
        ))}

        {isLoggedIn ? (
          <>
            <li>
              <NavLink to="/profile" className={linkClass}>
                <i className="bi bi-person-circle"></i>
                My Profile
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="nav-item-link" style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 0, paddingBottom: '5px'
              }}>
                <i className="bi bi-box-arrow-right"></i>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login" className={linkClass}>
                <i className="bi bi-box-arrow-in-right"></i>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className={linkClass}>
                <i className="bi bi-person-plus"></i>
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>

      <div className="hamburger" onClick={onMenuClick}
        style={{ cursor: 'pointer', display: 'none', flexDirection: 'column', gap: '5px' }}>
        <span style={{ display: 'block', width: '22px', height: '3px', background: 'white', borderRadius: '3px' }} />
        <span style={{ display: 'block', width: '22px', height: '3px', background: 'white', borderRadius: '3px' }} />
        <span style={{ display: 'block', width: '22px', height: '3px', background: 'white', borderRadius: '3px' }} />
      </div>
    </nav>
  )
}