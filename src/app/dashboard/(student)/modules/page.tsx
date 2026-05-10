"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Grid3X3, List, Search, Plus, BookOpen } from "lucide-react";
import { ModuleCard } from "@/components/dashboard/student/modules/ModuleCard";
import { JoinModuleModal } from "@/components/dashboard/student/modules/JoinModuleModal";

// Data Dummy 
const modulesData = [
  { id: 1, title: "Pemeriksaan Kehamilan Trimester 1", desc: "ANC terpadu dan pemeriksaan fisik ibu hamil", img: "https://images.unsplash.com/photo-1632053651899-3389100579fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", progress: 75, lessons: 12, duration: "120 Menit", category: "Kehamilan", instructor: "Siti Aminah, M.Keb" },
  { id: 2, title: "Pemeriksaan Kehamilan Trimester 2-3", desc: "Leopold, DJJ, dan deteksi risiko tinggi", img: "https://images.unsplash.com/photo-1632053651899-3389100579fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", progress: 30, lessons: 10, duration: "90 Menit", category: "Kehamilan", instructor: "Dr. Budi Santoso, Sp.OG" },
  { id: 3, title: "Perawatan Bayi Baru Lahir", desc: "Golden hour, IMD, dan perawatan tali pusat", img: "https://images.unsplash.com/photo-1701557774684-a5d563c46c1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", progress: 45, lessons: 9, duration: "80 Menit", category: "Bayi Baru Lahir", instructor: "Rina Melati, S.ST., M.Kes" },
  { id: 4, title: "APGAR Score & Resusitasi", desc: "Penilaian awal bayi dan penanganan asfiksia", img: "https://images.unsplash.com/photo-1701557774684-a5d563c46c1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", progress: 0, lessons: 8, duration: "60 Menit", category: "Bayi Baru Lahir", instructor: "Dr. Laila Nurul, Sp.A" },
  { id: 5, title: "Teknik Menyusui Efektif", desc: "Posisi, perlekatan, dan manajemen pemberian ASI", img: "https://images.unsplash.com/photo-1632053002434-b203dc8efb37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", progress: 20, lessons: 8, duration: "60 Menit", category: "Menyusui", instructor: "Nia Kurniawati, Amd.Keb" },
];

export default function StudentModulesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  
  // State untuk mengontrol Modal
  const [joinOpen, setJoinOpen] = useState(false);

  useEffect(() => {
    document.title = "Modul Saya | EduBidan";
  }, []);

  const categories = ["Semua", "Kehamilan", "Bayi Baru Lahir", "Menyusui"];
  const filtered = modulesData.filter(m => (filter === "Semua" || m.category === filter) && m.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10 sm:pb-12">
      
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
        
        {/* Teks Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1.5 sm:mb-2 text-foreground">Modul Saya</h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
            {modulesData.length} modul terdaftar di akun Anda.
          </p>
        </div>
        
        {/* Kontrol Kanan (Search, Layout Toggle, Tambah Modul) */}
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-2.5 sm:gap-3">
          
          {/* Kolom Pencarian */}
          <div className="relative w-full sm:w-auto flex-1 sm:flex-none">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground sm:w-4.5 sm:h-4.5" />
            <input 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              placeholder="Cari modul..." 
              className="w-full sm:w-60 pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-xs sm:text-sm font-bold text-foreground transition-all shadow-sm" 
            />
          </div>
          
          {/* Toggle Grid/List */}
          <div className="flex items-center gap-1 border border-border bg-card p-1 sm:p-1.5 rounded-xl sm:rounded-2xl shrink-0 shadow-sm">
            <button 
              onClick={() => setLayout("grid")} 
              className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-colors ${layout === "grid" ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
            >
              <Grid3X3 size={16} className="sm:w-4.5 sm:h-4.5" />
            </button>
            <button 
              onClick={() => setLayout("list")} 
              className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-colors ${layout === "list" ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
            >
              <List size={16} className="sm:w-4.5 sm:h-4.5" />
            </button>
          </div>
          
          {/* Tombol Gabung */}
          <button
            onClick={() => setJoinOpen(true)}
            className="w-full sm:w-auto bg-primary text-primary-foreground px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 shrink-0"
          >
            <Plus size={16} className="sm:w-4.5 sm:h-4.5" /> Gabung Kelas
          </button>
        </div>
      </div>

      {/* FILTER KATEGORI */}
      <div className="flex gap-2 sm:gap-2.5 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(c => (
          <button 
            key={c} 
            onClick={() => setFilter(c)} 
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all border ${
              filter === c 
              ? "bg-foreground text-background border-foreground shadow-md" 
              : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:bg-muted/50 hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* GRID / LIST MODUL */}
      <div className={`w-full ${layout === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6" : "flex flex-col gap-4 sm:gap-5"}`}>
        {filtered.length > 0 ? (
          filtered.map(m => (
            <ModuleCard 
              key={m.id} 
              data={m} 
              layout={layout} 
              onClick={() => router.push(`/dashboard/modules/${m.id}`)} 
            />
          ))
        ) : (
          <div className="col-span-full py-12 sm:py-16 text-center bg-card rounded-2xl sm:rounded-3xl border border-border border-dashed p-6">
            <BookOpen size={40} className="mx-auto text-muted-foreground/30 mb-3 sm:mb-4 sm:w-12 sm:h-12" />
            <p className="text-foreground font-extrabold text-base sm:text-lg mb-1">Tidak ada modul yang ditemukan.</p>
            <p className="text-xs sm:text-sm font-medium text-muted-foreground leading-relaxed">
              Coba gunakan kata kunci lain atau pilih kategori "Semua".
            </p>
          </div>
        )}
      </div>

      {/* --- MEMANGGIL KOMPONEN MODAL --- */}
      <JoinModuleModal 
        isOpen={joinOpen} 
        onClose={() => setJoinOpen(false)} 
      />

    </div>
  );
}