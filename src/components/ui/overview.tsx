import React from 'react'
import Cardkpi from "@/components/ui/cardkpi"
import { ComponentPie } from "@/components/ui/piechartcategory";
import { ChartAccount } from './chartaccount';
import Linechartiande from './linechartiande';

function Overview() {
  return (
    <>
    <div className="grid grid-cols-4 gap-8 my-8">
        <Cardkpi title="Debito BRRD" total="114,500.82" percentage="20.5"></Cardkpi>
        <Cardkpi title="Credito BRRD" total="33,000.00" percentage="00.5"></Cardkpi>
        <Cardkpi title="Cuenta Mio" total="3,800.14" percentage="11.1"></Cardkpi>
        <Cardkpi title="Cuenta Extra" total="54,280.22" percentage="18.2"></Cardkpi>
      </div>

      <div className="grid grid-cols-2 gap-8 my-8">
        <ChartAccount />
        <ComponentPie></ComponentPie>
      </div>

      <div className="grid grid-cols-2 gap-8">
      <Linechartiande></Linechartiande>
      </div>

        <div>
        un budget left kpi 
        </div>

        <p>
        un kpi de bill
        </p>

        <p>
        un kpi de los savings
        </p>
      </>
  )
}

export default Overview