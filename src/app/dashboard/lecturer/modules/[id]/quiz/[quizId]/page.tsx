"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { 
  ArrowLeft, BarChart3, Users, Trophy, Target, 
  CheckCircle2, XCircle, LayoutGrid, AlertCircle, Clock 
} from "lucide-react";

// --- DUMMY DATA ---
const quizInfo = {
  title: "Kuis Cek Pemahaman: ANC Terpadu",
  duration: "10 Menit",
  totalQuestions: 5,
};

const generalStats = {
  averageScore: 82.5,
  passRate: 90, // 90% lulus
  totalParticipants: 45,
};

const leaderboard = [
  { rank: 1, name: "Ikhsan Rizqi", nim: "2010631170000", score: 100, time: "05:12" },
  { rank: 2, name: "Sari Dewi", nim: "2024010101", score: 100, time: "06:30" },
  { rank: 3, name: "Rina Lestari", nim: "2024010103", score: 90, time: "07:45" },
  { rank: 4, name: "Anisa Putri", nim: "2024010102", score: 80, time: "08:10" },
  { rank: 5, name: "Maya Sari", nim: "2024010105", score: 60, time: "09:55" },
];

const questionStats = [
  {
    id: 1,
    questionText: "Berapa kali minimal kunjungan Antenatal Care (ANC) selama kehamilan menurut standar terbaru WHO dan Kemenkes RI?",
    correctOptionId: "c",
    options: [
      { id: "a", text: "4 Kali (1x Trimester 1, 1x Trimester 2, 2x Trimester 3)", pickedCount: 5, percentage: 11 },
      { id: "b", text: "5 Kali", pickedCount: 2, percentage: 4 },
      { id: "c", text: "6 Kali (2x Trimester 1, 1x Trimester 2, 3x Trimester 3)", pickedCount: 38, percentage: 85 }, // Benar
      { id: "d", text: "8 Kali", pickedCount: 0, percentage: 0 },
    ]
  },
  {
    id: 2,
    questionText: "Manakah dari berikut ini yang BUKAN termasuk dalam pemeriksaan 10T pada ANC terpadu?",
    correctOptionId: "d",
    options: [
      { id: "a", text: "Timbang berat badan dan ukur tinggi badan", pickedCount: 2, percentage: 4 },
      { id: "b", text: "Tentukan presentasi janin dan Denyut Jantung Janin (DJJ)", pickedCount: 3, percentage: 7 },
      { id: "c", text: "Tatalaksana kasus", pickedCount: 5, percentage: 11 },
      { id: "d", text: "Tindakan operasi sesar (Sectio Caesarea)", pickedCount: 35, percentage: 78 }, // Benar
    ]
  },
  // Tambahan dummy data agar grid terisi
  { id: 3, questionText: "Kapan USG disarankan untuk dilakukan pada ibu hamil?", correctOptionId: "a", options: [{id:"a", text:"Trimester 1 dan 3", pickedCount: 40, percentage: 89}, {id:"b", text:"Tiap bulan", pickedCount: 5, percentage: 11}] },
  { id: 4, questionText: "Pemberian tablet Tambah Darah (Fe) minimal diberikan sebanyak?", correctOptionId: "b", options: [{id:"a", text:"30 Tablet", pickedCount: 10, percentage: 22}, {id:"b", text:"90 Tablet", pickedCount: 35, percentage: 78}] },
  { id: 5, questionText: "Imunisasi apa yang wajib diberikan pada ibu hamil untuk mencegah Tetanus Neonatorum?", correctOptionId: "a", options: [{id:"a", text:"Tetanus Toxoid (TT)", pickedCount: 45, percentage: 100}, {id:"b", text:"BCG", pickedCount: 0, percentage: 0}] },
];

