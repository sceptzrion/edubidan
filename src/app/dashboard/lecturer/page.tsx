"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, FileText, GraduationCap, ClipboardList, Plus } from "lucide-react";
import { StatCard } from "@/components/dashboard/shared/StatCard";
import { ActionWidget } from "@/components/dashboard/lecturer/ActionWidget";
import { ActivityItem } from "@/components/dashboard/lecturer/ActivityItem";

export default function LecturerDashboardHome() {
  const router = useRouter();

  useEffect(() => {
    document.title = "Dashboard Dosen | EduBidan";
  }, []);

  const stats = [
    { label: "Modul Publik", value: "3", icon: BookOpen, color: "bg-primary/15 text-primary border-primary/20" },
    { label: "Total Materi", value: "12", icon: FileText, color: "bg-teal-500/15 text-teal-600 border-teal-500/20" },
    { label: "Mahasiswa Terdaftar", value: "45", icon: GraduationCap, color: "bg-blue-500/15 text-blue-600 border-blue-500/20" },
    { label: "Evaluasi Menunggu", value: "8", icon: ClipboardList, color: "bg-amber-500/15 text-amber-500 border-amber-500/20" },
  ];

  const recentActivities = [
    { text: "Mahasiswa Ikhsan Rizqi menyelesaikan kuis ANC Terpadu", highlight: "Skor: 90", time: "10 menit lalu" },
    { text: "Modul 'Pemeriksaan Kehamilan Trimester 1' berhasil dipublikasi", highlight: "Publik", time: "2 jam lalu" },
    { text: "12 mahasiswa baru bergabung pada kelas Anda", highlight: "Info", time: "1 hari lalu" }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* HEADER */}
      <div className="mb-6 sm:mb-8 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1.5 sm:mb-2 text-foreground">Selamat datang, Dr. Rina!</h1>
          <p className="text-muted-foreground text-xs sm:text-sm font-medium leading-relaxed max-w-2xl">
            Pantau aktivitas kelas, kelola publikasi modul, dan tinjau rekapitulasi nilai mahasiswa Anda di sini.
          </p>
        </div>
      </div>

      {/* STATS KARTU */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10">
        {stats.map((s, i) => (
          <StatCard key={i} icon={s.icon} label={s.label} value={s.value} color={s.color} />
        ))}
      </div>

      {/* KONTEN BAWAH */}
      <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 md:gap-8 items-start">
        
        {/* AKSI CEPAT */}
        <div className="bg-card rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-6 md:p-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-extrabold mb-5 sm:mb-6 text-foreground border-b border-border/50 pb-4">Aksi Cepat</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ActionWidget 
              icon={Plus} 
              bgIcon={BookOpen} 
              title="Buat Modul Baru" 
              description="Rancang dan unggah materi pembelajaran." 
              onClick={() => router.push("/dashboard/lecturer/modules")} 
              colorTheme="primary"
            />
            
            <ActionWidget 
              icon={ClipboardList} 
              bgIcon={GraduationCap} 
              title="Tinjau Rekap Nilai" 
              description="Pantau capaian evaluasi kelas mahasiswa." 
              onClick={() => router.push("/dashboard/lecturer/gradebook")} 
              colorTheme="teal"
            />
          </div>
        </div>

        {/* AKTIVITAS TERBARU */}
        <div className="bg-card rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-6 md:p-8 shadow-sm">
          <h2 className="text-lg sm:text-xl font-extrabold mb-5 sm:mb-6 text-foreground border-b border-border/50 pb-4">Aktivitas Terbaru</h2>
          
          <div className="space-y-4">
            {recentActivities.map((item, i) => (
              <ActivityItem 
                key={i}
                text={item.text}
                highlight={item.highlight}
                time={item.time}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}