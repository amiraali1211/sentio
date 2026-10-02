import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const navItems = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/analyses', label: 'Analyses' },
  { path: '/reports', label: 'Reports' },
  { path: '/sources', label: 'Sources' },
  { path: '/settings', label: 'Settings' },
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
    window.dispatchEvent(new Event('authchange'))
    navigate('/login')
  }

  const linkStyle = ({ isActive }) => ({
    color: isActive ? '#F4A261' : 'rgba(255,255,255,0.8)',
    textDecoration: 'none', fontSize: '15px', fontWeight: 500,
    paddingBottom: '4px',
    borderBottom: isActive ? '2px solid #F4A261' : '2px solid transparent',
  })

  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: 'linear-gradient(90deg, #5B3FE3, #14123B)',
      padding: '14px 24px', position: 'sticky', top: 0,
      zIndex: 997, boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
    }}>
      <NavLink to="/" style={{ fontSize: '26px', fontWeight: 500, color: 'white', textDecoration: 'none' }}>
        Sentio<span style={{ color: 'rgba(255,255,255,0.4)' }}>.</span>
      </NavLink>

      <ul className="desktop-nav" style={{ display: 'flex', gap: '32px', listStyle: 'none', margin: 0, alignItems: 'center' }}>
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink to={item.path} style={linkStyle}>{item.label}</NavLink>
          </li>
        ))}

        {isLoggedIn ? (
          <>
            <li><NavLink to="/profile" style={linkStyle}>My Profile</NavLink></li>
            <li>
              <button onClick={handleLogout} style={{
                color: 'rgba(255,255,255,0.8)', fontSize: '15px', fontWeight: 500,
                background: 'none', border: 'none', cursor: 'pointer', padding: '0'
              }}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><NavLink to="/login" style={linkStyle}>Login</NavLink></li>
            <li><NavLink to="/register" style={linkStyle}>Register</NavLink></li>
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