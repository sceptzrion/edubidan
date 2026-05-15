"use client";

import React, { useEffect } from "react";
import { Save, Upload, User, Mail, Phone, GraduationCap } from "lucide-react";

export default function LecturerSettingsPage() {
  useEffect(() => {
    document.title = "Pengaturan Profil | Dosen EduBidan";
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10 sm:pb-12 max-w-3xl mx-auto">
      
      {/* HEADER */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2">Pengaturan Profil</h1>
        <p className="text-sm font-medium text-muted-foreground">
          Perbarui informasi identitas dan kontak untuk akun Dosen Anda.
        </p>
      </div>

      <div className="bg-card rounded-2xl sm:rounded-3xl border border-border overflow-hidden shadow-sm">
        
        {/* BAGIAN 1: FOTO PROFIL */}
        <div className="p-6 sm:p-8 border-b border-border/50 bg-muted/10">
          <h2 className="text-center sm:text-left text-base font-extrabold text-foreground mb-4">Foto Profil</h2>
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-linear-to-br from-primary to-teal-500 flex items-center justify-center text-white text-3xl font-extrabold shadow-md shrink-0">
              R
            </div>
            <div className="space-y-2.5">
              <div className="flex justify-center sm:justify-normal gap-3">
                <button className="px-4 py-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors">
                  <Upload size={16} /> Unggah Foto Baru
                </button>
                <button className="px-4 py-2.5 rounded-xl border border-border text-muted-foreground hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 text-xs sm:text-sm font-bold transition-colors">
                  Hapus
                </button>
              </div>
              <p className="text-xs font-medium text-muted-foreground">
                Format yang direkomendasikan: JPG, PNG, atau GIF. Ukuran maksimal 2MB.
              </p>
            </div>
          </div>
        </div>

        {/* BAGIAN 2: FORM INFORMASI PRIBADI */}
        <div className="p-6 sm:p-8">
          <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
            
            <div>
              <label className="text-xs sm:text-sm mb-2 block font-bold text-foreground">Nama Lengkap & Gelar</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  defaultValue="Dr. Rina Hartati, S.ST., M.Keb" 
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/30 border border-border text-sm font-medium text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
                />
              </div>
            </div>
            
            <div>
              <label className="text-xs sm:text-sm mb-2 block font-bold text-foreground">NIDN / NIP</label>
              <div className="relative">
                <GraduationCap size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  defaultValue="0312087701" 
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/30 border border-border text-sm font-medium text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
                />
              </div>
            </div>

            <div>
              <label className="text-xs sm:text-sm mb-2 block font-bold text-foreground">Email Institusi</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  defaultValue="rina.hartati@staff.unsika.ac.id" 
                  type="email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/30 border border-border text-sm font-medium text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
                />
              </div>
            </div>
            
            <div>
              <label className="text-xs sm:text-sm mb-2 block font-bold text-foreground">Nomor WhatsApp</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  defaultValue="0812-3456-7890" 
                  type="tel"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/30 border border-border text-sm font-medium text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
                />
              </div>
            </div>

          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="p-6 border-t border-border bg-muted/10 flex flex-col sm:flex-row justify-end gap-3">
          <button className="w-full sm:w-auto px-6 py-3 rounded-xl border border-border text-sm font-bold text-foreground hover:bg-muted transition-colors">
            Batal
          </button>
          <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-extrabold flex items-center justify-center gap-2 hover:bg-primary/90 shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5">
            <Save size={16} /> Simpan Perubahan
          </button>
        </div>

      </div>
    </div>
  );
}