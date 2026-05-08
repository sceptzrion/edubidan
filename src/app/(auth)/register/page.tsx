"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { EduBidanLogo } from "@/components/ui/EduBidanLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, User, Hash, X, CheckCircle2 } from "lucide-react";
import { TermsModal } from "@/components/modals/TermsModal";

const termsContent = [
  { title: "1. Ketentuan Umum", text: "Dengan mengakses EduBidan, Anda menyetujui ketentuan ini. EduBidan adalah platform purwarupa (prototype) media edukasi kebidanan untuk keperluan akademik riset." },
  { title: "2. Akun Pengguna", text: "Anda wajib memberikan informasi yang akurat (Nama, NPM, Email) saat mendaftar. Data ini hanya digunakan untuk keperluan simulasi sistem." },
  { title: "3. Hak Kekayaan Intelektual", text: "Seluruh konten materi dan kuis ditujukan murni untuk edukasi. Dilarang menyalin atau mendistribusikan untuk tujuan komersial." },
  { title: "4. Evaluasi dan Nilai", text: "Fitur kuis bertujuan sebagai evaluasi mandiri. Pencapaian di platform ini tidak memiliki nilai hukum dan tidak setara dengan sertifikasi kompetensi resmi (UKOM)." },
  { title: "5. Batasan Tanggung Jawab", text: "Mengingat platform ini adalah purwarupa, sistem disediakan 'sebagaimana adanya'. Kami tidak menjamin layanan akan selalu bebas dari gangguan teknis (downtime)." },
];

