"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { EduBidanLogo } from "@/components/ui/EduBidanLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, ArrowRight, KeyRound, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  
  const [step, setStep] = useState<"email" | "otp" | "reset" | "success">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    document.title = "Lupa Kata Sandi | EduBidan";
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1 || (!/^\d*$/.test(value))) return; 
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 3) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleBack = () => {
    if (step === "email" || step === "success") router.push("/login");
    else if (step === "otp") setStep("email");
    else if (step === "reset") setStep("otp");
  };

  return (
    <div className="min-h-screen bg-background flex font-sans text-foreground transition-colors duration-300">
      
      {/* KIRI - Visual Banner */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-[#134E4A] to-[#0D9488] relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        
        <div className="relative text-center text-white max-w-md flex flex-col items-center z-10">
          <div className="relative mb-10 mt-4">
            <div className="absolute inset-0 bg-white/30 rounded-3xl animate-ping" style={{ animationDuration: '4s', opacity: 0.15 }}></div>
            <div className="absolute inset-0 bg-white/20 rounded-3xl animate-pulse blur-md"></div>
            <div className="relative bg-white/10 p-3.5 rounded-3xl backdrop-blur-md shadow-2xl border border-white/30">
               <EduBidanLogo size="lg" showText={false} variant="white" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-white">
            Atur Ulang Kata Sandi
          </h2>
          <p className="text-white/80 text-base leading-relaxed">
            Jangan khawatir, kami akan membantu Anda memulihkan akses ke akun EduBidan dengan mudah dan aman.
          </p>
        </div>
      </div>

      {/* KANAN - Form Dinamis */}
      <div className="flex-1 flex flex-col justify-center p-6 sm:p-12 md:px-16 lg:px-24 relative">
        
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
          {step !== "success" && (
            <button 
              onClick={handleBack} 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium p-2 rounded-lg hover:bg-muted"
            >
              <ArrowLeft size={18} /> Kembali
            </button>
          )}
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>

        <div className="w-full max-w-md mx-auto mt-12 lg:mt-0">
          
          <div className="lg:hidden mb-10 flex justify-center">
            <EduBidanLogo size="md" />
          </div>

          {/* PROGRESS INDICATOR */}
          {step !== "success" && (
            <div className="flex items-center w-full mb-10">
              {["email", "otp", "reset"].map((s, i) => (
                <React.Fragment key={s}>
                  <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                    step === s || ["email", "otp", "reset"].indexOf(step) > i
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {i + 1}
                  </div>
                  
                  {i < 2 && (
                    <div className="flex-1 h-0.5 mx-3 md:mx-4 rounded-full bg-muted overflow-hidden relative">
                      <div className={`absolute top-0 left-0 h-full transition-all duration-500 bg-primary ${
                        ["email", "otp", "reset"].indexOf(step) > i ? "w-full" : "w-0"
                      }`} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* ================= STEP 1: EMAIL ================= */}
          {step === "email" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Mail size={32} className="text-primary" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-foreground">Lupa Kata Sandi?</h1>
              <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                Masukkan email yang terdaftar dan kami akan mengirimkan 4-digit kode verifikasi ke kotak masuk Anda.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block text-foreground">Email Terdaftar</label>
                  <div className="relative group">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="nama@email.com" 
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-card border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm" 
                    />
                  </div>
                </div>
                <button 
                  onClick={() => setStep("otp")} 
                  className="w-full bg-primary text-primary-foreground py-3.5 mt-2 rounded-xl hover:opacity-90 transition-all font-bold text-base shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  Kirim Kode Verifikasi <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 2: OTP ================= */}
          {step === "otp" && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <KeyRound size={32} className="text-primary" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-foreground">Masukkan Kode</h1>
              <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                Kode 4-digit telah dikirim ke <span className="font-semibold text-foreground">{email || "email@contoh.com"}</span>
              </p>
              
              {/* Kotak OTP dibentangkan sempurna dengan justify-between */}
              <div className="flex justify-between w-full mb-8">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    className="w-16 h-16 sm:w-20 sm:h-20 text-center text-2xl sm:text-3xl font-bold rounded-xl bg-card border-2 border-border focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                ))}
              </div>
              <button 
                onClick={() => setStep("reset")} 
                className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl hover:opacity-90 transition-all font-bold text-base shadow-lg shadow-primary/20"
              >
                Verifikasi Kode
              </button>
              <p className="text-center text-sm text-muted-foreground mt-6">
                Tidak menerima kode? <button className="text-primary font-bold hover:underline">Kirim ulang (58s)</button>
              </p>
            </div>
          )}

          {/* ================= STEP 3: RESET ================= */}
          {step === "reset" && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Lock size={32} className="text-primary" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-foreground">Kata Sandi Baru</h1>
              <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                Buat kata sandi baru yang kuat. Jangan gunakan kata sandi yang sama dengan aplikasi lain.
              </p>
              
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium mb-1.5 block text-foreground">Kata Sandi Baru</label>
                  <div className="relative group">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input 
                      type={showPass ? "text" : "password"} 
                      placeholder="Min. 8 karakter" 
                      className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-card border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm" 
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block text-foreground">Konfirmasi Kata Sandi</label>
                  <div className="relative group">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input 
                      type={showConfirmPass ? "text" : "password"} 
                      placeholder="Ulangi kata sandi baru" 
                      className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-card border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm" 
                    />
                    <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                      {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => setStep("success")} 
                  className="w-full bg-primary text-primary-foreground py-3.5 mt-2 rounded-xl hover:opacity-90 transition-all font-bold text-base shadow-lg shadow-primary/20"
                >
                  Simpan Kata Sandi
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 4: SUCCESS ================= */}
          {step === "success" && (
            <div className="text-center py-8 animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                 <div className="absolute inset-0 bg-teal-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                 <CheckCircle2 size={48} className="text-teal-600 relative z-10" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight mb-4 text-foreground">Berhasil!</h1>
              <p className="text-muted-foreground mb-10 text-base leading-relaxed max-w-sm mx-auto">
                Kata sandi Anda telah berhasil diperbarui. Silakan masuk menggunakan kata sandi yang baru.
              </p>
              <button 
                onClick={() => router.push("/login")} 
                className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl hover:opacity-90 transition-all font-bold text-base shadow-lg shadow-primary/20"
              >
                Kembali ke Halaman Masuk
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}