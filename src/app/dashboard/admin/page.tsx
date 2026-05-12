"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Users, BookOpen, BarChart3, TrendingUp, TrendingDown 
} from "lucide-react";

export default function AdminHomePage() {
  const router = useRouter();

  useEffect(() => {
    document.title = "Dashboard Admin | EduBidan";
  }, []);

  const stats = [
    { label: "Total Pengguna", value: "5,234", change: "+12%", up: true, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Dosen Aktif", value: "29", change: "+3", up: true, icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Kuis Dikerjakan", value: "1,847", change: "+8%", up: true, icon: BarChart3, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Rata-rata Skor", value: "78.5%", change: "-2%", up: false, icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  const recentActivity = [
    { text: "Sari Dewi menyelesaikan modul Pemeriksaan Kehamilan T1", time: "5 menit lalu" },
    { text: "Maya Sari mendaftar akun baru sebagai Mahasiswa", time: "30 menit lalu" },
    { text: "234 mahasiswa menyelesaikan Kuis ANC Terpadu", time: "1 jam lalu" },
    { text: "Akun Dosen baru (Dr. Rina) telah diverifikasi", time: "2 jam lalu" },
    { text: "Lina Marlina memperbarui data profil", time: "3 jam lalu" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* GREETING & CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground mb-2">Dashboard Admin</h1>
          <p className="text-sm font-medium text-muted-foreground">Monitoring performa dan kelola akses pengguna EduBidan.</p>
        </div>
        <button 
          onClick={() => router.push("/dashboard/admin/students")}
          className="bg-primary text-primary-foreground px-6 py-3.5 rounded-2xl font-extrabold text-sm hover:bg-primary/90 transition-all hover:-translate-y-1 active:scale-95 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
        >
          <Users size={18} /> Kelola Pengguna
        </button>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-10">
        {stats.map((s, i) => (
          <div key={i} className="bg-card rounded-3xl border border-border p-6 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl ${s.bg} ${s.color} flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform`}>
                <s.icon size={24} />
              </div>
              <span className={`text-xs font-extrabold flex items-center gap-1 px-2 py-1 rounded-lg ${s.up ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"}`}>
                {s.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {s.change}
              </span>
            </div>
            <p className="text-3xl font-extrabold text-foreground mb-1 tracking-tight">{s.value}</p>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{s.label}</p>
          </div>
        ))}
      </div>

      {/* RECENT ACTIVITY SECTION (FULL WIDTH) */}
      <div className="bg-card rounded-4xl border border-border p-6 sm:p-8 shadow-sm w-full">
        <h2 className="text-xl font-extrabold text-foreground mb-6 flex items-center gap-2">
          <div className="w-1.5 h-6 bg-primary rounded-full" /> Log Aktivitas Terbaru
        </h2>
        
        {/* Konten Log */}
        <div className="space-y-5">
          {recentActivity.map((a, i) => (
            <div key={i} className="flex gap-4 relative group">
              {/* Timeline Line */}
              {i !== recentActivity.length - 1 && (
                <div className="absolute left-1.75 top-6 w-0.5 h-10 bg-border group-hover:bg-primary/30 transition-colors" />
              )}
              <div className="w-4 h-4 rounded-full bg-primary/20 border-2 border-primary mt-1.5 shrink-0 z-10 group-hover:scale-125 transition-transform" />
              <div className="min-w-0">
                <p className="text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors">{a.text}</p>
                <p className="text-[10px] font-extrabold text-muted-foreground mt-1 uppercase tracking-wider">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Tombol Lihat Semua */}
        <button className="w-full mt-8 py-3.5 rounded-2xl border border-border text-xs font-extrabold text-muted-foreground hover:bg-muted hover:text-foreground transition-all active:scale-95 uppercase tracking-widest">
          Lihat Semua Riwayat
        </button>
      </div>

    </div>
  );
}