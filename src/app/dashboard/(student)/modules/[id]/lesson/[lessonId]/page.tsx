"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Play, Pause, ArrowLeft, Volume2, Maximize2, SkipForward } from "lucide-react";

import { Summary } from "@/components/dashboard/student/modules/lesson/Summary";
import { Objectives } from "@/components/dashboard/student/modules/lesson/Objectives";
import { Tools } from "@/components/dashboard/student/modules/lesson/Tools";
import { Playlist } from "@/components/dashboard/student/modules/lesson/Playlist";
import { QuizStandby } from "@/components/dashboard/student/modules/lesson/QuizStandby";
import { QuizWarning } from "@/components/dashboard/student/modules/lesson/QuizWarning";

type LessonItem = { id: number; kind: "materi" | "kuis"; title: string; questions?: string; duration: string; completed: boolean; };

const lessonList: LessonItem[] = [
  { id: 1, kind: "materi", title: "Pengantar ANC Terpadu", duration: "12:30", completed: true },
  { id: 2, kind: "materi", title: "Anamnesis Ibu Hamil", duration: "15:45", completed: true },
  { id: 3, kind: "kuis", title: "Kuis Cek Pemahaman: Anamnesis", questions: "10", duration: "15:00", completed: true },
  { id: 4, kind: "materi", title: "Pemeriksaan Fisik Head to Toe", duration: "18:00", completed: false },
  { id: 5, kind: "materi", title: "Pemeriksaan Leopold", duration: "14:15", completed: false },
  { id: 6, kind: "materi", title: "Auskultasi DJJ", duration: "11:30", completed: false },
  { id: 7, kind: "kuis", title: "Kuis Akhir Modul", questions: "20", duration: "15", completed: false },
];

const OBJECTIVES = [
  "Mampu melakukan pemeriksaan fisik head to toe secara sistematis",
  "Mengidentifikasi tanda-tanda abnormal pada ibu hamil",
  "Mendokumentasikan temuan pemeriksaan dengan benar",
  "Menentukan tindak lanjut berdasarkan hasil pemeriksaan"
];

const TOOLS = [
  "Stetoskop", "Tensimeter", "Timbangan", "Pita pengukur (metline)", 
  "Doppler/Fetoscope", "Jangka panggul"
];

