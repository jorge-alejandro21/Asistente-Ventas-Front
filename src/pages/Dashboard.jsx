import { useState, useEffect } from 'react'
import StatCard from '../components/StatCard/StatCard'
import RecentSales from '../components/RecentSales/RecentSales'
import { dashboardAPI } from '../services/api'
import './Dashboard.css'

function Dashboard() {
  const [stats, setStats] = useState({
    totalVentas: 0,
    totalClientes: 0,
    totalProductos: 0,
    ingresosHoy: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardAPI.getStats()
        setStats(response.data)
      } catch (error) {
        console.error('Error al cargar estadísticas:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <div>
            <h2 className="dashboard-title">Bienvenido de vuelta 👋</h2>
            <p className="dashboard-subtitle">Aquí está el resumen de tu canal de ventas hoy</p>
          </div>
          <div className="dashboard-date">
            {new Date().toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </div>

      <div className="dashboard-stats">
        <StatCard
          title="Total Ventas"
          value={stats.totalVentas}
          icon="💰"
          gradient="var(--gradient-primary)"
          trend="+12%"
          description="Este mes"
        />
        <StatCard
          title="Total Clientes"
          value={stats.totalClientes}
          icon="👥"
          gradient="var(--gradient-success)"
          trend="+8%"
          description="Clientes activos"
        />
        <StatCard
          title="Productos Activos"
          value={stats.totalProductos}
          icon="📦"
          gradient="var(--gradient-info)"
          trend="+5%"
          description="En catálogo"
        />
        <StatCard
          title="Ingresos Hoy"
          value={`$${stats.ingresosHoy.toLocaleString()}`}
          icon="💵"
          gradient="var(--gradient-warning)"
          trend="+15%"
          description="Hoy"
        />
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section dashboard-section-large">
          <div className="dashboard-section-header">
            <h3 className="dashboard-section-title">Ventas Recientes</h3>
            <button className="dashboard-section-action">Ver todas</button>
          </div>
          {loading ? (
            <div className="dashboard-loading">
              <div className="loading-spinner"></div>
              <p>Cargando ventas...</p>
            </div>
          ) : (
            <RecentSales />
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

