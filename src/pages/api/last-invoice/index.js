import connectToDatabase from '../../../lib/mongodb';
import Expense from '../../../models/Expense';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const lastExpense = await Expense.findOne({}, 'invoice')
        .sort({ invoice: -1 }) // Ordena en orden descendente
        .lean();

      res.status(200).json({ lastInvoice: lastExpense?.invoice || 'EXP000' });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el último invoice' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
