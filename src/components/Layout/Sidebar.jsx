import { NavLink } from 'react-router-dom'
import './Sidebar.css'

function Sidebar({ isOpen }) {
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/productos', label: 'Productos', icon: '📦' },
    { path: '/clientes', label: 'Clientes', icon: '👥' },
    { path: '/ventas', label: 'Ventas', icon: '💰' },
  ]

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-logo">🛒 Asistente Ventas</h2>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar

