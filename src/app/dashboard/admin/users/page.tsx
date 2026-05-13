"use client";

import React, { useState, useEffect } from "react";
import { Search, Download, Plus, Shield } from "lucide-react";
import { Eye, Edit3, Trash2 } from "lucide-react";
import { UserFormModal, Student } from "@/components/dashboard/admin/users/UserFormModal";
import { UserDetailModal } from "@/components/dashboard/admin/users/UserDetailModal";

const initialStudents: Student[] = [
  { id: 1, name: "Sari Dewi", email: "sari@email.com", phone: "+62 812-1111-1111", institution: "STIKES Dharma Husada", modules: 6, avgScore: 92, status: "Aktif", joined: "15 Jan 2026", gender: "Perempuan", role: "Mahasiswa", identityNo: "2024010101" },
  { id: 2, name: "Anisa Putri", email: "anisa@email.com", phone: "+62 813-2222-2222", institution: "Universitas Indonesia", modules: 4, avgScore: 85, status: "Aktif", joined: "20 Jan 2026", gender: "Perempuan", role: "Mahasiswa", identityNo: "2024010102" },
  { id: 3, name: "Dr. Rina Hartati", email: "rina.h@edubidan.id", phone: "+62 821-3333-3333", institution: "Poltekkes Kemenkes", modules: 8, avgScore: 0, status: "Aktif", joined: "01 Feb 2026", gender: "Perempuan", role: "Dosen", identityNo: "0312087701" },
  { id: 4, name: "Dewi Anggraini", email: "dewi@email.com", phone: "+62 822-4444-4444", institution: "STIKES Dharma Husada", modules: 5, avgScore: 71, status: "Nonaktif", joined: "05 Feb 2026", gender: "Perempuan", role: "Mahasiswa", identityNo: "2024010104" },
  { id: 5, name: "Maya Sari", email: "maya@email.com", phone: "+62 823-5555-5555", institution: "Universitas Indonesia", modules: 2, avgScore: 65, status: "Aktif", joined: "10 Mar 2026", gender: "Perempuan", role: "Mahasiswa", identityNo: "2024010105" },
  { id: 6, name: "Dr. Bambang Surya, M.Keb", email: "bambang.s@edubidan.id", phone: "+62 815-6666-6666", institution: "Poltekkes Kemenkes", modules: 4, avgScore: 0, status: "Aktif", joined: "12 Mar 2026", gender: "Laki-laki", role: "Dosen", identityNo: "0420116802" },
  { id: 7, name: "Nita Suryani", email: "nita@email.com", phone: "+62 816-7777-7777", institution: "STIKES Dharma Husada", modules: 1, avgScore: 0, status: "Aktif", joined: "15 Apr 2026", gender: "Perempuan", role: "Mahasiswa", identityNo: "2024010107" },
];

type ModalState = { mode: "add" | "edit" | "detail" | null; student?: Student };

