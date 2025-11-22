import { useState, useEffect } from 'react'
import { dashboardAPI } from '../../services/api'
import './RecentSales.css'

function RecentSales() {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await dashboardAPI.getRecentSales(5)
        setSales(response.data)
      } catch (error) {
        console.error('Error al cargar ventas recientes:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSales()
  }, [])

  if (loading) {
    return (
      <div className="recent-sales-empty">
        <div className="loading-spinner-small"></div>
        <p>Cargando ventas...</p>
      </div>
    )
  }

  if (sales.length === 0) {
    return (
      <div className="recent-sales-empty">
        <div className="empty-icon">📊</div>
        <p>No hay ventas recientes</p>
        <span className="empty-subtitle">Las ventas aparecerán aquí cuando se realicen</span>
      </div>
    )
  }

  return (
    <div className="recent-sales">
      <table className="recent-sales-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Producto</th>
            <th>Monto</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.cliente}</td>
              <td>{sale.producto}</td>
              <td className="amount">${sale.monto.toLocaleString()}</td>
              <td>{new Date(sale.fecha).toLocaleDateString('es-ES')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecentSales

