"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, BookOpen, HelpCircle, Mail, Search, Users } from "lucide-react";
import { ModuleDetailHeader } from "@/components/dashboard/student/ModuleDetailHeader";
import { PlaylistItem } from "@/components/dashboard/student/PlaylistItem";
import { TaskItem } from "@/components/dashboard/student/TaskItem";
import { InstructorCard } from "@/components/dashboard/student/InstructorCard";
import { ParticipantItem } from "@/components/dashboard/student/ParticipantItem";

// --- DUMMY DATA ---
type PlaylistDataType = {
  id: number;
  kind: "materi" | "kuis";
  title: string;
  duration: string;
  objectivesCount?: number; 
  toolsCount?: number;      
  isCompleted: boolean;
};

const playlistData: PlaylistDataType[] = [
  { id: 1, kind: "materi", title: "Pengantar ANC Terpadu", duration: "12:30 Menit", objectivesCount: 3, toolsCount: 2, isCompleted: true },
  { id: 2, kind: "materi", title: "Anamnesis Ibu Hamil", duration: "15:45 Menit", objectivesCount: 4, toolsCount: 2, isCompleted: true },
  { id: 3, kind: "kuis", title: "Kuis Cek Pemahaman: Anamnesis", duration: "10 Soal • 15 Menit", isCompleted: false },
  { id: 4, kind: "materi", title: "Pemeriksaan Fisik Head to Toe", duration: "14:15 Menit", objectivesCount: 3, toolsCount: 4, isCompleted: false },
  { id: 5, kind: "kuis", title: "Evaluasi Akhir Modul", duration: "25 Soal • 45 Menit", isCompleted: false },
];

const pesertaData = [
  { id: 1, name: "Sari Dewi", email: "sari.dewi@student.unsika.ac.id" },
  { id: 2, name: "Anisa Putri", email: "anisa.putri@student.unsika.ac.id" },
  { id: 3, name: "Rina Lestari", email: "rina.lestari@student.unsika.ac.id" },
  { id: 4, name: "Maya Sari", email: "maya.sari@student.unsika.ac.id" },
];

const moduleInfo = {
  banner: "https://images.unsplash.com/photo-1559757175-5700dde675bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  category: "Kehamilan",
  title: "ANC Terpadu Trimester 1",
  progress: 75,
  description: "Modul komprehensif yang membahas pemeriksaan antenatal terpadu pada trimester pertama, mencakup anamnesis, pemeriksaan fisik, hingga edukasi tanda bahaya kehamilan.",
  objectives: [
    "Memahami konsep & alur Antenatal Care (ANC) terpadu sesuai standar Kemenkes RI",
    "Mampu melakukan anamnesis & pemeriksaan fisik ibu hamil trimester 1",
    "Mengenali tanda bahaya kehamilan dan langkah rujukan",
    "Mendokumentasikan hasil pemeriksaan pada Buku KIA & kohort",
  ],
  estimatedTime: "120 Menit",
  instructor: { name: "Dr. Rina Hartati, M.Keb", email: "rina.hartati@unsika.ac.id" }
};

