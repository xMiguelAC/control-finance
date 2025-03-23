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


export default function IncomeList( {onEditIncome} ) {
  const [incomes, setIncomes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalexp, setTotalExp] = useState(0);
  const [EditingId, setEditingId] = useState(0);

  // const [dataforParent, setdataforParent] = useState();

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const res = await fetch('/api/incomes');
        // console.log(res)
        const data = await res.json();
        console.log(data)
        
        if (!data.success) {
          throw new Error(data.message || 'Error al obtener los gastos');
        }
        
        setIncomes(data.data);
        setTotalExp(data.total);

      } catch (error) {
        setError(error.message);
        console.log(error.message)
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchIncomes();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const deleteIncome = async (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar este ingreso?')) {
      try {
        const res = await fetch(`/api/incomes/${id}`, {
          method: 'DELETE',
          headers: {
            // Si tienes un sistema de autenticación, añade el token aquí
            // 'Authorization': `Bearer ${token}`,
            'user-id': "default-user-123" // Reemplazar con el ID real del usuario
          }
        });
        const data = await res.json();
        
        if (!data.success) {
          throw new Error(data.message || 'Error al eliminar el ingreso');
        }
        
        // Actualizar la lista de gastos
        setIncomes(incomes.filter(income => income._id !== id));
      } catch (error) {
        setError(error.message);
      }
    }
  };


  const editIncome = async (id, updatedData) => {
    try {
      const res = await fetch(`/api/incomes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'user-id': "default-user-123"
        },
        body: JSON.stringify(updatedData) // Enviar los datos actualizados
      });
  
      const data = await res.json();
  
      if (!data.success) {
        throw new Error(data.message || 'Error al actualizar el ingreso');
      }
  
      // Actualizar la lista de ingresos en el estado
      setIncomes(incomes.map(income => income._id === id ? data.data : income));
    } catch (error) {
      setError(error.message);
    }
  };

  const dataFromSon = async (id) => {
    try {
      // Obtener los datos actuales
      const res = await fetch(`/api/incomes/${id}`);
      const data = await res.json();
  
      if (!data.success) {
        throw new Error('Error al obtener los datos del ingreso');
      }
      console.log(data.data)
      setforParent(data.data)

      const datos = {
        invoice: '',
        category: '',
        totalAmount: '',
        paymentMethod: '',
        title: '',
        date: new Date().toISOString().split('T')[0]
      };

      return datos;
  
      // Mostrar los datos en un formulario/modal
      // setFormDataI(data.data);
      // setEditingId(id); // Guardar el ID para saber cuál se está editando
      // setShowModal(true); // Mostrar modal de edición
    } catch (error) {
      console.error(error);
    }
  };



  const dataForParents = async (id) => {
    try {
      // Obtener los datos actuales
      const res = await fetch(`/api/incomes/${id}`);
      const data = await res.json();
  
      if (!data.success) {
        throw new Error('Error al obtener los datos del ingreso');
      }
  
      // Mostrar los datos en un formulario/modal
      console.log(id); // Guardar el ID para saber cuál se está editando
      console.log(data.data)
      // setdataforParent(data.data)
      return dataforParent;
      
    } catch (error) {
      console.error(error);
    }
  }
  


  if (isLoading) return <div className="text-center mt-10">Loading Incomes...</div>;
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
            {incomes.map((income) => (
              <TableRow key={income.invoice}>
                {/* <TableCell className="font-medium">{invoice.invoice}</TableCell> */}
                <TableCell className="text-right">RD$ {income.totalAmount}</TableCell>
                <TableCell>{income.title}</TableCell>
                <TableCell>{income.paymentMethod}</TableCell>
                <TableCell>{income.category}</TableCell>
                <TableCell className="text-right">{income.date.split("T")[0]}</TableCell>
                <TableCell className="text-right"><Button variant="outline" onClick={() => onEditIncome(income)}>Edit</Button></TableCell>
                <TableCell className="text-right"><Button variant="outline" onClick={() => deleteIncome(income._id)}>Delete</Button></TableCell>
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