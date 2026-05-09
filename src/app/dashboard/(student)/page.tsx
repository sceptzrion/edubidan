"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Target, Clock, ChevronRight, Calendar, Award } from "lucide-react";
import { StatCard } from "@/components/dashboard/shared/StatCard";
import { ModuleProgress } from "@/components/dashboard/student/ModuleProgress";
import { UpcomingQuizCard } from "@/components/dashboard/student/UpcomingQuizCard";

export default function StudentDashboardHome() {
  const router = useRouter();

  useEffect(() => {
    document.title = "Dashboard | EduBidan";
  }, []);

  const stats = [
    { icon: BookOpen, label: "Modul Aktif", value: "3", color: "bg-primary/15 text-primary border-primary/20" },
    { icon: Target, label: "Kuis Diselesaikan", value: "8", color: "bg-teal-500/15 text-teal-600 border-teal-500/20" },
    { icon: Clock, label: "Total Menit Belajar", value: "120", color: "bg-blue-500/15 text-blue-600 border-blue-500/20" },
    { icon: Award, label: "Sertifikat Diperoleh", value: "1", color: "bg-amber-500/15 text-amber-500 border-amber-500/20" }, 
  ];

  const recentModules = [
    { title: "Asuhan Kebidanan: Pemeriksaan Kehamilan T1", progress: 80, lessons: 10, completed: 8 },
    { title: "Manajemen Perawatan Bayi Baru Lahir (BBL)", progress: 45, lessons: 8, completed: 4 },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* HEADER DASBOR */}
      <div className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Halo, Ikhsan!</h1>
          <p className="text-muted-foreground text-base font-medium">Mari lanjutkan progres asuhan kebidanan Anda hari ini.</p>
        </div>
      </div>

      {/* STATISTIK KARTU */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
        {stats.map((s, i) => (
          <StatCard key={i} icon={s.icon} label={s.label} value={s.value} color={s.color} />
        ))}
      </div>

      {/* KONTEN BAWAH (PROGRES & KUIS) */}
      <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Kolom Kiri: Progres Modul */}
        <div className="lg:col-span-2 bg-card rounded-3xl border border-border p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">Sedang Dipelajari</h2>
            <button 
              onClick={() => router.push("/dashboard/modules")} 
              className="text-sm font-bold text-primary hover:text-teal-600 transition-colors flex items-center gap-1 group"
            >
              Lihat Modul <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="space-y-8">
            {recentModules.map((m, i) => (
              <ModuleProgress 
                key={i}
                title={m.title}
                progress={m.progress}
                lessons={m.lessons}
                completed={m.completed}
                onClick={() => router.push("/dashboard/modules")}
              />
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Kuis Mendatang */}
        <div className="space-y-6 md:space-y-8">
          <div className="bg-card rounded-3xl border border-border p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
              <Target size={22} className="text-primary" /> Daftar Evaluasi
            </h2>
            <div className="space-y-4">
              <UpcomingQuizCard 
                title="Kuis: ANC Terpadu" 
                date="Minggu Ini" 
                onClick={() => console.log("Menuju kuis...")}
              />
              {/* Nanti kalau ada kuis lain, tinggal tambah komponennya lagi di sini */}
              {/* <UpcomingQuizCard title="Kuis: APGAR Score" date="Belum Dikerjakan" /> */}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}