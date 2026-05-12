"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, Eye, Edit3, Trash2, Download, Plus, X, 
  Mail, Phone, Building2, Calendar, Award, Lock, Key, Shield, CheckCircle2 
} from "lucide-react";

// --- DUMMY DATA ---
type Student = {
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

const initialStudents: Student[] = [
  { id: 1, name: "Sari Dewi", email: "sari@email.com", phone: "+62 812-1111-1111", institution: "STIKES Dharma Husada", modules: 6, avgScore: 92, status: "Aktif", joined: "15 Jan 2026", gender: "Perempuan", role: "Mahasiswa", identityNo: "2024010101" },
  { id: 2, name: "Anisa Putri", email: "anisa@email.com", phone: "+62 813-2222-2222", institution: "Universitas Indonesia", modules: 4, avgScore: 85, status: "Aktif", joined: "20 Jan 2026", gender: "Perempuan", role: "Mahasiswa", identityNo: "2024010102" },
  { id: 3, name: "Dr. Rina Hartati", email: "rina.h@edubidan.id", phone: "+62 821-3333-3333", institution: "Poltekkes Kemenkes", modules: 8, avgScore: 0, status: "Aktif", joined: "01 Feb 2026", gender: "Perempuan", role: "Dosen", identityNo: "0312087701" },
  { id: 4, name: "Dewi Anggraini", email: "dewi@email.com", phone: "+62 822-4444-4444", institution: "STIKES Dharma Husada", modules: 5, avgScore: 71, status: "Nonaktif", joined: "05 Feb 2026", gender: "Perempuan", role: "Mahasiswa", identityNo: "2024010104" },
  { id: 5, name: "Maya Sari", email: "maya@email.com", phone: "+62 823-5555-5555", institution: "Universitas Indonesia", modules: 2, avgScore: 65, status: "Aktif", joined: "10 Mar 2026", gender: "Perempuan", role: "Mahasiswa", identityNo: "2024010105" },
  { id: 6, name: "Dr. Bambang Surya, M.Keb", email: "bambang.s@edubidan.id", phone: "+62 815-6666-6666", institution: "Poltekkes Kemenkes", modules: 4, avgScore: 0, status: "Aktif", joined: "12 Mar 2026", gender: "Laki-laki", role: "Dosen", identityNo: "0420116802" },
  { id: 7, name: "Nita Suryani", email: "nita@email.com", phone: "+62 816-7777-7777", institution: "STIKES Dharma Husada", modules: 1, avgScore: 0, status: "Aktif", joined: "15 Apr 2026", gender: "Perempuan", role: "Mahasiswa", identityNo: "2024010107" },
];

const quizHistory = [
  { module: "Pemeriksaan Kehamilan T1", quiz: "Kuis ANC Terpadu", score: 92, date: "10 Apr 2026", status: "Lulus" },
  { module: "Pemeriksaan Kehamilan T1", quiz: "Kuis Leopold & DJJ", score: 88, date: "08 Apr 2026", status: "Lulus" },
  { module: "Perawatan Bayi Baru Lahir", quiz: "Kuis APGAR Score", score: 76, date: "02 Apr 2026", status: "Lulus" },
  { module: "Teknik Menyusui", quiz: "Kuis Manajemen Laktasi", score: 68, date: "25 Mar 2026", status: "Mengulang" },
];

export default function AdminUsersPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [roleFilter, setRoleFilter] = useState<"Semua" | "Mahasiswa" | "Dosen">("Semua");
  const [modal, setModal] = useState<{ mode: "add" | "edit" | "detail" | null; student?: Student }>({ mode: null });

  useEffect(() => {
    document.title = "Kelola Pengguna | Admin EduBidan";
  }, []);

  const filtered = students.filter(s =>
    (statusFilter === "Semua" || s.status === statusFilter) &&
    (roleFilter === "Semua" || s.role === roleFilter) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()) || s.identityNo.includes(search))
  );

  const closeModal = () => setModal({ mode: null });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2">Kelola Pengguna</h1>
          <p className="text-sm font-medium text-muted-foreground">Kelola data, peran, dan akses Dosen serta Mahasiswa.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-3 rounded-2xl border border-border text-sm font-bold text-foreground hover:bg-muted transition-colors flex items-center gap-2 shadow-sm">
            <Download size={16} /> Ekspor
          </button>
          <button onClick={() => setModal({ mode: "add" })} className="bg-primary text-primary-foreground px-5 py-3 rounded-2xl text-sm font-extrabold hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/20 flex items-center gap-2">
            <Plus size={18} /> Tambah Data
          </button>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
        
        {/* TOOLBAR FILTER & SEARCH */}
        <div className="p-5 sm:p-6 border-b border-border bg-muted/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-72">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                placeholder="Cari nama, email, NIM/NIP..." 
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm transition-all" 
              />
            </div>
            <div className="relative w-full sm:w-auto">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as any)}
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
            {["Semua", "Aktif", "Nonaktif"].map(s => (
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

        {/* TABLE */}
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
              {filtered.map(s => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors group">
                  <td className="p-4 sm:px-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold shrink-0 shadow-inner ${
                        s.role === "Dosen" 
                        ? "bg-indigo-500/10 text-indigo-600" 
                        : "bg-teal-500/10 text-teal-600"
                      }`}>
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
                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                      s.role === "Dosen" 
                      ? "bg-indigo-500/10 text-indigo-600 border border-indigo-500/20" 
                      : "bg-teal-500/10 text-teal-600 border border-teal-500/20"
                    }`}>
                      {s.role}
                    </span>
                  </td>
                  <td className="p-4 sm:px-6 text-center">
                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                      s.status === "Aktif" 
                      ? "bg-green-500/10 text-green-600 border border-green-500/20" 
                      : "bg-muted text-muted-foreground border border-border"
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="p-4 sm:px-6 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button onClick={() => setModal({ mode: "detail", student: s })} className="p-2 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors text-muted-foreground" title="Lihat Detail">
                        <Eye size={18} />
                      </button>
                      <button onClick={() => setModal({ mode: "edit", student: s })} className="p-2 hover:bg-muted rounded-xl transition-colors text-muted-foreground hover:text-foreground" title="Edit Data">
                        <Edit3 size={18} />
                      </button>
                      <button onClick={() => setStudents(students.filter(x => x.id !== s.id))} className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-colors text-muted-foreground" title="Hapus">
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

      {/* MODALS */}
      {(modal.mode === "add" || modal.mode === "edit") && (
        <UserFormModal mode={modal.mode} user={modal.student} onClose={closeModal} onSave={(data) => {
          if (modal.mode === "add") setStudents([...students, { ...data, id: Date.now() } as Student]);
          else setStudents(students.map(x => x.id === modal.student!.id ? { ...x, ...data } : x));
          closeModal();
        }} />
      )}

      {modal.mode === "detail" && modal.student && (
        <UserDetailModal user={modal.student} onClose={closeModal} />
      )}
    </div>
  );
}

/* =========================================================================
   KOMPONEN MODAL: FORM TAMBAH/EDIT
   ========================================================================= */
function UserFormModal({ mode, user, onClose, onSave }: { mode: "add" | "edit"; user?: Student; onClose: () => void; onSave: (data: Partial<Student>) => void }) {
  const [form, setForm] = useState<Partial<Student>>(user ?? { name: "", email: "", phone: "", institution: "", gender: "Perempuan", status: "Aktif", modules: 0, avgScore: 0, role: "Mahasiswa", identityNo: "", joined: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) });
  const [generatePwd, setGeneratePwd] = useState(true);
  const [showPwd, setShowPwd] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-200 p-4">
      <div className="bg-card rounded-3xl border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
        
        <div className="p-6 sm:p-8 border-b border-border flex items-center justify-between sticky top-0 bg-card/95 backdrop-blur z-10">
          <div>
            <h2 className="text-xl font-extrabold text-foreground">{mode === "add" ? "Tambah Pengguna Baru" : "Edit Data Pengguna"}</h2>
            <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-1">
              {mode === "add" ? "Daftarkan akun Dosen atau Mahasiswa ke sistem." : "Perbarui informasi dan hak akses pengguna."}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-xl text-muted-foreground hover:text-foreground transition-colors"><X size={20} /></button>
        </div>
        
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Nama Lengkap" required>
              <input value={form.name ?? ""} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Contoh: Sari Dewi" className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm font-medium transition-all" />
            </Field>
            <Field label="Peran Akun" required>
              <div className="relative">
                <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value as "Mahasiswa" | "Dosen" })} className="w-full pl-4 pr-10 py-3 rounded-xl bg-muted/30 border border-border outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm font-bold appearance-none cursor-pointer transition-all">
                  <option value="Mahasiswa">Mahasiswa</option>
                  <option value="Dosen">Dosen</option>
                </select>
                <Shield size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </Field>
            <Field label="Email" required>
              <input type="email" value={form.email ?? ""} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="nama@email.com" className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm font-medium transition-all" />
            </Field>
            <Field label={form.role === "Dosen" ? "Nomor Induk Dosen (NIDN/NIP)" : "Nomor Induk Mahasiswa (NIM)"} required>
              <input value={form.identityNo ?? ""} onChange={e => setForm({ ...form, identityNo: e.target.value })} placeholder="Masukkan nomor identitas" className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm font-mono transition-all" />
            </Field>
            <Field label="Institusi / Kampus">
              <input value={form.institution ?? ""} onChange={e => setForm({ ...form, institution: e.target.value })} placeholder="Nama kampus asal" className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm font-medium transition-all" />
            </Field>
            <Field label="Status Akun">
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as "Aktif" | "Nonaktif" })} className="w-full px-4 py-3 rounded-xl bg-muted/30 border border-border outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm font-bold transition-all">
                <option value="Aktif">Aktif</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>
            </Field>
          </div>

          <div className="rounded-2xl border border-border p-5 bg-card shadow-sm relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />
            <div className="flex items-center gap-2 mb-4">
              <Key size={18} className="text-amber-500" />
              <span className="text-sm font-extrabold text-foreground">{mode === "add" ? "Kredensial Login" : "Reset Kata Sandi"}</span>
            </div>
            <label className="flex items-center gap-3 text-sm font-medium text-muted-foreground mb-4 cursor-pointer hover:text-foreground transition-colors">
              <input type="checkbox" checked={generatePwd} onChange={e => setGeneratePwd(e.target.checked)} className="w-4 h-4 rounded border-border text-amber-500 focus:ring-amber-500 bg-card" />
              <span>Buat password otomatis dan kirim via Email</span>
            </label>
            
            {!generatePwd && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-xs font-bold text-muted-foreground mb-2 block uppercase tracking-wider">Password Manual</label>
                <div className="relative">
                  <input type={showPwd ? "text" : "password"} placeholder="Min. 8 karakter..." className="w-full px-4 py-3 pr-24 rounded-xl bg-muted/30 border border-border outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm font-medium transition-all" />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-extrabold text-amber-500 hover:text-amber-600 transition-colors">
                    {showPwd ? "SEMBUNYIKAN" : "TAMPILKAN"}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
        <div className="p-6 border-t border-border flex gap-3 sm:gap-4 bg-muted/10 rounded-b-3xl">
          <button onClick={onClose} className="flex-1 py-3.5 rounded-xl border border-border text-sm font-bold text-foreground hover:bg-muted transition-colors">Batal</button>
          <button onClick={() => onSave(form)} className="flex-1 py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-extrabold hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-md shadow-primary/20">
            {mode === "add" ? "Daftarkan Pengguna" : "Simpan Perubahan"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   KOMPONEN MODAL: DETAIL PENGGUNA
   ========================================================================= */
function UserDetailModal({ user, onClose }: { user: Student; onClose: () => void }) {
  const [tab, setTab] = useState<"profil" | "nilai" | "akun">("profil");

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-200 p-4">
      <div className="bg-card rounded-3xl border border-border w-full max-w-3xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
        
        <div className="p-6 border-b border-border flex items-center justify-between bg-card shrink-0">
          <h2 className="text-xl font-extrabold text-foreground">Detail Pengguna</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-xl text-muted-foreground hover:text-foreground transition-colors"><X size={20} /></button>
        </div>

        <div className="overflow-y-auto scrollbar-thin">
          <div className="p-6 sm:p-8">
            {/* User Banner Profile */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-8 text-center sm:text-left">
              <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl text-white flex items-center justify-center text-3xl font-extrabold shadow-lg shrink-0 ${
                user.role === "Dosen" ? "bg-linear-to-br from-indigo-500 to-purple-500" : "bg-linear-to-br from-primary to-teal-500"
              }`}>
                {user.name[0]}
              </div>
              <div className="flex-1 mt-2 sm:mt-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                  <h3 className="text-2xl font-extrabold text-foreground">{user.name}</h3>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                      user.role === "Dosen" ? "bg-indigo-500/10 text-indigo-600 border border-indigo-500/20" : "bg-teal-500/10 text-teal-600 border border-teal-500/20"
                    }`}>{user.role}</span>
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                      user.status === "Aktif" ? "bg-green-500/10 text-green-600 border border-green-500/20" : "bg-muted text-muted-foreground border border-border"
                    }`}>{user.status}</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-muted-foreground flex items-center justify-center sm:justify-start gap-2">
                  <Building2 size={16} /> {user.institution}
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 sm:gap-6 border-b border-border mb-8 overflow-x-auto scrollbar-none">
              {(["profil", "nilai", "akun"] as const).map(t => (
                <button 
                  key={t} 
                  onClick={() => setTab(t)} 
                  className={`px-2 py-3 text-xs sm:text-sm font-extrabold capitalize border-b-2 transition-all whitespace-nowrap ${
                    tab === t 
                    ? "border-primary text-primary" 
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                >
                  {t === "profil" ? "Informasi Profil" : t === "nilai" ? "Riwayat Aktivitas & Nilai" : "Pengaturan Keamanan"}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            {tab === "profil" && (
              <div className="grid sm:grid-cols-2 gap-4 animate-in fade-in duration-300">
                <Info icon={<Mail size={16} />} label="Alamat Email" value={user.email} />
                <Info icon={<Phone size={16} />} label="Nomor Telepon" value={user.phone ?? "-"} />
                <Info icon={<Shield size={16} />} label={user.role === "Dosen" ? "NIDN / NIP" : "NIM / NPM"} value={user.identityNo} />
                <Info icon={<Calendar size={16} />} label="Tanggal Bergabung" value={user.joined} />
                <Info icon={<Award size={16} />} label="Modul Diselesaikan" value={`${user.modules} Modul`} />
                <Info icon={<CheckCircle2 size={16} />} label="Skor Rata-rata" value={user.avgScore > 0 ? `${user.avgScore}%` : "Belum ada data"} />
              </div>
            )}

            {tab === "nilai" && (
              <div className="animate-in fade-in duration-300">
                {user.role === "Dosen" ? (
                  <div className="p-8 text-center border border-border rounded-2xl bg-muted/10">
                    <p className="text-sm font-bold text-muted-foreground">Riwayat nilai tidak berlaku untuk akun Dosen.</p>
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
                              <span className={`font-extrabold ${q.score >= 70 ? "text-green-500" : "text-amber-500"}`}>{q.score}%</span>
                            </td>
                            <td className="p-4 text-center text-xs font-medium text-muted-foreground">{q.date}</td>
                            <td className="p-4 text-center">
                              <span className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                                q.status === "Lulus" 
                                ? "bg-green-500/10 text-green-600 border border-green-500/20" 
                                : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                              }`}>{q.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {tab === "akun" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <AccountRow icon={<Lock size={20} />} title="Reset Kata Sandi" desc="Kirim tautan reset kata sandi ke email pengguna." action="Kirim Link" tone="primary" />
                <AccountRow icon={<Key size={20} />} title="Cabut Sesi Aktif" desc="Paksa logout dari semua perangkat yang terhubung." action="Logout Semua" tone="neutral" />
                <AccountRow icon={<Shield size={20} />} title="Autentikasi 2 Langkah" desc="Wajibkan pengguna untuk menggunakan verifikasi OTP." action="Wajibkan 2FA" tone="neutral" />
                <AccountRow icon={<Trash2 size={20} />} title="Nonaktifkan Akun" desc="Pengguna tidak akan bisa login ke dalam sistem EduBidan." action={user.status === "Aktif" ? "Nonaktifkan Akun" : "Aktifkan Akun"} tone="danger" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   HELPER COMPONENTS
   ========================================================================= */
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

function AccountRow({ icon, title, desc, action, tone }: { icon: React.ReactNode; title: string; desc: string; action: string; tone: "primary" | "neutral" | "danger" }) {
  const btnClass = 
    tone === "primary" ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20" : 
    tone === "danger" ? "bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white border border-red-500/20" : 
    "bg-card text-foreground border border-border hover:bg-muted shadow-sm";
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner ${
          tone === "danger" ? "bg-red-500/10 text-red-500" : "bg-primary/10 text-primary"
        }`}>
          {icon}
        </div>
        <div>
          <p className="text-base font-extrabold text-foreground mb-0.5">{title}</p>
          <p className="text-xs sm:text-sm font-medium text-muted-foreground leading-relaxed">{desc}</p>
        </div>
      </div>
      <button className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all active:scale-95 whitespace-nowrap ${btnClass}`}>
        {action}
      </button>
    </div>
  );
}