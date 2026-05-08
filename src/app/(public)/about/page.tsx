"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Target, Heart, Shield, Star, GraduationCap } from "lucide-react";
import { VisiMisiCard } from "@/components/sections/about/VisiMisiCard";
import { PilarCard } from "@/components/sections/about/PilarCard";

export default function AboutPage() {
  useEffect(() => {
    document.title = "Tentang Kami | EduBidan";
  }, []);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 font-sans text-foreground flex flex-col">
      {/* Navbar dipanggil polosan tanpa props */}
      <Navbar />

      <main className="flex-1">
        {/* --- HEADER SECTION --- */}
        <section className="relative py-20 lg:py-28 overflow-hidden bg-primary/5">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-teal-500/10 blur-3xl" />
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-foreground">
              Tentang <span className="text-primary">EduBidan</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              EduBidan dikembangkan sebagai platform pembelajaran digital pendamping. Platform ini bertujuan untuk membantu mahasiswa kebidanan dalam mengulas kembali materi-materi praktik asuhan kebidanan dasar di mana pun dan kapan pun.
            </p>
          </div>
        </section>

        {/* --- VISI & MISI SECTION --- */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <VisiMisiCard 
                icon={Target}
                title="Visi Pengembangan"
                desc="Menyediakan ruang belajar digital yang praktis untuk membantu mahasiswa kebidanan memperkuat pemahaman dasar materi asuhan kebidanan secara mandiri."
                colorClass="bg-primary/10"
                textClass="text-primary"
              />
              <VisiMisiCard 
                icon={Heart}
                title="Misi Sistem"
                desc="Menyajikan antarmuka pembelajaran yang ramah pengguna, dilengkapi dengan ringkasan materi dan fitur kuis evaluasi yang mudah diakses kapan saja."
                colorClass="bg-teal-500/10"
                textClass="text-teal-600"
              />
            </div>
          </div>
        </section>

        {/* --- FOKUS PENGEMBANGAN SECTION --- */}
        <section className="py-20 bg-card border-y border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Fokus Pengembangan</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <PilarCard 
                icon={Shield} 
                title="Akurasi" 
                desc="Berfokus pada penyajian materi dasar sesuai standar asuhan kebidanan." 
              />
              <PilarCard 
                icon={Star} 
                title="Aksesibilitas" 
                desc="Sistem dirancang agar ringan dan dapat diakses dari berbagai perangkat." 
              />
              <PilarCard 
                icon={GraduationCap} 
                title="Edukasi" 
                desc="Memprioritaskan fitur yang mendukung evaluasi dan pemahaman mandiri mahasiswa." 
              />
            </div>
          </div>
        </section>

        {/* --- LATAR BELAKANG INISIATIF SECTION --- */}
        <section className="py-20 lg:py-28">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              
              {/* Sisi Kiri: Statement (Tanpa Link) */}
              <div className="md:col-span-5 relative">
                <div className="absolute -left-6 -top-6 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-xl"></div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                  Menjembatani Aksesibilitas dalam Pembelajaran Kebidanan
                </h2>
              </div>
              
              {/* Sisi Kanan: Paragraf Penjelasan */}
              <div className="md:col-span-7 bg-card border border-border p-8 rounded-3xl shadow-sm">
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  Pendidikan asuhan kebidanan menuntut pemahaman teoritis yang kuat sebelum mahasiswa dapat terjun langsung menangani pasien. Namun, proses mengulas materi seringkali terkendala oleh format belajar yang terbatas pada ruang kelas konvensional.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed mb-0">
                  Sebagai solusi digital, EduBidan dirancang untuk memastikan bahwa mahasiswa kebidanan memiliki wadah pendamping yang reliabel. Melalui sistem ini, mahasiswa dapat membaca ringkasan materi dan mengerjakan kuis evaluasi yang berfungsi sebagai indikator penguasaan materi secara mandiri.
                </p>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}