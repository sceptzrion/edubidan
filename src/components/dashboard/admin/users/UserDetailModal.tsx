"use client";

import React, { useState } from "react";
import {
  X, Mail, Phone, Building2, Calendar, Award,
  CheckCircle2, Shield, Lock, Key, Trash2,
} from "lucide-react";
import { Student } from "@/components/dashboard/admin/users/UserFormModal";

interface UserDetailModalProps {
  user: Student;
  onClose: () => void;
}

const quizHistory = [
  { module: "Pemeriksaan Kehamilan T1", quiz: "Kuis ANC Terpadu", score: 92, date: "10 Apr 2026", status: "Lulus" },
  { module: "Pemeriksaan Kehamilan T1", quiz: "Kuis Leopold & DJJ", score: 88, date: "08 Apr 2026", status: "Lulus" },
  { module: "Perawatan Bayi Baru Lahir", quiz: "Kuis APGAR Score", score: 76, date: "02 Apr 2026", status: "Lulus" },
  { module: "Teknik Menyusui", quiz: "Kuis Manajemen Laktasi", score: 68, date: "25 Mar 2026", status: "Mengulang" },
];

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="p-4 rounded-2xl border border-border bg-muted/10 flex items-start gap-3">
      <div className="text-primary mt-0.5">{icon}</div>
      <div>
        <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-extrabold text-foreground">{value}</p>
      </div>
    </div>
  );
}

function AccountRow({
  icon, title, desc, action, tone,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  action: string;
  tone: "primary" | "neutral" | "danger";
}) {
  const btnClass =
    tone === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20"
      : tone === "danger"
      ? "bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white border border-red-500/20"
      : "bg-card text-foreground border border-border hover:bg-muted shadow-sm";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner ${
            tone === "danger" ? "bg-red-500/10 text-red-500" : "bg-primary/10 text-primary"
          }`}
        >
          {icon}
        </div>
        <div>
          <p className="text-base font-extrabold text-foreground mb-0.5">{title}</p>
          <p className="text-xs sm:text-sm font-medium text-muted-foreground leading-relaxed">{desc}</p>
        </div>
      </div>
      <button
        className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all active:scale-95 whitespace-nowrap ${btnClass}`}
      >
        {action}
      </button>
    </div>
  );
}

