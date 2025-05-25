'use client'
import React, { useEffect, useState } from 'react'
import Cardmonth from './cardmonth'

const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

interface MonthlyData {
  year: number;
  month: number;
  total: number;
  count: number;
}

function Monthlycard() {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const response = await fetch('/api/transactions');
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.message || 'Error al obtener los datos');
        }

        setMonthlyData(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyData();
  }, []);

  // Crear un array con todos los meses del año actual
  const currentYear = new Date().getFullYear();
  const allMonths = Array.from({ length: 12 }, (_, index) => ({
    month: monthNames[index],
    income: "0",
    expense: "0"
  }));

  // Actualizar los datos con la información de la API
  monthlyData.forEach(data => {
    if (data.year === currentYear) {
      allMonths[data.month - 1].expense = data.total.toString();
    }
  });

  if (loading) {
    return <div className="text-center">Cargando datos mensuales...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-8 my-8 w-full">
      {allMonths.map(({ month, income, expense }) => (
        <Cardmonth 
          key={month} 
          month={month} 
          income={income} 
          expense={expense} 
        />
      ))}
    </div>
  )
}

export default Monthlycard