import React from "react";
import { CheckCircle, XCircle, Eye, ArrowRight } from "lucide-react";

interface QuizResultScreenProps {
  passed: boolean;
  percentage: number;
  score: number;
  totalQuestions: number;
  onReview: () => void;
  onExit: () => void;
}

export function QuizResultScreen({ passed, percentage, score, totalQuestions, onReview, onExit }: QuizResultScreenProps) {
  return (
    <div className="w-full max-w-lg bg-card rounded-2xl sm:rounded-3xl border border-border p-6 sm:p-12 text-center shadow-xl animate-in zoom-in-95 duration-500">
      <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${passed ? "bg-green-500/10" : "bg-red-500/10"} flex items-center justify-center mx-auto mb-4 sm:mb-6 border-4 ${passed ? "border-green-500/20" : "border-red-500/20"}`}>
        {passed ? <CheckCircle size={32} className="text-green-500 sm:w-10 sm:h-10" /> : <XCircle size={32} className="text-red-500 sm:w-10 sm:h-10" />}
      </div>
      <h1 className="text-xl sm:text-3xl font-extrabold text-foreground mb-2">{passed ? "Selamat! Anda Lulus!" : "Belum Berhasil"}</h1>
      <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-6 sm:mb-8 leading-relaxed">
        {passed ? "Anda telah menyelesaikan kuis dengan baik. Anda dapat mengulas jawaban Anda." : "Jangan menyerah, silakan pelajari kembali materi dan cek bagian mana yang salah."}
      </p>
      
      {/* REVISI: Dihapus simbol % nya */}
      <div className="text-5xl sm:text-7xl font-extrabold mb-2 sm:mb-3 tracking-tighter" style={{ color: passed ? "#10b981" : "#ef4444" }}>
        {percentage}
      </div>
      <p className="text-xs sm:text-sm font-bold text-muted-foreground mb-8 sm:mb-10">{score} dari {totalQuestions} jawaban benar</p>
      
      <div className="flex flex-col gap-3">
        {/* REVISI: Tombol Lihat Jawaban */}
        <button onClick={onReview} className="w-full px-6 py-3.5 rounded-xl border border-border hover:bg-muted font-bold text-foreground transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm">
          <Eye size={16} /> Lihat Jawaban
        </button>
        <button onClick={onExit} className="w-full px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 shadow-lg shadow-primary/20 transition-all text-xs sm:text-sm flex items-center justify-center gap-2">
          Kembali ke Modul <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}