export function UserDetailModal({ user, onClose }: UserDetailModalProps) {
  const [tab, setTab] = useState<"profil" | "nilai" | "akun">("profil");

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-200 p-4">
      <div className="bg-card rounded-3xl border border-border w-full max-w-3xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between bg-card shrink-0">
          <h2 className="text-xl font-extrabold text-foreground">Detail Pengguna</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-xl text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto scrollbar-thin">
          <div className="p-6 sm:p-8">

            {/* User Banner */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-8 text-center sm:text-left">
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl text-white flex items-center justify-center text-3xl font-extrabold shadow-lg shrink-0 ${
                  user.role === "Dosen"
                    ? "bg-linear-to-br from-indigo-500 to-purple-500"
                    : "bg-linear-to-br from-primary to-teal-500"
                }`}
              >
                {user.name[0]}
              </div>
              <div className="flex-1 mt-2 sm:mt-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                  <h3 className="text-2xl font-extrabold text-foreground">{user.name}</h3>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span
                      className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                        user.role === "Dosen"
                          ? "bg-indigo-500/10 text-indigo-600 border border-indigo-500/20"
                          : "bg-teal-500/10 text-teal-600 border border-teal-500/20"
                      }`}
                    >
                      {user.role}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                        user.status === "Aktif"
                          ? "bg-green-500/10 text-green-600 border border-green-500/20"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>
                </div>
                <p className="text-sm font-medium text-muted-foreground flex items-center justify-center sm:justify-start gap-2">
                  <Building2 size={16} /> {user.institution}
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 sm:gap-6 border-b border-border mb-8 overflow-x-auto scrollbar-none">
              {(["profil", "nilai", "akun"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-2 py-3 text-xs sm:text-sm font-extrabold capitalize border-b-2 transition-all whitespace-nowrap ${
                    tab === t
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                >
                  {t === "profil"
                    ? "Informasi Profil"
                    : t === "nilai"
                    ? "Riwayat Aktivitas & Nilai"
                    : "Pengaturan Keamanan"}
                </button>
              ))}
            </div>

            {/* Tab: Profil */}
            {tab === "profil" && (
              <div className="grid sm:grid-cols-2 gap-4 animate-in fade-in duration-300">
                <Info icon={<Mail size={16} />} label="Alamat Email" value={user.email} />
                <Info icon={<Phone size={16} />} label="Nomor Telepon" value={user.phone ?? "-"} />
                <Info
                  icon={<Shield size={16} />}
                  label={user.role === "Dosen" ? "NIDN / NIP" : "NIM / NPM"}
                  value={user.identityNo}
                />
                <Info icon={<Calendar size={16} />} label="Tanggal Bergabung" value={user.joined} />
                <Info icon={<Award size={16} />} label="Modul Diselesaikan" value={`${user.modules} Modul`} />
                <Info
                  icon={<CheckCircle2 size={16} />}
                  label="Skor Rata-rata"
                  value={user.avgScore > 0 ? `${user.avgScore}%` : "Belum ada data"}
                />
              </div>
            )}

            {/* Tab: Nilai */}
            {tab === "nilai" && (
              <div className="animate-in fade-in duration-300">
                {user.role === "Dosen" ? (
                  <div className="p-8 text-center border border-border rounded-2xl bg-muted/10">
                    <p className="text-sm font-bold text-muted-foreground">
                      Riwayat nilai tidak berlaku untuk akun Dosen.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto border border-border rounded-2xl shadow-sm">
                    <table className="w-full text-sm whitespace-nowrap">
                      <thead className="bg-muted/30">
                        <tr className="border-b border-border">
                          <th className="text-left p-4 font-extrabold text-muted-foreground text-xs uppercase tracking-wider">Modul</th>
                          <th className="text-left p-4 font-extrabold text-muted-foreground text-xs uppercase tracking-wider">Kuis</th>
                          <th className="text-center p-4 font-extrabold text-muted-foreground text-xs uppercase tracking-wider">Skor</th>
                          <th className="text-center p-4 font-extrabold text-muted-foreground text-xs uppercase tracking-wider">Tanggal</th>
                          <th className="text-center p-4 font-extrabold text-muted-foreground text-xs uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quizHistory.map((q, i) => (
                          <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30">
                            <td className="p-4 text-xs font-bold text-muted-foreground">{q.module}</td>
                            <td className="p-4 font-extrabold text-foreground">{q.quiz}</td>
                            <td className="p-4 text-center">
                              <span className={`font-extrabold ${q.score >= 70 ? "text-green-500" : "text-amber-500"}`}>
                                {q.score}%
                              </span>
                            </td>
                            <td className="p-4 text-center text-xs font-medium text-muted-foreground">{q.date}</td>
                            <td className="p-4 text-center">
                              <span
                                className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                                  q.status === "Lulus"
                                    ? "bg-green-500/10 text-green-600 border border-green-500/20"
                                    : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                                }`}
                              >
                                {q.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Tab: Akun */}
            {tab === "akun" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <AccountRow
                  icon={<Lock size={20} />}
                  title="Reset Kata Sandi"
                  desc="Kirim tautan reset kata sandi ke email pengguna."
                  action="Kirim Link"
                  tone="primary"
                />
                <AccountRow
                  icon={<Key size={20} />}
                  title="Cabut Sesi Aktif"
                  desc="Paksa logout dari semua perangkat yang terhubung."
                  action="Logout Semua"
                  tone="neutral"
                />
                <AccountRow
                  icon={<Shield size={20} />}
                  title="Autentikasi 2 Langkah"
                  desc="Wajibkan pengguna untuk menggunakan verifikasi OTP."
                  action="Wajibkan 2FA"
                  tone="neutral"
                />
                <AccountRow
                  icon={<Trash2 size={20} />}
                  title="Nonaktifkan Akun"
                  desc="Pengguna tidak akan bisa login ke dalam sistem EduBidan."
                  action={user.status === "Aktif" ? "Nonaktifkan Akun" : "Aktifkan Akun"}
                  tone="danger"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}