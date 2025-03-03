import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

  

function Goalview() {
  return (
    <>
    <div className="grid grid-cols-3 gap-8 my-8">
    <Card>
        <CardHeader className='flex flex-row justify-between'>
            <div>
                <CardTitle>Gaming Keyboard</CardTitle>
                <CardDescription>Logitech</CardDescription>
            </div>
            <div>
                <Badge variant="outline">RD$ 2,500</Badge>
            </div>
        </CardHeader>
        <CardContent>
        <div className="relative w-full aspect-square overflow-hidden rounded-lg">
        {/* Fondo con blur */}
        <div 
            className="absolute inset-0 bg-cover bg-center blur-lg" 
            style={{ backgroundImage: 'url(https://assets1.ignimgs.com/2017/05/23/logitechgpro-1280-1495575876625_160w.jpg?width=1280)' }}
        ></div>

        {/* Imagen principal */}
        <img 
            className="relative w-full h-full object-contain" 
            src="https://assets1.ignimgs.com/2017/05/23/logitechgpro-1280-1495575876625_160w.jpg?width=1280" 
            alt="Gaming Keyboard" 
        />
        </div>

            {/* <img className='rounded-lg aspect-square object-contain' src="https://assets1.ignimgs.com/2017/05/23/logitechgpro-1280-1495575876625_160w.jpg?width=1280" alt="Gaming Keyboard" /> */}
            <p className='pt-8 pb-4'>Quiero comprar este teclado porque se me hace muy dificil escribir con un teclado de membrana.</p>
            <div className='flex flex-row gap-4 items-center pb-4'>
                <Label htmlFor="amount">Cantidad:</Label>
                <Input id="amount" placeholder="quantity of income." />
                <Button variant="outline">Add</Button>
            </div>
            <div className='flex flex-row gap-4 items-center pb-4'>
                <p>50%</p>
                <Progress value={50} className='w-1/2'/>
                <p>1,250 / 2,500</p>
            </div>
        </CardContent>
        <CardFooter className='gap-4'>
            <Button variant="destructive" className=''>Delete</Button>
        </CardFooter>
    </Card>


    <Card>
        <CardHeader className='flex flex-row justify-between'>
            <div>
                <CardTitle>Gaming Mouse</CardTitle>
                <CardDescription>Razer</CardDescription>
            </div>
            <div>
                <Badge variant="outline">RD$ 2,500</Badge>
            </div>
        </CardHeader>
        <CardContent>
            <img className='rounded-lg aspect-square object-cover' src="https://assets2.razerzone.com/images/pnx.assets/c174e90e94ab3f247fa562eaecc282b4/500x500-razer-naga-left-handed.webp" alt="Gaming Keyboard" width={1280} height={1280} />
            <p className='pt-8 pb-4'>Quiero comprar este teclado porque se me hace muy dificil escribir con un teclado de membrana.</p>
            <div className='flex flex-row gap-4 items-center pb-4'>
                <Label htmlFor="amount">Cantidad:</Label>
                <Input id="amount" placeholder="quantity of income." />
                <Button variant="outline">Add</Button>
            </div>
            <div className='flex flex-row gap-4 items-center pb-4'>
                <p>50%</p>
                <Progress value={50} className='w-1/2'/>
                <p>1,250 / 2,500</p>
            </div>
        </CardContent>
        <CardFooter className='gap-4'>
            <Button variant="destructive" className=''>Delete</Button>
        </CardFooter>
    </Card>


    <Card>
        <CardHeader className='flex flex-row justify-between'>
            <div>
                <CardTitle>Gaming Headset</CardTitle>
                <CardDescription>Astros</CardDescription>
            </div>
            <div>
                <Badge variant="outline">RD$ 2,500</Badge>
            </div>
        </CardHeader>
        <CardContent>
            <div className="relative w-full aspect-square overflow-hidden rounded-lg">
            {/* Fondo con blur */}
            <div 
                className="absolute inset-0 bg-cover bg-center blur-lg" 
                style={{ backgroundImage: 'url(https://cdn.mos.cms.futurecdn.net/sFUVZxLsm9Hju49wKxq7xd.jpg)' }}
            ></div>

            {/* Imagen principal */}
            <img 
                className="relative w-full h-full object-contain" 
                src="https://cdn.mos.cms.futurecdn.net/sFUVZxLsm9Hju49wKxq7xd.jpg" 
                alt="Gaming Keyboard" 
            />
            </div>
            {/* <img className='rounded-lg aspect-square object-cover' src="https://cdn.mos.cms.futurecdn.net/sFUVZxLsm9Hju49wKxq7xd.jpg" alt="Gaming Keyboard" /> */}
            <p className='pt-8 pb-4'>Quiero comprar este teclado porque se me hace muy dificil escribir con un teclado de membrana.</p>
            <div className='flex flex-row gap-4 items-center pb-4'>
                <Label htmlFor="amount">Cantidad:</Label>
                <Input id="amount" placeholder="quantity of income." />
                <Button variant="outline">Add</Button>
            </div>
            <div className='flex flex-row gap-4 items-center pb-4'>
                <p>50%</p>
                <Progress value={50} className='w-1/2'/>
                <p>1,250 / 2,500</p>
            </div>
        </CardContent>
        <CardFooter className='gap-4'>
            <Button variant="destructive" className=''>Delete</Button>
        </CardFooter>
    </Card>
        
      </div>
    </>
  )
}

export default Goalview