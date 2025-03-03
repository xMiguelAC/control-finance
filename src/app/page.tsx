import Budgetpage from "@/components/ui/budgetpage";
import Monthlycard from "@/components/ui/monthlycard";
import Overview from "@/components/ui/overview";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import Iandeview from "@/components/ui/iande";
import Fixedview from "@/components/ui/fixed";
import Goalview from "@/components/ui/goalview";
import Helpview from "@/components/ui/Helpview";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
  <main className="w-full">

      <SidebarTrigger />

    <div className="w-11/12 mx-auto">
      <h1 className="font-extrabold text-4xl my-6">Control Finance Dashboard</h1>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="iande">Income/Expenses</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="fixed">Fixed</TabsTrigger>
          <TabsTrigger value="goal">Goals</TabsTrigger>
          <TabsTrigger value="ahorros">Saving</TabsTrigger>
          <TabsTrigger value="ayuda">Help</TabsTrigger>
        </TabsList>
        <TabsContent value="overview"><Overview /></TabsContent>
        <TabsContent value="monthly"><Monthlycard /></TabsContent>
        <TabsContent value="budget"><Budgetpage /></TabsContent>
        <TabsContent value="iande"><Iandeview /></TabsContent>
        <TabsContent value="fixed"><Fixedview /></TabsContent>
        <TabsContent value="goal"><Goalview /></TabsContent>
        <TabsContent value="ahorros"><Budgetpage /></TabsContent>
        <TabsContent value="ayuda"><Helpview /></TabsContent>

      </Tabs>


    </div>
  </main>
 </SidebarProvider>
  );
}
