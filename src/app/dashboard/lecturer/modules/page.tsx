"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import { ModuleFormModal } from "@/components/dashboard/lecturer/modules/ModuleFormModal";
import { LecturerModuleCard, DosenModule } from "@/components/dashboard/lecturer/modules/LecturerModuleCard";
import { LecturerModuleHeader } from "@/components/dashboard/lecturer/modules/LecturerModuleHeader";

// --- DUMMY DATA ---
const TOPICS = ["Pemeriksaan Kehamilan", "Perawatan Bayi Baru Lahir", "Teknik Menyusui"];

const initialModules: DosenModule[] = [
  { id: 1, title: "ANC Terpadu Trimester 1", topic: "Pemeriksaan Kehamilan", materiCount: 6, status: "Publik", updated: "20 Apr 2026", code: "BIDAN-X7A" },
  { id: 2, title: "APGAR Score & Resusitasi", topic: "Perawatan Bayi Baru Lahir", materiCount: 4, status: "Publik", updated: "18 Apr 2026", code: "BIDAN-K2B" },
  { id: 3, title: "Inisiasi Menyusu Dini", topic: "Teknik Menyusui", materiCount: 3, status: "Draft", updated: "15 Apr 2026", code: "BIDAN-IMD" },
];

function genCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 3; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `BIDAN-${s}`;
}

export default function LecturerModulesPage() {
  const router = useRouter();
  const [modules, setModules] = useState(initialModules);
  const [search, setSearch] = useState("");
  
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<DosenModule | null>(null);

  useEffect(() => {
    document.title = "Modul Pembelajaran | Dosen EduBidan";
  }, []);

  const handleSave = (form: { title: string; topic: string; status: "Publik" | "Draft" }) => {
    if (editing) {
      setModules(modules.map(m => m.id === editing.id ? { ...m, ...form } : m));
    } else {
      setModules([{ id: Date.now(), title: form.title || "Modul Baru", topic: form.topic, materiCount: 0, status: form.status, updated: "Hari ini", code: genCode() }, ...modules]);
    }
    setOpen(false);
  };

  const handleRemove = (id: number) => {
    if(window.confirm("Apakah Anda yakin ingin menghapus modul ini?")) {
      setModules(modules.filter(m => m.id !== id));
    }
  };

  // REVISI: Logika pencarian sekarang mengecek title ATAU code kelas
  const filtered = modules.filter(m => 
    m.title.toLowerCase().includes(search.toLowerCase()) || 
    m.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10 sm:pb-12">
      
      {/* HEADER & SEARCH BAR */}
      <LecturerModuleHeader 
        search={search} 
        onSearchChange={setSearch} 
        onAddClick={() => { setEditing(null); setOpen(true); }} 
      />

      {/* MODULE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filtered.map(m => (
          <LecturerModuleCard 
            key={m.id} 
            module={m} 
            onManage={(id) => router.push(`/dashboard/lecturer/modules/${id}`)}
            onEdit={(mod) => { setEditing(mod); setOpen(true); }}
            onRemove={handleRemove}
          />
        ))}
        {filtered.length === 0 && (
           <div className="col-span-full py-16 text-center bg-card rounded-3xl border border-border border-dashed p-6">
             <BookOpen size={40} className="mx-auto text-muted-foreground/30 mb-4" />
             <p className="text-foreground font-extrabold text-lg mb-1">Modul tidak ditemukan.</p>
             <p className="text-sm font-medium text-muted-foreground">Silakan coba kata kunci atau kode kelas yang lain.</p>
           </div>
        )}
      </div>

      <ModuleFormModal 
        isOpen={open}
        editing={editing}
        topics={TOPICS}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />

    </div>
  );
}