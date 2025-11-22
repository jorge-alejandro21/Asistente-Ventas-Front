import { useState, useEffect } from 'react'
import Button from '../Button/Button'
import './ClientForm.css'

function ClientForm({ client, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    telefono: '',
    email: ''
  })

  useEffect(() => {
    if (client) {
      setFormData({
        nombre: client.nombre || '',
        cedula: client.cedula || '',
        telefono: client.telefono || '',
        email: client.email || ''
      })
    }
  }, [client])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="client-form">
      <div className="form-group">
        <label htmlFor="nombre">Nombre Completo</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          placeholder="Ej: Juan Pérez"
        />
      </div>

      <div className="form-group">
        <label htmlFor="cedula">Cédula</label>
        <input
          type="text"
          id="cedula"
          name="cedula"
          value={formData.cedula}
          onChange={handleChange}
          placeholder="Ej: 1234567890"
        />
      </div>

      <div className="form-group">
        <label htmlFor="telefono">Teléfono</label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          required
          placeholder="+1234567890"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="cliente@example.com"
        />
      </div>

      <div className="form-actions">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          {client ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  )
}

export default ClientForm

