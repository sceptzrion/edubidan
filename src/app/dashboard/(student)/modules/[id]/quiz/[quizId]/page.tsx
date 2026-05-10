"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { EduBidanLogo } from "@/components/ui/EduBidanLogo"; // Pastikan path ini benar
import { ThemeToggle } from "@/components/ui/ThemeToggle";     // Pastikan path ini benar
import { 
  ArrowLeft, Clock, CheckCircle, XCircle, RotateCcw, ArrowRight, CheckCircle2 
} from "lucide-react";

// --- DUMMY DATA SOAL KUIS ---
const questions = [
  { question: "Pada pemeriksaan Leopold I, bagian apa yang biasanya teraba di fundus uteri pada presentasi kepala?", options: ["Kepala janin", "Bokong janin", "Punggung janin", "Ekstremitas janin"], correct: 1 },
  { question: "Berapa frekuensi denyut jantung janin (DJJ) normal?", options: ["100-110 x/menit", "120-160 x/menit", "170-200 x/menit", "80-100 x/menit"], correct: 1 },
  { question: "Kapan waktu optimal untuk melakukan Inisiasi Menyusu Dini (IMD)?", options: ["1-2 jam setelah lahir", "Segera setelah lahir (30-60 menit pertama)", "3-4 jam setelah lahir", "Setelah bayi dimandikan"], correct: 1 },
  { question: "Apa tanda bahaya kehamilan yang memerlukan rujukan segera?", options: ["Mual ringan di pagi hari", "Perdarahan pervaginam", "Sering buang air kecil", "Kenaikan BB 1 kg/bulan"], correct: 1 },
  { question: "Berapa tinggi fundus uteri (TFU) normal pada usia kehamilan 28 minggu?", options: ["20 cm", "24 cm", "28 cm", "32 cm"], correct: 2 },
];

