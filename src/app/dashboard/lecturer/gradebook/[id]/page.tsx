"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Download, Search, GraduationCap } from "lucide-react";

// --- DUMMY DATA ---
type ModuleData = {
  id: number;
  title: string;
  topic: string;
  quizzes: string[];
  students: { name: string; nim: string; scores: (number | null)[] }[];
};

const MODULES: Record<string, ModuleData> = {
  "1": {
    id: 1,
    title: "ANC Terpadu Trimester 1",
    topic: "Pemeriksaan Kehamilan",
    quizzes: ["Kuis Anamnesis", "Kuis Leopold", "Kuis Akhir Modul"],
    students: [
      { name: "Sari Dewi", nim: "2024010101", scores: [88, 92, 90] },
      { name: "Anisa Putri", nim: "2024010102", scores: [78, 82, 88] },
      { name: "Rina Lestari", nim: "2024010103", scores: [60, 65, 64] },
      { name: "Lina Marlina", nim: "2024010104", scores: [95, 90, 100] },
      { name: "Maya Sari", nim: "2024010105", scores: [70, 75, 71] },
      { name: "Dewi Anggraini", nim: "2024010106", scores: [82, 80, 85] },
      { name: "Putri Maharani", nim: "2024010107", scores: [55, 60, null] },
    ],
  },
  "2": {
    id: 2,
    title: "APGAR Score & Resusitasi",
    topic: "Perawatan Bayi Baru Lahir",
    quizzes: ["Kuis APGAR", "Kuis Akhir Modul"],
    students: [
      { name: "Sari Dewi", nim: "2024010101", scores: [85, 90] },
      { name: "Rina Lestari", nim: "2024010103", scores: [62, 68] },
      { name: "Lina Marlina", nim: "2024010104", scores: [92, 95] },
    ],
  },
  "3": {
    id: 3,
    title: "Inisiasi Menyusu Dini",
    topic: "Teknik Menyusui",
    quizzes: ["Kuis IMD", "Kuis Akhir Modul"],
    students: [
      { name: "Anisa Putri", nim: "2024010102", scores: [80, 86] },
      { name: "Maya Sari", nim: "2024010105", scores: [72, 78] },
    ],
  },
};

const PASS_THRESHOLD = 70;

