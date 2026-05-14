"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Grid3X3, List, Plus, Search } from "lucide-react";

import { JoinModuleModal } from "@/components/dashboard/student/modules/JoinModuleModal";
import { ModuleCard } from "@/components/dashboard/student/modules/ModuleCard";
import { learningModules } from "@/data/learning-modules";

export default function StudentModulesPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [joinOpen, setJoinOpen] = useState(false);

  const filteredModules = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return learningModules;

    return learningModules.filter((module) => {
      return (
        module.title.toLowerCase().includes(keyword) ||
        module.description.toLowerCase().includes(keyword) ||
        module.instructor.name.toLowerCase().includes(keyword)
      );
    });
  }, [search]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10 sm:pb-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1.5 sm:mb-2 text-foreground">
            Modul Saya
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
            {learningModules.length} modul pembelajaran terdaftar di akun Anda.
          </p>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap items-center gap-2.5 sm:gap-3">
          <div className="relative w-full sm:w-auto flex-1 sm:flex-none">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground sm:w-4.5 sm:h-4.5"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari modul..."
              className="w-full sm:w-60 pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-xs sm:text-sm font-bold text-foreground transition-all shadow-sm"
            />
          </div>

          <div className="flex items-center gap-1 border border-border bg-card p-1 sm:p-1.5 rounded-xl sm:rounded-2xl shrink-0 shadow-sm">
            <button
              type="button"
              onClick={() => setLayout("grid")}
              aria-label="Tampilan grid"
              className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-colors ${
                layout === "grid"
                  ? "bg-muted text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Grid3X3 size={16} className="sm:w-4.5 sm:h-4.5" />
            </button>

            <button
              type="button"
              onClick={() => setLayout("list")}
              aria-label="Tampilan list"
              className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-colors ${
                layout === "list"
                  ? "bg-muted text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <List size={16} className="sm:w-4.5 sm:h-4.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setJoinOpen(true)}
            className="w-full sm:w-auto bg-primary text-primary-foreground px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 shrink-0"
          >
            <Plus size={16} className="sm:w-4.5 sm:h-4.5" />
            Gabung Modul
          </button>
        </div>
      </div>

      <div
        className={`w-full ${
          layout === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6"
            : "flex flex-col gap-4 sm:gap-5"
        }`}
      >
        {filteredModules.length > 0 ? (
          filteredModules.map((module) => {
            const lessonCount = module.items.filter(
              (item) => item.kind === "materi"
            ).length;
            const quizCount = module.items.filter(
              (item) => item.kind === "kuis"
            ).length;

            return (
              <ModuleCard
                key={module.id}
                data={{
                  id: module.id,
                  title: module.title,
                  desc: module.description,
                  img: module.thumbnail,
                  progress: module.progress,
                  lessons: lessonCount,
                  quizzes: quizCount,
                  duration: module.estimatedTime,
                  instructor: module.instructor.name,
                }}
                layout={layout}
                onClick={() => router.push(`/dashboard/modules/${module.id}`)}
              />
            );
          })
        ) : (
          <div className="col-span-full py-12 sm:py-16 text-center bg-card rounded-2xl sm:rounded-3xl border border-border border-dashed p-6">
            <BookOpen
              size={40}
              className="mx-auto text-muted-foreground/30 mb-3 sm:mb-4 sm:w-12 sm:h-12"
            />
            <p className="text-foreground font-extrabold text-base sm:text-lg mb-1">
              Tidak ada modul yang ditemukan.
            </p>
            <p className="text-xs sm:text-sm font-medium text-muted-foreground leading-relaxed">
              Coba gunakan kata kunci pencarian lain.
            </p>
          </div>
        )}
      </div>

      <JoinModuleModal isOpen={joinOpen} onClose={() => setJoinOpen(false)} />
    </div>
  );
}