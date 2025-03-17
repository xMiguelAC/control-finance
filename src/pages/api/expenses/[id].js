// pages/api/expenses/[id].js
import connectToDatabase from '../../../lib/mongodb';
import Expense from '../../../models/Expense';

export default async function handler(req, res) {
  const { id } = req.query;
  
  await connectToDatabase();
  
  // Método para obtener un gasto específico
  if (req.method === 'GET') {
    try {
      const expense = await Expense.findById(id);
      if (!expense) {
        return res.status(404).json({ success: false, message: 'Gasto no encontrado' });
      }
      return res.status(200).json({ success: true, data: expense });
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
      
      const expense = await Expense.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
      });
      
      if (!expense) {
        return res.status(404).json({ success: false, message: 'Gasto no encontrado' });
      }
      
      return res.status(200).json({ success: true, data: expense });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
  
  // Método para eliminar un gasto
  if (req.method === 'DELETE') {
    try {
      const deletedExpense = await Expense.findByIdAndDelete(id);
      
      if (!deletedExpense) {
        return res.status(404).json({ success: false, message: 'Gasto no encontrado' });
      }
      
      return res.status(200).json({ success: true, data: {} });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
  
  return res.status(405).json({ success: false, message: 'Método no permitido' });
}