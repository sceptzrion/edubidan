"use client";

import React, { useEffect } from "react";
import { User, Camera, Mail, Phone, Save, Shield } from "lucide-react";

export default function AdminSettingsPage() {
  useEffect(() => {
    document.title = "Pengaturan Profil | EduBidan";
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
      
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2">Profil Admin</h1>
        <p className="text-sm font-medium text-muted-foreground">Kelola informasi dasar dan kredensial akun administrator Anda.</p>
      </div>

      <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
        
        {/* BANNER & FOTO PROFIL */}
        <div className="p-6 sm:p-8 border-b border-border bg-muted/10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-3xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-extrabold shadow-lg group-hover:scale-105 transition-transform">
                A
              </div>
              <div className="absolute -bottom-2 -right-2 w-9 h-9 bg-card rounded-xl flex items-center justify-center shadow-sm border border-border group-hover:bg-primary group-hover:text-white transition-colors group-hover:border-primary">
                <Camera size={16} />
              </div>
            </div>
            <div className="text-center sm:text-left mt-2 sm:mt-4">
              <p className="text-xl font-extrabold text-foreground mb-1">Super Administrator</p>
              <p className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg inline-block">Akses Utama (Root)</p>
            </div>
          </div>
        </div>
        
        {/* FORM PROFIL */}
        <div className="p-6 sm:p-8">
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            <Field label="Nama Lengkap">
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input defaultValue="Super Administrator" className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/30 border border-border outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm font-medium transition-all" />
              </div>
            </Field>
            <Field label="Alamat Email">
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="email" defaultValue="admin@edubidan.id" className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/30 border border-border outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm font-medium transition-all" />
              </div>
            </Field>
            <Field label="Peran (Role)">
              <div className="relative">
                <Shield size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input defaultValue="Super Admin" disabled className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border border-border text-muted-foreground text-sm font-bold cursor-not-allowed" />
              </div>
            </Field>
            <Field label="Nomor Telepon">
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="tel" defaultValue="+62 21 1234 5678" className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/30 border border-border outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm font-medium transition-all" />
              </div>
            </Field>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="p-6 border-t border-border bg-muted/10 flex justify-end">
          <button className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-3.5 rounded-xl text-sm font-extrabold hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
            <Save size={18} /> Simpan Profil
          </button>
        </div>
        
      </div>
    </div>
  );
}

// Komponen Helper untuk Form Input
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs sm:text-sm mb-2 block font-bold text-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}