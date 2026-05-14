"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  CircleAlert,
  Target,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/shared/StatCard";
import { ModuleProgress } from "@/components/dashboard/student/ModuleProgress";
import { UpcomingQuizCard } from "@/components/dashboard/student/UpcomingQuizCard";

const enrolledModules = [
  {
    id: 1,
    title: "Pemeriksaan Kehamilan Dasar",
    progress: 75,
    lessons: 3,
    completed: 2,
  },
  {
    id: 2,
    title: "Perawatan Bayi Baru Lahir",
    progress: 45,
    lessons: 2,
    completed: 1,
  },
  {
    id: 3,
    title: "Teknik Menyusui Efektif",
    progress: 20,
    lessons: 2,
    completed: 0,
  },
];

const pendingQuizzes = [
  {
    id: 1,
    moduleId: 1,
    title: "Kuis Pemahaman Pemeriksaan Kehamilan",
    status: "Belum Dikerjakan",
  },
  {
    id: 2,
    moduleId: 2,
    title: "Kuis Perawatan Bayi Baru Lahir",
    status: "Belum Dikerjakan",
  },
];

export default function StudentDashboardHome() {
  const router = useRouter();

  const stats = useMemo(
    () => [
      {
        icon: BookOpen,
        label: "Modul Diikuti",
        value: String(enrolledModules.length),
        color: "bg-primary/15 text-primary border-primary/20",
      },
      {
        icon: CheckCircle2,
        label: "Materi Selesai",
        value: "3",
        color: "bg-teal-500/15 text-teal-600 border-teal-500/20",
      },
      {
        icon: ClipboardCheck,
        label: "Kuis Selesai",
        value: "1",
        color: "bg-blue-500/15 text-blue-600 border-blue-500/20",
      },
      {
        icon: CircleAlert,
        label: "Kuis Belum Dikerjakan",
        value: String(pendingQuizzes.length),
        color: "bg-amber-500/15 text-amber-500 border-amber-500/20",
      },
    ],
    []
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="mb-6 sm:mb-8 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1.5 sm:mb-2 text-foreground">
            Halo, Ikhsan!
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm font-medium leading-relaxed max-w-xl">
            Lanjutkan pembelajaran kebidanan Anda melalui materi video dan kuis
            evaluasi yang tersedia.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            color={stat.color}
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
        <section className="lg:col-span-2 bg-card rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6 sm:mb-8 border-b border-border/50 pb-4">
            <h2 className="text-lg sm:text-xl font-extrabold text-foreground">
              Sedang Dipelajari
            </h2>

            <button
              type="button"
              onClick={() => router.push("/dashboard/modules")}
              className="text-xs sm:text-sm font-bold text-primary hover:text-teal-600 transition-colors flex items-center gap-1 group bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg"
            >
              Lihat Modul
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {enrolledModules.map((module) => (
              <ModuleProgress
                key={module.id}
                title={module.title}
                progress={module.progress}
                lessons={module.lessons}
                completed={module.completed}
                onClick={() => router.push(`/dashboard/modules/${module.id}`)}
              />
            ))}
          </div>
        </section>

        <aside className="space-y-5 sm:space-y-6 md:space-y-8">
          <section className="bg-card rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-6 md:p-8 shadow-sm">
            <h2 className="text-lg sm:text-xl font-extrabold mb-5 sm:mb-6 flex items-center gap-2.5 text-foreground border-b border-border/50 pb-4">
              <Target size={20} className="text-primary" />
              Kuis Belum Dikerjakan
            </h2>

            <div className="space-y-3 sm:space-y-4">
              {pendingQuizzes.map((quiz) => (
                <UpcomingQuizCard
                  key={quiz.id}
                  title={quiz.title}
                  date={quiz.status}
                  onClick={() =>
                    router.push(
                      `/dashboard/modules/${quiz.moduleId}/lesson/${quiz.id}`
                    )
                  }
                />
              ))}
            </div>
          </section>

          <section className="bg-card rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Clock3 size={20} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-foreground mb-1">
                  Tips Belajar
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground font-medium">
                  Selesaikan materi video terlebih dahulu sebelum mengerjakan
                  kuis agar hasil evaluasi lebih maksimal.
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}