"use client";

import React, { useState } from "react";
import { User, Bell, Shield } from "lucide-react";
import { ProfileTab } from "@/components/dashboard/student/settings/ProfileTab";
import { NotificationTab } from "@/components/dashboard/student/settings/NotificationTab";
import { SecurityTab } from "@/components/dashboard/student/settings/SecurityTab";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profil");

  // REVISI: Urutan diubah menjadi Profil, Keamanan, lalu Notifikasi
  const tabs = [
    { id: "profil", label: "Profil", icon: User },
    { id: "keamanan", label: "Keamanan", icon: Shield },
    { id: "notifikasi", label: "Notifikasi", icon: Bell },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* HEADER */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-1.5 sm:mb-2">Pengaturan</h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Kelola informasi profil, pengaturan keamanan, dan preferensi notifikasi Anda.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        
        {/* SIDEBAR TABS (Revisi Layout Mobile) */}
        <div className="lg:w-64 shrink-0">
          {/* REVISI: flex-row di mobile agar tombol berjejer 3, lg:flex-col untuk desktop */}
          <div className="bg-card rounded-2xl border border-border p-1.5 sm:p-2 flex flex-row lg:flex-col gap-1 sm:gap-1.5 shadow-sm scrollbar-none">
            {tabs.map(t => (
              <button 
                key={t.id} 
                onClick={() => setActiveTab(t.id)} 
                className={`flex-1 lg:w-full flex items-center justify-center lg:justify-start gap-1.5 sm:gap-3 px-2 sm:px-4 py-2.5 sm:py-3 rounded-[10px] sm:rounded-xl text-[11px] sm:text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === t.id 
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <t.icon size={16} className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" /> 
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 bg-card rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-8 shadow-sm min-w-0">
          {activeTab === "profil" && <ProfileTab />}
          {activeTab === "keamanan" && <SecurityTab />}
          {activeTab === "notifikasi" && <NotificationTab />}
        </div>

      </div>
    </div>
  );
}