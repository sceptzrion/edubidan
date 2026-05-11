"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Save, BookOpen } from "lucide-react";

type DosenModule = { 
  id: number; 
  title: string; 
  topic: string; 
  materiCount: number; 
  status: "Publik" | "Draft"; 
  updated: string; 
  code: string; 
};

interface ModuleFormModalProps {
  isOpen: boolean;
  editing: DosenModule | null;
  topics: string[];
  onClose: () => void;
  onSave: (form: { title: string; topic: string; status: "Publik" | "Draft" }) => void;
}

export function ModuleFormModal({ isOpen, editing, topics, onClose, onSave }: ModuleFormModalProps) {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ 
    title: "", 
    topic: topics[0] || "", 
    status: "Draft" as "Publik" | "Draft" 
  });

  // Mencegah Hydration Mismatch
  useEffect(() => setMounted(true), []);
  
  // Update state form ketika modal dibuka (baik untuk tambah baru maupun edit)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Kunci scroll background
      if (editing) {
        setForm({ title: editing.title, topic: editing.topic, status: editing.status });
      } else {
        setForm({ title: "", topic: topics[0], status: "Draft" });
      }
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen, editing, topics]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6">
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose} />
      
      {/* Container Modal */}
      <div className="bg-card rounded-2xl sm:rounded-3xl border border-border w-full max-w-lg relative z-10 animate-in zoom-in-95 duration-200 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-border shrink-0 bg-card z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <BookOpen size={20} />
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-foreground">
              {editing ? "Edit Modul" : "Tambah Modul Baru"}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted text-muted-foreground hover:text-foreground rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>
        
        {/* Form Content (Bisa di-scroll jika panjang) */}
        <div className="p-5 sm:p-6 space-y-5 sm:space-y-6 overflow-y-auto scrollbar-thin bg-muted/20">
          
          <div>
            <label className="text-xs sm:text-sm mb-2.5 block font-bold text-foreground">Judul Modul</label>
            <input 
              value={form.title} 
              onChange={(e) => setForm({ ...form, title: e.target.value })} 
              placeholder="Contoh: ANC Terpadu Trimester 1" 
              className="w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-card border border-border text-sm text-foreground font-bold outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm" 
            />
          </div>
          
          <div>
            <label className="text-xs sm:text-sm mb-2.5 block font-bold text-foreground">Topik Utama</label>
            <select 
              value={form.topic} 
              onChange={(e) => setForm({ ...form, topic: e.target.value })} 
              className="w-full px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-card border border-border text-foreground text-sm font-bold outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer shadow-sm"
            >
              {topics.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          
          <div>
            <label className="text-xs sm:text-sm mb-2.5 block font-bold text-foreground">Status Akses</label>
            <div className="flex gap-3">
              {(["Draft", "Publik"] as const).map(s => (
                <button 
                  key={s} 
                  onClick={() => setForm({ ...form, status: s })} 
                  className={`flex-1 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl border-2 text-sm font-extrabold transition-all ${
                    form.status === s 
                    ? "border-primary bg-primary/10 text-primary shadow-sm" 
                    : "border-border bg-card text-muted-foreground hover:bg-muted"
                  }`} 
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 font-medium">
              *Draft: Modul disembunyikan. Publik: Modul dapat diakses mahasiswa.
            </p>
          </div>

        </div>
        
        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-border flex gap-3 sm:gap-4 shrink-0 bg-card rounded-b-2xl sm:rounded-3xl z-20">
          <button 
            onClick={onClose} 
            className="flex-1 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl border border-border text-xs sm:text-sm font-bold text-foreground hover:bg-muted transition-colors"
          >
            Batal
          </button>
          <button 
            onClick={() => {
              if(!form.title.trim()) { alert("Judul modul tidak boleh kosong!"); return; }
              onSave(form);
            }} 
            className="flex-1 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-primary text-primary-foreground text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
          >
            <Save size={18} className="sm:w-5 sm:h-5" /> {editing ? "Simpan Perubahan" : "Simpan Modul"}
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}