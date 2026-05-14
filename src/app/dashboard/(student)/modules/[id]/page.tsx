"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, HelpCircle, Search, Users } from "lucide-react";

import { InstructorCard } from "@/components/dashboard/student/modules/InstructorCard";
import { ModuleDetailHeader } from "@/components/dashboard/student/modules/ModuleDetailHeader";
import { ParticipantItem } from "@/components/dashboard/student/modules/ParticipantItem";
import { PlaylistItem } from "@/components/dashboard/student/modules/PlaylistItem";
import { TaskItem } from "@/components/dashboard/student/modules/TaskItem";
import {
  getLearningModule,
  getModuleContentSummary,
} from "@/data/learning/learning-modules";

type DetailTab = "pembelajaran" | "evaluasi" | "peserta";

export default function StudentModuleDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const moduleId = Number(params.id);
  const module = getLearningModule(moduleId);

  const [tab, setTab] = useState<DetailTab>("pembelajaran");
  const [searchQuery, setSearchQuery] = useState("");

  const keyword = searchQuery.trim().toLowerCase();

  const filteredLearningItems = useMemo(() => {
    if (!module) return [];

    if (!keyword) return module.items;

    return module.items.filter((item) =>
      item.title.toLowerCase().includes(keyword)
    );
  }, [keyword, module]);

  const filteredQuizItems = useMemo(() => {
    if (!module) return [];

    return module.items.filter((item) => {
      const isQuiz = item.kind === "kuis";
      const matchKeyword = keyword
        ? item.title.toLowerCase().includes(keyword)
        : true;

      return isQuiz && matchKeyword;
    });
  }, [keyword, module]);

  const filteredParticipants = useMemo(() => {
    if (!module) return [];

    if (!keyword) return module.participants;

    return module.participants.filter((participant) => {
      return (
        participant.name.toLowerCase().includes(keyword) ||
        participant.email.toLowerCase().includes(keyword)
      );
    });
  }, [keyword, module]);

  if (!module) {
    return (
      <div className="bg-card rounded-3xl border border-border p-8 text-center">
        <h1 className="text-xl font-extrabold text-foreground mb-2">
          Modul tidak ditemukan
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Modul yang Anda buka tidak tersedia atau belum terdaftar.
        </p>
        <button
          type="button"
          onClick={() => router.push("/dashboard/modules")}
          className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-extrabold"
        >
          Kembali ke Daftar Modul
        </button>
      </div>
    );
  }

  const getSearchPlaceholder = () => {
    if (tab === "pembelajaran") return "Cari materi atau kuis...";
    if (tab === "evaluasi") return "Cari kuis evaluasi...";
    return "Cari peserta...";
  };

  const toPlaylistItem = (item: (typeof module.items)[number]) => ({
    id: item.id,
    kind: item.kind,
    title: item.title,
    duration:
      item.kind === "kuis"
        ? `${item.questions?.length ?? 0} Soal • ${
            item.timeLimitMinutes ?? item.estimatedMinutes
          } Menit`
        : item.duration,
    objectivesCount: item.objectives?.length ?? 0,
    toolsCount: item.tools?.length ?? 0,
    isCompleted: item.isCompleted,
  });

  const toTaskItem = (item: (typeof module.items)[number]) => ({
    id: item.id,
    title: item.title,
    duration: `${item.questions?.length ?? 0} Soal • ${
      item.timeLimitMinutes ?? item.estimatedMinutes
    } Menit`,
    isCompleted: item.isCompleted,
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <button
        type="button"
        onClick={() => router.push("/dashboard/modules")}
        className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-muted-foreground hover:text-foreground mb-4 sm:mb-6 transition-colors w-fit"
      >
        <ArrowLeft size={16} />
        Kembali ke Daftar Modul
      </button>

      <ModuleDetailHeader
        info={{
          banner: module.banner,
          title: module.title,
          progress: module.progress,
          description: module.description,
          estimatedTime: module.estimatedTime,
          contentSummary: getModuleContentSummary(module.items),
          objectives: module.objectives,
          instructor: module.instructor,
        }}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border mb-8 pb-1 sm:pb-0">
        <div className="flex gap-1 sm:gap-2 overflow-x-auto scrollbar-none w-full md:w-auto">
          <button
            type="button"
            onClick={() => setTab("pembelajaran")}
            className={`px-3 py-2.5 sm:px-5 sm:py-4 text-[11px] sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 sm:gap-2 ${
              tab === "pembelajaran"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookOpen size={14} className="sm:w-4.25 sm:h-4.25" />
            Daftar Pembelajaran
          </button>

          <button
            type="button"
            onClick={() => setTab("evaluasi")}
            className={`px-3 py-2.5 sm:px-5 sm:py-4 text-[11px] sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 sm:gap-2 ${
              tab === "evaluasi"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <HelpCircle size={14} className="sm:w-4.25 sm:h-4.25" />
            Kuis & Evaluasi
          </button>

          <button
            type="button"
            onClick={() => setTab("peserta")}
            className={`px-3 py-2.5 sm:px-5 sm:py-4 text-[11px] sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 sm:gap-2 ${
              tab === "peserta"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users size={14} className="sm:w-4.25 sm:h-4.25" />
            Peserta
          </button>
        </div>

        <div className="relative w-full md:w-64 md:mb-1">
          <Search
            size={14}
            className="sm:w-4 sm:h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={getSearchPlaceholder()}
            className="w-full pl-9 pr-4 py-2 sm:py-2.5 rounded-lg bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[10px] sm:text-xs font-medium transition-all"
          />
        </div>
      </div>

      {tab === "pembelajaran" && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          {filteredLearningItems.length > 0 ? (
            filteredLearningItems.map((item) => (
              <PlaylistItem
                key={item.id}
                item={toPlaylistItem(item)}
                onClick={() =>
                  router.push(`/dashboard/modules/${module.id}/lesson/${item.id}`)
                }
              />
            ))
          ) : (
            <p className="text-center text-sm text-muted-foreground py-10">
              Pencarian tidak ditemukan.
            </p>
          )}
        </div>
      )}

      {tab === "evaluasi" && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          {filteredQuizItems.length > 0 ? (
            filteredQuizItems.map((item) => (
              <TaskItem
                key={item.id}
                item={toTaskItem(item)}
                onClick={() =>
                  router.push(`/dashboard/modules/${module.id}/lesson/${item.id}`)
                }
              />
            ))
          ) : (
            <p className="text-center text-sm text-muted-foreground py-10">
              Kuis tidak ditemukan.
            </p>
          )}
        </div>
      )}

      {tab === "peserta" && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="text-xs sm:text-sm font-extrabold text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4 px-1.5">
            Instruktur
          </h2>
          <InstructorCard instructor={module.instructor} />

          <h2 className="text-xs sm:text-sm font-extrabold text-muted-foreground uppercase tracking-wider mb-3 sm:mb-4 px-1.5">
            Peserta ({filteredParticipants.length})
          </h2>

          <div className="bg-card rounded-2xl sm:rounded-3xl border border-border overflow-hidden shadow-sm">
            {filteredParticipants.length > 0 ? (
              filteredParticipants.map((participant, index) => (
                <ParticipantItem
                  key={participant.id}
                  participant={participant}
                  isLast={index === filteredParticipants.length - 1}
                />
              ))
            ) : (
              <p className="text-center text-xs sm:text-sm text-muted-foreground py-6 sm:py-8">
                Peserta tidak ditemukan.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}