// pages/api/expenses/index.js
import connectToDatabase from '../../../lib/mongodb';
import Expense from '../../../models/Expense';

export default async function handler(req, res) {
  await connectToDatabase();
  
  // Método para obtener todos los gastos
  if (req.method === 'GET') {
    try {
      // Asume que tienes un sistema de autenticación y puedes obtener el userId
      // const userId = req.headers['user-id'] || 'default-user';
      const total = await Expense.aggregate([
        { $group: { _id: null, total: { $sum: "$totalAmount" } } }
      ]);


      // obtener el último gasto
      const lastExpense = await Expense.findOne({}, 'invoice')
        .sort({ invoice: -1 }) // Ordena en orden descendente
        .lean();

      
      
      const expenses = await Expense.find().sort({ date: -1 });
      // const expenses = await Expense.find({ userId }).sort({ date: -1 });
      return res.status(200).json({ success: true, data: expenses, total: total[0]?.total || 0, lastInvoice: lastExpense?.invoice || 'EXP000' });

      

      
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
  
  // Método para crear un nuevo gasto
  if (req.method === 'POST') {
    try {
      // Asume que tienes un sistema de autenticación y puedes obtener el userId
      const userId = req.headers['user-id'] || 'default-user';
      
      const expense = req.body;
      // Convertir totalAmount a número si es string
      if (typeof expense.totalAmount === 'string') {
        expense.totalAmount = parseFloat(expense.totalAmount);
      }
      
      // Añadir el userId al gasto
      expense.userId = userId;
      
      const newExpense = await Expense.create(expense);
      return res.status(201).json({ success: true, data: newExpense });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
  
  return res.status(405).json({ success: false, message: 'Método no permitido' });
}