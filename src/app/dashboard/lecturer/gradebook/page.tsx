"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, GraduationCap, ClipboardList } from "lucide-react";

// --- DUMMY DATA ---
const modules = [
  { id: 1, title: "ANC Terpadu Trimester 1", topic: "Pemeriksaan Kehamilan", students: 45, quizzes: 3 },
  { id: 2, title: "APGAR Score & Resusitasi", topic: "Perawatan Bayi Baru Lahir", students: 38, quizzes: 2 },
  { id: 3, title: "Inisiasi Menyusu Dini", topic: "Teknik Menyusui", students: 27, quizzes: 2 },
];

export default function LecturerGradebookPage() {
  const router = useRouter();

  useEffect(() => {
    document.title = "Rekap Nilai | Dosen EduBidan";
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10 sm:pb-12">
      
      {/* HEADER */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2">Rekap Nilai</h1>
        <p className="text-sm font-medium text-muted-foreground">
          Pilih salah satu modul untuk melihat buku nilai lengkap mahasiswanya.
        </p>
      </div>

      {/* GRID MODULES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {modules.map((m) => (
          <div 
            key={m.id} 
            className="bg-card rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-6 hover:shadow-lg hover:border-primary/30 transition-all flex flex-col group"
          >
            {/* Header Card: Icon & Jumlah Kuis */}
            <div className="flex items-start justify-between mb-4 sm:mb-5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                <BookOpen size={20} className="sm:w-6 sm:h-6" />
              </div>
              <span className="text-xs font-bold text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-border/50">
                {m.quizzes} Kuis
              </span>
            </div>
            
            {/* Info Modul */}
            <p className="text-[10px] sm:text-xs text-primary font-extrabold mb-1.5 uppercase tracking-wider">
              {m.topic}
            </p>
            <h3 className="text-lg sm:text-xl font-extrabold text-foreground mb-4 leading-snug line-clamp-2">
              {m.title}
            </h3>
            
            {/* Total Mahasiswa */}
            <div className="flex items-center gap-3 mb-5 sm:mb-6 px-4 py-3 rounded-xl bg-muted/40 border border-border/50">
              <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center shrink-0 shadow-sm">
                <GraduationCap size={16} className="text-primary" />
              </div>
              <span className="text-sm font-extrabold text-foreground">
                Total: {m.students} Mahasiswa
              </span>
            </div>
            
            {/* Tombol Aksi */}
            <button
              onClick={() => router.push(`/dashboard/lecturer/gradebook/${m.id}`)}
              className="mt-auto w-full py-3 rounded-xl border-2 border-primary text-primary text-xs sm:text-sm font-extrabold hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <ClipboardList size={16} /> Lihat Buku Nilai
            </button>
          </div>
        ))}
      </div>
      
      {/* State Kosong (Jaga-jaga jika data kosong) */}
      {modules.length === 0 && (
        <div className="py-16 text-center border-2 border-dashed border-border rounded-3xl bg-muted/20">
          <BookOpen size={48} className="mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-foreground font-extrabold text-lg mb-1">Belum ada modul aktif</p>
          <p className="text-sm font-medium text-muted-foreground">Silakan buat modul pembelajaran terlebih dahulu.</p>
        </div>
      )}

    </div>
  );
}