"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Clock, LayoutGrid } from "lucide-react";

import { QuizExitModal } from "@/components/dashboard/student/modules/lesson/QuizExitModal";
import { QuizNavigator } from "@/components/dashboard/student/modules/quiz/QuizNavigator";
import { QuizQuestionCard } from "@/components/dashboard/student/modules/quiz/QuizQuestionCard";
import { QuizResultScreen } from "@/components/dashboard/student/modules/quiz/QuizResultScreen";
import { QuizStartScreen } from "@/components/dashboard/student/modules/quiz/QuizStartScreen";
import { EduBidanLogo } from "@/components/ui/EduBidanLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { getLearningItem } from "@/data/learning/learning-modules";

export default function FullscreenQuizPage() {
  const router = useRouter();
  const params = useParams<{ id: string; quizId: string }>();

  const moduleId = Number(params.id);
  const quizId = Number(params.quizId);

  const learningData = getLearningItem(moduleId, quizId);
  const quiz = learningData?.item.kind === "kuis" ? learningData.item : null;
  const questions = useMemo(() => quiz?.questions ?? [], [quiz]);

  const [isStarted, setIsStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [flagged, setFlagged] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [showGridMobile, setShowGridMobile] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);

  useEffect(() => {
    setAnswers(Array(questions.length).fill(null));
    setFlagged(Array(questions.length).fill(false));
    setCurrentQ(0);
  }, [questions.length]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!learningData || !quiz || questions.length === 0) {
    return (
      <div className="fixed inset-0 z-100 bg-background flex items-center justify-center p-6">
        <div className="bg-card rounded-3xl border border-border p-8 text-center max-w-md w-full">
          <h1 className="text-xl font-extrabold text-foreground mb-2">
            Kuis tidak ditemukan
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Kuis yang Anda buka tidak tersedia atau belum memiliki soal.
          </p>
          <button
            type="button"
            onClick={() => router.push(`/dashboard/modules/${moduleId}`)}
            className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-extrabold"
          >
            Kembali ke Detail Modul
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQ];
  const correctAnswersArray = questions.map((question) => question.correct);
  const score = answers.filter(
    (answer, index) => answer === questions[index].correct
  ).length;
  const percentage = Math.round((score / questions.length) * 100);
  const passed = percentage >= 70;

  const handleTopLeftClick = () => {
    if (isReviewMode) {
      setIsReviewMode(false);
      setShowResult(true);
      return;
    }

    if (!isStarted || showResult) {
      router.back();
      return;
    }

    setIsExitModalOpen(true);
  };

  const handleSelectOption = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleToggleFlag = () => {
    const newFlagged = [...flagged];
    newFlagged[currentQ] = !newFlagged[currentQ];
    setFlagged(newFlagged);
  };

  const handleNextQuestion = () => {
    setCurrentQ((current) => Math.min(questions.length - 1, current + 1));
  };

  const handlePrevQuestion = () => {
    setCurrentQ((current) => Math.max(0, current - 1));
  };

  const timeLimit = `${quiz.timeLimitMinutes ?? quiz.estimatedMinutes} Menit`;

  return (
    <div className="fixed inset-0 z-100 bg-background flex flex-col animate-in fade-in zoom-in-95 duration-300">
      <QuizExitModal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
        onConfirm={() => {
          setIsExitModalOpen(false);
          setShowResult(true);
        }}
      />

      <header className="h-14 sm:h-16 border-b border-border px-3 sm:px-6 flex items-center justify-between shrink-0 bg-card/90 backdrop-blur-md relative z-20">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={handleTopLeftClick}
            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-muted-foreground hover:text-foreground transition-colors bg-muted/50 hover:bg-muted px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg"
          >
            <ArrowLeft size={16} className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">
              {isReviewMode
                ? "Kembali ke Hasil"
                : isStarted && !showResult
                  ? "Submit & Keluar"
                  : "Keluar"}
            </span>
          </button>

          <ThemeToggle />

          <div className="w-px h-5 sm:h-6 bg-border hidden sm:block" />

          <div className="hidden sm:flex items-center">
            <EduBidanLogo size="sm" showText={true} />
          </div>
        </div>

        <div className="hidden md:block text-sm font-extrabold text-foreground absolute left-1/2 -translate-x-1/2 truncate max-w-md text-center">
          {isReviewMode ? `Ulasan ${quiz.title}` : quiz.title}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {(isStarted && !showResult) || isReviewMode ? (
            <button
              type="button"
              onClick={() => setShowGridMobile(true)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <LayoutGrid size={16} className="sm:w-5 sm:h-5" />
            </button>
          ) : null}

          <div className="flex items-center gap-1.5 sm:gap-2 bg-amber-500/10 text-amber-600 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-amber-500/20 shadow-sm shadow-amber-500/5">
            <Clock size={14} className="sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-extrabold font-mono tracking-wider">
              {quiz.timeLimitMinutes ?? quiz.estimatedMinutes}:00
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        <div className="flex-1 overflow-y-auto scrollbar-thin p-4 sm:p-8 flex flex-col items-center justify-center relative z-10">
          {!isStarted ? (
            <QuizStartScreen
              totalQuestions={questions.length}
              timeLimit={timeLimit}
              onStart={() => setIsStarted(true)}
            />
          ) : showResult ? (
            <QuizResultScreen
              passed={passed}
              percentage={percentage}
              score={score}
              totalQuestions={questions.length}
              onReview={() => {
                setIsReviewMode(true);
                setShowResult(false);
                setCurrentQ(0);
              }}
              onExit={() => router.back()}
            />
          ) : (
            <QuizQuestionCard
              currentQ={currentQ}
              totalQuestions={questions.length}
              question={currentQuestion.question}
              options={currentQuestion.options}
              selectedAnswer={answers[currentQ]}
              isFlagged={flagged[currentQ]}
              isSubmitDisabled={answers.includes(null)}
              isReviewMode={isReviewMode}
              correctAnswer={currentQuestion.correct}
              onSelectOption={handleSelectOption}
              onFlag={handleToggleFlag}
              onPrev={handlePrevQuestion}
              onNext={handleNextQuestion}
              onSubmit={() => setShowResult(true)}
              onExitReview={() => {
                setIsReviewMode(false);
                setShowResult(true);
              }}
            />
          )}
        </div>

        {((isStarted && !showResult) || isReviewMode) && (
          <QuizNavigator
            totalQuestions={questions.length}
            answers={answers}
            flagged={flagged}
            currentQ={currentQ}
            showMobile={showGridMobile}
            isReviewMode={isReviewMode}
            correctAnswers={correctAnswersArray}
            onCloseMobile={() => setShowGridMobile(false)}
            onNavigate={(index) => setCurrentQ(index)}
            onPrev={handlePrevQuestion}
            onNext={handleNextQuestion}
            onSubmit={() => setShowResult(true)}
            onExitReview={() => {
              setIsReviewMode(false);
              setShowResult(true);
            }}
          />
        )}
      </main>
    </div>
  );
}