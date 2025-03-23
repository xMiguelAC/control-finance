/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
 
import * as React from "react"

import { useState, useRef, useCallback } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import ExpenseList from "./ExpenseList";
import IncomeList from "./IncomeList";










function Iandeview() {
  const [dateI, setDateI] = React.useState<Date>()
  const [dateE, setDateE] = React.useState<Date>()

  const [error, setError] = useState('');

  const [refreshKeyI, setRefreshKeyI] = useState(0);
  const [refreshKeyE, setRefreshKeyE] = useState(0);
  


  

  const generateUniqueInvoice = async (typeofinvoice: string) => {

    let final;
    let res;
    let lastInvoiceNumber;
    
    if(typeofinvoice === "expenses") {
    res = await fetch('/api/expenses');
    } else {
      res = await fetch('/api/incomes');
    }

    console.log(res) // Llamamos a la API
    const data = await res.json();
    console.log(data)

    if(typeofinvoice === "expenses") {
      lastInvoiceNumber = data.lastInvoice ? parseInt(data.lastInvoice.replace('EXP', '')) : 0;
      final = `EXP${String(lastInvoiceNumber + 1).padStart(3, '0')}`;
      } else {
        lastInvoiceNumber = data.lastInvoice ? parseInt(data.lastInvoice.replace('INC', '')) : 0;
        final = `INC${String(lastInvoiceNumber + 1).padStart(3, '0')}`;
      }
    
    console.log(lastInvoiceNumber)

    return final; // EXP001, EXP002...
  };

  const handleEditIncome = (income) => {

    setFormDataI({
      id: income._id,
      invoice: income.invoice,
      category: income.category,
      totalAmount: income.totalAmount,
      paymentMethod: income.paymentMethod,
      title: income.title,
      date: income.date
    });
    setDateI(new Date(income.date));
  };

  const handleEditExpense = (expense) => {

    setFormDataE({
      id: expense._id,
      invoice: expense.invoice,
      category: expense.category,
      totalAmount: expense.totalAmount,
      paymentMethod: expense.paymentMethod,
      title: expense.title,
      date: expense.date
    });
    setDateE(new Date(expense.date));
  };

 




  const handleClearI = () => {
    document.getElementById("titleI").value = ""
    document.getElementById("amountI").value = ""
    setFormDataI({
      invoice: '',
      title: '',
      totalAmount: '',
      paymentMethod: '',
      category: '',
      date: ''
    }); 
    setDateI("")  
  }

  const handleClearE = () => {
    document.getElementById("titleE").value = ""
    document.getElementById("amountE").value = ""  
    setFormDataE({
      invoice: '',
      title: '',
      totalAmount: '',
      paymentMethod: '',
      category: '',
      date: ''
    }); 
    setDateE("")   
  }
  

  const handleClear = (iore: string) => {
    console.log("Clear")
    if (iore === "I") {
      handleClearI();
    } else {
      handleClearE();
    }
  }




















// codigo de claude ----------------------------------------------------------------------------------------


const [formDataI, setFormDataI] = useState({
  id: '',
  invoice: '',
  category: '',
  totalAmount: '',
  paymentMethod: '',
  title: '',
  date: new Date().toISOString().split('T')[0]
});

const [formDataE, setFormDataE] = useState({
  id: '',
  invoice: '',
  category: '',
  totalAmount: '',
  paymentMethod: '',
  title: '',
  date: new Date().toISOString().split('T')[0]
});




const handleChangeSelectAI = (val: unknown) => {
  console.log(val)
  const e = { target: { name: "paymentMethod", value: val } };
  console.log(e)
  
  handleChangeI(e);
}

const handleChangeSelectAE = (val: unknown) => {
  console.log(val)
  const e = { target: { name: "paymentMethod", value: val } };
  console.log(e)
  
  handleChangeE(e);
}

const handleChangeSelectCE = (val: unknown) => {
  console.log(val)
  // console.log(val.target.id)
  const e = { target: { name: "category", value: val } };

  handleChangeE(e);
}

const handleChangeSelectCI = (val: unknown) => {
  console.log(val)
  // console.log(val.target.id)
  const e = { target: { name: "category", value: val } };

  handleChangeI(e);
  }


const handleChangeI = (e: { target: any; }) => {
  console.log(e)
  const { name, value } = e.target;
  setFormDataI(prev => ({
    ...prev,
    [name]: value
  }));
  console.log(formDataI)
};

const handleChangeE = (e: { target: any; }) => {
  console.log(e)
  const { name, value } = e.target;
  setFormDataE(prev => ({
    ...prev,
    [name]: value
  }));
};

const isSubmittingRef = useRef(false);

const handleSubmitI = useCallback(async (e: { preventDefault: () => void; target: { id: string; }; }) => {
  e.preventDefault();
  if (isSubmittingRef.current) return;
  isSubmittingRef.current = true;

  setError('');
  
  let updatedFormData = { ...formDataI };

  if (!formDataI.id) {
    // Si no hay ID, es un nuevo registro
    const uniqueInvoice = await generateUniqueInvoice(e.target.id);
    updatedFormData = { ...updatedFormData, invoice: uniqueInvoice };
  }

  setFormDataI(updatedFormData);
  setRefreshKeyI(prevKey => prevKey + 1);
  console.log(updatedFormData);

  try {
    await submitIncome(updatedFormData);
  } finally {
    isSubmittingRef.current = false;
  }

}, [formDataI]);

// sustituir
const handleSubmitE = useCallback(async (e: { preventDefault: () => void; target: { id: string; }; }) => {
  e.preventDefault();
  if (isSubmittingRef.current) return;
  isSubmittingRef.current = true;

  setError('');
  
  let updatedFormData = { ...formDataE };

  if (!formDataE.id) {
    // Si no hay ID, es un nuevo registro
    const uniqueInvoice = await generateUniqueInvoice(e.target.id);
    updatedFormData = { ...updatedFormData, invoice: uniqueInvoice };
  }

  setFormDataE(updatedFormData);
  setRefreshKeyE(prevKey => prevKey + 1);
  console.log(updatedFormData);

  try {
    await submitExpense(updatedFormData);
  } finally {
    isSubmittingRef.current = false;
  }

}, [formDataE]);


const submitExpense = async (formDataE: { 
  id?: string; 
  invoice?: string; 
  category?: string; 
  totalAmount?: string; 
  paymentMethod?: string; 
  title?: string; 
  date: any 
}) => {

  try {
    const method = formDataE.id ? 'PUT' : 'POST'; // Si hay ID, se actualiza; si no, se crea nuevo
    const endpoint = formDataE.id ? `/api/expenses/${formDataE.id}` : '/api/expenses';

    const res = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'user-id': 'ID-DEL-USUARIO' // Reemplazar con el ID real del usuario
      },
      body: JSON.stringify({
        ...formDataE,
        date: new Date(formDataE.date)
      })
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || 'Error al guardar el ingreso');
    }

    // Restablecer el formulario solo si es un nuevo registro
      setFormDataE({
        id: '',
        invoice: '',
        category: '',
        totalAmount: '',
        paymentMethod: '',
        title: '',
        date: new Date().toISOString().split('T')[0]
      });
      setDateE("");

    // Redireccionar o mostrar mensaje de éxito
    alert(formDataE.id ? 'Ingreso actualizado correctamente' : 'Ingreso guardado correctamente');

  } catch (error) {
    setError(error.message);
  }
};


