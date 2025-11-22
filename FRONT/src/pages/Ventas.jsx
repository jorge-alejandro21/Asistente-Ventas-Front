import { useState, useEffect } from 'react'
import DataTable from '../components/DataTable/DataTable'
import { ventasAPI } from '../services/api'
import './Ventas.css'

function Ventas() {
  const [ventas, setVentas] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchVentas()
  }, [])

  const fetchVentas = async () => {
    setLoading(true)
    try {
      const response = await ventasAPI.getAll()
      // Transformar datos para la tabla
      const ventasFormateadas = response.data.map(venta => ({
        _id: venta._id,
        id: venta._id,
        cliente: venta.cliente?.nombre || 'Cliente eliminado',
        producto: venta.productos[0]?.producto?.nombre || 'Producto eliminado',
        cantidad: venta.productos.reduce((sum, p) => sum + p.cantidad, 0),
        monto: venta.montoTotal,
        fecha: venta.createdAt,
        estado: venta.estado
      }))
      setVentas(ventasFormateadas)
    } catch (error) {
      console.error('Error al cargar ventas:', error)
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    { 
      key: 'id', 
      label: 'ID',
      format: (value) => value?.substring(0, 8) || 'N/A'
    },
    { key: 'cliente', label: 'Cliente' },
    { key: 'producto', label: 'Producto' },
    { key: 'cantidad', label: 'Cantidad' },
    { 
      key: 'monto', 
      label: 'Monto', 
      format: (value) => `$${value.toLocaleString()}` 
    },
    { 
      key: 'fecha', 
      label: 'Fecha', 
      format: (value) => new Date(value).toLocaleDateString('es-ES') 
    },
    { 
      key: 'estado', 
      label: 'Estado', 
      format: (value) => (
        <span className={`status-badge ${value === 'completada' ? 'completed' : 'pending'}`}>
          {value === 'completada' ? 'Completada' : 'Pendiente'}
        </span>
      )
    }
  ]

  return (
    <div className="ventas">
      <div className="ventas-header">
        <div>
          <h2>Ventas</h2>
          <p className="page-subtitle">Historial de todas las ventas realizadas</p>
        </div>
      </div>

      <div className="ventas-content">
        {loading ? (
          <p>Cargando ventas...</p>
        ) : (
          <DataTable data={ventas} columns={columns} />
        )}
      </div>
    </div>
  )
}

export default Ventas