export default function RegisterPage() {
  const router = useRouter();
  
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agree, setAgree] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  
  // State baru untuk mengontrol tampilan sukses
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    document.title = "Daftar Akun | EduBidan";
  }, []);

  return (
    <div className="min-h-screen bg-background flex font-sans text-foreground transition-colors duration-300">
      
      {/* KIRI - Visual Banner */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-[#0D9488] to-[#14B8A6] relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        
        <div className="relative text-center text-white max-w-md flex flex-col items-center z-10">
          <div className="relative mb-10 mt-4">
            <div className="absolute inset-0 bg-white/30 rounded-3xl animate-ping" style={{ animationDuration: '4s', opacity: 0.2 }}></div>
            <div className="absolute inset-0 bg-white/20 rounded-3xl animate-pulse blur-md"></div>
            <div className="relative bg-white/20 p-3.5 rounded-3xl backdrop-blur-md shadow-2xl border border-white/40">
               <EduBidanLogo size="lg" showText={false} variant="white" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-white">
            Mulai Perjalanan Anda
          </h2>
          <p className="text-white/90 text-base leading-relaxed font-medium">
            Bergabunglah dengan EduBidan untuk mengakses modul interaktif dan tingkatkan pemahaman asuhan kebidanan Anda.
          </p>
        </div>
      </div>

      {/* KANAN - Area Konten */}
      <div className="flex-1 flex flex-col justify-center p-6 sm:p-10 md:px-16 lg:px-20 relative">
        
        {/* Navigasi Atas */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
          {/* Sembunyikan tombol kembali jika registrasi sudah berhasil */}
          {!isSuccess && (
            <button 
              onClick={() => router.push("/")} 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium p-2 rounded-lg hover:bg-muted"
            >
              <ArrowLeft size={18} /> Kembali
            </button>
          )}
          <div className={isSuccess ? "ml-auto" : ""}>
            <ThemeToggle />
          </div>
        </div>

        <div className="w-full max-w-115 mx-auto mt-16 lg:mt-0 pb-8">
          <div className="lg:hidden mb-8 flex justify-center">
            <EduBidanLogo size="md" />
          </div>

          {!isSuccess ? (
            /* --- TAMPILAN FORM REGISTER --- */
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-foreground">Buat Akun Baru</h1>
              <p className="text-muted-foreground mb-8 text-sm">Isi data diri Anda di bawah ini untuk mulai belajar.</p>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold mb-1.5 block text-foreground">Nama Lengkap</label>
                    <div className="relative group">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input type="text" placeholder="Nama lengkap" className="w-full pl-10 pr-3 py-3 rounded-xl bg-card border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold mb-1.5 block text-foreground">NPM</label>
                    <div className="relative group">
                      <Hash size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input type="text" placeholder="Masukkan NPM" className="w-full pl-10 pr-3 py-3 rounded-xl bg-card border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold mb-1.5 block text-foreground">Email Institusi</label>
                  <div className="relative group">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input type="email" placeholder="npm@unsika.ac.id" className="w-full pl-10 pr-3 py-3 rounded-xl bg-card border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold mb-1.5 block text-foreground">Kata Sandi</label>
                    <div className="relative group">
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input 
                        type={showPass ? "text" : "password"} 
                        placeholder="Min. 8 karakter" 
                        className="w-full pl-10 pr-10 py-3 rounded-xl bg-card border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm" 
                      />
                      <button 
                        type="button" 
                        onClick={(e) => { e.preventDefault(); setShowPass(!showPass); }} 
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10 p-2"
                      >
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold mb-1.5 block text-foreground">Konfirmasi Sandi</label>
                    <div className="relative group">
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <input 
                        type={showConfirm ? "text" : "password"} 
                        placeholder="Ulangi sandi" 
                        className="w-full pl-10 pr-10 py-3 rounded-xl bg-card border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm" 
                      />
                      <button 
                        type="button" 
                        onClick={(e) => { e.preventDefault(); setShowConfirm(!showConfirm); }} 
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10 p-2"
                      >
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center gap-3 select-none group w-fit">
                    <div 
                      onClick={() => !agree ? setShowTerms(true) : setAgree(false)}
                      className={`cursor-pointer w-5 h-5 shrink-0 rounded-sm border-2 flex items-center justify-center transition-all ${
                        agree 
                        ? "bg-primary border-primary" 
                        : "border-muted-foreground/40 bg-transparent group-hover:border-primary/60"
                      }`}
                    >
                      {agree && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span 
                        className="cursor-pointer transition-colors group-hover:text-foreground" 
                        onClick={() => !agree ? setShowTerms(true) : setAgree(false)}
                      >
                        Saya menyetujui{" "}
                      </span>
                      <button 
                        type="button" 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowTerms(true); }} 
                        className="text-primary font-semibold hover:underline"
                      >
                        Syarat & Ketentuan
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tombol akan mengubah state isSuccess menjadi true */}
                <button 
                  onClick={() => setIsSuccess(true)} 
                  className="w-full bg-primary text-primary-foreground py-3.5 mt-4 rounded-xl hover:opacity-90 transition-all font-bold text-base shadow-lg shadow-primary/20"
                >
                  Daftar Sekarang
                </button>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-8">
                Sudah punya akun?{" "}
                <button 
                  onClick={() => router.push("/login")} 
                  className="text-primary font-bold hover:underline"
                >
                  Masuk
                </button>
              </p>
            </div>
          ) : (
            /* --- TAMPILAN SUKSES (Muncul setelah daftar ditekan) --- */
            <div className="text-center py-8 animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                 <div className="absolute inset-0 bg-teal-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                 <CheckCircle2 size={48} className="text-teal-600 relative z-10" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight mb-4 text-foreground">Pendaftaran Berhasil!</h1>
              <p className="text-muted-foreground mb-10 text-base leading-relaxed max-w-sm mx-auto">
                Akun EduBidan Anda telah berhasil dibuat. Silakan masuk menggunakan email dan kata sandi yang telah didaftarkan.
              </p>
              <button 
                onClick={() => router.push("/login")} 
                className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl hover:opacity-90 transition-all font-bold text-base shadow-lg shadow-primary/20"
              >
                Lanjutkan ke Halaman Masuk
              </button>
            </div>
          )}

        </div>
      </div>

      <TermsModal 
        isOpen={showTerms} 
        onClose={() => setShowTerms(false)} 
        onAgree={() => {
          setAgree(true);
          setShowTerms(false);
        }} 
      />
      
    </div>
  );
}