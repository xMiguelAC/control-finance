"use client"
 
import * as React from "react"
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



const incomes = [
  {
    "invoice": "INV001",
    "category": "Job 1",
    "totalAmount": "$250.00",
    "paymentMethod": "Credit Card",
    "title": "Salary 15 1/2",
    "date": "2025-01-15"
  },
  {
    "invoice": "INV002",
    "category": "Job 1",
    "totalAmount": "$150.00",
    "paymentMethod": "PayPal",
    "title": "Salary 30 2/2",
    "date": "2025-01-20"
  },
  {
    "invoice": "INV003",
    "category": "Bonus",
    "totalAmount": "$350.00",
    "paymentMethod": "Bank Transfer",
    "title": "Freelance Bank Transfer",
    "date": "2025-01-25"
  },
]


const invoices = [
  {
    "invoice": "INV001",
    "totalAmount": "$250.00",
    "title": "Pending Bank Transfer",
    "paymentMethod": "Credit Card",
    "category": "supermercado",
    "date": "2025-01-15"
  },
  {
    "invoice": "INV002",
    "totalAmount": "$150.00",
    "title": "Pending Bank Transfer",
    "paymentMethod": "PayPal",
    "category": "farmacia",
    "date": "2025-01-20"
  },
  {
    "invoice": "INV003",
    "totalAmount": "$350.00",
    "title": "Pending Bank Transfer",
    "paymentMethod": "Bank Transfer",
    "category": "combustible",
    "date": "2025-01-25"
  },
  {
    "invoice": "INV004",
    "totalAmount": "$450.00",
    "title": "Pending Bank Transfer",
    "paymentMethod": "Credit Card",
    "category": "combustible",
    "date": "2025-02-01"
  },
  {
    "invoice": "INV005",
    "totalAmount": "$550.00",
    "title": "Pending Bank Transfer",
    "paymentMethod": "PayPal",
    "category": "farmacia",
    "date": "2025-02-05"
  },
  {
    "invoice": "INV006",
    "totalAmount": "$200.00",
    "title": "Pending Bank Transfer",
    "paymentMethod": "Bank Transfer",
    "category": "supermercado",
    "date": "2025-02-07"
  },
  {
    "invoice": "INV007",
    "totalAmount": "$300.00",
    "title": "Pending Bank Transfer",
    "paymentMethod": "Credit Card",
    "category": "farmacia",
    "date": "2025-02-10"
  }
]


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

  return (
    <>
      <div className='grid grid-cols-2 gap-8 my-8'>







        <div className="w-full h-screen">
        <Card className="w-full">
          <div className="h-2 w-full bg-emerald-500 rounded-t-xl"></div>
          <CardHeader>
            <CardTitle>INCOME</CardTitle>
            <CardDescription>share all type of income that come to your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
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
            <Button onClick={handleAddInc}>Add</Button>
          </CardFooter>
        </Card>

        <Table className="my-8 rounded-lg">
        {/* <Table className="my-8 bg-emerald-300 rounded-lg"> */}
          <TableCaption>A list of your recent invoices.</TableCaption>
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
                {/* <TableCell className="font-medium">{income.invoice}</TableCell> */}
                <TableCell className="text-right">{income.totalAmount}</TableCell>
                <TableCell>{income.title}</TableCell>
                <TableCell>{income.paymentMethod}</TableCell>
                <TableCell>{income.category}</TableCell>
                <TableCell className="text-right">{income.date}</TableCell>
                <TableCell className="text-right"><Button variant="outline">Edit</Button></TableCell>
                <TableCell className="text-right"><Button variant="outline">Delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="text-right">$2,500.00</TableCell>
              <TableCell colSpan={6}>Total</TableCell>
            </TableRow>
          </TableFooter>
        </Table>


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
                    <Input id="titleE" placeholder="name of source income." onChange={(e) => {setTitleE(e.target.value)}} />
                  </div>
                  <div>
                    <Label htmlFor="amountE">Amount</Label>
                    <Input id="amountE" placeholder="quantity of income." onChange={(e) => {setTotalAmountE(e.target.value)}} />
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
            <Button onClick={handleAddExp}>Add</Button>
          </CardFooter>
        </Card>

        <Table className="my-8 rounded-lg">
        {/* <Table className="my-8 bg-emerald-300 rounded-lg"> */}
          <TableCaption>A list of your recent invoices.</TableCaption>
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
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                {/* <TableCell className="font-medium">{invoice.invoice}</TableCell> */}
                <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                <TableCell>{invoice.title}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell>{invoice.category}</TableCell>
                <TableCell className="text-right">{invoice.date}</TableCell>
                <TableCell className="text-right"><Button variant="outline">Edit</Button></TableCell>
                <TableCell className="text-right"><Button variant="outline">Delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="text-right">$2,500.00</TableCell>
              <TableCell colSpan={6}>Total</TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        </div>



      </div>
    </>
  )
}

export default Iandeview









    
