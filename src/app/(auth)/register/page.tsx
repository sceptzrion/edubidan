"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Hash,
  Lock,
  Mail,
  User,
} from "lucide-react";

import { TermsModal } from "@/components/modals/TermsModal";
import { EduBidanLogo } from "@/components/ui/EduBidanLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const termsContent = [
  {
    title: "1. Ketentuan Umum",
    text: "EduBidan adalah platform purwarupa media edukasi kebidanan untuk keperluan akademik dan pembelajaran.",
  },
  {
    title: "2. Akun Mahasiswa",
    text: "Pendaftaran mandiri hanya tersedia untuk mahasiswa. Dosen dan admin dibuat melalui pengelolaan pengguna oleh admin.",
  },
  {
    title: "3. Evaluasi Pembelajaran",
    text: "Kuis digunakan sebagai sarana evaluasi pemahaman materi dan tidak setara dengan sertifikasi kompetensi resmi.",
  },
];

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [npm, setNpm] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agree, setAgree] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isEmailValid = email.trim().toLowerCase().endsWith("@student.unsika.ac.id");
  const isPasswordMatch = password.length > 0 && password === confirmPassword;

  const isFormValid = useMemo(() => {
    return (
      fullName.trim().length >= 3 &&
      npm.trim().length >= 5 &&
      isEmailValid &&
      password.length >= 8 &&
      isPasswordMatch &&
      agree
    );
  }, [agree, fullName, npm, password, isEmailValid, isPasswordMatch]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) return;

    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen bg-background flex font-sans text-foreground transition-colors duration-300">
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-[#0D9488] to-[#14B8A6] relative items-center justify-center p-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative text-center text-white max-w-md flex flex-col items-center z-10">
          <div className="relative mb-10 mt-4">
            <div
              className="absolute inset-0 bg-white/30 rounded-3xl animate-ping"
              style={{ animationDuration: "4s", opacity: 0.2 }}
            />
            <div className="absolute inset-0 bg-white/20 rounded-3xl animate-pulse blur-md" />
            <div className="relative bg-white/20 p-3.5 rounded-3xl backdrop-blur-md shadow-2xl border border-white/40">
              <EduBidanLogo size="lg" showText={false} variant="white" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-white">
            Mulai Belajar di EduBidan
          </h2>
          <p className="text-white/90 text-base leading-relaxed font-medium">
            Buat akun mahasiswa untuk mengakses modul video pembelajaran dan
            kuis evaluasi kebidanan.
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center p-6 sm:p-10 md:px-16 lg:px-20 relative">
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
          {!isSuccess && (
            <button
              type="button"
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium p-2 rounded-lg hover:bg-muted"
            >
              <ArrowLeft size={18} />
              Kembali
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
            <form
              onSubmit={handleSubmit}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-foreground">
                Buat Akun Mahasiswa
              </h1>
              <p className="text-muted-foreground mb-8 text-sm">
                Pendaftaran mandiri hanya tersedia untuk mahasiswa kebidanan.
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="text-xs font-semibold mb-1.5 block text-foreground"
                    >
                      Nama Lengkap
                    </label>
                    <div className="relative group">
                      <User
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
                      />
                      <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        placeholder="Nama lengkap"
                        className="w-full pl-10 pr-3 py-3 rounded-xl bg-card border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="npm"
                      className="text-xs font-semibold mb-1.5 block text-foreground"
                    >
                      NPM
                    </label>
                    <div className="relative group">
                      <Hash
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
                      />
                      <input
                        id="npm"
                        type="text"
                        value={npm}
                        onChange={(event) => setNpm(event.target.value)}
                        placeholder="2210631170131"
                        className="w-full pl-10 pr-3 py-3 rounded-xl bg-card border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold mb-1.5 block text-foreground"
                  >
                    Email Mahasiswa
                  </label>
                  <div className="relative group">
                    <Mail
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
                    />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="npm@student.unsika.ac.id"
                      className="w-full pl-10 pr-3 py-3 rounded-xl bg-card border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                    />
                  </div>

                  {email.length > 0 && !isEmailValid && (
                    <p className="text-[11px] font-medium text-red-500 mt-1.5">
                      Email mahasiswa harus menggunakan domain
                      @student.unsika.ac.id.
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="password"
                      className="text-xs font-semibold mb-1.5 block text-foreground"
                    >
                      Kata Sandi
                    </label>
                    <div className="relative group">
                      <Lock
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
                      />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Min. 8 karakter"
                        className="w-full pl-10 pr-10 py-3 rounded-xl bg-card border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10 p-2"
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="text-xs font-semibold mb-1.5 block text-foreground"
                    >
                      Konfirmasi Sandi
                    </label>
                    <div className="relative group">
                      <Lock
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
                      />
                      <input
                        id="confirmPassword"
                        type={showConfirm ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                        placeholder="Ulangi sandi"
                        className="w-full pl-10 pr-10 py-3 rounded-xl bg-card border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((current) => !current)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10 p-2"
                      >
                        {showConfirm ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>

                    {confirmPassword.length > 0 && !isPasswordMatch && (
                      <p className="text-[11px] font-medium text-red-500 mt-1.5">
                        Konfirmasi kata sandi belum sesuai.
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center gap-3 select-none group w-fit">
                    <button
                      type="button"
                      onClick={() =>
                        agree ? setAgree(false) : setShowTerms(true)
                      }
                      className={`cursor-pointer w-5 h-5 shrink-0 rounded-sm border-2 flex items-center justify-center transition-all ${
                        agree
                          ? "bg-primary border-primary"
                          : "border-muted-foreground/40 bg-transparent group-hover:border-primary/60"
                      }`}
                    >
                      {agree && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M2.5 6L5 8.5L9.5 3.5"
                            stroke="white"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>

                    <div className="text-sm text-muted-foreground">
                      <span>Saya menyetujui </span>
                      <button
                        type="button"
                        onClick={() => setShowTerms(true)}
                        className="text-primary font-semibold hover:underline"
                      >
                        Syarat & Ketentuan
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full bg-primary text-primary-foreground py-3.5 mt-4 rounded-xl hover:opacity-90 transition-all font-bold text-base shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Daftar Sekarang
                </button>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-8">
                Sudah punya akun?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="text-primary font-bold hover:underline"
                >
                  Masuk
                </button>
              </p>
            </form>
          ) : (
            <div className="text-center py-8 animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                <div
                  className="absolute inset-0 bg-teal-500/20 rounded-full animate-ping"
                  style={{ animationDuration: "3s" }}
                />
                <CheckCircle2 size={48} className="text-teal-600 relative z-10" />
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight mb-4 text-foreground">
                Pendaftaran Berhasil!
              </h1>
              <p className="text-muted-foreground mb-10 text-base leading-relaxed max-w-sm mx-auto">
                Akun mahasiswa Anda berhasil dibuat. Silakan masuk menggunakan
                email dan kata sandi yang telah didaftarkan.
              </p>

              <button
                type="button"
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