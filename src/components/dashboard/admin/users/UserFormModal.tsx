"use client";

import React, { useState } from "react";
import { X, Key, Shield } from "lucide-react";

export type Student = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  institution: string;
  modules: number;
  avgScore: number;
  status: "Aktif" | "Nonaktif";
  joined: string;
  gender?: string;
  role: "Mahasiswa" | "Dosen";
  identityNo: string;
};

interface UserFormModalProps {
  mode: "add" | "edit";
  user?: Student;
  onClose: () => void;
  onSave: (data: Partial<Student>) => void;
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs sm:text-sm mb-2 block font-bold text-foreground">
        {label} {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

export function UserFormModal({ mode, user, onClose, onSave }: UserFormModalProps) {
  const [form, setForm] = useState<Partial<Student>>(
    user ?? {
      name: "",
      email: "",
      phone: "",
      institution: "",
      gender: "Perempuan",
      status: "Aktif",
      modules: 0,
      avgScore: 0,
      role: "Mahasiswa",
      identityNo: "",
      joined: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
    }
  );
  const [generatePwd, setGeneratePwd] = useState(true);
  const [showPwd, setShowPwd] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-200 p-4">
      <div className="bg-card rounded-3xl border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-border flex items-center justify-between sticky top-0 bg-card/95 backdrop-blur z-10">
          <div>
            <h2 className="text-xl font-extrabold text-foreground">
              {mode === "add" ? "Tambah Pengguna Baru" : "Edit Data Pengguna"}
            </h2>
            <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-1">
              {mode === "add"
                ? "Daftarkan akun Dosen atau Mahasiswa ke sistem."
                : "Perbarui informasi dan hak akses pengguna."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-xl text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Nama Lengkap" required>
              <input
                value={form.name ?? ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Contoh: Sari Dewi"
                className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm font-medium transition-all"
              />
            </Field>

            <Field label="Peran Akun" required>
              <div className="relative">
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as "Mahasiswa" | "Dosen" })}
                  className="w-full pl-4 pr-10 py-3 rounded-xl bg-muted/30 border border-border outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm font-bold appearance-none cursor-pointer transition-all"
                >
                  <option value="Mahasiswa">Mahasiswa</option>
                  <option value="Dosen">Dosen</option>
                </select>
                <Shield size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </Field>

            <Field label="Email" required>
              <input
                type="email"
                value={form.email ?? ""}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="nama@email.com"
                className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm font-medium transition-all"
              />
            </Field>

            <Field label={form.role === "Dosen" ? "Nomor Induk Dosen (NIDN/NIP)" : "Nomor Induk Mahasiswa (NIM)"} required>
              <input
                value={form.identityNo ?? ""}
                onChange={(e) => setForm({ ...form, identityNo: e.target.value })}
                placeholder="Masukkan nomor identitas"
                className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm font-mono transition-all"
              />
            </Field>

            <Field label="Institusi / Kampus">
              <input
                value={form.institution ?? ""}
                onChange={(e) => setForm({ ...form, institution: e.target.value })}
                placeholder="Nama kampus asal"
                className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm font-medium transition-all"
              />
            </Field>

            <Field label="Status Akun">
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as "Aktif" | "Nonaktif" })}
                className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm font-bold transition-all"
              >
                <option value="Aktif">Aktif</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>
            </Field>
          </div>

          {/* Password Section */}
          <div className="rounded-2xl border border-border p-5 bg-card shadow-sm relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />
            <div className="flex items-center gap-2 mb-4">
              <Key size={18} className="text-amber-500" />
              <span className="text-sm font-extrabold text-foreground">
                {mode === "add" ? "Kredensial Login" : "Reset Kata Sandi"}
              </span>
            </div>
            <label className="flex items-center gap-3 text-sm font-medium text-muted-foreground mb-4 cursor-pointer hover:text-foreground transition-colors">
              <input
                type="checkbox"
                checked={generatePwd}
                onChange={(e) => setGeneratePwd(e.target.checked)}
                className="w-4 h-4 rounded border-border text-amber-500 focus:ring-amber-500 bg-card"
              />
              <span>Buat password otomatis dan kirim via Email</span>
            </label>

            {!generatePwd && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-xs font-bold text-muted-foreground mb-2 block uppercase tracking-wider">
                  Password Manual
                </label>
                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    placeholder="Min. 8 karakter..."
                    className="w-full px-4 py-3 pr-24 rounded-xl bg-muted/30 border border-border outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm font-medium transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-extrabold text-amber-500 hover:text-amber-600 transition-colors"
                  >
                    {showPwd ? "SEMBUNYIKAN" : "TAMPILKAN"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border flex gap-3 sm:gap-4 bg-muted/10 rounded-b-3xl">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 rounded-xl border border-border text-sm font-bold text-foreground hover:bg-muted transition-colors"
          >
            Batal
          </button>
          <button
            onClick={() => onSave(form)}
            className="flex-1 py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-extrabold hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-md shadow-primary/20"
          >
            {mode === "add" ? "Daftarkan Pengguna" : "Simpan Perubahan"}
          </button>
        </div>
      </div>
    </div>
  );
}