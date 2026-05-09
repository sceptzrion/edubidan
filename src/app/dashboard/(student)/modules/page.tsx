"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Grid3X3, List, Search, Plus, BookOpen } from "lucide-react";
import { ModuleCard } from "@/components/dashboard/student/ModuleCard";
import { JoinModuleModal } from "@/components/dashboard/student/JoinModuleModal";

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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 text-foreground">Modul Saya</h1>
          <p className="text-muted-foreground text-sm font-medium">{modulesData.length} modul terdaftar di akun Anda.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-auto">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              placeholder="Cari modul..." 
              className="w-full sm:w-60 pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm font-medium transition-all" 
            />
          </div>
          
          <div className="flex items-center gap-2 border border-border bg-card p-1 rounded-xl shrink-0">
            <button onClick={() => setLayout("grid")} className={`p-1.5 rounded-lg transition-colors ${layout === "grid" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              <Grid3X3 size={18} />
            </button>
            <button onClick={() => setLayout("list")} className={`p-1.5 rounded-lg transition-colors ${layout === "list" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              <List size={18} />
            </button>
          </div>
          
          <button
            onClick={() => setJoinOpen(true)}
            className="flex-1 sm:flex-none bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 shadow-md shadow-primary/20 transition-all"
          >
            <Plus size={18} /> Gabung Kelas
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {categories.map(c => (
          <button 
            key={c} 
            onClick={() => setFilter(c)} 
            className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
              filter === c 
              ? "bg-primary text-primary-foreground border-primary shadow-sm" 
              : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className={`w-full ${layout === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-5"}`}>
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
          <div className="col-span-full py-16 text-center bg-card rounded-3xl border border-border border-dashed">
            <BookOpen size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground font-bold text-lg">Tidak ada modul yang ditemukan.</p>
            <p className="text-sm font-medium text-muted-foreground/70 mt-1">Coba gunakan kata kunci lain atau pilih kategori "Semua".</p>
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