export default function FullscreenQuizPage() {
  const router = useRouter();
  const params = useParams();
  
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Mencegah scroll di background (layout utama) saat kuis aktif
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleExit = () => {
    if (window.confirm("Kuis sedang berjalan. Progres Anda tidak akan tersimpan jika keluar sekarang. Yakin ingin keluar?")) {
      router.back(); // Kembali ke halaman Lesson
    }
  };

  const handleSelectOption = (index: number) => {
    if (!submitted) {
      const newAnswers = [...answers];
      newAnswers[currentQ] = index;
      setAnswers(newAnswers);
    }
  };

  const score = answers.filter((a, i) => a === questions[i].correct).length;
  const percentage = Math.round((score / questions.length) * 100);
  const passed = percentage >= 70; // Standar kelulusan 70%

  return (
    /* FIXED INSET-0 Z-[100]: Menimpa seluruh layout utama menjadi Fullscreen */
    <div className="fixed inset-0 z-[100] bg-background flex flex-col animate-in fade-in zoom-in-95 duration-300 overflow-y-auto">
      
      {/* =========================================
          TOPBAR KHUSUS KUIS
      ============================================= */}
      <header className="h-14 sm:h-16 border-b border-border px-4 sm:px-6 flex items-center justify-between shrink-0 bg-card/90 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        
        {/* Kiri: Tombol Keluar & Logo */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button 
            onClick={handleExit} 
            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-muted-foreground hover:text-red-500 transition-colors bg-muted/50 hover:bg-red-500/10 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg"
          >
            <ArrowLeft size={16} className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Batal & Keluar</span>
          </button>
          <div className="w-px h-5 sm:h-6 bg-border hidden sm:block" />
          <div className="hidden sm:flex items-center">
            <EduBidanLogo size="sm" showText={true} />
          </div>
        </div>
        
        {/* Tengah: Judul Kuis */}
        <div className="text-xs sm:text-sm font-extrabold text-foreground absolute left-1/2 -translate-x-1/2 truncate max-w-[30vw] sm:max-w-md text-center">
          Kuis Cek Pemahaman: Anamnesis
        </div>
        
        {/* Kanan: Theme Toggle & Timer */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 bg-amber-500/10 text-amber-600 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-amber-500/20 shadow-sm shadow-amber-500/5">
            <Clock size={14} className="sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-extrabold font-mono tracking-wider">14:32</span>
          </div>
        </div>
      </header>

      {/* =========================================
          AREA KONTEN KUIS
      ============================================= */}
      <main className="flex-1 p-4 sm:p-8 flex flex-col items-center">
        
        {showResult ? (
          /* --- TAMPILAN HASIL KUIS --- */
          <div className="w-full max-w-2xl mt-4 sm:mt-10 animate-in zoom-in-95 duration-500">
            <div className="bg-card rounded-2xl sm:rounded-3xl border border-border p-6 sm:p-12 text-center shadow-lg">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${passed ? "bg-green-500/10" : "bg-red-500/10"} flex items-center justify-center mx-auto mb-4 sm:mb-6 border-4 ${passed ? "border-green-500/20" : "border-red-500/20"}`}>
                {passed ? <CheckCircle size={32} className="text-green-500 sm:w-10 sm:h-10" /> : <XCircle size={32} className="text-red-500 sm:w-10 sm:h-10" />}
              </div>
              
              <h1 className="text-xl sm:text-3xl font-extrabold text-foreground mb-2">{passed ? "Selamat! Anda Lulus!" : "Belum Berhasil"}</h1>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed">
                {passed ? "Anda telah menyelesaikan kuis dengan baik. Anda dapat melanjutkan ke materi berikutnya." : "Jangan menyerah, coba ulangi kuis ini setelah mempelajari kembali materi sebelumnya."}
              </p>
              
              <div className="text-5xl sm:text-7xl font-extrabold mb-2 sm:mb-3 tracking-tighter" style={{ color: passed ? "#10b981" : "#ef4444" }}>
                {percentage}%
              </div>
              <p className="text-xs sm:text-sm font-bold text-muted-foreground mb-8 sm:mb-10">
                {score} dari {questions.length} jawaban benar
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button 
                  onClick={() => { setAnswers(Array(questions.length).fill(null)); setCurrentQ(0); setSubmitted(false); setShowResult(false); }} 
                  className="w-full sm:w-auto px-6 py-3 sm:py-3.5 rounded-xl border border-border hover:bg-muted font-bold transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm"
                >
                  <RotateCcw size={16} /> Ulangi Kuis
                </button>
                <button 
                  onClick={() => router.back()} 
                  className="w-full sm:w-auto px-6 py-3 sm:py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 text-xs sm:text-sm flex items-center justify-center gap-2"
                >
                  Selesai & Keluar <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          
          /* --- TAMPILAN PENGERJAAN SOAL --- */
          <div className="w-full max-w-3xl mt-2 sm:mt-6">
            
            {/* Indikator Progress */}
            <div className="mb-6 sm:mb-8">
              <div className="flex justify-between items-center text-[10px] sm:text-xs font-bold text-muted-foreground mb-3 sm:mb-4 uppercase tracking-widest">
                 <span>Soal {currentQ + 1} <span className="opacity-50">dari {questions.length}</span></span>
              </div>
              <div className="w-full h-2 sm:h-2.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(245,158,11,0.5)]" 
                  style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} 
                />
              </div>
            </div>

            {/* Kotak Pertanyaan & Opsi */}
            <div className="bg-card rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-10 shadow-sm mb-6 sm:mb-8">
              <h2 className="text-base sm:text-xl font-extrabold text-foreground mb-6 sm:mb-8 leading-relaxed">
                {questions[currentQ].question}
              </h2>
              
              <div className="space-y-3 sm:space-y-4">
                {questions[currentQ].options.map((opt, i) => {
                  const isSelected = answers[currentQ] === i;
                  // Logika warna jika sudah di-submit (bisa dibuang jika kuis tidak menampilkan jawaban benar/salah secara instan)
                  const isCorrect = submitted && i === questions[currentQ].correct;
                  const isWrong = submitted && isSelected && i !== questions[currentQ].correct;

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelectOption(i)}
                      disabled={submitted}
                      className={`w-full p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 text-left transition-all flex items-center gap-3 sm:gap-4 ${
                        isCorrect ? "border-green-500 bg-green-500/10 text-foreground" :
                        isWrong ? "border-red-500 bg-red-500/10 text-foreground" :
                        isSelected ? "border-amber-500 bg-amber-500/5 text-foreground shadow-md shadow-amber-500/10" : 
                        "border-border hover:border-amber-500/40 hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 text-[10px] sm:text-xs font-extrabold transition-colors ${
                        isCorrect ? "bg-green-500 text-white" :
                        isWrong ? "bg-red-500 text-white" :
                        isSelected ? "bg-amber-500 text-white" : 
                        "bg-muted text-muted-foreground border border-border"
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold leading-relaxed flex-1">{opt}</span>
                      
                      {/* Icon status saat disubmit */}
                      {isCorrect && <CheckCircle2 size={18} className="text-green-500 shrink-0 sm:w-5 sm:h-5" />}
                      {isWrong && <XCircle size={18} className="text-red-500 shrink-0 sm:w-5 sm:h-5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigasi Bawah */}
            <div className="flex items-center justify-between">
               <button 
                  onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} 
                  disabled={currentQ === 0} 
                  className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors px-2 py-2"
               >
                 <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" /> <span className="hidden sm:inline">Sebelumnya</span><span className="sm:hidden">Prev</span>
               </button>
               
               {currentQ === questions.length - 1 ? (
                 submitted ? (
                   <button onClick={() => setShowResult(true)} className="bg-amber-500 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold shadow-lg shadow-amber-500/20 text-xs sm:text-sm hover:bg-amber-600 transition-all hover:-translate-y-0.5">
                     Lihat Hasil
                   </button>
                 ) : (
                   <button 
                     onClick={() => setSubmitted(true)} 
                     disabled={answers.includes(null)} 
                     className="bg-amber-500 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold shadow-lg shadow-amber-500/20 text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-600 transition-all hover:-translate-y-0.5"
                   >
                     Submit Jawaban
                   </button>
                 )
               ) : (
                 <button onClick={() => setCurrentQ(currentQ + 1)} className="bg-amber-500 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold shadow-lg shadow-amber-500/20 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm hover:bg-amber-600 transition-all hover:-translate-y-0.5">
                   <span className="hidden sm:inline">Selanjutnya</span><span className="sm:hidden">Next</span> <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                 </button>
               )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}