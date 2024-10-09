import React from "react";

import Sidebar from "@/components/organisme/sidebar";
import Navbar from "@/components/organisme/navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
