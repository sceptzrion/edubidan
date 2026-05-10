"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { EduBidanLogo } from "@/components/ui/EduBidanLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ArrowLeft, Clock, LayoutGrid } from "lucide-react";

// Komponen Modular
import { QuizExitModal } from "@/components/dashboard/student/lesson/QuizExitModal";
import { QuizStartScreen } from "@/components/dashboard/student/quiz/QuizStartScreen";
import { QuizResultScreen } from "@/components/dashboard/student/quiz/QuizResultScreen";
import { QuizQuestionCard } from "@/components/dashboard/student/quiz/QuizQuestionCard";
import { QuizNavigator } from "@/components/dashboard/student/quiz/QuizNavigator";

// --- DUMMY DATA SOAL KUIS ---
const questions = [
  { id: 1, question: "Pada pemeriksaan Leopold I, bagian apa yang biasanya teraba di fundus uteri pada presentasi kepala?", options: ["Kepala janin", "Bokong janin", "Punggung janin", "Ekstremitas janin"], correct: 1 },
  { id: 2, question: "Berapa frekuensi denyut jantung janin (DJJ) normal?", options: ["100-110 x/menit", "120-160 x/menit", "170-200 x/menit", "80-100 x/menit"], correct: 1 },
  { id: 3, question: "Kapan waktu optimal untuk melakukan Inisiasi Menyusu Dini (IMD)?", options: ["1-2 jam setelah lahir", "Segera setelah lahir (30-60 menit pertama)", "3-4 jam setelah lahir", "Setelah bayi dimandikan"], correct: 1 },
  { id: 4, question: "Apa tanda bahaya kehamilan yang memerlukan rujukan segera?", options: ["Mual ringan di pagi hari", "Perdarahan pervaginam", "Sering buang air kecil", "Kenaikan BB 1 kg/bulan"], correct: 1 },
  { id: 5, question: "Berapa tinggi fundus uteri (TFU) normal pada usia kehamilan 28 minggu?", options: ["20 cm", "24 cm", "28 cm", "32 cm"], correct: 2 },
];

export default function FullscreenQuizPage() {
  const router = useRouter();
  
  const [isStarted, setIsStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [flagged, setFlagged] = useState<boolean[]>(Array(questions.length).fill(false));
  const [showResult, setShowResult] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [showGridMobile, setShowGridMobile] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  const handleTopLeftClick = () => {
    if (!isStarted || showResult) {
      router.back(); 
    } else {
      setIsExitModalOpen(true);
    }
  };

  const handleSelectOption = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = index;
    setAnswers(newAnswers);
  };

  const score = answers.filter((a, i) => a === questions[i].correct).length;
  const percentage = Math.round((score / questions.length) * 100);
  const passed = percentage >= 70;

  return (
    <div className="fixed inset-0 z-100 bg-background flex flex-col animate-in fade-in zoom-in-95 duration-300">
      
      <QuizExitModal 
        isOpen={isExitModalOpen} 
        onClose={() => setIsExitModalOpen(false)} 
        onConfirm={() => { setIsExitModalOpen(false); setShowResult(true); }} 
      />

      <header className="h-14 sm:h-16 border-b border-border px-3 sm:px-6 flex items-center justify-between shrink-0 bg-card/90 backdrop-blur-md relative z-20">
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={handleTopLeftClick} 
            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-muted-foreground hover:text-red-500 transition-colors bg-muted/50 hover:bg-red-500/10 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg"
          >
            <ArrowLeft size={16} className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">{isStarted && !showResult ? "Submit & Keluar" : "Keluar"}</span>
          </button>
          <ThemeToggle />
          <div className="w-px h-5 sm:h-6 bg-border hidden sm:block" />
          <div className="hidden sm:flex items-center"><EduBidanLogo size="sm" showText={true} /></div>
        </div>
        
        <div className="hidden md:block text-sm font-extrabold text-foreground absolute left-1/2 -translate-x-1/2 truncate max-w-md text-center">
          Kuis Cek Pemahaman: Anamnesis
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          {isStarted && !showResult && (
            <button 
              onClick={() => setShowGridMobile(true)} 
              className="lg:hidden p-1.5 sm:p-2 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <LayoutGrid size={16} className="sm:w-5 sm:h-5" />
            </button>
          )}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-amber-500/10 text-amber-600 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-amber-500/20 shadow-sm shadow-amber-500/5">
            <Clock size={14} className="sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-extrabold font-mono tracking-wider">15:00</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        <div className="flex-1 overflow-y-auto scrollbar-thin p-4 sm:p-8 flex flex-col items-center justify-center relative z-10">
          {!isStarted ? (
            <QuizStartScreen 
              totalQuestions={questions.length} 
              timeLimit="15 Menit" 
              onStart={() => setIsStarted(true)} 
            />
          ) : showResult ? (
            <QuizResultScreen 
              passed={passed} percentage={percentage} score={score} 
              totalQuestions={questions.length} 
              onRetry={() => { setAnswers(Array(questions.length).fill(null)); setFlagged(Array(questions.length).fill(false)); setCurrentQ(0); setShowResult(false); }} 
              onExit={() => router.back()} 
            />
          ) : (
            <QuizQuestionCard 
              currentQ={currentQ} totalQuestions={questions.length}
              question={questions[currentQ].question} options={questions[currentQ].options}
              selectedAnswer={answers[currentQ]} isFlagged={flagged[currentQ]}
              isSubmitDisabled={answers.includes(null)}
              onSelectOption={handleSelectOption}
              onFlag={() => { const f = [...flagged]; f[currentQ] = !f[currentQ]; setFlagged(f); }}
              onPrev={() => setCurrentQ(Math.max(0, currentQ - 1))}
              onNext={() => setCurrentQ(currentQ + 1)}
              onSubmit={() => setShowResult(true)}
            />
          )}
        </div>

        {/* REVISI: Bungkus QuizNavigator dengan kondisi isStarted dan !showResult */}
        {isStarted && !showResult && (
          <QuizNavigator 
            totalQuestions={questions.length} answers={answers} flagged={flagged} currentQ={currentQ}
            showMobile={showGridMobile} onCloseMobile={() => setShowGridMobile(false)}
            onNavigate={(i) => setCurrentQ(i)}
            onPrev={() => setCurrentQ(Math.max(0, currentQ - 1))}
            onNext={() => setCurrentQ(currentQ + 1)}
            onSubmit={() => setShowResult(true)}
          />
        )}
      </main>
    </div>
  );
}