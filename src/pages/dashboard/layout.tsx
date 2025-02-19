import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { DashboardSidebar } from "./sidebar";

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="px-10 py-8">
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
