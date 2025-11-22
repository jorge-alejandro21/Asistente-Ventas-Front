import './Header.css'

function Header({ toggleSidebar }) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="header-menu-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <h1 className="header-title">Dashboard</h1>
      </div>
      <div className="header-right">
        <div className="header-user">
          <span className="header-user-icon">👤</span>
          <span className="header-user-name">Admin</span>
        </div>
      </div>
    </header>
  )
}

export default Header

