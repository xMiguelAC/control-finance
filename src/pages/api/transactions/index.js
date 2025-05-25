import connectToDatabase from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { db } = await connectToDatabase();

    const monthlyExpenses = await db.collection('Expenses').aggregate([
      {
        $project: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          totalAmount: 1
        }
      },
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          total: { $sum: "$totalAmount" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          total: { $round: ["$total", 2] },
          count: 1
        }
      }
    ]).toArray();

    // Agregar incomes mensuales
    const monthlyIncomes = await db.collection('incomes').aggregate([
      {
        $project: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          totalAmount: 1
        }
      },
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          total: { $sum: "$totalAmount" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          total: { $round: ["$total", 2] },
          count: 1
        }
      }
    ]).toArray();

    return res.status(200).json({
      success: true,
      expenses: monthlyExpenses,
      incomes: monthlyIncomes
    });

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Error al cargar los datos';
    return res.status(500).json({ 
      success: false,
      message: 'Error fetching monthly expenses: ' + err.message,
      error: errorMessage
    });
  }
}
