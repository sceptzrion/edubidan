"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  useEffect(() => {
    document.title = "Kebijakan Privasi | EduBidan";
  }, []);

  const sections = [
    { 
      title: "1. Informasi yang Kami Kumpulkan", 
      content: "Sebagai platform purwarupa akademik, kami hanya mengumpulkan informasi dasar yang Anda berikan secara langsung saat mendaftar (nama, email, dan institusi), serta data riwayat penggunaan platform seperti progres belajar dan rekam jejak nilai kuis." 
    },
    { 
      title: "2. Penggunaan Informasi", 
      content: "Informasi yang dikumpulkan murni digunakan untuk mensimulasikan fitur-fitur di dalam aplikasi EduBidan. Ini meliputi personalisasi antarmuka pengguna, merekam hasil evaluasi kuis, serta menganalisis fungsionalitas sistem sebagai bagian dari riset pengembangan." 
    },
    { 
      title: "3. Perlindungan Data", 
      content: "Kami berusaha mengimplementasikan standar keamanan dasar dalam penyimpanan basis data (database) untuk mencegah akses yang tidak sah. Mengingat platform ini adalah purwarupa, kami menyarankan agar Anda tidak menggunakan kata sandi (password) yang sama dengan akun pribadi penting Anda yang lain." 
    },
    { 
      title: "4. Berbagi Informasi", 
      content: "EduBidan berkomitmen untuk melindungi privasi Anda. Data pengguna tidak akan pernah dijual, disewakan, atau didistribusikan kepada pihak ketiga untuk tujuan komersial. Data hanya dapat diakses oleh pengembang untuk keperluan evaluasi sistem dan penyusunan laporan akademis (skripsi)." 
    },
    { 
      title: "5. Penggunaan Cookie", 
      content: "Platform ini mungkin menggunakan cookie esensial dan penyimpanan lokal (local storage) pada browser Anda hanya untuk mempertahankan sesi login dan mengingat preferensi antarmuka pengguna (seperti mode terang/gelap)." 
    },
    { 
      title: "6. Hak Pengguna", 
      content: "Anda memiliki hak penuh atas data yang Anda inputkan. Anda dapat mengubah detail profil Anda atau meminta penghapusan akun beserta seluruh riwayat data evaluasi di dalamnya kapan saja dengan menghubungi kami." 
    },
    { 
      title: "7. Retensi Data", 
      content: "Data akun dan riwayat evaluasi Anda akan disimpan di basis data selama periode uji coba dan pengujian purwarupa ini berlangsung. Setelah riset dan pelaporan akademik selesai, seluruh basis data pengguna akan dibersihkan dan dihapus secara permanen." 
    },
    { 
      title: "8. Kontak", 
      content: "Apabila Anda memiliki pertanyaan, keluhan, atau permintaan penghapusan data terkait privasi di platform EduBidan, silakan hubungi pengembang melalui email di admin@edubidan.id." 
    },
  ];

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 font-sans text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* --- HEADER SECTION --- */}
        <section className="relative py-16 md:py-20 overflow-hidden bg-primary/5 border-b border-border">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center mb-6">
              <ShieldCheck size={28} />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight text-foreground">
              Kebijakan Privasi
            </h1>
          </div>
        </section>

        {/* --- CONTENT SECTION --- */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm">
              <div className="space-y-10">
                {sections.map((s, i) => (
                  <div key={i} className="group">
                    <h2 className="text-lg md:text-xl font-bold mb-4 text-foreground flex items-baseline gap-2">
                      {s.title}
                    </h2>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {s.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}