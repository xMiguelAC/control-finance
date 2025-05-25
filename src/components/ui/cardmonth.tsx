import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Cardmonth({
  month,
  income,
  expense,
}: {
  month: string;
  income: string;
  expense: string;
}) {
  const balance = income - expense;

  const barLineColor =
    balance > 0 ? "bg-green-500" : balance < 0 ? "bg-red-500" : "bg-gray-400";

  const barBackgroundColor =
    balance > 0 ? "bg-green-50" : balance < 0 ? "bg-red-50" : "bg-white";

  return (
    <Card className={`${barBackgroundColor}`}>
      <div className={`h-2 w-full ${barLineColor} rounded-t-xl`}></div>
      <CardHeader className="pb-2 pt-4 pl-6">
        <CardTitle className="uppercase text-xl">{month}</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div>
            <p>Income:</p>
            <p>Expenses:</p>
            <p>Net:</p>
          </div>
          <div>
            <p>${income}</p>
            <p>${expense}</p>
            <p>${balance}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="leading-none text-muted-foreground">
          -80% from last month.
        </p>
      </CardFooter>
    </Card>
  );
}

export default Cardmonth;
