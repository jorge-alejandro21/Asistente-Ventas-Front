import { useState, useEffect } from 'react'
import DataTable from '../components/DataTable/DataTable'
import Button from '../components/Button/Button'
import Modal from '../components/Modal/Modal'
import ClientForm from '../components/ClientForm/ClientForm'
import { clientesAPI } from '../services/api'
import './Clientes.css'

function Clientes() {
  const [clientes, setClientes] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchClientes()
  }, [])

  const fetchClientes = async () => {
    setLoading(true)
    try {
      const response = await clientesAPI.getAll()
      setClientes(response.data)
    } catch (error) {
      console.error('Error al cargar clientes:', error)
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'cedula', label: 'Cédula' },
    { key: 'telefono', label: 'Teléfono' },
    { key: 'email', label: 'Email' },
    { key: 'totalCompras', label: 'Total Compras' },
    {
      key: 'actions',
      label: 'Acciones',
      format: (_, row) => (
        <div className="table-actions">
          <button onClick={() => handleEdit(row)} className="btn-edit">✏️</button>
          <button onClick={() => handleDelete(row._id)} className="btn-delete">🗑️</button>
        </div>
      )
    }
  ]

  const handleEdit = (client) => {
    setEditingClient(client)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este cliente?')) {
      try {
        await clientesAPI.delete(id)
        fetchClientes()
      } catch (error) {
        console.error('Error al eliminar cliente:', error)
        alert('Error al eliminar el cliente')
      }
    }
  }

  const handleAdd = () => {
    setEditingClient(null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingClient(null)
  }

  const handleSubmit = async (formData) => {
    try {
      if (editingClient) {
        await clientesAPI.update(editingClient._id, formData)
      } else {
        await clientesAPI.create(formData)
      }
      fetchClientes()
      handleCloseModal()
    } catch (error) {
      console.error('Error al guardar cliente:', error)
      alert('Error al guardar el cliente')
    }
  }

  return (
    <div className="clientes">
      <div className="clientes-header">
        <div>
          <h2>Clientes</h2>
          <p className="page-subtitle">Gestiona tu base de clientes</p>
        </div>
        <Button onClick={handleAdd} variant="primary">
          + Nuevo Cliente
        </Button>
      </div>

      <div className="clientes-content">
        {loading ? (
          <p>Cargando clientes...</p>
        ) : (
          <DataTable data={clientes} columns={columns} />
        )}
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal} title={editingClient ? 'Editar Cliente' : 'Nuevo Cliente'}>
          <ClientForm 
            client={editingClient} 
            onSubmit={handleSubmit}
            onCancel={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  )
}

export default Clientes

