import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/organism/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      {children}
    </SidebarProvider>
  );
}
