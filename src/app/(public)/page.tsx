"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar"; 
import { Footer } from "@/components/layout/Footer";
import { AboutCard } from "@/components/sections/landing/AboutCard";
import { FeatureCard } from "@/components/sections/landing/FeatureCard";
import { StepCard } from "@/components/sections/landing/StepCard";
import { FaqItem } from "@/components/sections/landing/FaqItem";

// Import ikon Lucide yang dibutuhkan
import { GraduationCap, ArrowRight, Users, BookOpen, Award, Shield, Heart, Star, Clock, Stethoscope, Baby, UserPlus, PlayCircle, ClipboardCheck, Rocket } from "lucide-react";

// Konstanta gambar Hero
const IMG_HERO = "https://images.unsplash.com/photo-1645684922842-87793d0b25df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

// Konstanta Gambar untuk Fitur
const IMG_PRENATAL = "https://images.unsplash.com/photo-1632053651899-3389100579fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const IMG_BABY = "https://images.unsplash.com/photo-1701557774684-a5d563c46c1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const IMG_BREASTFEED = "https://images.unsplash.com/photo-1632053002434-b203dc8efb37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

// Data untuk section About 
const aboutData = [
  { icon: <Shield size={28} />, title: "Visi Kami", description: "Menjadi ruang belajar digital tepercaya yang membantu mahasiswa kebidanan tumbuh percaya diri, kompeten, dan siap melayani ibu serta bayi di mana pun mereka berada." },
  { icon: <Heart size={28} />, title: "Misi Kami", description: "Menyediakan materi pembelajaran berbasis bukti ilmiah terkini, mudah diakses, dan dirancang oleh praktisi berpengalaman." },
  { icon: <Star size={28} />, title: "Nilai Kami", description: "Integritas, inovasi, dan empati adalah fondasi setiap konten dan fitur yang kami kembangkan untuk mendukung profesi kebidanan." },
];

// Data untuk section Features
const featuresData = [
  { img: IMG_PRENATAL, icon: <Stethoscope size={22} />, title: "Pemeriksaan Kehamilan", desc: "Pelajari teknik pemeriksaan antenatal care (ANC) lengkap dengan simulasi kasus dan checklist standar WHO.", duration: "24 Video", lessons: "12 Modul" },
  { img: IMG_BABY, icon: <Baby size={22} />, title: "Perawatan Bayi Baru Lahir", desc: "Kuasai penanganan neonatus dari golden hour hingga perawatan rutin dengan panduan berbasis evidence-based practice.", duration: "18 Video", lessons: "9 Modul" },
  { img: IMG_BREASTFEED, icon: <Heart size={22} />, title: "Teknik Menyusui", desc: "Pelajari manajemen laktasi, posisi menyusui yang benar, dan solusi masalah umum dalam proses menyusui.", duration: "15 Video", lessons: "8 Modul" },
];

// Data untuk section Alur Belajar
const stepsData = [
  { icon: <UserPlus size={28} />, title: "1. Buat Akun", desc: "Daftar secara gratis dan lengkapi profil akademik Anda." },
  { icon: <PlayCircle size={28} />, title: "2. Tonton Materi", desc: "Akses ratusan video pembelajaran interaktif kapan saja." },
  { icon: <ClipboardCheck size={28} />, title: "3. Kerjakan Kuis", desc: "Uji pemahaman Anda melalui kuis di setiap akhir modul." },
  { icon: <Award size={28} />, title: "4. Raih Sertifikat", desc: "Unduh sertifikat resmi setelah menyelesaikan seluruh materi." }
];

// Data untuk FAQ
const faqsData = [
  { 
    q: "Apakah platform EduBidan berbayar?", 
    a: "Untuk saat ini, seluruh layanan dan modul utama di EduBidan dapat diakses sepenuhnya secara gratis. Ke depannya, kami berencana mengembangkan fitur dan materi premium khusus untuk menunjang pembelajaran tingkat lanjut." 
  },
  { 
    q: "Siapa pengguna utama dari platform ini?", 
    a: "Platform ini difokuskan sebagai media pembelajaran penunjang bagi mahasiswa kebidanan. Materi yang disusun bertujuan untuk membantu mahasiswa memahami praktik asuhan kebidanan dasar sebelum terjun ke lapangan." 
  },
  { 
    q: "Apakah ada evaluasi setelah mempelajari materi?", 
    a: "Tentu. Setiap modul diakhiri dengan kuis interaktif untuk mengukur tingkat pemahaman Anda. Anda dapat langsung melihat skor akhir dan mengulang kuis untuk terus melatih penguasaan materi secara mandiri." 
  },
  { 
    q: "Bagaimana cara mengakses materi jika koneksi lambat?", 
    a: "Saat ini seluruh fitur utama seperti video interaktif dan kuis membutuhkan koneksi internet (online). Namun, kami menyediakan ringkasan materi berformat PDF yang bisa diunduh untuk dipelajari secara offline." 
  },
];