export default function LecturerGradebookDetailPage() {
  const router = useRouter();
  const params = useParams();
  
  // Mengambil ID dari URL, default ke "1" jika tidak ditemukan
  const moduleId = (params.id as string) ?? "1";
  const data = MODULES[moduleId] ?? MODULES["1"];
  
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = `Buku Nilai: ${data.title} | Dosen EduBidan`;
  }, [data.title]);

  // Logika Pencarian & Kalkulasi Rata-rata
  const rows = useMemo(() => {
    return data.students.map(s => {
      const valid = s.scores.filter((v): v is number => typeof v === "number");
      const avg = valid.length ? valid.reduce((a, b) => a + b, 0) / valid.length : 0;
      const status: "Lulus" | "Mengulang" = avg >= PASS_THRESHOLD ? "Lulus" : "Mengulang";
      return { ...s, avg, status };
    }).filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.nim.includes(search));
  }, [data, search]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10 sm:pb-12">
      
      {/* Tombol Kembali */}
      <button 
        onClick={() => router.push("/dashboard/lecturer/gradebook")} 
        className="flex items-center gap-2 text-xs sm:text-sm font-bold text-muted-foreground hover:text-foreground mb-6 sm:mb-8 transition-colors bg-muted/30 hover:bg-muted w-fit px-4 py-2.5 rounded-xl border border-border/50"
      >
        <ArrowLeft size={16} /> Kembali ke Rekap Nilai
      </button>

      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <span className="text-xs text-primary font-bold uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-lg">
            {data.topic}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-3 leading-tight">
            Buku Nilai: {data.title}
          </h1>
          <p className="text-sm font-medium text-muted-foreground mt-2 flex items-center gap-2">
            <GraduationCap size={16} className="text-primary" /> 
            {data.students.length} Mahasiswa terdaftar • {data.quizzes.length} Kuis evaluasi
          </p>
        </div>
      </div>

      {/* Container Tabel Utama */}
      <div className="bg-card rounded-2xl sm:rounded-3xl border border-border shadow-sm overflow-hidden flex flex-col">
        
        {/* Toolbar: Search & Export */}
        <div className="p-4 sm:p-5 border-b border-border flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-muted/10">
          <div className="flex-1 w-full relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama mahasiswa atau NIM..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-card border border-border text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm transition-all"
            />
          </div>
          <button className="w-full sm:w-auto px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-extrabold flex items-center justify-center gap-2 hover:bg-primary/90 shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5">
            <Download size={16} /> <span className="hidden sm:inline">Ekspor CSV/Excel</span><span className="sm:hidden">Ekspor Data</span>
          </button>
        </div>

        {/* Tabel Data (Scrollable H-axis) */}
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {/* Sticky Column untuk Nama Mahasiswa */}
                <th className="text-left p-4 sm:px-6 text-muted-foreground sticky left-0 bg-muted/95 backdrop-blur-sm z-10 font-bold uppercase tracking-wider text-xs border-r border-border/50 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                  Mahasiswa
                </th>
                <th className="text-left p-4 sm:px-6 text-muted-foreground font-bold uppercase tracking-wider text-xs">
                  NIM
                </th>
                
                {/* Header Dinamis untuk Kuis */}
                {data.quizzes.map((q, i) => (
                  <th key={i} className="text-center p-4 sm:px-6 text-muted-foreground font-medium">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-primary mb-1">Kuis {i + 1}</div>
                    <div className="text-xs truncate max-w-30 mx-auto" title={q}>{q}</div>
                  </th>
                ))}
                
                <th className="text-center p-4 sm:px-6 text-muted-foreground bg-primary/5 font-bold uppercase tracking-wider text-xs border-l border-border/50">
                  Nilai Rata-rata
                </th>
                <th className="text-center p-4 sm:px-6 text-muted-foreground font-bold uppercase tracking-wider text-xs">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.nim} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors group">
                  
                  {/* Sticky Column Mahasiswa */}
                  <td className="p-4 sm:px-6 sticky left-0 bg-card group-hover:bg-muted/30 transition-colors z-10 border-r border-border/50 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-primary to-teal-500 flex items-center justify-center text-white text-xs sm:text-sm font-extrabold shadow-sm shrink-0">
                        {r.name.charAt(0)}
                      </div>
                      <span className="font-extrabold text-foreground text-xs sm:text-sm">{r.name}</span>
                    </div>
                  </td>
                  
                  <td className="p-4 sm:px-6 text-muted-foreground font-mono font-medium text-xs sm:text-sm">{r.nim}</td>
                  
                  {/* Sel Nilai Kuis */}
                  {r.scores.map((s, i) => (
                    <td key={i} className="p-4 sm:px-6 text-center">
                      {s === null ? (
                        <span className="text-xs font-bold text-muted-foreground/50 italic bg-muted/50 px-2 py-1 rounded-md">Belum</span>
                      ) : (
                        <span className={`text-sm font-extrabold ${s >= PASS_THRESHOLD ? "text-foreground" : "text-amber-600"}`}>
                          {s}
                        </span>
                      )}
                    </td>
                  ))}
                  
                  {/* Rata-rata */}
                  <td className="p-4 sm:px-6 text-center bg-primary/5 border-l border-border/50">
                    <span className="text-base sm:text-lg font-extrabold text-primary">
                      {r.avg.toFixed(1)}
                    </span>
                  </td>
                  
                  {/* Status */}
                  <td className="p-4 sm:px-6 text-center">
                    <span className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-extrabold tracking-wider uppercase ${
                      r.status === "Lulus" 
                      ? "bg-green-500/10 text-green-600 border border-green-500/20" 
                      : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                    }`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* State Pencarian Kosong */}
        {rows.length === 0 && (
          <div className="p-12 text-center">
             <Search size={32} className="mx-auto text-muted-foreground/30 mb-3" />
             <p className="text-sm font-bold text-foreground">Pencarian Tidak Ditemukan</p>
             <p className="text-xs text-muted-foreground mt-1">Tidak ada mahasiswa dengan nama atau NIM "{search}".</p>
          </div>
        )}
      </div>
    </div>
  );
}