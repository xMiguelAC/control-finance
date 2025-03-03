import React from 'react'
import Cardkpi from './cardkpi'

function Helpview() {
  return (
    <div className='my-8'>

        <div className='mb-12'>
            <p className='font-bold text-3xl'>Metodo 50-20-30</p>
            <hr />
            <br />
          <div className='grid grid-cols-3 gap-8 mb-4'>
            <Cardkpi title="Necesidades (50%)" total="14,500.82" percentage="20.5"></Cardkpi>
              <Cardkpi title="Ahorro e inversión (20%)" total="33,000.00" percentage="00.5"></Cardkpi>
              <Cardkpi title="Gastos personales (30%)" total="3,800.14" percentage="11.1"></Cardkpi>
          </div>
        </div>

      <div className='mb-12'>
        <p className='font-bold text-3xl'>Metodo 80-20</p>
          <hr />
          <br />
        <div className='grid grid-cols-2 gap-8 mb-4'>
            <Cardkpi title="Gastos Necesarios (80%)" total="31,000.00" percentage="00.5"></Cardkpi>
            <Cardkpi title="Ahorros e Inversiones (20%)" total="1,250.14" percentage="11.1"></Cardkpi>
        </div>
      </div>

      <div className='mb-12'>
        <p className='font-bold text-3xl'>Metodo 70-20-10</p>
          <hr />
          <br />
        <div className='grid grid-cols-3 gap-8 mb-4'>
          <Cardkpi title="Gastos esenciales (70%)" total="14,500.82" percentage="20.5"></Cardkpi>
            <Cardkpi title="Ahorros e Inversiones (20%)" total="32,010.00" percentage="00.5"></Cardkpi>
            <Cardkpi title="Pagos de Deudas (10%)" total="4,540.14" percentage="11.1"></Cardkpi>
        </div>
      </div>

      



    </div>
  )
}

export default Helpview