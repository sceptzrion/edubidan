"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { EduBidanLogo } from "@/components/ui/EduBidanLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { 
  LayoutDashboard, BookOpen, Settings, LogOut, Bell, 
  User, ChevronDown, Menu, Award
} from "lucide-react";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAccount, setShowAccount] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Beranda", path: "/dashboard" },
    { icon: BookOpen, label: "Modul", path: "/dashboard/modules" },
    { icon: Award, label: "Sertifikat", path: "/dashboard/certificates" },
    { icon: Settings, label: "Pengaturan", path: "/dashboard/settings" },
  ];

  const isActive = (path: string) => {
    if (path === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(path);
  };

  const notifications = [
    { id: 1, title: "Modul baru", desc: "Materi Asuhan Persalinan Normal (APN) siap.", time: "10 mnt lalu", read: false },
    { id: 2, title: "Pengingat Evaluasi", desc: "Ayo kerjakan kuis Pemeriksaan Kehamilan.", time: "2 jam lalu", read: false },
  ];

  return (
    <div className="min-h-screen flex bg-background font-sans text-foreground transition-colors duration-300">
      
      {/* --- SIDEBAR DESKTOP --- */}
      <aside className={`hidden lg:flex flex-col bg-card border-r border-border transition-all duration-300 ease-in-out shrink-0 z-50
        ${sidebarOpen ? "w-64" : "w-20"}
      `}>
        <div className="h-18 flex items-center justify-center border-b border-border px-4 shrink-0 overflow-hidden">
          <EduBidanLogo size="sm" showText={sidebarOpen} />
        </div>
        
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all group relative overflow-hidden ${
                isActive(item.path) 
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon size={20} className="shrink-0" />
              <span className={`whitespace-nowrap transition-all duration-300 ${sidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-border shrink-0">
          <button 
            onClick={() => router.push("/")} 
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-500/10 hover:text-red-600 transition-all overflow-hidden"
          >
            <LogOut size={20} className="shrink-0" />
            <span className={`whitespace-nowrap transition-all duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0"}`}>
              Keluar
            </span>
          </button>
        </div>
      </aside>

      {/* --- MAIN AREA --- */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        
        {/* TOPBAR */}
        <header className="h-18 shrink-0 border-b border-border bg-card/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 z-30 sticky top-0">
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="hidden lg:block p-2.5 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <Menu size={22} />
            </button>
            
            <div className="lg:hidden flex items-center">
               <EduBidanLogo size="sm" showText={true} />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle />
            
            {/* NOTIFIKASI */}
            <div className="relative">
              <button 
                onClick={() => { setShowNotif(!showNotif); setShowAccount(false); }} 
                className="p-2.5 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors relative"
              >
                <Bell size={20} />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-card" />
                )}
              </button>
              
              {showNotif && (
                // REVISI MOBILE: Lebar w-[280px] di HP, w-80 di Desktop
                <div className="absolute right-0 lg:right-auto lg:left-1/2 lg:-translate-x-1/2 top-full mt-2 w-70 sm:w-80 bg-card border border-border rounded-2xl shadow-xl z-50 animate-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 sm:px-5 sm:py-4 border-b border-border flex items-center justify-between bg-muted/30 rounded-t-2xl">
                    <span className="text-sm sm:text-base font-bold text-foreground">Notifikasi</span>
                  </div>
                  <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                    {notifications.map(n => (
                      <div key={n.id} className={`px-4 py-3 sm:px-5 sm:py-4 border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer transition-colors ${!n.read ? "bg-primary/5" : ""}`}>
                        <div className="flex items-start gap-2.5 sm:gap-3">
                          <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mt-1.5 sm:mt-2 shrink-0 ${!n.read ? "bg-primary shadow-[0_0_8px_rgba(13,148,136,0.8)]" : "bg-transparent"}`} />
                          <div>
                            <p className={`text-xs sm:text-sm ${n.read ? "font-medium text-foreground" : "font-bold text-foreground"}`}>{n.title}</p>
                            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1 leading-relaxed">{n.desc}</p>
                            <p className="text-[9px] sm:text-[10px] font-medium text-muted-foreground/80 mt-1.5 sm:mt-2 uppercase tracking-wider">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* AKUN / PROFIL */}
            <div className="relative">
              <button 
                onClick={() => { setShowAccount(!showAccount); setShowNotif(false); }} 
                className="flex items-center gap-3 p-1.5 md:pr-3 rounded-full hover:bg-muted transition-colors border border-transparent hover:border-border"
              >
                <div className="w-9 h-9 rounded-full bg-linear-to-br from-primary to-teal-400 flex items-center justify-center text-white font-bold shadow-sm">
                  I
                </div>
                <span className="text-sm font-bold text-foreground hidden md:block">Ikhsan</span>
                <ChevronDown size={16} className="text-muted-foreground hidden md:block" />
              </button>
              
              {showAccount && (
                // REVISI MOBILE: Lebar w-48 di HP, w-56 di Desktop
                <div className="absolute right-0 top-full mt-2 w-48 sm:w-56 bg-card border border-border rounded-2xl shadow-xl py-1.5 sm:py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                  {/* Header Info Akun */}
                  <div className="px-3 py-2 sm:px-4 sm:py-3 border-b border-border mb-1">
                    <p className="text-xs sm:text-sm font-bold text-foreground">Ikhsan Rizqi</p>
                    <p className="text-[10px] sm:text-xs font-medium text-muted-foreground mt-0.5 truncate">ikhsan@unsika.ac.id</p>
                  </div>
                  
                  {/* Menu Profil */}
                  <button onClick={() => { router.push("/dashboard/settings"); setShowAccount(false); }} className="w-full flex items-center gap-2.5 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <User size={16} className="sm:w-4.5 sm:h-4.5" /> Profil Saya
                  </button>
                  
                  {/* Menu Pengaturan */}
                  <button onClick={() => { router.push("/dashboard/settings"); setShowAccount(false); }} className="w-full flex items-center gap-2.5 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <Settings size={16} className="sm:w-4.5 sm:h-4.5" /> Pengaturan
                  </button>
                  
                  {/* Garis Pemisah & Menu Keluar */}
                  <div className="border-t border-border mt-1 pt-1">
                    <button onClick={() => router.push("/")} className="w-full flex items-center gap-2.5 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-bold text-red-500 hover:text-red-600 hover:bg-red-500/10 transition-colors">
                      <LogOut size={16} className="sm:w-4.5 sm:h-4.5" /> Keluar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* KONTEN DINAMIS HALAMAN */}
        <main className="flex-1 overflow-y-auto bg-background p-4 md:p-8 pb-24 md:pb-8 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10">
             {children}
          </div>
        </main>
      </div>

      {/* --- BOTTOM NAVIGATION BAR MOBILE --- */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border z-40 flex items-center justify-around px-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {menuItems.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="relative">
                <item.icon size={22} className={active ? "fill-primary/20" : ""} />
                {active && <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />}
              </div>
              <span className={`text-[10px] font-bold ${active ? "text-primary" : ""}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

    </div>
  );
}