export default function AdminUsersPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [roleFilter, setRoleFilter] = useState<"Semua" | "Mahasiswa" | "Dosen">("Semua");
  const [modal, setModal] = useState<ModalState>({ mode: null });

  useEffect(() => {
    document.title = "Kelola Pengguna | Admin EduBidan";
  }, []);

  const filtered = students.filter(
    (s) =>
      (statusFilter === "Semua" || s.status === statusFilter) &&
      (roleFilter === "Semua" || s.role === roleFilter) &&
      (
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase()) ||
        s.identityNo.includes(search)
      )
  );

  const closeModal = () => setModal({ mode: null });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2">Kelola Pengguna</h1>
          <p className="text-sm font-medium text-muted-foreground">Kelola data, peran, dan akses Dosen serta Mahasiswa.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-3 rounded-2xl border border-border text-sm font-bold text-foreground hover:bg-muted transition-colors flex items-center gap-2 shadow-sm">
            <Download size={16} /> Ekspor
          </button>
          <button
            onClick={() => setModal({ mode: "add" })}
            className="bg-primary text-primary-foreground px-5 py-3 rounded-2xl text-sm font-extrabold hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/20 flex items-center gap-2"
          >
            <Plus size={18} /> Tambah Data
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">

        {/* Toolbar */}
        <div className="p-5 sm:p-6 border-b border-border bg-muted/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-72">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama, email, NIM/NIP..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm transition-all"
              />
            </div>
            <div className="relative w-full sm:w-auto">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as "Semua" | "Mahasiswa" | "Dosen")}
                className="w-full sm:w-auto pl-4 pr-10 py-2.5 rounded-xl bg-card border border-border text-sm font-bold outline-none appearance-none cursor-pointer shadow-sm focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              >
                <option value="Semua">Semua Peran</option>
                <option value="Mahasiswa">Mahasiswa</option>
                <option value="Dosen">Dosen</option>
              </select>
              <Shield size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-2 bg-muted/30 p-1.5 rounded-xl border border-border/50 self-start md:self-auto">
            {["Semua", "Aktif", "Nonaktif"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all ${
                  statusFilter === s
                    ? "bg-card text-foreground shadow-sm border border-border/50"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="p-4 sm:px-6 font-extrabold text-muted-foreground text-xs uppercase tracking-wider">Pengguna</th>
                <th className="p-4 sm:px-6 font-extrabold text-muted-foreground text-xs uppercase tracking-wider">Identitas</th>
                <th className="p-4 sm:px-6 font-extrabold text-muted-foreground text-xs uppercase tracking-wider">Email</th>
                <th className="text-center p-4 sm:px-6 font-extrabold text-muted-foreground text-xs uppercase tracking-wider">Peran</th>
                <th className="text-center p-4 sm:px-6 font-extrabold text-muted-foreground text-xs uppercase tracking-wider">Status</th>
                <th className="text-center p-4 sm:px-6 font-extrabold text-muted-foreground text-xs uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors group">
                  <td className="p-4 sm:px-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold shrink-0 shadow-inner ${
                          s.role === "Dosen" ? "bg-indigo-500/10 text-indigo-600" : "bg-teal-500/10 text-teal-600"
                        }`}
                      >
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-extrabold text-foreground text-sm">{s.name}</p>
                        <p className="text-[10px] sm:text-xs font-medium text-muted-foreground mt-0.5">Bergabung: {s.joined}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 sm:px-6 text-muted-foreground font-mono text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold bg-muted px-2 py-0.5 rounded uppercase tracking-wider text-foreground">
                        {s.role === "Dosen" ? "NIP" : "NIM"}
                      </span>
                      <span className="font-medium">{s.identityNo}</span>
                    </div>
                  </td>
                  <td className="p-4 sm:px-6 text-muted-foreground font-medium text-xs sm:text-sm">{s.email}</td>
                  <td className="p-4 sm:px-6 text-center">
                    <span
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                        s.role === "Dosen"
                          ? "bg-indigo-500/10 text-indigo-600 border border-indigo-500/20"
                          : "bg-teal-500/10 text-teal-600 border border-teal-500/20"
                      }`}
                    >
                      {s.role}
                    </span>
                  </td>
                  <td className="p-4 sm:px-6 text-center">
                    <span
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                        s.status === "Aktif"
                          ? "bg-green-500/10 text-green-600 border border-green-500/20"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="p-4 sm:px-6 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => setModal({ mode: "detail", student: s })}
                        className="p-2 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors text-muted-foreground"
                        title="Lihat Detail"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => setModal({ mode: "edit", student: s })}
                        className="p-2 hover:bg-muted rounded-xl transition-colors text-muted-foreground hover:text-foreground"
                        title="Edit Data"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => setStudents(students.filter((x) => x.id !== s.id))}
                        className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-colors text-muted-foreground"
                        title="Hapus"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-12 text-center">
                    <Search size={32} className="mx-auto text-muted-foreground/30 mb-3" />
                    <p className="text-sm font-bold text-foreground">Pengguna Tidak Ditemukan</p>
                    <p className="text-xs text-muted-foreground mt-1">Ubah filter atau kata kunci pencarian Anda.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {(modal.mode === "add" || modal.mode === "edit") && (
        <UserFormModal
          mode={modal.mode}
          user={modal.student}
          onClose={closeModal}
          onSave={(data) => {
            if (modal.mode === "add") {
              setStudents([...students, { ...data, id: Date.now() } as Student]);
            } else {
              setStudents(students.map((x) => (x.id === modal.student!.id ? { ...x, ...data } : x)));
            }
            closeModal();
          }}
        />
      )}

      {modal.mode === "detail" && modal.student && (
        <UserDetailModal user={modal.student} onClose={closeModal} />
      )}
    </div>
  );
}