import { useState, useEffect } from 'react'
import Button from '../Button/Button'
import './ProductForm.css'

function ProductForm({ product, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    stock: '',
    activo: true
  })

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre || '',
        precio: product.precio || '',
        stock: product.stock || '',
        activo: product.activo !== undefined ? product.activo : true
      })
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      precio: Number(formData.precio),
      stock: Number(formData.stock)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label htmlFor="nombre">Nombre del Producto</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          placeholder="Ej: Producto A"
        />
      </div>

      <div className="form-group">
        <label htmlFor="precio">Precio</label>
        <input
          type="number"
          id="precio"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          placeholder="0.00"
        />
      </div>

      <div className="form-group">
        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
          min="0"
          placeholder="0"
        />
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="activo"
            checked={formData.activo}
            onChange={handleChange}
          />
          <span>Producto activo</span>
        </label>
      </div>

      <div className="form-actions">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          {product ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  )
}

export default ProductForm

