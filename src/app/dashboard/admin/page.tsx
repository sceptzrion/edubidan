"use client";

import { useRouter } from "next/navigation";
import {
  Activity,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  UserCog,
  Users,
} from "lucide-react";

const stats = [
  {
    label: "Total Pengguna",
    value: "126",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-500/10",
  },
  {
    label: "Mahasiswa Aktif",
    value: "108",
    icon: GraduationCap,
    color: "text-teal-600",
    bg: "bg-teal-500/10",
  },
  {
    label: "Dosen Aktif",
    value: "12",
    icon: ShieldCheck,
    color: "text-indigo-600",
    bg: "bg-indigo-500/10",
  },
  {
    label: "Modul Publik",
    value: "9",
    icon: BookOpen,
    color: "text-amber-600",
    bg: "bg-amber-500/10",
  },
];

const recentActivity = [
  {
    text: "Maya Sari mendaftar akun baru sebagai mahasiswa",
    time: "30 menit lalu",
  },
  {
    text: "Admin mengaktifkan akun dosen Dr. Rina Hartati",
    time: "2 jam lalu",
  },
  {
    text: "Modul Perawatan Bayi Baru Lahir dipublikasikan",
    time: "1 hari lalu",
  },
  {
    text: "Data pengguna Nita Suryani diperbarui",
    time: "2 hari lalu",
  },
];

export default function AdminHomePage() {
  const router = useRouter();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground mb-2">
            Dashboard Admin
          </h1>
          <p className="text-sm font-medium text-muted-foreground max-w-2xl">
            Pantau ringkasan pengguna, dosen, mahasiswa, dan modul pembelajaran
            pada platform EduBidan.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/dashboard/admin/users")}
          className="bg-primary text-primary-foreground px-6 py-3.5 rounded-2xl font-extrabold text-sm hover:bg-primary/90 transition-all hover:-translate-y-1 active:scale-95 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
        >
          <UserCog size={18} />
          Kelola Pengguna
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card rounded-3xl border border-border p-6 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform`}
              >
                <stat.icon size={24} />
              </div>
            </div>

            <p className="text-3xl font-extrabold text-foreground mb-1 tracking-tight">
              {stat.value}
            </p>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <section className="bg-card rounded-4xl border border-border p-6 sm:p-8 shadow-sm w-full">
          <h2 className="text-xl font-extrabold text-foreground mb-6 flex items-center gap-2">
            <div className="w-1.5 h-6 bg-primary rounded-full" />
            Log Aktivitas Terbaru
          </h2>

          <div className="space-y-5">
            {recentActivity.map((activity, index) => (
              <div key={activity.text} className="flex gap-4 relative group">
                {index !== recentActivity.length - 1 && (
                  <div className="absolute left-1.75 top-6 w-0.5 h-10 bg-border group-hover:bg-primary/30 transition-colors" />
                )}

                <div className="w-4 h-4 rounded-full bg-primary/20 border-2 border-primary mt-1.5 shrink-0 z-10 group-hover:scale-125 transition-transform" />

                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                    {activity.text}
                  </p>
                  <p className="text-[10px] font-extrabold text-muted-foreground mt-1 uppercase tracking-wider">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="bg-card rounded-4xl border border-border p-6 sm:p-8 shadow-sm h-fit">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
            <Activity size={24} />
          </div>

          <h2 className="text-lg font-extrabold text-foreground mb-2">
            Fokus Admin
          </h2>

          <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-5">
            Admin berperan mengelola akun pengguna dan memastikan akses sistem
            berjalan sesuai peran mahasiswa, dosen, dan admin.
          </p>

          <button
            type="button"
            onClick={() => router.push("/dashboard/admin/users")}
            className="w-full py-3 rounded-2xl bg-muted hover:bg-muted/80 text-sm font-extrabold text-foreground transition-colors"
          >
            Buka Kelola Pengguna
          </button>
        </aside>
      </div>
    </div>
  );
}