import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

function Cardkpi({title, total, percentage}) {
  return (
    <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between font-normal">
              <h1>{title}</h1>
              {/* <h1>Debito BRRD</h1> */}
              <span>$</span>
            </div>
            </CardTitle>
        </CardHeader>
        <CardContent className="-mt-2">
          <p className="font-bold text-2xl">RD$ {total}</p>
          {/* <p className="font-bold text-2xl">RD$ 114,500.82</p> */}
          <p className="font-light text-gray-400">-{percentage}% from last month.</p>
          {/* <p className="font-light text-gray-400">-20.5% from last month.</p> */}
        </CardContent>
      </Card>
  )
}

export default Cardkpi