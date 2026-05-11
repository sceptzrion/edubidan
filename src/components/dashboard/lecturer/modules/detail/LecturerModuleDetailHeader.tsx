import React, { useState } from "react";
import { Check, Clock, FileText, Target, Users, Copy, Edit3 } from "lucide-react";

interface LecturerModuleDetailHeaderProps {
  info: {
    banner: string;
    topic: string;
    title: string;
    description: string;
    estimatedTime: string;
    objectives: string[];
    instructor: string;
    status: "Publik" | "Draft";
    code: string;
  };
  onEditClick: () => void;
}

export function LecturerModuleDetailHeader({ info, onEditClick }: LecturerModuleDetailHeaderProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard?.writeText(info.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card rounded-2xl sm:rounded-3xl border border-border overflow-hidden mb-6 sm:mb-8 shadow-sm flex flex-col">
      
      {/* ================= AREA BANNER GAMBAR ================= */}
      <div className="relative aspect-21/9 sm:aspect-16/5 bg-linear-to-br from-primary/30 to-teal-300 overflow-hidden">
        <img src={info.banner} alt={info.title} className="w-full h-full object-cover" />
        
        {/* Gradient Overlay Gelap agar teks putih terbaca */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10" />

        {/* Kontrol Kanan Atas (Status & Edit) */}
        <div className="absolute top-4 right-4 flex items-center gap-2 sm:gap-3">
          <span className={`px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-extrabold shadow-sm backdrop-blur-md ${info.status === "Publik" ? "bg-green-500/90 text-white" : "bg-amber-500/90 text-white"}`}>
            {info.status}
          </span>
          <button 
            onClick={onEditClick} 
            className="bg-background/40 hover:bg-background text-foreground px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold flex items-center gap-2 shadow-md backdrop-blur transition-colors"
          >
            <Edit3 size={14} className="sm:w-4 sm:h-4" /> 
            <span className="hidden sm:inline">Edit Info Modul</span>
            <span className="sm:hidden">Edit</span>
          </button>
        </div>

        {/* Judul & Topik Kiri Bawah */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 pr-4 sm:pr-8">
          <span className="inline-block text-[10px] sm:text-xs px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md sm:rounded-lg bg-primary/90 text-white mb-2 sm:mb-2.5 font-extrabold uppercase tracking-wider shadow-sm backdrop-blur-sm">
            {info.topic}
          </span>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-extrabold drop-shadow-lg leading-tight line-clamp-2">
            {info.title}
          </h1>
        </div>
      </div>

      {/* ================= AREA INFORMASI BAWAH ================= */}
      <div className="p-5 sm:p-6 md:p-8">
        
        {/* Deskripsi */}
        <p className="text-xs sm:text-base text-muted-foreground font-medium leading-relaxed mb-6 sm:mb-8 max-w-4xl">
          {info.description}
        </p>

        {/* Grid Detail (Durasi, Materi, Instruktur) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-muted/50 border border-border/50">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center shrink-0"><Clock size={16} className="sm:w-4.5 sm:h-4.5" /></div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs text-muted-foreground font-bold tracking-wider mb-0.5 truncate">Estimasi Waktu</p>
              <p className="text-xs sm:text-sm font-extrabold text-foreground truncate">{info.estimatedTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-muted/50 border border-border/50">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center shrink-0"><FileText size={16} className="sm:w-4.5 sm:h-4.5" /></div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs text-muted-foreground font-bold tracking-wider mb-0.5 truncate">Jumlah Materi</p>
              <p className="text-xs sm:text-sm font-extrabold text-foreground truncate">4 Materi & 1 Kuis</p>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-muted/50 border border-border/50">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0"><Users size={16} className="sm:w-4.5 sm:h-4.5" /></div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs text-muted-foreground font-bold tracking-wider mb-0.5 truncate">Instruktur</p>
              <p className="text-xs sm:text-sm font-extrabold text-foreground truncate">{info.instructor}</p>
            </div>
          </div>
        </div>

        {/* Grid Bawah: Tujuan & Kode Kelas */}
        <div className="grid lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          
          {/* Tujuan Pembelajaran */}
          <div className="lg:col-span-2 rounded-2xl border border-border p-4 sm:p-6 bg-card shadow-sm">
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4 border-b border-border/50 pb-3">
              <Target size={16} className="sm:w-4.5 sm:h-4.5 text-primary" />
              <h3 className="text-sm sm:text-base font-extrabold text-foreground">Tujuan Pembelajaran Modul</h3>
            </div>
            <ul className="space-y-2.5 sm:space-y-3">
              {info.objectives.map((o, i) => (
                <li key={i} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                  <div className="mt-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check size={8} className="sm:w-2.5 sm:h-2.5 text-primary" />
                  </div>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Kotak Kode Kelas Dosen */}
          <div className="lg:col-span-1 flex flex-col justify-center items-center text-center p-6 rounded-2xl bg-primary/5 border border-primary/20 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
             
             <p className="text-[10px] sm:text-xs text-muted-foreground font-bold uppercase tracking-wider mb-2 relative z-10">Kode Akses Kelas</p>
             <p className="text-2xl sm:text-3xl font-mono tracking-widest font-extrabold text-primary mb-5 relative z-10">{info.code}</p>
             <button 
               onClick={onCopy} 
               className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 sm:py-3.5 rounded-xl font-bold transition-all hover:bg-primary/90 hover:-translate-y-0.5 shadow-md shadow-primary/20 text-xs sm:text-sm relative z-10"
             >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Berhasil Disalin!" : "Salin Kode Modul"}
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}