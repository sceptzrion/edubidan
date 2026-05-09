"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { EduBidanLogo } from "@/components/ui/EduBidanLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    document.title = "Masuk | EduBidan";
  }, []);

  return (
    <div className="min-h-screen bg-background flex font-sans text-foreground transition-colors duration-300">
      
      {/* KIRI - Visual Banner (Hanya muncul di layar besar) */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-[#134E4A] to-[#0D9488] relative items-center justify-center p-12 overflow-hidden">
        {/* Efek pattern titik-titik transparan di latar belakang */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        
        <div className="relative text-center text-white max-w-md flex flex-col items-center z-10">
          
          {/* Logo dengan Animasi "Bernafas" di bagian border/background */}
          <div className="relative mb-10 mt-4">
            {/* Layer 1: Animasi Ping (menyebar keluar) yang sangat lambat */}
            <div className="absolute inset-0 bg-white/30 rounded-3xl animate-ping" style={{ animationDuration: '4s', opacity: 0.15 }}></div>
            {/* Layer 2: Animasi Pulse (denyut redup-terang) pada bayangan */}
            <div className="absolute inset-0 bg-white/20 rounded-3xl animate-pulse blur-md"></div>
            {/* Layer 3: Wadah utama (Solid Glassmorphism) */}
            <div className="relative bg-white/10 p-3.5 rounded-3xl backdrop-blur-md shadow-2xl border border-white/30">
               <EduBidanLogo size="lg" showText={false} variant="white" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-white">
            Selamat Datang Kembali
          </h2>
          <p className="text-white/80 text-base leading-relaxed">
            Lanjutkan perjalanan belajar Anda dan tingkatkan kompetensi asuhan kebidanan secara mandiri di mana pun Anda berada.
          </p>
        </div>
      </div>

      {/* KANAN - Form Login */}
      <div className="flex-1 flex flex-col justify-center p-6 sm:p-12 md:px-16 lg:px-24 relative">
        
        {/* Top Actions: Tombol Kembali & Dark Mode */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
          <button 
            onClick={() => router.push("/")} 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium p-2 rounded-lg hover:bg-muted"
          >
            <ArrowLeft size={18} /> Kembali
          </button>
          <ThemeToggle />
        </div>

        {/* max-w-md digunakan agar form lebih lebar dan lega di desktop */}
        <div className="w-full max-w-md mx-auto mt-12 lg:mt-0">
          
          {/* Logo muncul di atas form HANYA untuk layar HP (Mobile) */}
          <div className="lg:hidden mb-10 flex justify-center">
            <EduBidanLogo size="md" />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-foreground">Masuk ke Akun</h1>
          <p className="text-muted-foreground mb-8 text-sm">Masukkan email dan kata sandi Anda untuk melanjutkan belajar.</p>

          <div className="space-y-5">
            {/* Input Email */}
            <div>
              <label className="text-sm font-medium mb-1.5 block text-foreground">Email</label>
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

            {/* Input Kata Sandi */}
            <div>
              <label className="text-sm font-medium mb-1.5 block text-foreground">Kata Sandi</label>
              <div className="relative group">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type={showPass ? "text" : "password"} 
                  value={pass} 
                  onChange={(e) => setPass(e.target.value)} 
                  placeholder="Masukkan kata sandi" 
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-card border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPass(!showPass)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Checkbox & Lupa Kata Sandi */}
            <div className="flex items-center justify-between mt-2">
              {/* onClick dipindah ke wrapper utama agar seluruh area (termasuk teks) bisa diklik */}
              <div 
                onClick={() => setRemember(!remember)}
                className="flex items-center gap-2.5 cursor-pointer select-none group"
              >
                {/* rounded-[4px] untuk sudut yang lebih tegas/kotak */}
                <div className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center transition-all ${
                  remember 
                  ? "bg-primary border-primary" 
                  : "border-muted-foreground/40 bg-transparent group-hover:border-primary/60"
                }`}>
                  {remember && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Ingat Saya</span>
              </div>
              <button 
                onClick={() => router.push("/forgot-password")} 
                className="text-sm text-primary font-semibold hover:underline"
              >
                Lupa kata sandi?
              </button>
            </div>

            {/* Tombol Masuk */}
            <button 
              onClick={() => {
                console.log("Login clicked", { email, pass });
                router.push("/dashboard");
              }} 
              className="w-full bg-primary text-primary-foreground py-3.5 mt-4 rounded-xl hover:opacity-90 transition-all font-bold text-base shadow-lg shadow-primary/20"
            >
              Masuk
            </button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Belum punya akun?{" "}
            <button 
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