import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"


function Cardbudget() {
  return (
    <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between font-normal">
              <div className='flex items-center'>
                <img src="https://cdn-icons-png.flaticon.com/512/9685/9685684.png" width="30" height="30" />
                <h1 className='ml-4'>Supermercado</h1>
              </div>
              <span>33%</span>
            </div>
            </CardTitle>
        </CardHeader>
        <CardContent className="-mt-2">
            <div className='flex justify-between items-center'>
                <p className="font-bold text-2xl">Total: RD$ 1,100.82</p>
                <Progress value={33} className='w-1/2'/>
            </div>
          <p className="font-light text-gray-400">Target: RD$ 2,500</p>
        </CardContent>
      </Card>
  )
}

export default Cardbudget





    