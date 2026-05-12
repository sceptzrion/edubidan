"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/dashboard/admin/layout/AdminSidebar";
import { AdminTopbar } from "@/components/dashboard/admin/layout/AdminTopbar";
import { AdminBottomNav } from "@/components/dashboard/admin/layout/AdminBottomNav";
import { adminMenuItems } from "@/components/dashboard/admin/layout/menuItems";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-background font-sans text-foreground transition-colors duration-300">
      
      {/* SIDEBAR (Desktop) */}
      <AdminSidebar sidebarOpen={sidebarOpen} menuItems={adminMenuItems} />

      {/* AREA KONTEN UTAMA */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        
        {/* TOPBAR (Header) */}
        <AdminTopbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* KONTEN DINAMIS HALAMAN */}
        <main className="flex-1 overflow-y-auto bg-background p-3 sm:p-4 md:p-8 pb-20 sm:pb-24 md:pb-8 scrollbar-thin">
          
          {/* Efek Glow Dekoratif di Background */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          
          <div className="max-w-6xl mx-auto relative z-10">
             {children}
          </div>
        </main>
      </div>

      {/* BOTTOM NAV (Mobile) */}
      <AdminBottomNav menuItems={adminMenuItems} />

    </div>
  );
}