// incomes submit -------------------------------------------------------------------------



const submitIncome = async (formDataI: { 
  id?: string; 
  invoice?: string; 
  category?: string; 
  totalAmount?: string; 
  paymentMethod?: string; 
  title?: string; 
  date: any 
}) => {

  try {
    const method = formDataI.id ? 'PUT' : 'POST'; // Si hay ID, se actualiza; si no, se crea nuevo
    const endpoint = formDataI.id ? `/api/incomes/${formDataI.id}` : '/api/incomes';

    const res = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'user-id': 'ID-DEL-USUARIO' // Reemplazar con el ID real del usuario
      },
      body: JSON.stringify({
        ...formDataI,
        date: new Date(formDataI.date)
      })
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || 'Error al guardar el ingreso');
    }

    // Restablecer el formulario solo si es un nuevo registro
    // if (!formDataI.id) {
      setFormDataI({
        id: '',
        invoice: '',
        category: '',
        totalAmount: '',
        paymentMethod: '',
        title: '',
        date: new Date().toISOString().split('T')[0]
      });
      setDateI("");
    // }

    // Redireccionar o mostrar mensaje de éxito
    alert(formDataI.id ? 'Ingreso actualizado correctamente' : 'Ingreso guardado correctamente');

  } catch (error) {
    setError(error.message);
  }
};








  // final del codigo -------------------------------------------------------------------------------------



























  return (
    <>
      <div className='grid grid-cols-2 gap-8 my-8'>
        <div className="w-full h-screen">
        <Card className="w-full">
          <div className="h-2 w-full bg-emerald-500 rounded-t-xl"></div>

        {/* codigo de claude */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          {/* codigo de claude */}





          <CardHeader>
            <CardTitle>INCOME</CardTitle>
            <CardDescription>share all type of income that come to your account.</CardDescription>
          </CardHeader>
          <CardContent>
          {/* codigo de claude */}
          <form onSubmit={handleSubmitI} id="formI">
          {/* <form> */}
              <div className="grid w-full items-center gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="titleI">Title</Label>
                    <Input id="titleI" name="title" placeholder="name of source income." onChange={handleChangeI} value={formDataI.title}/>
                  </div>
                  <div>
                    <Label htmlFor="amountI">Amount</Label>
                    <Input id="amountI" name="totalAmount" placeholder="quantity of income." onChange={handleChangeI} value={formDataI.totalAmount}/>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                <div>
                    <Label htmlFor="account">Account</Label>
                    <Select name="paymentMethod" id="accountI" value={formDataI.paymentMethod} onValueChange={handleChangeSelectAI}>
                      <SelectTrigger id="account" name="paymentMethod">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="efectivo">Efectivo</SelectItem>
                        <SelectItem value="credito">Credito</SelectItem>
                        <SelectItem value="debito">Debito</SelectItem>
                        <SelectItem value="mio">Cuenta Mio</SelectItem>
                        <SelectItem value="extra">Cuenta Extra</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="categoryI">Category</Label>
                    <Select name="category" id="categoryI" value={formDataI.category} onValueChange={handleChangeSelectCI}>
                      <SelectTrigger >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="job1">Salary Job 1</SelectItem>
                        <SelectItem value="job2">Salary Job 2</SelectItem>
                        <SelectItem value="bonus">Bonus</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col justify-between">
                    {/* <Label htmlFor="date">Date</Label>
                    <Input id="date" placeholder="quantity of income." /> */}
                    <Label htmlFor="dateI">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="dateI"
                          value={formDataI.date}
                          onChange={handleChangeI}
                          variant={"outline"}
                          className={cn(
                            "justify-start text-left font-normal",
                            !dateI && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon />
                          {dateI ? format(dateI, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateI}
                          onSelect={setDateI}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => handleClear("I")}>Clear</Button>
            <Button onClick={handleSubmitI} type="submit" id="incomes">{formDataI.id?"Edit":"Add"}</Button>
          </CardFooter>
        </Card>

        {/* table */}
        <IncomeList key={refreshKeyI} onEditIncome={handleEditIncome} />


        </div>












        <div className="w-full h-screen">
        <Card className="w-full">
        <div className="h-2 w-full bg-rose-500 rounded-t-xl"></div>
          <CardHeader>
            <CardTitle>EXPENSES</CardTitle>
            <CardDescription>share all type of expenses that come out of you.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitE} id="formE">
              <div className="grid w-full items-center gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="titleE">Title</Label>
                   {/* codigo de claude */}
                    <Input id="titleE" name="title" placeholder="name of source income." value={formDataE.title}
            onChange={handleChangeE} />
                    {/* <Input id="titleE" placeholder="name of source income." onChange={(e) => {setTitleE(e.target.value)}} /> */}
                  </div>
                  <div>
                    <Label htmlFor="amountE">Amount</Label>
                                 {/* codigo de claude */}
                    <Input id="amountE" name="totalAmount" placeholder="quantity of income." value={formDataE.totalAmount}
            onChange={handleChangeE} />
                    {/* <Input id="amountE" placeholder="quantity of income." onChange={(e) => {setTotalAmountE(e.target.value)}} /> */}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">

                  <div>
                    <Label htmlFor="accountE">Account</Label>
                    <Select name="paymentMethod"  value={formDataE.paymentMethod} onValueChange={handleChangeSelectAE}>
                      <SelectTrigger id="accountE" name="paymentMethod" >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="efectivo">Efectivo</SelectItem>
                        <SelectItem value="credito">Credito</SelectItem>
                        <SelectItem value="debito">Debito</SelectItem>
                        <SelectItem value="mio">Cuenta Mio</SelectItem>
                        <SelectItem value="extra">Cuenta Extra</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="categoryE">Category</Label>
                    <Select id="category" name="category" value={formDataE.category} onValueChange={handleChangeSelectCE}>
                    {/* <Select value={categoryE} onValueChange={(value) => setCategoryE(value)}> */}
                      <SelectTrigger id="categoryE">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="supermercado">Supermercado</SelectItem>
                        <SelectItem value="farmacia">Farmacia</SelectItem>
                        <SelectItem value="comidaout">Comida fuera</SelectItem>
                        <SelectItem value="combustible">Combustible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col justify-between">
                    <Label htmlFor="dateE">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        {/* id="date" */}
                        <Button
                        id="dateE"
                        name="date"
                        value={formDataE.date}
                        onChange={handleChangeE}
                          variant={"outline"}
                          className={cn(
                            "justify-start text-left font-normal",
                            !dateE && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon />
                          {dateE ? format(dateE, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateE}
                          onSelect={setDateE}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => handleClear("E")}>Clear</Button>
            <Button onClick={handleSubmitE} type="submit" id="expenses">{formDataE.id?"Edit":"Add"}</Button>
          </CardFooter>
        </Card>

        

        <ExpenseList key={refreshKeyE} onEditExpense={handleEditExpense}/>
        

        </div>



      </div>
    </>
  )
}

export default Iandeview