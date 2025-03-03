import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

function Cardmonth({ month, income, expense }) {
  return (
    <Card>
        <CardHeader>
            <CardTitle>{month}</CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent>
            <div className='flex justify-between'>
                <div>
                    <p>Income:</p>
                    <p>Expenses:</p>
                    <p>Net:</p>
                </div>
                <div>
                    <p>${income}</p>
                    <p>${expense}</p>
                    <p>${income - expense}</p>
                </div>
            </div>
        </CardContent>
        <CardFooter>
            <p className="leading-none text-muted-foreground">-80% from last month.</p>
        </CardFooter>
    </Card>
  )
}

export default Cardmonth