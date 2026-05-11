"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation"; // <-- PASTIKAN useParams DIIMPORT
import { ArrowLeft, FileText, Users } from "lucide-react";

import { LecturerModuleDetailHeader } from "@/components/dashboard/lecturer/modules/detail/LecturerModuleDetailHeader";
import { ParticipantsTab } from "@/components/dashboard/lecturer/modules/detail/ParticipantsTab";
import { PlaylistTab } from "@/components/dashboard/lecturer/modules/detail/PlaylistTab";
import { EditInfoModal } from "@/components/dashboard/lecturer/modules/detail/EditInfoModal";

// --- DUMMY DATA INITIAL INFO ---
const initialInfo = {
  banner: "https://images.unsplash.com/photo-1559757175-5700dde675bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  topic: "Pemeriksaan Kehamilan",
  title: "ANC Terpadu Trimester 1",
  description: "Modul komprehensif yang membahas pemeriksaan antenatal terpadu pada trimester pertama, mencakup anamnesis, pemeriksaan fisik, hingga edukasi tanda bahaya kehamilan.",
  objectives: [
    "Memahami konsep & alur Antenatal Care (ANC) terpadu sesuai standar",
    "Mampu melakukan anamnesis & pemeriksaan fisik ibu hamil",
    "Mengenali tanda bahaya kehamilan dan langkah rujukan"
  ],
  estimatedTime: "6 Jam",
  instructor: "Dr. Rina Hartati, M.Keb",
  status: "Publik" as "Publik" | "Draft",
  code: "BIDAN-X7A",
};

export default function LecturerModuleEditorPage() {
  const router = useRouter();
  const params = useParams(); // <-- AMBIL PARAMETER DARI URL
  const moduleId = params.id as string; // <-- SIMPAN ID MODUL

  const [tab, setTab] = useState<"materi" | "peserta">("materi");
  const [info, setInfo] = useState(initialInfo);
  const [editInfoOpen, setEditInfoOpen] = useState(false);

  useEffect(() => {
    document.title = "Editor Modul | Dosen EduBidan";
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10 sm:pb-12">
      
      {/* Tombol Kembali */}
      <button 
        onClick={() => router.push("/dashboard/lecturer/modules")} 
        className="flex items-center gap-2 text-xs sm:text-sm font-bold text-muted-foreground hover:text-foreground mb-6 sm:mb-8 transition-colors bg-muted/30 hover:bg-muted w-fit px-4 py-2.5 rounded-xl border border-border/50"
      >
        <ArrowLeft size={16} /> Kembali ke Daftar Modul
      </button>

      {/* COMPONENT: HEADER MODUL */}
      <LecturerModuleDetailHeader 
        info={info} 
        onEditClick={() => setEditInfoOpen(true)} 
      />

      {/* TAB NAVIGASI KONTEN (Playlist / Peserta) */}
      <div className="flex gap-2 sm:gap-4 border-b border-border mb-6 sm:mb-8 overflow-x-auto scrollbar-none">
        <button 
          onClick={() => setTab("materi")} 
          className={`px-4 sm:px-6 py-3 text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap border-b-2 font-extrabold ${
            tab === "materi" 
            ? "border-primary text-primary" 
            : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
          }`}
        >
          <FileText size={18} /> Editor Materi & Kuis
        </button>
        <button 
          onClick={() => setTab("peserta")} 
          className={`px-4 sm:px-6 py-3 text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap border-b-2 font-extrabold ${
            tab === "peserta" 
            ? "border-primary text-primary" 
            : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
          }`}
        >
          <Users size={18} /> Manajemen Peserta
        </button>
      </div>

      {/* RENDER KONTEN TAB */}
      {/* PERBAIKAN: Lempar moduleId ke dalam PlaylistTab */}
      {tab === "materi" && <PlaylistTab moduleId={moduleId} />}
      {tab === "peserta" && <ParticipantsTab />}

      {/* COMPONENT: MODAL EDIT INFO */}
      {editInfoOpen && (
        <EditInfoModal 
          info={info} 
          onSave={(v: typeof info) => { setInfo(v); setEditInfoOpen(false); }} 
          onClose={() => setEditInfoOpen(false)} 
        />
      )}

    </div>
  );
}