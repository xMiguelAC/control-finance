// import { useState, useEffect } from 'react'
// import Cardmonth from './cardmonth'

// const months = [
//     {
//         month: "Enero",
//         income: "100",
//         expense: "200",
//     },
//     {
//         month: "Febrero",
//         income: "300",
//         expense: "400",
//     },
//     {
//         month: "Marzo",
//         income: "500",
//         expense: "600",
//     },
//     { month: "April", income: 4800, expense: 3100 },
//     { month: "May", income: 5300, expense: 2900 },
//     { month: "June", income: 6000, expense: 3200 },
//     { month: "July", income: 5500, expense: 3000 },
//     { month: "August", income: 5800, expense: 3100 },
//     { month: "September", income: 6100, expense: 3300 },
//     { month: "October", income: 5900, expense: 2900 },
//     { month: "November", income: 6200, expense: 3400 },
//     { month: "December", income: 7000, expense: 3800 },
// ]

// function Monthlycard() {

//   return (
//     <div className="grid grid-cols-4 gap-8 my-8 w-full">

//         {months.map(({ month, income, expense }) => (
//         <Cardmonth 
//           key={month} 
//           month={month} 
//           income={income} 
//           expense={expense} 
//         />
//       ))}
        
//     </div>
//   )
// }

// export default Monthlycard
"use client";
import { useState, useEffect } from "react";
import Cardmonth from "./cardmonth";

function Monthlycard() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/transactions"); // Endpoint que devuelve ingresos y gastos
        if (!res.ok) throw new Error("Error al obtener los datos");

        const data = await res.json();
        if (!data.success) throw new Error(data.message || "Error en la consulta");

        // Agrupar ingresos y gastos por mes
        const groupedData = data.transactions.reduce((acc, item) => {
          const monthName = new Date(item.date).toLocaleString("es-ES", { month: "long" });

          if (!acc[monthName]) {
            acc[monthName] = { month: monthName, income: 0, expense: 0 };
          }

          if (item.type === "income") {
            acc[monthName].income += item.amount;
          } else if (item.type === "expense") {
            acc[monthName].expense += item.amount;
          }

          return acc;
        }, {});

        // Convertir el objeto en array ordenado por mes
        const monthsOrdered = [
          "enero", "febrero", "marzo", "abril", "mayo", "junio",
          "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ];
        
        const sortedData = monthsOrdered.map(month => groupedData[month] || { month, income: 0, expense: 0 });

        setMonthlyData(sortedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-4 gap-8 my-8 w-full">
      {monthlyData.map(({ month, income, expense }) => (
        <Cardmonth key={month} month={month} income={income} expense={expense} />
      ))}
    </div>
  );
}

export default Monthlycard;
