"use client"
 
import * as React from "react"

import { useState } from 'react';
// import { useRouter } from 'next/router';
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
import ExpenseForm from "./ExpenseForm";








function Iandeview() {
  const [dateI, setDateI] = React.useState<Date>()
  const [dateE, setDateE] = React.useState<Date>()

  const [categoryI, setCategoryI] = React.useState("")
  const [totalAmountI, setTotalAmountI] = React.useState("")
  const [paymentMethodI,setPaymentMethodI] = React.useState("")
  const [titleI, setTitleI] = React.useState("")

  const [categoryE, setCategoryE] = React.useState("")
  const [totalAmountE, setTotalAmountE] = React.useState("")
  const [paymentMethodE,setPaymentMethodE] = React.useState("")
  const [titleE, setTitleE] = React.useState("")

  const handleAddInc = () => {

    const newIncome = {
      "invoice": "INC001",
      "category": categoryI,
      "totalAmount": totalAmountI,
      "paymentMethod": paymentMethodI,
      "title": titleI,
      "date": dateI
    }
    console.log(newIncome)
  }


  const handleAddExp = () => {

    const newExpense = {
      "invoice": "EXP001",
      "category": categoryE,
      "totalAmount": totalAmountE,
      "paymentMethod": paymentMethodE,
      "title": titleE,
      "date": dateE
    }
    console.log(newExpense)
  }

  const handleClearI = () => {
    setCategoryI("")
    setTotalAmountI("")
    setPaymentMethodI("")
    setTitleI("")
    setDateI(undefined)
    // setDateI(null)
    document.getElementById("titleI").value = ""
    document.getElementById("amountI").value = ""  
    document.getElementById("dateI").value = ""  
  }

  const handleClearE = () => {
    setCategoryE("")
    setTotalAmountE("")
    setPaymentMethodE("")
    setTitleE("")
    setDateE(undefined)
    document.getElementById("titleE").value = ""
    document.getElementById("amountE").value = ""  
    document.getElementById("dateE").value = ""  
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

// const router = useRouter();
  const [formData, setFormData] = useState({
    invoice: '',
    category: '',
    totalAmount: '',
    paymentMethod: '',
    title: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Si tienes un sistema de autenticación, añade el token aquí
          // 'Authorization': `Bearer ${token}`,
          'user-id': 'ID-DEL-USUARIO' // Reemplazar con el ID real del usuario
        },
        body: JSON.stringify({
          ...formData,
          date: new Date(formData.date)
        })
      });

      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Error al guardar el gasto');
      }

      // Restablecer el formulario
      setFormData({
        invoice: '',
        category: '',
        totalAmount: '',
        paymentMethod: '',
        title: '',
        date: new Date().toISOString().split('T')[0]
      });

      // Redireccionar o mostrar mensaje de éxito
      alert('Gasto guardado correctamente');
      // Opcional: redireccionar a la lista de gastos
      // router.push('/expenses');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
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
          <form onSubmit={handleSubmit}>
          {/* <form> */}
              <div className="grid w-full items-center gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="titleI">Title</Label>
                    <Input id="titleI" placeholder="name of source income." onChange={(e) => {setTitleI(e.target.value)}}/>
                  </div>
                  <div>
                    <Label htmlFor="amountI">Amount</Label>
                    <Input id="amountI" placeholder="quantity of income." onChange={(e) => {setTotalAmountI(e.target.value)}} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                <div>
                    <Label htmlFor="account">Account</Label>
                    <Select value={paymentMethodI} onValueChange={(value) => setPaymentMethodI(value)}>
                      <SelectTrigger id="account">
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
                    <Select value={categoryI} onValueChange={(value) => setCategoryI(value)}>
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
            <Button onClick={handleAddInc} >Add</Button>
          </CardFooter>
        </Card>

        {/* table */}
        <IncomeList />


        </div>












        <div className="w-full h-screen">
        <Card className="w-full">
        <div className="h-2 w-full bg-rose-500 rounded-t-xl"></div>
          <CardHeader>
            <CardTitle>EXPENSES</CardTitle>
            <CardDescription>share all type of expenses that come out of you.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="titleE">Title</Label>
                   {/* codigo de claude */}
                    <Input id="titleE" placeholder="name of source income." value={formData.title}
            onChange={handleChange} />
                    {/* <Input id="titleE" placeholder="name of source income." onChange={(e) => {setTitleE(e.target.value)}} /> */}
                  </div>
                  <div>
                    <Label htmlFor="amountE">Amount</Label>
                                 {/* codigo de claude */}
                    <Input id="amountE" placeholder="quantity of income." value={formData.totalAmount}
            onChange={handleChange} />
                    {/* <Input id="amountE" placeholder="quantity of income." onChange={(e) => {setTotalAmountE(e.target.value)}} /> */}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="accountE">Account</Label>
                    <Select value={paymentMethodE} onValueChange={(value) => setPaymentMethodE(value)}>
                      <SelectTrigger id="accountE">
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
                    <Select value={categoryE} onValueChange={(value) => setCategoryE(value)}>
                      <SelectTrigger id="categoryE">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="supermercado">supermercado</SelectItem>
                        <SelectItem value="farmacia">farmacia</SelectItem>
                        <SelectItem value="comidaout">comida fuera</SelectItem>
                        <SelectItem value="combustible">combustible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col justify-between">
                    <Label htmlFor="dateE">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                        id="dateE"
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
             {/* codigo de claude */}
             <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Gasto'}
            </button>
            <Button onClick={handleAddExp}>Add</Button>
          </CardFooter>
        </Card>

        

        <ExpenseList />
        <ExpenseForm />

        </div>



      </div>
    </>
  )
}

export default Iandeview









    
