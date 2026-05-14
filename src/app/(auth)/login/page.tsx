"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from "lucide-react";

import { EduBidanLogo } from "@/components/ui/EduBidanLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

function getRedirectPathByEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail === "admin@edubidan.id") {
    return "/dashboard/admin";
  }

  if (normalizedEmail.endsWith("@staff.unsika.ac.id")) {
    return "/dashboard/lecturer";
  }

  return "/dashboard";
}

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = useMemo(() => {
    return email.trim().length > 0 && password.trim().length > 0;
  }, [email, password]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) return;

    router.push(getRedirectPathByEmail(email));
  };

  return (
    <div className="min-h-screen bg-background flex font-sans text-foreground transition-colors duration-300">
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-[#134E4A] to-[#0D9488] relative items-center justify-center p-12 overflow-hidden">
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
              style={{ animationDuration: "4s", opacity: 0.15 }}
            />
            <div className="absolute inset-0 bg-white/20 rounded-3xl animate-pulse blur-md" />
            <div className="relative bg-white/10 p-3.5 rounded-3xl backdrop-blur-md shadow-2xl border border-white/30">
              <EduBidanLogo size="lg" showText={false} variant="white" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-white">
            Selamat Datang Kembali
          </h2>
          <p className="text-white/80 text-base leading-relaxed">
            Masuk untuk melanjutkan pembelajaran, mengelola modul, atau
            memantau aktivitas EduBidan sesuai peran akun Anda.
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center p-6 sm:p-12 md:px-16 lg:px-24 relative">
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium p-2 rounded-lg hover:bg-muted"
          >
            <ArrowLeft size={18} />
            Kembali
          </button>

          <ThemeToggle />
        </div>

        <div className="w-full max-w-md mx-auto mt-12 lg:mt-0">
          <div className="lg:hidden mb-10 flex justify-center">
            <EduBidanLogo size="md" />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-foreground">
            Masuk ke Akun
          </h1>
          <p className="text-muted-foreground mb-8 text-sm">
            Masukkan email dan kata sandi untuk melanjutkan.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium mb-1.5 block text-foreground"
              >
                Email
              </label>

              <div className="relative group">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="npm@student.unsika.ac.id"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-card border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium mb-1.5 block text-foreground"
              >
                Kata Sandi
              </label>

              <div className="relative group">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Masukkan kata sandi"
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-card border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={
                    showPassword
                      ? "Sembunyikan kata sandi"
                      : "Tampilkan kata sandi"
                  }
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <button
                type="button"
                onClick={() => setRemember((current) => !current)}
                className="flex items-center gap-2.5 select-none group"
              >
                <span
                  className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center transition-all ${
                    remember
                      ? "bg-primary border-primary"
                      : "border-muted-foreground/40 bg-transparent group-hover:border-primary/60"
                  }`}
                >
                  {remember && (
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
                </span>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  Ingat Saya
                </span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/forgot-password")}
                className="text-sm text-primary font-semibold hover:underline"
              >
                Lupa kata sandi?
              </button>
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className="w-full bg-primary text-primary-foreground py-3.5 mt-4 rounded-xl hover:opacity-90 transition-all font-bold text-base shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Masuk
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Belum punya akun?{" "}
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="text-primary font-bold hover:underline"
            >
              Daftar Sekarang
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}