export default function LessonPage() {
  const router = useRouter();
  const params = useParams(); 
  const [playing, setPlaying] = useState(false);

  const lessonIdFromUrl = Number(params.lessonId);
  const foundIndex = lessonList.findIndex(item => item.id === lessonIdFromUrl);
  const activeIndex = foundIndex !== -1 ? foundIndex : 0; 
  
  const activeItem = lessonList[activeIndex];
  const nextItem = lessonList[activeIndex + 1];
  const prevItem = lessonList[activeIndex - 1];

  useEffect(() => {
    if (activeItem) document.title = `${activeItem.title} | EduBidan`;
  }, [activeItem]);

  const handleNext = () => {
    if (nextItem) router.push(`/dashboard/modules/${params.id}/lesson/${nextItem.id}`);
    else router.push(`/dashboard/modules/${params.id}`);
  };

  const handlePrev = () => {
    if (prevItem) router.push(`/dashboard/modules/${params.id}/lesson/${prevItem.id}`);
  };

  const handleNavigate = (id: number) => {
    router.push(`/dashboard/modules/${params.id}/lesson/${id}`);
  };

  if (!activeItem) return null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-6 sm:pb-8">
      <button 
        onClick={() => router.push(`/dashboard/modules/${params.id}`)} 
        className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-muted-foreground hover:text-foreground mb-4 sm:mb-6 transition-colors w-fit"
      >
        <ArrowLeft size={16} className="w-4 h-4 sm:w-4.5 sm:h-4.5" /> Kembali ke Detail Modul
      </button>

      {/* REVISI: Peringatan Kuis ditaruh di sini agar Full Width (membentang penuh) */}
      {activeItem.kind === "kuis" && (
        <div className="mb-4 sm:mb-6">
          <QuizWarning />
        </div>
      )}

      {/* Di bawahnya baru layout terbagi menjadi 2 kolom (Kiri 2/3, Kanan 1/3) */}
      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 items-start">
        
        {/* KOLOM KIRI */}
        <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-6">
          {activeItem.kind === "materi" ? (
            <>
              {/* VIDEO PLAYER */}
              <div className="relative bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden aspect-video shadow-lg border border-border/50 group shrink-0">
                <img src="https://images.unsplash.com/photo-1632053651899-3389100579fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080" alt="Video Lesson" className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <button onClick={() => setPlaying(!playing)} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center transition-all shadow-lg hover:scale-105 backdrop-blur-sm">
                    {playing ? <Pause size={24} className="text-white sm:w-8 sm:h-8" /> : <Play size={24} className="text-white ml-1 sm:ml-1.5 sm:w-8 sm:h-8" />}
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-3 sm:p-6 z-10 transition-opacity duration-300">
                  <div className="w-full h-1 sm:h-1.5 bg-white/30 rounded-full mb-3 sm:mb-4 cursor-pointer relative group/bar">
                    <div className="h-full bg-primary rounded-full w-[35%] relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full shadow-sm scale-0 group-hover/bar:scale-100 transition-transform" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-white text-[10px] sm:text-sm font-semibold">
                    <div className="flex items-center gap-3 sm:gap-6">
                      <button onClick={() => setPlaying(!playing)} className="hover:text-primary transition-colors">{playing ? <Pause size={14} className="sm:w-4.5 sm:h-4.5" /> : <Play size={14} className="sm:w-4.5 sm:h-4.5" />}</button>
                      <button className="hover:text-primary transition-colors"><SkipForward size={14} className="sm:w-4.5 sm:h-4.5" /></button>
                      <button className="hover:text-primary transition-colors hidden sm:block"><Volume2 size={14} className="sm:w-4.5 sm:h-4.5" /></button>
                      <span>06:23 / {activeItem.duration.replace(" Menit", "")}</span>
                    </div>
                    <button className="hover:text-primary transition-colors"><Maximize2 size={14} className="sm:w-4.5 sm:h-4.5" /></button>
                  </div>
                </div>
              </div>

              <Summary 
                title={activeItem.title}
                duration="6 Jam"
                onPrev={prevItem ? handlePrev : undefined}
                onNext={handleNext}
                nextLabel={nextItem ? (nextItem.kind === "materi" ? "Materi Selanjutnya" : "Kuis Selanjutnya") : "Selesaikan Modul"}
              />
            </>
          ) : (
            /* STANDBY KUIS (Tanpa Warning karena sudah dipindah ke atas) */
            <QuizStandby 
                title={activeItem.title}
                questionCount={activeItem.questions || "0"}
                timeLimit={activeItem.duration}
                onStartQuiz={() => router.push(`/dashboard/modules/${params.id}/quiz/${activeItem.id}`)}
                
                // REVISI: Melempar prop navigasi
                onPrev={prevItem ? handlePrev : undefined}
                onNext={handleNext}
                prevLabel={prevItem ? (prevItem.kind === "materi" ? "Materi Sebelumnya" : "Kuis Sebelumnya") : "Sebelumnya"}
                nextLabel={nextItem ? (nextItem.kind === "materi" ? "Materi Selanjutnya" : "Kuis Selanjutnya") : "Selesaikan Modul"}
              />
          )}
        </div>

        {/* KOLOM KANAN: SIDEBAR */}
        <div className="flex flex-col gap-4 sm:gap-6 lg:sticky lg:top-6 self-start">
          {activeItem.kind === "materi" && (
            <>
              <Objectives objectives={OBJECTIVES} />
              <Tools tools={TOOLS} />
            </>
          )}

          <Playlist 
            items={lessonList} 
            activeIndex={activeIndex} 
            onNavigate={handleNavigate} 
          />
        </div>
      </div>
    </div>
  );
}