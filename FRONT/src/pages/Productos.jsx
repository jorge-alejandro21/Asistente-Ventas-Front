import { useState, useEffect } from 'react'
import DataTable from '../components/DataTable/DataTable'
import Button from '../components/Button/Button'
import Modal from '../components/Modal/Modal'
import ProductForm from '../components/ProductForm/ProductForm'
import { productosAPI } from '../services/api'
import './Productos.css'

function Productos() {
  const [productos, setProductos] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProductos()
  }, [])

  const fetchProductos = async () => {
    setLoading(true)
    try {
      const response = await productosAPI.getAll()
      setProductos(response.data)
    } catch (error) {
      console.error('Error al cargar productos:', error)
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'precio', label: 'Precio', format: (value) => `$${value.toLocaleString()}` },
    { key: 'stock', label: 'Stock' },
    { 
      key: 'activo', 
      label: 'Estado', 
      format: (value) => (
        <span className={`status-badge ${value ? 'active' : 'inactive'}`}>
          {value ? 'Activo' : 'Inactivo'}
        </span>
      )
    },
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

  const handleEdit = (product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await productosAPI.delete(id)
        fetchProductos()
      } catch (error) {
        console.error('Error al eliminar producto:', error)
        alert('Error al eliminar el producto')
      }
    }
  }

  const handleAdd = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
  }

  const handleSubmit = async (formData) => {
    try {
      if (editingProduct) {
        await productosAPI.update(editingProduct._id, formData)
      } else {
        await productosAPI.create(formData)
      }
      fetchProductos()
      handleCloseModal()
    } catch (error) {
      console.error('Error al guardar producto:', error)
      alert('Error al guardar el producto')
    }
  }

  return (
    <div className="productos">
      <div className="productos-header">
        <div>
          <h2>Productos</h2>
          <p className="page-subtitle">Gestiona tu catálogo de productos</p>
        </div>
        <Button onClick={handleAdd} variant="primary">
          + Nuevo Producto
        </Button>
      </div>

      <div className="productos-content">
        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          <DataTable data={productos} columns={columns} />
        )}
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal} title={editingProduct ? 'Editar Producto' : 'Nuevo Producto'}>
          <ProductForm 
            product={editingProduct} 
            onSubmit={handleSubmit}
            onCancel={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  )
}

export default Productos

