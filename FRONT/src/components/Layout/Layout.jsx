import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import './Layout.css'

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="layout">
      <Sidebar isOpen={sidebarOpen} />
      <div className={`layout-main ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Header toggleSidebar={toggleSidebar} />
        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout

