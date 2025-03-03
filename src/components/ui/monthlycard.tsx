import React from 'react'
import Cardmonth from './cardmonth'

const months = [
    {
        month: "Enero",
        income: "100",
        expense: "200",
    },
    {
        month: "Febrero",
        income: "300",
        expense: "400",
    },
    {
        month: "Marzo",
        income: "500",
        expense: "600",
    },
    { month: "April", income: 4800, expense: 3100 },
    { month: "May", income: 5300, expense: 2900 },
    { month: "June", income: 6000, expense: 3200 },
    { month: "July", income: 5500, expense: 3000 },
    { month: "August", income: 5800, expense: 3100 },
    { month: "September", income: 6100, expense: 3300 },
    { month: "October", income: 5900, expense: 2900 },
    { month: "November", income: 6200, expense: 3400 },
    { month: "December", income: 7000, expense: 3800 },
]
  

function Monthlycard() {
  return (
    <div className="grid grid-cols-4 gap-8 my-8 w-full">

        {months.map(({ month, income, expense }) => (
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