export default function StudentModuleDetail() {
  const router = useRouter();
  const params = useParams(); // REVISI: Mengambil parameter URL
  const [tab, setTab] = useState<"pembelajaran" | "tugas" | "peserta">("pembelajaran");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = `${moduleInfo.title} | EduBidan`;
  }, []);

  const kuisOnly = playlistData.filter(item => item.kind === "kuis");

  const q = searchQuery.toLowerCase();
  const filteredPlaylist = playlistData.filter(item => item.title.toLowerCase().includes(q));
  const filteredKuis = kuisOnly.filter(item => item.title.toLowerCase().includes(q));
  const filteredPeserta = pesertaData.filter(item => item.name.toLowerCase().includes(q) || item.email.toLowerCase().includes(q));

  const getSearchPlaceholder = () => {
    switch (tab) {
      case "pembelajaran": return "Cari materi atau kuis...";
      case "tugas": return "Cari tugas evaluasi...";
      case "peserta": return "Cari peserta...";
      default: return "Cari...";
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      <button 
        onClick={() => router.push("/dashboard/modules")} 
        className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-muted-foreground hover:text-foreground mb-4 sm:mb-6 transition-colors w-fit"
      >
        <ArrowLeft size={16} /> Kembali ke Daftar Modul
      </button>

      {/* --- KOMPONEN HEADER BANNER --- */}
      <ModuleDetailHeader info={moduleInfo} />

      {/* --- TABS NAVIGASI & SEARCH BAR --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border mb-8 pb-1 sm:pb-0">
        <div className="flex gap-1 sm:gap-2 overflow-x-auto scrollbar-none w-full md:w-auto">
          {/* REVISI: px, py, text, dan icon dikecilkan lagi di mobile agar garis indikator lebih proporsional */}
          <button 
            onClick={() => setTab("pembelajaran")} 
            className={`px-3 py-2.5 sm:px-5 sm:py-4 text-[11px] sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 sm:gap-2 ${tab === "pembelajaran" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            <BookOpen size={14} className="sm:w-4.25 sm:h-4.25" /> Daftar Pembelajaran
          </button>
          
          <button 
            onClick={() => setTab("tugas")} 
            className={`px-3 py-2.5 sm:px-5 sm:py-4 text-[11px] sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 sm:gap-2 ${tab === "tugas" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            <HelpCircle size={14} className="sm:w-4.25 sm:h-4.25" /> Tugas & Evaluasi
          </button>
          
          <button 
            onClick={() => setTab("peserta")} 
            className={`px-3 py-2.5 sm:px-5 sm:py-4 text-[11px] sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 sm:gap-2 ${tab === "peserta" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            <Users size={14} className="sm:w-4.25 sm:h-4.25" /> Peserta
          </button>
        </div>
        
        {/* Kolom Search (Sudah dirampingkan untuk mobile) */}
        <div className="relative w-full md:w-64 md:mb-1">
          <Search size={14} className="sm:w-4 sm:h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={getSearchPlaceholder()}
            className="w-full pl-9 pr-4 py-2 sm:py-2.5 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[10px] sm:text-xs font-medium transition-all" 
          />
        </div>
      </div>

      {/* --- KONTEN TABS --- */}
      
      {/* TAB 1: DAFTAR PEMBELAJARAN */}
      {tab === "pembelajaran" && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          {filteredPlaylist.length > 0 ? filteredPlaylist.map((item) => (
            <PlaylistItem 
              key={item.id} 
              item={item} 
              // REVISI: Mengarahkan pengguna ke halaman lesson
              onClick={() => router.push(`/dashboard/modules/${params.id}/lesson/${item.id}`)} 
            />
          )) : (
            <p className="text-center text-sm text-muted-foreground py-10">Pencarian tidak ditemukan.</p>
          )}
        </div>
      )}

      {/* TAB 2: TUGAS & EVALUASI */}
      {tab === "tugas" && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          {filteredKuis.length > 0 ? filteredKuis.map((item) => (
            <TaskItem 
              key={item.id} 
              item={item} 
              // REVISI: Mengarahkan pengguna ke halaman lesson (standby kuis)
              onClick={() => router.push(`/dashboard/modules/${params.id}/lesson/${item.id}`)} 
            />
          )) : (
            <p className="text-center text-sm text-muted-foreground py-10">Pencarian tidak ditemukan.</p>
          )}
        </div>
      )}

      {/* TAB 3: ANGGOTA KELAS */}
      {tab === "peserta" && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          
          {/* REVISI MOBILE: text-sm diturunkan ke text-xs di HP, mb-4 jadi mb-3 */}
          <h2 className="text-xs sm:text-sm font-extrabold text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4 px-1.5">Instruktur</h2>
          <InstructorCard instructor={moduleInfo.instructor} />

          <h2 className="text-xs sm:text-sm font-extrabold text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4 px-1.5">Peserta ({filteredPeserta.length})</h2>
          
          {/* REVISI MOBILE: rounded-3xl jadi rounded-2xl di HP agar tidak terlalu membulat */}
          <div className="bg-card rounded-2xl sm:rounded-3xl border border-border overflow-hidden shadow-sm">
            {filteredPeserta.length > 0 ? filteredPeserta.map((p, idx) => (
              <ParticipantItem 
                key={p.id} 
                participant={p} 
                isLast={idx === filteredPeserta.length - 1} 
              />
            )) : (
               <p className="text-center text-xs sm:text-sm text-muted-foreground py-6 sm:py-8">Peserta tidak ditemukan.</p>
            )}
          </div>

        </div>
      )}

    </div>
  );
}