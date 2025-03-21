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

// import  fetchExpenses  from "./ExpenseList";
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

  const [refreshKeyI, setRefreshKeyI] = useState(0);
  const [refreshKeyE, setRefreshKeyE] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);


  

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

// const [formData, setFormData] = useState({
//   invoice: '',
//   category: '',
//   totalAmount: '',
//   paymentMethod: '',
//   title: '',
//   date: new Date().toISOString().split('T')[0]
// });

const [formDataI, setFormDataI] = useState({
  invoice: '',
  category: '',
  totalAmount: '',
  paymentMethod: '',
  title: '',
  date: new Date().toISOString().split('T')[0]
});

const [formDataE, setFormDataE] = useState({
  invoice: '',
  category: '',
  totalAmount: '',
  paymentMethod: '',
  title: '',
  date: new Date().toISOString().split('T')[0]
});

const [error, setError] = useState('');

const handleChangeSelectAI = (val) => {
  console.log(val)
  const e = { target: { name: "paymentMethod", value: val } };
  console.log(e)
  
  handleChangeI(e);
}

const handleChangeSelectAE = (val) => {
  console.log(val)
  const e = { target: { name: "paymentMethod", value: val } };
  console.log(e)
  
  handleChangeE(e);
}

const handleChangeSelectCE = (val) => {
  console.log(val)
  // console.log(val.target.id)
  const e = { target: { name: "category", value: val } };

  handleChangeE(e);
}

const handleChangeSelectCI = (val) => {
  console.log(val)
  // console.log(val.target.id)
  const e = { target: { name: "category", value: val } };

  handleChangeI(e);
  }


const handleChangeI = (e) => {
  console.log(e)
  // console.log(e.target.form.id)
  const { name, value } = e.target;
  // const form = e.target.form.id;
  setFormDataI(prev => ({
    ...prev,
    [name]: value
  }));
  // console.log(form)
};

const handleChangeE = (e) => {
  console.log(e)
  // console.log(e.target.form.id)
  const { name, value } = e.target;
  // const form = e.target.form.id;
  setFormDataE(prev => ({
    ...prev,
    [name]: value
  }));
  // console.log(form)
};

const isSubmittingRef = useRef(false);

const handleSubmitI = useCallback(async (e) => {
  e.preventDefault();
  if (isSubmittingRef.current) return;
  isSubmittingRef.current = true;

  setError('');
  const uniqueInvoice = await generateUniqueInvoice(e.target.id);

  setFormDataI(prev => ({ ...prev, invoice: uniqueInvoice }));
  setRefreshKeyI(prevKey => prevKey + 1);
  console.log(formDataI)

    try {
      await submitIncome({ ...formDataI, invoice: uniqueInvoice });
    } finally {
      isSubmittingRef.current = false;
    }

}, [formDataI]);

const handleSubmitE = useCallback(async (e) => {
  e.preventDefault();
  if (isSubmittingRef.current) return;
  isSubmittingRef.current = true;

  setError('');
  const uniqueInvoice = await generateUniqueInvoice(e.target.id);

  setFormDataE(prev => ({ ...prev, invoice: uniqueInvoice }));
  setRefreshKeyE(prevKey => prevKey + 1);
  console.log(formDataE)


    try {
      await submitExpense({ ...formDataE, invoice: uniqueInvoice });
    } finally {
      isSubmittingRef.current = false;
      // fetchExpenses();
    }


}, [formDataE]);

// next step: que se actualice las tablas al agregar uno nuevo.

const submitExpense = async (formDataE) => {
  try {
    const res = await fetch('/api/expenses', {
      method: 'POST',
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
      throw new Error(data.message || 'Error al guardar el gasto');
    }

    // Restablecer el formulario
    setFormDataE({
      invoice: '',
      category: '',
      totalAmount: '',
      paymentMethod: '',
      title: '',
      date: new Date().toISOString().split('T')[0]
    });

    // Redireccionar o mostrar mensaje de éxito
    alert('Gasto guardado correctamente');

  } catch (error) {
    setError(error.message);
  }
};


// incomes submit -------------------------------------------------------------------------

const submitIncome = async (formDataI) => {
  try {
    const res = await fetch('/api/incomes', {
      method: 'POST',
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
      throw new Error(data.message || 'Error al guardar el gasto');
    }

    // Restablecer el formulario
    setFormDataI({
      invoice: '',
      category: '',
      totalAmount: '',
      paymentMethod: '',
      title: '',
      date: new Date().toISOString().split('T')[0]
    });

    // Redireccionar o mostrar mensaje de éxito
    alert('Gasto guardado correctamente');

  } catch (error) {
    setError(error.message);
  }
};


// const handleSubmitI = async (e) => {
//   e.preventDefault();
//   setError('');

//   console.log(formData)

//   try {
//     const res = await fetch('/api/incomes', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'user-id': 'ID-DEL-USUARIO' // Reemplazar con el ID real del usuario
//       },
//       body: JSON.stringify({
//         ...formData,
//         date: new Date(formData.date)
//       })
//     });

//     const data = await res.json();
    
//     if (!data.success) {
//       throw new Error(data.message || 'Error al guardar el gasto');
//     }

//     // Restablecer el formulario
//     setFormData({
//       invoice: '',
//       category: '',
//       totalAmount: '',
//       paymentMethod: '',
//       title: '',
//       date: new Date().toISOString().split('T')[0]
//     });

//     // Redireccionar o mostrar mensaje de éxito
//     alert('Gasto guardado correctamente');

//   } catch (error) {
//     setError(error.message);
//   }
// };




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
            {/* <Button onClick={handleAddInc} >Add</Button> */}
            <Button onClick={handleSubmitI} type="submit" id="incomes">Add</Button>
          </CardFooter>
        </Card>

        {/* table */}
        <IncomeList key={refreshKeyI} />


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
            <Button onClick={handleSubmitE} type="submit" id="expenses">Add</Button>
          </CardFooter>
        </Card>

        

        <ExpenseList key={refreshKeyE}/>
        

        </div>



      </div>
    </>
  )
}

export default Iandeview









    
