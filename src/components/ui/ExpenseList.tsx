// components/ExpenseList.js
import { useState, useEffect } from 'react';
// import Link from 'next/link';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,  
  TableFooter,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"


export default function ExpenseList( {onEditExpense} ) {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalexp, setTotalExp] = useState(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        // const res = await fetch('/api/expenses');
        // console.log("res", res)

        const res = await fetch('/api/expenses');
            console.log("Response Status:", res.status);
            const contentType = res.headers.get("content-type");
            
            if (!contentType || !contentType.includes("application/json")) {
                const text = await res.text(); // Obtener texto para debug
                throw new Error(`Respuesta no es JSON: ${text}`);
            }
        
        const data = await res.json();
        console.log("Data:", data)
        
        if (!data.success) {
          throw new Error(data.message || 'Error al obtener los gastos');
        }
        
        setExpenses(data.data);
        setTotalExp(data.total);

      } catch (error) {
        setError(error.message);
        console.log("Fetch error:", error.message)
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchExpenses();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const deleteExpense = async (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar este gasto?')) {
      try {
        const res = await fetch(`/api/expenses/${id}`, {
          method: 'DELETE',
          headers: {
            // Si tienes un sistema de autenticación, añade el token aquí
            // 'Authorization': `Bearer ${token}`,
            'user-id': "default-user-123" // Reemplazar con el ID real del usuario
          }
        });
        const data = await res.json();
        
        if (!data.success) {
          throw new Error(data.message || 'Error al eliminar el gasto');
        }
        
        // Actualizar la lista de gastos
        setExpenses(expenses.filter(expense => expense._id !== id));
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (isLoading) return <div className="text-center mt-10">Loading Expenses...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <>
      <Table className="my-8 rounded-lg">
        {/* <Table className="my-8 bg-emerald-300 rounded-lg"> */}
          <TableHeader>
            <TableRow>
              {/* <TableHead className="w-[100px]">Invoice</TableHead> */}
              <TableHead>Amount</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Account</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Date</TableHead>
              <TableHead className="text-right"></TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.invoice}>
                {/* <TableCell className="font-medium">{invoice.invoice}</TableCell> */}
                <TableCell className="text-right">RD$ {expense.totalAmount}</TableCell>
                <TableCell>{expense.title}</TableCell>
                <TableCell>{expense.paymentMethod}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell className="text-right">{expense.date.split("T")[0]}</TableCell>
                <TableCell className="text-right"><Button variant="outline" onClick={() => onEditExpense(expense)}>Edit</Button></TableCell>
                <TableCell className="text-right"><Button variant="outline" onClick={() => deleteExpense(expense._id)}>Delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="text-right">${totalexp}</TableCell>
              {/* <TableCell className="text-right">$2,500.00</TableCell> */}
              <TableCell colSpan={6}>Total</TableCell>
            </TableRow>
          </TableFooter>
            <TableCaption>A list of your recent invoices.</TableCaption>
        </Table>

    </>
  );
}