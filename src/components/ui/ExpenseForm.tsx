// components/ExpenseForm.js
import { useState } from 'react';

export default function ExpenseForm() {
  const [formData, setFormData] = useState({
    invoice: '',
    category: '',
    totalAmount: '',
    paymentMethod: '',
    title: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Si tienes un sistema de autenticación, añade el token aquí
          // 'Authorization': `Bearer ${token}`,
          'user-id': 'ID-DEL-USUARIO' // Reemplazar con el ID real del usuario
        },
        body: JSON.stringify({
          ...formData,
          date: new Date(formData.date)
        })
      });

      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Error al guardar el gasto');
      }

      // Restablecer el formulario
      setFormData({
        invoice: '',
        category: '',
        totalAmount: '',
        paymentMethod: '',
        title: '',
        date: new Date().toISOString().split('T')[0]
      });

      // Redireccionar o mostrar mensaje de éxito
      alert('Gasto guardado correctamente');
      // Opcional: redireccionar a la lista de gastos
      // router.push('/expenses');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Gasto</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="invoice">
            Número de Factura
          </label>
          <input
            id="invoice"
            name="invoice"
            type="text"
            value={formData.invoice}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="category">
            Categoría
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Seleccionar categoría</option>
            <option value="alimentacion">Alimentación</option>
            <option value="transporte">Transporte</option>
            <option value="farmacia">Farmacia</option>
            <option value="entretenimiento">Entretenimiento</option>
            <option value="vivienda">Vivienda</option>
            <option value="otros">Otros</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="title">
            Descripción
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="totalAmount">
            Monto Total
          </label>
          <input
            id="totalAmount"
            name="totalAmount"
            type="number"
            step="0.01"
            value={formData.totalAmount}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="paymentMethod">
            Método de Pago
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Seleccionar método</option>
            <option value="efectivo">Efectivo</option>
            <option value="debito">Tarjeta de Débito</option>
            <option value="credito">Tarjeta de Crédito</option>
            <option value="transferencia">Transferencia</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="date">
            Fecha
          </label>
          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isSubmitting ? 'Guardando...' : 'Guardar Gasto'}
        </button>
      </form>
    </div>
  );
}