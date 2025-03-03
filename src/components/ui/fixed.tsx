"use client"
import React, { useState } from 'react'
// import { Checkbox } from "@/components/ui/checkbox"

import { CircleX, Terminal, TriangleAlert } from "lucide-react"
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

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


import {
    Table,
    TableBody,
    // TableCaption,
    TableCell,
    TableHead,
    TableHeader,  
    TableFooter,
    TableRow,
  } from "@/components/ui/table"

function Fixedview() {
//   const [isStriked, setIsStriked] = useState(false);
  const [dateI, setDateI] = useState<Date>()
//   const [checked, setChecked] = useState(false);

  const [items, setItems] = useState([
    { id: 1, label: "Internet del Hogar", description: "Se paga por 10 mb de velocidad a DSI Dominicana.", isStriked: false, date: "2022-10-10", amount: "RD$ 1,600", frecuency: "1 de cada mes" },
    { id: 2, label: "Electricidad", description: "Pago mensual del servicio eléctrico.", isStriked: false, date: "2022-10-10", amount: "RD$ 1,600", frecuency: "1 de cada mes" },
    { id: 3, label: "Agua", description: "Factura mensual del agua.", isStriked: false, date: "2022-10-10", amount: "RD$ 1,600", frecuency: "1 de cada mes" },
    { id: 4, label: "Electricidad", description: "Pago mensual del servicio eléctrico.", isStriked: false, date: "2022-10-10", amount: "RD$ 1,600", frecuency: "1 de cada mes" },
    { id: 5, label: "Agua", description: "Factura mensual del agua.", isStriked: false, date: "2022-10-10", amount: "RD$ 1,600", frecuency: "1 de cada mes" },
  ]);

//   const toggleStrikeThrough = (e) => {
//     setIsStriked(!isStriked);
//     setChecked(!checked)
//     console.log(e)
//   };


  const toggleStrikeThrough = (id) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, isStriked: !item.isStriked } : item
      )
    );
  };

  return (
    <>
    <div className='grid grid-cols-2 gap-8 my-8'>

        <div className="items-top flex flex-col space-y-8">

           
            {/* {items.map(item => (
                <div key={item.id} className='flex gap-2 pb-2'>
                <Checkbox id={`terms-${item.id}`} />
                <div className="grid gap-1.5 leading-none pr-4 border-r-2 border-black/10" onClick={() => toggleStrikeThrough(item.id)}>
                    <label
                    htmlFor={`terms-${item.id}`}
                    className={`text-md font-medium leading-none ${item.isStriked ? 'line-through' : ''}`}
                    >
                    {item.label}
                    </label>
                    <p className={`text-sm text-muted-foreground ${item.isStriked ? 'line-through' : ''}`}>
                    {item.description}
                    </p>
                </div>
                <div className="flex items-center px-4 border-r-2 border-black/10">
                    <Button variant="outline" disabled>RD$ 1,600</Button>
                </div>
                <div className="flex items-center px-4 border-r-2 border-black/10">
                    <Button variant="outline" disabled>1 de cada mes</Button>
                </div>
                <div className="flex items-center px-4 gap-1.5">
                    <Button variant="outline">Edit</Button>
                    <Button variant="outline">Delete</Button>
                </div>
                </div>
                ))} */}







<Table>
<div className="border-2 border-black/10 rounded-xl">
        {/* <Table className="my-8 bg-emerald-300 rounded-lg"> */}
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right"></TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} onClick={() => toggleStrikeThrough(item.id)}>
                <TableCell>
                    <p className={`${item.isStriked ? 'line-through' : ''}`}>
                        {item.label}
                    </p>
                    <p className={`text-sm text-muted-foreground ${item.isStriked ? 'line-through' : ''}`}>
                        {item.description}
                    </p>
                </TableCell>
                <TableCell>
                <Button variant="outline" disabled>{item.amount}</Button>
                    {/* {item.amount} */}
                </TableCell>
                <TableCell>{item.frecuency}</TableCell>
                <TableCell className="text-right"><Button variant="outline">Edit</Button></TableCell>
                <TableCell className="text-right"><Button variant="outline">Delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={1}>Total</TableCell>
              <TableCell className="text-center">$2,500.00</TableCell>
              <TableCell colSpan={3}></TableCell>
            </TableRow>
          </TableFooter>
        </div>
        </Table>

               


            

            </div>




        <Card className="w-full h-fit">
          <div className="h-2 w-full bg-amber-500 rounded-t-xl"></div>
          <CardHeader>
            <CardTitle>FIXED COST</CardTitle>
            <CardDescription>share all type of expenses that is fixed to your life.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="name of source income." />
                  </div>
                  <div>
                    <Label htmlFor="descripcion">Description</Label>
                    <Input id="descripcion" placeholder="descripcion de gasto." />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" placeholder="quantity of income." />
                </div>
                
                <div>
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue>Monthly</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='w'>Weekly</SelectItem>
                        <SelectItem value='b'>Biweekly</SelectItem>
                        <SelectItem value='m'>Monthly</SelectItem>
                        <SelectItem value='y'>Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                    </div>
                  <div className="flex flex-col justify-between">
                    {/* <Label htmlFor="date">Date</Label>
                    <Input id="date" placeholder="quantity of income." /> */}
                    <Label htmlFor="date">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
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
            <Button variant="outline">Clear</Button>
            <Button>Add</Button>
          </CardFooter>
        </Card>



    </div>

    <div className='p-8 grid grid-cols-1 gap-8'>
        <Alert className='bg-amber-100'>
            <TriangleAlert className="h-4 w-4" />
            <AlertTitle className='font-bold'>Advertencia!</AlertTitle>
            <AlertDescription>
                En 10 dias se vence el contrato de internet.
            </AlertDescription>
        </Alert>
    </div>

    <div className='px-8 grid grid-cols-1 gap-8'>
        <Alert className='bg-rose-100'>
            <CircleX className="h-4 w-4" />
            <AlertTitle className='font-bold'>Urgente!</AlertTitle>
            <AlertDescription>
                En menos de 5 dias se vence el contrato de internet.
            </AlertDescription>
        </Alert>
    </div>
    </>
  )
}

export default Fixedview