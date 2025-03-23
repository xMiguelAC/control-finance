// pages/api/expenses/[id].js
import connectToDatabase from '../../../lib/mongodb';
import Income from '../../../models/Income';

export default async function handler(req, res) {
  const { id } = req.query;
  
  await connectToDatabase();
  
  // Método para obtener un gasto específico
  if (req.method === 'GET') {
    try {
      const income = await Income.findById(id);
      if (!income) {
        return res.status(404).json({ success: false, message: 'Ingreso no encontrado' });
      }
      return res.status(200).json({ success: true, data: income });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
  
  // Método para actualizar un gasto
  if (req.method === 'PUT') {
    try {
      // Convertir totalAmount a número si es string
      if (req.body.totalAmount && typeof req.body.totalAmount === 'string') {
        req.body.totalAmount = parseFloat(req.body.totalAmount);
      }
      
      const income = await Income.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
      });
      
      if (!income) {
        return res.status(404).json({ success: false, message: 'Ingreso no encontrado' });
      }
      
      return res.status(200).json({ success: true, data: income });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
  
  // Método para eliminar un gasto
  if (req.method === 'DELETE') {
    try {
      const deletedIncome = await Income.findByIdAndDelete(id);
      
      if (!deletedIncome) {
        return res.status(404).json({ success: false, message: 'Ingreso no encontrado' });
      }
      
      return res.status(200).json({ success: true, data: {} });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
  
  return res.status(405).json({ success: false, message: 'Método no permitido' });
}