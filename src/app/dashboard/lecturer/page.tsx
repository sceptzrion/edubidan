"use client";

import { useRouter } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  ClipboardList,
  FileQuestion,
  GraduationCap,
  Plus,
  Users,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/shared/StatCard";
import { ActionWidget } from "@/components/dashboard/lecturer/ActionWidget";
import { ActivityItem } from "@/components/dashboard/lecturer/ActivityItem";

const recentActivities = [
  {
    text: "Sari Dewi menyelesaikan Kuis Pemahaman Pemeriksaan Kehamilan",
    highlight: "Skor: 90",
    time: "10 menit lalu",
  },
  {
    text: "Modul Pemeriksaan Kehamilan Dasar berhasil dipublikasi",
    highlight: "Publik",
    time: "2 jam lalu",
  },
  {
    text: "5 mahasiswa baru bergabung pada modul Perawatan Bayi Baru Lahir",
    highlight: "Info",
    time: "1 hari lalu",
  },
];

export default function LecturerDashboardHome() {
  const router = useRouter();

  const stats = [
    {
      label: "Modul Saya",
      value: "3",
      icon: BookOpen,
      color: "bg-primary/15 text-primary border-primary/20",
    },
    {
      label: "Total Kuis",
      value: "6",
      icon: FileQuestion,
      color: "bg-teal-500/15 text-teal-600 border-teal-500/20",
    },
    {
      label: "Mahasiswa Terdaftar",
      value: "84",
      icon: Users,
      color: "bg-blue-500/15 text-blue-600 border-blue-500/20",
    },
    {
      label: "Rata-rata Skor",
      value: "82",
      icon: BarChart3,
      color: "bg-amber-500/15 text-amber-500 border-amber-500/20",
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="mb-6 sm:mb-8 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1.5 sm:mb-2 text-foreground">
            Selamat datang, Dr. Rina!
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm font-medium leading-relaxed max-w-2xl">
            Kelola modul pembelajaran, pantau pengerjaan kuis, dan lihat rekap
            capaian mahasiswa pada modul yang Anda buat.
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

      <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 md:gap-8 items-start">
        <section className="bg-card rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-6 md:p-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-extrabold mb-5 sm:mb-6 text-foreground border-b border-border/50 pb-4">
            Aksi Cepat
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ActionWidget
              icon={Plus}
              bgIcon={BookOpen}
              title="Buat Modul Baru"
              description="Tambahkan modul, materi video, dan kuis evaluasi."
              onClick={() => router.push("/dashboard/lecturer/modules")}
              colorTheme="primary"
            />

            <ActionWidget
              icon={ClipboardList}
              bgIcon={GraduationCap}
              title="Tinjau Rekap Nilai"
              description="Pantau nilai kuis mahasiswa per modul."
              onClick={() => router.push("/dashboard/lecturer/gradebook")}
              colorTheme="teal"
            />
          </div>
        </section>

        <section className="bg-card rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-6 md:p-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-extrabold mb-5 sm:mb-6 text-foreground border-b border-border/50 pb-4">
            Aktivitas Terbaru
          </h2>

          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <ActivityItem
                key={`${activity.text}-${activity.time}`}
                text={activity.text}
                highlight={activity.highlight}
                time={activity.time}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}