export default function LandingPage() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleToggleDark = () => {
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen font-sans transition-colors duration-300 bg-background text-foreground">
      
      {/* Navbar */}
      <Navbar isDark={isDark} onToggleDark={handleToggleDark} />

      <main>
        {/* --- HERO SECTION --- */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-teal-500/5" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold px-4 py-1.5 rounded-full text-sm mb-6">
                  <GraduationCap size={16} />
                  Platform Edukasi Kebidanan #1
                </div>
                
                <h1 className="text-4xl lg:text-5xl tracking-tight mb-6 font-extrabold leading-[1.15]">
                  Transformasi Digital
                  <br />
                  <span className="text-primary">Pendidikan Kebidanan</span>
                  <br />
                  Indonesia
                </h1>
                
                <p className="text-muted-foreground text-lg mb-8 max-w-lg leading-relaxed">
                  Belajar kapan saja, di mana saja dengan materi berbasis video interaktif, kuis adaptif, dan sertifikasi profesional dari para ahli kebidanan terkemuka.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => router.push("/register")} className="bg-primary text-primary-foreground px-8 py-3.5 rounded-xl hover:opacity-90 transition-all flex items-center gap-2 text-base shadow-lg shadow-primary/25 font-semibold">
                    Mulai Belajar <ArrowRight size={18} />
                  </button>
                  <button onClick={() => document.getElementById("alur-belajar")?.scrollIntoView({ behavior: "smooth" })} className="border border-border bg-card px-8 py-3.5 rounded-xl hover:bg-muted transition-all text-base font-semibold">
                    Pelajari Lebih Lanjut
                  </button>
                </div>
                
                <div className="flex items-center gap-6 mt-10 text-sm text-muted-foreground font-medium">
                  <div className="flex items-center gap-2"><Users size={16} className="text-primary" /> 5,000+ Mahasiswa</div>
                  <div className="flex items-center gap-2"><BookOpen size={16} className="text-primary" /> 120+ Modul</div>
                  <div className="flex items-center gap-2"><Award size={16} className="text-primary" /> Bersertifikat</div>
                </div>
              </div>
              
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-border">
                  <img src={IMG_HERO} alt="EduBidan Learning" className="w-full h-80 lg:h-112.5 object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- ABOUT SECTION --- */}
        <section id="about" className="py-20 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Tentang <span className="text-primary">EduBidan</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                EduBidan lahir dari gabungan kata <strong className="text-foreground font-semibold">"Edukasi"</strong> yang melambangkan pencerahan, transformasi digital, dan ilmu pengetahuan, serta <strong className="text-foreground font-semibold">"Bidan"</strong> yang merepresentasikan asuhan, kepedulian medis, dan awal kehidupan baru.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {aboutData.map((item, index) => (
                <AboutCard
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section id="features" className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Tiga Topik Inti Pembelajaran</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                Kurikulum fokus pada tiga kompetensi utama kebidanan, dirancang oleh dosen praktisi agar setiap materi runtut, ringkas, dan langsung relevan dengan praktik di lapangan.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {featuresData.map((item, index) => (
                <FeatureCard
                  key={index}
                  img={item.img}
                  icon={item.icon}
                  title={item.title}
                  desc={item.desc}
                  lessons={item.lessons}
                  duration={item.duration}
                />
              ))}
            </div>
          </div>
        </section>

        {/* --- ALUR BELAJAR SECTION --- */}
        <section id="alur-belajar" className="py-20 bg-card border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Alur Pembelajaran</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                Mulai perjalanan karir kebidanan Anda hanya dengan 4 langkah mudah.
              </p>
            </div>
            
            {/* Grid Looping StepCard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {stepsData.map((step, index) => (
                <StepCard
                  key={index}
                  icon={step.icon}
                  title={step.title}
                  desc={step.desc}
                  isLast={index === stepsData.length - 1} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* --- FAQ SECTION --- */}
        <section id="faq" className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Pertanyaan Umum (FAQ)</h2>
              <p className="text-muted-foreground text-lg">
                Temukan jawaban cepat untuk pertanyaan yang sering diajukan seputar EduBidan.
              </p>
            </div>
            
            <div className="space-y-4">
              {faqsData.map((faq, index) => (
                <FaqItem
                  key={index}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* --- CALL TO ACTION SECTION --- */}
        <section className="py-20 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-linear-to-br from-primary to-teal-600 rounded-3xl p-10 md:p-14 shadow-2xl shadow-primary/20 relative overflow-hidden">
              
              {/* Efek Lingkaran Latar Belakang */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                {/* Ikon sesuai referensi Newsletter Figma (size 40-48) */}
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 text-white shadow-inner">
                  <Rocket size={32} />
                </div>

                {/* Heading disesuaikan: text-2xl ke 3xl (lebih seimbang untuk CTA) */}
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Siap Memulai Perjalanan Anda?
                </h2>
                
                {/* Deskripsi: text-sm sesuai referensi Figma */}
                <p className="text-white/80 text-sm md:text-base mb-10 max-w-xl mx-auto leading-relaxed">
                  Bergabunglah sekarang dan tingkatkan pemahaman asuhan kebidanan Anda melalui metode pembelajaran digital yang interaktif dan mudah diakses.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
                  <button 
                    onClick={() => router.push("/register")} 
                    className="bg-white text-primary px-8 py-3.5 rounded-xl hover:bg-slate-50 transition-all font-bold shadow-lg text-sm"
                  >
                    Daftar Sekarang — Gratis
                  </button>
                  <button 
                    onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} 
                    className="bg-white/10 text-white border border-white/20 px-8 py-3.5 rounded-xl hover:bg-white/20 transition-all font-bold backdrop-blur-sm text-sm"
                  >
                    Kenali Kami Lebih Jauh
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Panggil Footer */}
      <Footer />

    </div>
  );
}