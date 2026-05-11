import React, { useState } from "react";
import { BookOpen, Eye, Edit3, Trash2, Copy, Check } from "lucide-react";

export type DosenModule = { 
  id: number; 
  title: string; 
  topic: string; 
  materiCount: number; 
  status: "Publik" | "Draft"; 
  updated: string; 
  code: string; 
  img?: string; 
};

interface LecturerModuleCardProps {
  module: DosenModule;
  onManage: (id: number) => void;
  onEdit: (module: DosenModule) => void;
  onRemove: (id: number) => void;
}

export function LecturerModuleCard({ module: m, onManage, onEdit, onRemove }: LecturerModuleCardProps) {
  const [copied, setCopied] = useState(false);

  // Gambar fallback
  const coverImg = m.img || "https://images.unsplash.com/photo-1559757175-5700dde675bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400";

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(m.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card rounded-2xl sm:rounded-3xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all group flex flex-col h-full">
      
      {/* 1. BAGIAN GAMBAR COVER */}
      <div className="relative aspect-4/3 sm:aspect-video overflow-hidden shrink-0 border-b border-border/50">
        <img 
          src={coverImg} 
          alt={m.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* REVISI: Badge Status (Kiri Atas) */}
        <div className="absolute top-3 left-3 z-10">
           <span className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-extrabold shadow-md backdrop-blur-md ${m.status === "Publik" ? "bg-primary text-white" : "bg-amber-500 text-white"}`}>
             {m.status}
           </span>
        </div>

        {/* REVISI: Badge Topik/Kategori (Kanan Atas) */}
        <div className="absolute top-3 right-3 z-10">
           <span className="hidden sm:inline-block text-xs font-bold bg-background/40 backdrop-blur-sm border border-border/30 px-3 py-1.5 rounded-lg shrink-0 text-foreground shadow-sm">
             {m.topic}
           </span>
        </div>
      </div>

      {/* 2. BAGIAN KONTEN (Informasi Modul) */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        
        <h3 className="text-lg sm:text-xl font-extrabold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
          {m.title}
        </h3>
        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-medium text-muted-foreground mb-4">
          <span className="flex items-center gap-1"><BookOpen size={14} className="text-primary/70" /> {m.materiCount} Materi</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>Diperbarui {m.updated}</span>
        </div>
        
        {/* Kotak Kode */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-border bg-muted/30 mb-5 mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">Kode Kelas:</span>
            <span className="text-xs sm:text-sm font-mono font-extrabold text-primary tracking-widest">{m.code}</span>
          </div>
          <button 
            onClick={handleCopy} 
            className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-colors"
            title="Salin Kode"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>

        {/* 3. BAGIAN TOMBOL AKSI */}
        <div className="flex gap-2.5 shrink-0 pt-4 border-t border-border/50">
          <button 
            onClick={() => onManage(m.id)} 
            className="flex-1 py-2.5 sm:py-3 rounded-xl border border-primary bg-primary/5 text-primary text-xs sm:text-sm font-extrabold hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
          >
            <Eye size={16} /> Kelola Isi
          </button>
          <button 
            onClick={() => onEdit(m)} 
            className="p-2.5 sm:p-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center justify-center shadow-sm" 
            title="Edit Modul"
          >
            <Edit3 size={18} />
          </button>
          <button 
            onClick={() => onRemove(m.id)} 
            className="p-2.5 sm:p-3 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-colors flex items-center justify-center shadow-sm" 
            title="Hapus Modul"
          >
            <Trash2 size={18} />
          </button>
        </div>
        
      </div>
    </div>
  );
}