export default function LecturerQuizPreviewPage() {
  const router = useRouter();
  const params = useParams();
  
  // State untuk Tab: "overview" (Analisis Umum) atau "preview" (Analisis Tiap Soal)
  const [activeTab, setActiveTab] = useState<"overview" | "preview">("overview");
  
  // State untuk Navigasi Grid Soal
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    document.title = `Analisis Kuis | Dosen EduBidan`;
  }, []);

  const activeQuestion = questionStats[activeQuestionIndex];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10 sm:pb-12 max-w-350 mx-auto">
      
      {/* HEADER & TOMBOL KEMBALI */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <button 
          onClick={() => router.push(`/dashboard/lecturer/modules/${params.id}`)} 
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-muted-foreground hover:text-foreground transition-colors bg-card border border-border px-4 py-2.5 rounded-xl hover:bg-muted shadow-sm w-fit"
        >
          <ArrowLeft size={16} /> Kembali ke Editor Modul
        </button>

        {/* BADGE PRATINJAU KUIS */}
        <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 font-extrabold text-xs flex items-center gap-2 w-fit">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          Mode Analisis & Pratinjau Kuis
        </div>
      </div>

      {/* JUDUL KUIS */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          {quizInfo.title}
        </h1>
        <div className="flex items-center gap-4 text-xs sm:text-sm font-bold text-muted-foreground">
          <span className="flex items-center gap-1.5"><Clock size={16} className="text-amber-500" /> Durasi: {quizInfo.duration}</span>
          <span className="flex items-center gap-1.5"><LayoutGrid size={16} className="text-amber-500" /> {quizInfo.totalQuestions} Pertanyaan</span>
        </div>
      </div>

      {/* TAB NAVIGASI */}
      <div className="flex gap-2 sm:gap-4 border-b border-border mb-6 sm:mb-8 overflow-x-auto scrollbar-none">
        <button 
          onClick={() => setActiveTab("overview")} 
          className={`px-4 sm:px-6 py-3 text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap border-b-2 font-extrabold ${
            activeTab === "overview" 
            ? "border-amber-500 text-amber-500" 
            : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
          }`}
        >
          <BarChart3 size={18} /> Statistik Umum & Peringkat
        </button>
        <button 
          onClick={() => setActiveTab("preview")} 
          className={`px-4 sm:px-6 py-3 text-xs sm:text-sm transition-all flex items-center gap-2 whitespace-nowrap border-b-2 font-extrabold ${
            activeTab === "preview" 
            ? "border-amber-500 text-amber-500" 
            : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
          }`}
        >
          <Target size={18} /> Pratinjau & Analisis Butir Soal
        </button>
      </div>

      {/* =========================================================
          TAB 1: OVERVIEW (STATISTIK UMUM & LEADERBOARD)
      ============================================================= */}
      {activeTab === "overview" && (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
          
          {/* Grid Statistik Cepat */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-card rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-6 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">
                <Target size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Rata-rata Skor</p>
                <p className="text-2xl font-extrabold text-foreground">{generalStats.averageScore} <span className="text-sm font-medium text-muted-foreground">/ 100</span></p>
              </div>
            </div>
            
            <div className="bg-card rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-6 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Tingkat Kelulusan</p>
                <p className="text-2xl font-extrabold text-foreground">{generalStats.passRate}%</p>
              </div>
            </div>

            <div className="bg-card rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-6 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                <Users size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Total Mengerjakan</p>
                <p className="text-2xl font-extrabold text-foreground">{generalStats.totalParticipants} <span className="text-sm font-medium text-muted-foreground">Mahasiswa</span></p>
              </div>
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="bg-card rounded-2xl sm:rounded-3xl border border-border overflow-hidden shadow-sm">
            <div className="p-5 sm:p-6 border-b border-border/50 flex items-center gap-3">
              <Trophy size={20} className="text-amber-500" />
              <h2 className="text-lg font-extrabold text-foreground">Peringkat Mahasiswa (Leaderboard)</h2>
            </div>
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="p-4 sm:px-6 font-extrabold text-muted-foreground text-xs uppercase tracking-wider w-16 text-center">Rank</th>
                    <th className="p-4 sm:px-6 font-extrabold text-muted-foreground text-xs uppercase tracking-wider">Nama Peserta</th>
                    <th className="p-4 sm:px-6 font-extrabold text-muted-foreground text-xs uppercase tracking-wider">NPM / NIM</th>
                    <th className="p-4 sm:px-6 font-extrabold text-muted-foreground text-xs uppercase tracking-wider">Skor Akhir</th>
                    <th className="p-4 sm:px-6 font-extrabold text-muted-foreground text-xs uppercase tracking-wider text-right">Waktu Pengerjaan</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((student) => (
                    <tr key={student.rank} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="p-4 sm:px-6 text-center">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-extrabold text-xs ${
                          student.rank === 1 ? "bg-yellow-500/20 text-yellow-600 border border-yellow-500/30" : 
                          student.rank === 2 ? "bg-slate-300/20 text-slate-400 border border-slate-300/30" : 
                          student.rank === 3 ? "bg-orange-500/20 text-orange-600 border border-orange-500/30" : 
                          "text-muted-foreground"
                        }`}>
                          #{student.rank}
                        </span>
                      </td>
                      <td className="p-4 sm:px-6 font-extrabold text-foreground">{student.name}</td>
                      <td className="p-4 sm:px-6 text-muted-foreground font-mono font-medium text-xs sm:text-sm">{student.nim}</td>
                      <td className="p-4 sm:px-6">
                        <span className={`font-extrabold px-3 py-1 rounded-lg text-xs ${student.score >= 80 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                          {student.score}
                        </span>
                      </td>
                      <td className="p-4 sm:px-6 text-right font-medium text-muted-foreground">{student.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* =========================================================
          TAB 2: PREVIEW & ANALISIS BUTIR SOAL
      ============================================================= */}
      {activeTab === "preview" && (
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start animate-in fade-in duration-300">
          
          {/* KOLOM KIRI: Tampilan Soal & Statistik Opsi */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-8 shadow-sm relative overflow-hidden">
              
              <div className="flex items-center justify-between mb-6 border-b border-border/50 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-extrabold shadow-sm">
                    {activeQuestionIndex + 1}
                  </div>
                  <h2 className="text-sm font-extrabold text-muted-foreground uppercase tracking-widest">
                    Pertanyaan {activeQuestionIndex + 1} dari {quizInfo.totalQuestions}
                  </h2>
                </div>
              </div>

              {/* Teks Pertanyaan */}
              <p className="text-lg sm:text-xl font-extrabold text-foreground leading-relaxed mb-8">
                {activeQuestion.questionText}
              </p>

              {/* Opsi Jawaban Rendered as Polling Stats */}
              <div className="space-y-4">
                <p className="text-xs font-bold text-muted-foreground mb-2 flex items-center gap-1.5"><BarChart3 size={14}/> Distribusi Jawaban Mahasiswa</p>
                
                {activeQuestion.options.map((opt) => {
                  const isCorrect = opt.id === activeQuestion.correctOptionId;
                  
                  return (
                    <div 
                      key={opt.id} 
                      className={`relative overflow-hidden rounded-xl border p-4 transition-all ${
                        isCorrect ? "border-green-500 bg-green-500/5" : "border-border bg-card"
                      }`}
                    >
                      {/* Bar Background untuk Persentase */}
                      <div 
                        className={`absolute inset-y-0 left-0 opacity-20 transition-all duration-1000 ease-out ${
                          isCorrect ? "bg-green-500" : "bg-muted-foreground"
                        }`} 
                        style={{ width: `${opt.percentage}%` }} 
                      />
                      
                      <div className="relative z-10 flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5 ${
                          isCorrect ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                        }`}>
                          {opt.id.toUpperCase()}
                        </div>
                        
                        <div className="flex-1 min-w-0 pr-4">
                          <p className={`text-sm sm:text-base font-bold leading-relaxed ${isCorrect ? "text-foreground" : "text-muted-foreground"}`}>
                            {opt.text}
                          </p>
                          {isCorrect && <p className="text-xs font-bold text-green-500 flex items-center gap-1 mt-1"><CheckCircle2 size={12}/> Kunci Jawaban</p>}
                        </div>

                        <div className="shrink-0 text-right">
                          <p className="text-lg font-extrabold text-foreground">{opt.percentage}%</p>
                          <p className="text-[10px] sm:text-xs font-bold text-muted-foreground">{opt.pickedCount} orang</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* KOLOM KANAN: Grid Navigasi Soal */}
          <div className="bg-card rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-6 shadow-sm lg:sticky lg:top-6">
            <div className="flex items-center gap-2.5 mb-5 border-b border-border/50 pb-3">
              <LayoutGrid size={18} className="text-amber-500" />
              <h3 className="text-base font-extrabold text-foreground">Navigasi Soal</h3>
            </div>
            
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {questionStats.map((q, index) => {
                const isActive = activeQuestionIndex === index;
                // Simulasi logika evaluasi (misal: soal yang persentase benarnya di bawah 50% diwarnai merah/warning)
                const correctOpt = q.options.find(o => o.id === q.correctOptionId);
                const isWarning = correctOpt && correctOpt.percentage < 50;

                return (
                  <button
                    key={q.id}
                    onClick={() => setActiveQuestionIndex(index)}
                    className={`relative w-full aspect-square rounded-xl flex items-center justify-center text-sm font-extrabold transition-all ${
                      isActive 
                      ? "bg-amber-500 text-white shadow-md scale-105" 
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground border border-border"
                    }`}
                  >
                    {index + 1}
                    
                    {/* Tanda peringatan jika soal banyak dijawab salah */}
                    {isWarning && !isActive && (
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-card" title="Banyak mahasiswa salah di soal ini" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-border/50 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <div className="w-3 h-3 rounded-full bg-amber-500" /> Sedang dilihat
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <div className="w-3 h-3 rounded-full bg-red-500" /> Indikator evaluasi kritis (&lt;50% benar)
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}