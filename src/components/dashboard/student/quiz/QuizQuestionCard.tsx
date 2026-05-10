import React from "react";
import { Flag, ArrowLeft, ArrowRight } from "lucide-react";

interface QuizQuestionCardProps {
  currentQ: number;
  totalQuestions: number;
  question: string;
  options: string[];
  selectedAnswer: number | null;
  isFlagged: boolean;
  isSubmitDisabled: boolean;
  onSelectOption: (index: number) => void;
  onFlag: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export function QuizQuestionCard({
  currentQ, totalQuestions, question, options, selectedAnswer,
  isFlagged, isSubmitDisabled, onSelectOption, onFlag, onPrev, onNext, onSubmit
}: QuizQuestionCardProps) {
  return (
    <div className="w-full max-w-xl mb-auto mt-2 sm:mt-10 animate-in slide-in-from-right-8 duration-300">
      
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <span className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest">
           Soal {currentQ + 1} <span className="opacity-50">dari {totalQuestions}</span>
        </span>
        <button 
          onClick={onFlag} 
          className={`flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg transition-all border ${
            isFlagged ? "bg-amber-500/10 text-amber-500 border-amber-500/30" : "bg-muted text-muted-foreground border-transparent hover:text-foreground"
          }`}
        >
          <Flag size={14} className={isFlagged ? "fill-amber-500" : ""} /> 
          {isFlagged ? "Ditandai" : "Tandai Ragu"}
        </button>
      </div>

      <div className="w-full h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden mb-6 sm:mb-8 shrink-0">
        <div className="h-full bg-amber-500 rounded-full transition-all duration-500 ease-out" style={{ width: `${((currentQ + 1) / totalQuestions) * 100}%` }} />
      </div>

      <div className="bg-card rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-8 shadow-sm mb-6 sm:mb-8">
        <h2 className="text-sm sm:text-lg font-extrabold text-foreground mb-6 sm:mb-8 leading-relaxed">
          {question}
        </h2>
        
        <div className="space-y-3 sm:space-y-4">
          {options.map((opt, i) => {
            const isSelected = selectedAnswer === i;
            return (
              <button
                key={i}
                onClick={() => onSelectOption(i)}
                className={`w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border-2 text-left transition-all flex items-center gap-3 sm:gap-4 outline-none ${
                  isSelected ? "border-amber-500 bg-amber-500/5 text-foreground shadow-md shadow-amber-500/10" : 
                  "border-border hover:border-amber-500/40 hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 text-[10px] sm:text-xs font-extrabold transition-colors ${
                  isSelected ? "bg-amber-500 text-white" : "bg-muted text-muted-foreground border border-border"
                }`}>
                  {String.fromCharCode(65 + i)}
                </div>
                <span className="text-xs sm:text-sm font-semibold leading-relaxed flex-1">{opt}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between">
         <button 
            onClick={onPrev} 
            disabled={currentQ === 0} 
            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors px-2 py-2"
         >
           <ArrowLeft size={16} className="sm:w-4.5 sm:h-4.5" /> <span className="hidden sm:inline">Sebelumnya</span><span className="sm:hidden">Prev</span>
         </button>
         
         {currentQ === totalQuestions - 1 ? (
            <button 
              onClick={onSubmit} 
              disabled={isSubmitDisabled}
              className="bg-primary text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold shadow-lg shadow-primary/20 text-xs sm:text-sm hover:bg-primary/90 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none"
            >
               Submit
            </button>
         ) : (
           <button onClick={onNext} className="bg-amber-500 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold shadow-lg shadow-amber-500/20 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm hover:bg-amber-600 transition-all hover:-translate-y-0.5">
             <span className="hidden sm:inline">Selanjutnya</span><span className="sm:hidden">Next</span> <ArrowRight size={16} className="sm:w-4.5 sm:h-4.5" />
           </button>
         )}
      </div>
    </div>
  );
}