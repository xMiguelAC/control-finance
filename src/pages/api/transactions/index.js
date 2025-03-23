// import connectToDatabase from '../../../lib/mongodb';

// export default async function handler(req, res) {
//   if (req.method !== "GET") {
//     return res.status(405).json({ success: false, message: "Método no permitido" });
//   }

//   try {
//     const { db } = await connectToDatabase();

//     // Obtener todos los ingresos y gastos
//     const transactions = await db.collection("transactions").find({}).toArray();

//     res.status(200).json({
//       success: true,
//       transactions,
//     });
//   } catch (error) {
//     console.error("Error al obtener transacciones:", error);
//     res.status(500).json({ success: false, message: "Error en el servidor" });
//   }
// }

import connectToDatabase from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Método no permitido" });
  }

  try {
    const { db } = await connectToDatabase();

    // Obtener ingresos y gastos de la base de datos
    const incomes = await db.collection("incomes").find({}).toArray();
    const expenses = await db.collection("expenses").find({}).toArray();

    // Función para agrupar por mes
    const groupByMonth = (transactions, type) => {
      return transactions.reduce((acc, item) => {
        const monthName = new Date(item.date).toLocaleString("es-ES", { month: "long" });

        if (!acc[monthName]) {
          acc[monthName] = { month: monthName, income: 0, expense: 0 };
        }

        acc[monthName][type] += item.amount;
        return acc;
      }, {});
    };

    // Agrupar ingresos y gastos por mes
    const incomeData = groupByMonth(incomes, "income");
    const expenseData = groupByMonth(expenses, "expense");

    // Fusionar datos de ingresos y gastos
    const monthsOrdered = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    const mergedData = monthsOrdered.map(month => ({
      month,
      income: incomeData[month]?.income || 0,
      expense: expenseData[month]?.expense || 0
    }));

    res.status(200).json({ success: true, transactions: mergedData });

  } catch (error) {
    console.error("Error al obtener transacciones:", error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
}

