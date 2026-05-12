"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { EduBidanLogo } from "@/components/ui/EduBidanLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Menu, Bell, ChevronDown, User, Settings, LogOut, Home } from "lucide-react";

interface AdminTopbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
}

export function AdminTopbar({ sidebarOpen, setSidebarOpen }: AdminTopbarProps) {
  const router = useRouter();
  const [showAccount, setShowAccount] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const notifications = [
    { id: 1, title: "Mahasiswa baru mendaftar", desc: "Maya Sari telah mendaftar", time: "10 menit lalu", read: false },
    { id: 2, title: "Modul baru diunggah", desc: "APGAR Score & Resusitasi draft selesai", time: "1 jam lalu", read: false },
  ];

  return (
    <header className="h-16 md:h-18 shrink-0 border-b border-border bg-card/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 z-30 sticky top-0">
      
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)} 
          className="hidden lg:block p-2.5 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <Menu size={22} />
        </button>
        <div className="lg:hidden flex items-center gap-2">
           <EduBidanLogo size="sm" showText={true} />
           <span className="text-[10px] font-extrabold bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider hidden sm:block">Admin</span>
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
            <div className="absolute right-0 lg:right-auto lg:left-1/2 lg:-translate-x-1/2 top-[calc(100%+8px)] w-72 sm:w-80 bg-card border border-border rounded-2xl shadow-xl z-50 animate-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 sm:px-5 sm:py-4 border-b border-border flex items-center justify-between bg-muted/30 rounded-t-2xl">
                <span className="text-sm sm:text-base font-extrabold text-foreground">Notifikasi Admin</span>
              </div>
              <div className="max-h-[60vh] overflow-y-auto scrollbar-thin">
                {notifications.map(n => (
                  <div key={n.id} className={`px-4 py-3 sm:px-5 sm:py-4 border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer transition-colors ${!n.read ? "bg-primary/5" : ""}`}>
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mt-1.5 sm:mt-2 shrink-0 ${!n.read ? "bg-primary shadow-[0_0_8px_rgba(13,148,136,0.8)]" : "bg-transparent"}`} />
                      <div>
                        <p className={`text-xs sm:text-sm ${n.read ? "font-medium text-foreground" : "font-extrabold text-foreground"}`}>{n.title}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1 leading-relaxed">{n.desc}</p>
                        <p className="text-[9px] sm:text-[10px] font-bold text-muted-foreground/80 mt-1.5 sm:mt-2 uppercase tracking-wider">{n.time}</p>
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
            className="flex items-center gap-3 p-1.5 md:pr-3 rounded-full hover:bg-muted transition-colors border border-transparent hover:border-border group"
          >
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-extrabold shadow-sm group-hover:scale-105 transition-transform">
              A
            </div>
            <span className="text-xs md:text-sm font-extrabold text-foreground hidden md:block">Admin</span>
            <ChevronDown size={14} className={`text-muted-foreground hidden md:block transition-transform duration-300 ${showAccount ? "rotate-180" : ""}`} />
          </button>
          
          {showAccount && (
            <div className="absolute right-0 top-[calc(100%+8px)] w-48 sm:w-56 bg-card border border-border rounded-2xl shadow-xl py-1.5 sm:py-2 z-100 animate-in slide-in-from-top-2 duration-200">
              <div className="px-3 py-2 sm:px-4 sm:py-3 border-b border-border mb-1 bg-muted/30">
                <p className="text-xs sm:text-sm font-extrabold text-foreground">Administrator</p>
                <p className="text-[10px] sm:text-xs font-medium text-muted-foreground mt-0.5 truncate">admin@edubidan.id</p>
              </div>
              
              <button onClick={() => { router.push("/dashboard/admin/settings"); setShowAccount(false); }} className="w-full flex items-center gap-2.5 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <User size={16} className="sm:w-4.5 sm:h-4.5" /> Profil Admin
              </button>
              
              <button onClick={() => { router.push("/"); setShowAccount(false); }} className="w-full flex items-center gap-2.5 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <Home size={16} className="sm:w-4.5 sm:h-4.5" /> Halaman Utama
              </button>
              
              <div className="border-t border-border mt-1 pt-1">
                <button onClick={() => router.push("/")} className="w-full flex items-center gap-2.5 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-extrabold text-red-500 hover:text-red-600 hover:bg-red-500/10 transition-colors">
                  <LogOut size={16} className="sm:w-4.5 sm:h-4.5" /> Keluar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}