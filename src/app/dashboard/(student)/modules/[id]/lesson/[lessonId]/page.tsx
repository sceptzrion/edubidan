"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Maximize2,
  Pause,
  Play,
  SkipForward,
  Volume2,
} from "lucide-react";

import { Objectives } from "@/components/dashboard/student/modules/lesson/Objectives";
import { Playlist } from "@/components/dashboard/student/modules/lesson/Playlist";
import { QuizStandby } from "@/components/dashboard/student/modules/lesson/QuizStandby";
import { QuizWarning } from "@/components/dashboard/student/modules/lesson/QuizWarning";
import { Summary } from "@/components/dashboard/student/modules/lesson/Summary";
import { Tools } from "@/components/dashboard/student/modules/lesson/Tools";
import { getLearningItem } from "@/data/learning-modules";

export default function LessonPage() {
  const router = useRouter();
  const params = useParams<{ id: string; lessonId: string }>();

  const moduleId = Number(params.id);
  const lessonId = Number(params.lessonId);

  const learningData = getLearningItem(moduleId, lessonId);

  const [playing, setPlaying] = useState(false);

  if (!learningData) {
    return (
      <div className="bg-card rounded-3xl border border-border p-8 text-center">
        <h1 className="text-xl font-extrabold text-foreground mb-2">
          Konten tidak ditemukan
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Materi atau kuis yang Anda buka tidak tersedia.
        </p>
        <button
          type="button"
          onClick={() => router.push(`/dashboard/modules/${moduleId}`)}
          className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-extrabold"
        >
          Kembali ke Detail Modul
        </button>
      </div>
    );
  }

  const { module, item, itemIndex, previousItem, nextItem } = learningData;

  const playlistItems = module.items.map((playlistItem) => ({
    id: playlistItem.id,
    kind: playlistItem.kind,
    title: playlistItem.title,
    duration:
      playlistItem.kind === "kuis"
        ? `${playlistItem.timeLimitMinutes ?? playlistItem.estimatedMinutes} Menit`
        : playlistItem.duration,
    completed: playlistItem.isCompleted,
  }));

  const handleNext = () => {
    if (nextItem) {
      router.push(`/dashboard/modules/${module.id}/lesson/${nextItem.id}`);
      return;
    }

    router.push(`/dashboard/modules/${module.id}`);
  };

  const handlePrev = () => {
    if (!previousItem) return;
    router.push(`/dashboard/modules/${module.id}/lesson/${previousItem.id}`);
  };

  const handleNavigate = (targetItemId: number) => {
    router.push(`/dashboard/modules/${module.id}/lesson/${targetItemId}`);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-6 sm:pb-8">
      <button
        type="button"
        onClick={() => router.push(`/dashboard/modules/${module.id}`)}
        className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-muted-foreground hover:text-foreground mb-4 sm:mb-6 transition-colors w-fit"
      >
        <ArrowLeft size={16} className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        Kembali ke Detail Modul
      </button>

      {item.kind === "kuis" && (
        <div className="mb-4 sm:mb-6">
          <QuizWarning />
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 items-start">
        <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-6">
          {item.kind === "materi" ? (
            <>
              <div className="relative bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden aspect-video shadow-lg border border-border/50 group shrink-0">
                <img
                  src={item.thumbnailUrl ?? module.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-70"
                />

                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <button
                    type="button"
                    onClick={() => setPlaying((current) => !current)}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center transition-all shadow-lg hover:scale-105 backdrop-blur-sm"
                  >
                    {playing ? (
                      <Pause size={24} className="text-white sm:w-8 sm:h-8" />
                    ) : (
                      <Play
                        size={24}
                        className="text-white ml-1 sm:ml-1.5 sm:w-8 sm:h-8"
                      />
                    )}
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
                      <button
                        type="button"
                        onClick={() => setPlaying((current) => !current)}
                        className="hover:text-primary transition-colors"
                      >
                        {playing ? (
                          <Pause size={14} className="sm:w-4.5 sm:h-4.5" />
                        ) : (
                          <Play size={14} className="sm:w-4.5 sm:h-4.5" />
                        )}
                      </button>

                      <button
                        type="button"
                        className="hover:text-primary transition-colors"
                      >
                        <SkipForward size={14} className="sm:w-4.5 sm:h-4.5" />
                      </button>

                      <button
                        type="button"
                        className="hover:text-primary transition-colors hidden sm:block"
                      >
                        <Volume2 size={14} className="sm:w-4.5 sm:h-4.5" />
                      </button>

                      <span>06:23 / {item.duration}</span>
                    </div>

                    <button
                      type="button"
                      className="hover:text-primary transition-colors"
                    >
                      <Maximize2 size={14} className="sm:w-4.5 sm:h-4.5" />
                    </button>
                  </div>
                </div>
              </div>

              <Summary
                title={item.title}
                duration={item.duration}
                onPrev={previousItem ? handlePrev : undefined}
                onNext={handleNext}
                nextLabel={
                  nextItem
                    ? nextItem.kind === "materi"
                      ? "Materi Selanjutnya"
                      : "Kuis Selanjutnya"
                    : "Selesaikan Modul"
                }
              />
            </>
          ) : (
            <QuizStandby
              title={item.title}
              questionCount={String(item.questions?.length ?? 0)}
              timeLimit={`${item.timeLimitMinutes ?? item.estimatedMinutes} Menit`}
              onStartQuiz={() =>
                router.push(`/dashboard/modules/${module.id}/quiz/${item.id}`)
              }
              onPrev={previousItem ? handlePrev : undefined}
              onNext={handleNext}
              prevLabel={
                previousItem
                  ? previousItem.kind === "materi"
                    ? "Materi Sebelumnya"
                    : "Kuis Sebelumnya"
                  : "Sebelumnya"
              }
              nextLabel={
                nextItem
                  ? nextItem.kind === "materi"
                    ? "Materi Selanjutnya"
                    : "Kuis Selanjutnya"
                  : "Selesaikan Modul"
              }
            />
          )}
        </div>

        <div className="flex flex-col gap-4 sm:gap-6 lg:sticky lg:top-6 self-start">
          {item.kind === "materi" && (
            <>
              <Objectives objectives={item.objectives ?? []} />
              <Tools tools={item.tools ?? []} />
            </>
          )}

          <Playlist
            items={playlistItems}
            activeIndex={itemIndex}
            onNavigate={handleNavigate}
          />
        </div>
      </div>
    </div>
  );
}