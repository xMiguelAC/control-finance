// pages/api/expenses/index.js
import connectToDatabase from '../../../lib/mongodb';
import Income from '../../../models/Income';

export default async function handler(req, res) {
  await connectToDatabase();
  
  // Método para obtener todos los gastos
  if (req.method === 'GET') {
    try {
      // Asume que tienes un sistema de autenticación y puedes obtener el userId
      // const userId = req.headers['user-id'] || 'default-user';
      const total = await Income.aggregate([
        { $group: { _id: null, total: { $sum: "$totalAmount" } } }
      ]);

      const lastIncome = await Income.findOne({}, 'invoice')
              .sort({ invoice: -1 }) // Ordena en orden descendente
              .lean();
      
      const incomes = await Income.find().sort({ date: -1 });
      // const expenses = await Expense.find({ userId }).sort({ date: -1 });
      return res.status(200).json({ success: true, data: incomes, total: total[0]?.total || 0, lastInvoice: lastIncome?.invoice || 'INC000'  });

      
      
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
  
  // Método para crear un nuevo gasto
  if (req.method === 'POST') {
    try {
      // Asume que tienes un sistema de autenticación y puedes obtener el userId
      const userId = req.headers['user-id'] || 'default-user';
      
      const incomes = req.body;
      // Convertir totalAmount a número si es string
      if (typeof incomes.totalAmount === 'string') {
        incomes.totalAmount = parseFloat(incomes.totalAmount);
      }
      
      // Añadir el userId al gasto
      incomes.userId = userId;
      
      const newincomes = await Income.create(incomes);
      return res.status(201).json({ success: true, data: newincomes });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
  
  return res.status(405).json({ success: false, message: 'Método no permitido' });
}