"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Search, Mail, BookOpen, Settings, UserCircle, ShieldQuestion, FileCheck, Award } from "lucide-react";

// Import komponen yang baru dibuat
import { CategoryCard } from "@/components/sections/help/CategoryCard";
import { HelpFaqItem } from "@/components/sections/help/HelpFaqItem";

// --- DATA KATEGORI ---
const categories = [
  { id: "Semua", icon: ShieldQuestion, title: "Semua Topik", desc: "Tampilkan seluruh bantuan" },
  { id: "Akun", icon: UserCircle, title: "Akun & Profil", desc: "Login, registrasi, data diri" },
  { id: "Materi", icon: BookOpen, title: "Akses Materi", desc: "Modul, video, PDF" },
  { id: "Kuis", icon: FileCheck, title: "Kuis & Evaluasi", desc: "Pengerjaan dan nilai" },
  { id: "Sertifikat", icon: Award, title: "Sertifikat", desc: "Syarat dan unduhan" },
  { id: "Teknis", icon: Settings, title: "Teknis & Privasi", desc: "Error, browser, data" },
];

// --- DATA 50 FAQ ---
const faqs = [
  // Kategori: Akun
  { category: "Akun", q: "Bagaimana cara mendaftar akun di EduBidan?", a: "Klik tombol 'Daftar' di pojok kanan atas, isi nama lengkap, alamat email, asal institusi, dan buat kata sandi. Setelah itu, Anda bisa langsung mengakses materi." },
  { category: "Akun", q: "Saya lupa kata sandi, apa yang harus saya lakukan?", a: "Klik 'Lupa kata sandi?' pada halaman login. Karena ini platform purwarupa, kami menyarankan menggunakan kata sandi sederhana yang mudah diingat dan bukan sandi utama Anda." },
  { category: "Akun", q: "Bagaimana cara mengubah alamat email yang terdaftar?", a: "Saat ini email yang sudah terdaftar tidak dapat diubah secara mandiri. Silakan hubungi admin jika Anda perlu melakukan pembaruan email." },
  { category: "Akun", q: "Apakah saya bisa mengubah nama profil saya?", a: "Ya, Anda bisa mengubah nama tampilan melalui menu 'Pengaturan Profil' di dashboard akun Anda." },
  { category: "Akun", q: "Bisakah saya menghapus akun saya secara permanen?", a: "Bisa. Anda berhak meminta penghapusan akun beserta seluruh datanya dengan menghubungi email admin kami." },
  { category: "Akun", q: "Mengapa saya tidak bisa login ke akun saya?", a: "Pastikan email dan kata sandi yang dimasukkan sudah benar. Perhatikan penggunaan huruf besar/kecil (Caps Lock) saat mengetik kata sandi." },
  { category: "Akun", q: "Apakah ada batasan jumlah perangkat untuk login bersamaan?", a: "EduBidan tidak membatasi jumlah perangkat, Anda bisa login melalui smartphone dan laptop secara bersamaan." },
  { category: "Akun", q: "Bagaimana cara memperbarui data institusi atau kampus saya?", a: "Data institusi dapat diperbarui melalui halaman profil pengguna di pengaturan akun." },
  { category: "Akun", q: "Apakah saya harus memverifikasi email setelah mendaftar?", a: "Untuk mempermudah proses evaluasi purwarupa ini, fitur wajib verifikasi email saat ini dinonaktifkan. Akun Anda langsung aktif setelah mendaftar." },
  { category: "Akun", q: "Bisakah saya membuat lebih dari satu akun?", a: "Sistem tidak melarang pembuatan akun baru dengan email berbeda, namun kami menyarankan Anda menggunakan satu akun saja agar riwayat belajar terpusat." },

  // Kategori: Materi
  { category: "Materi", q: "Bagaimana cara mengakses modul pembelajaran?", a: "Setelah login, navigasikan ke menu 'Topik Belajar', lalu pilih modul kebidanan yang ingin Anda pelajari." },
  { category: "Materi", q: "Apakah materi di EduBidan berbayar?", a: "Tidak. EduBidan sepenuhnya gratis karena dikembangkan untuk keperluan riset media edukasi akademik." },
  { category: "Materi", q: "Apakah saya bisa mengunduh ringkasan materi ke format PDF?", a: "Tergantung ketersediaan modul. Jika modul menyediakan file PDF pendukung, akan ada tombol 'Unduh Materi' di bagian bawah bacaan." },
  { category: "Materi", q: "Kenapa video pembelajaran tidak mau berputar?", a: "Pastikan koneksi internet Anda stabil. Beberapa video ditautkan dari YouTube, jadi pastikan Anda tidak menggunakan pemblokir iklan yang ketat." },
  { category: "Materi", q: "Apakah materi ini bisa diakses tanpa koneksi internet (offline)?", a: "EduBidan adalah aplikasi berbasis web sehingga membutuhkan koneksi internet aktif untuk memuat materi dan kuis." },
  { category: "Materi", q: "Bagaimana cara mengubah resolusi video agar tidak boros kuota?", a: "Jika video menggunakan pemutar YouTube, Anda dapat mengatur resolusi langsung melalui ikon gerigi di sudut kanan bawah pemutar video." },
  { category: "Materi", q: "Apakah ada batas waktu untuk mengakses materi tertentu?", a: "Tidak ada batasan waktu. Materi tersedia 24/7 dan bisa Anda akses kapan saja selama platform ini masih beroperasi." },
  { category: "Materi", q: "Apakah saya harus mempelajari modul secara berurutan?", a: "Meskipun disarankan untuk belajar berurutan demi pemahaman yang terstruktur, Anda bebas memilih topik mana saja yang ingin dipelajari lebih dulu." },
  { category: "Materi", q: "Bolehkah saya membagikan modul EduBidan ke pihak luar?", a: "Konten disediakan untuk pembelajaran personal. Anda diperbolehkan membagikan tautan web, namun dilarang menggandakan isinya untuk komersialisasi." },
  { category: "Materi", q: "Seberapa sering materi kebidanan di platform ini diperbarui?", a: "Materi didasarkan pada asuhan kebidanan dasar standar dan akan diperbarui secara berkala sesuai kebutuhan pengembangan prototipe." },

  // Kategori: Kuis
  { category: "Kuis", q: "Bagaimana cara memulai kuis evaluasi?", a: "Tombol 'Mulai Kuis' akan tersedia di halaman paling akhir setiap modul yang Anda pelajari." },
  { category: "Kuis", q: "Apakah ada batas waktu saat mengerjakan kuis?", a: "Sebagian besar kuis memiliki pengatur waktu (timer) untuk melatih kecepatan menjawab. Sisa waktu dapat dilihat di bagian atas layar kuis." },
  { category: "Kuis", q: "Berapa nilai minimal untuk lulus kuis (passing grade)?", a: "Nilai minimum kelulusan biasanya diatur pada skor 70 atau 75, tergantung tingkat kesulitan modul tersebut." },
  { category: "Kuis", q: "Berapa kali saya boleh mengulang kuis jika nilai saya jelek?", a: "Anda dapat mengulang kuis sebanyak mungkin tanpa batasan. Platform ini ditujukan untuk evaluasi mandiri tanpa tekanan." },
  { category: "Kuis", q: "Bagaimana cara melihat riwayat skor kuis saya sebelumnya?", a: "Riwayat skor dapat dilihat pada menu 'Evaluasi & Nilai' di dashboard personal Anda." },
  { category: "Kuis", q: "Apakah saya bisa melihat kunci jawaban setelah kuis selesai?", a: "Sistem hanya menampilkan skor akhir dan indikator benar/salah pada rekapitulasi, namun tidak membocorkan kunci jawaban secara eksplisit." },
  { category: "Kuis", q: "Apa yang terjadi jika koneksi terputus saat kuis berlangsung?", a: "Waktu kuis akan tetap berjalan. Kami menyarankan Anda mereload halaman, jawaban yang belum di-submit (dikirim) mungkin harus diisi ulang." },
  { category: "Kuis", q: "Saya salah menekan tombol submit, bisakah saya membatalkannya?", a: "Sayangnya tidak. Namun karena tidak ada batasan percobaan, Anda bisa langsung mengulang kuis tersebut dari awal." },
  { category: "Kuis", q: "Bisakah saya menjeda (pause) waktu kuis?", a: "Sistem tidak mendukung fitur jeda untuk mencegah kecurangan dan mensimulasikan kondisi ujian aslinya." },
  { category: "Kuis", q: "Mengapa nilai kuis saya tidak langsung muncul?", a: "Skor seharusnya muncul otomatis setelah tombol diklik. Jika terjadi delay, kemungkinan karena server sedang menyesuaikan lalu lintas data." },

  // Kategori: Sertifikat
  { category: "Sertifikat", q: "Apa syarat untuk mendapatkan sertifikat penyelesaian?", a: "Sertifikat terbuka otomatis jika Anda telah membuka seluruh halaman modul dan menyelesaikan kuis evaluasi dengan skor di atas batas minimal." },
  { category: "Sertifikat", q: "Bagaimana cara mengunduh sertifikat saya?", a: "Buka menu 'Sertifikat' di dashboard, pilih sertifikat yang tersedia, lalu klik 'Unduh Sertifikat'." },
  { category: "Sertifikat", q: "Apakah sertifikat EduBidan diakui secara hukum/resmi?", a: "Tidak. Ini adalah sertifikat partisipasi dari sistem purwarupa akademik, bukan sertifikasi kompetensi resmi dari pemerintah atau institusi bidan." },
  { category: "Sertifikat", q: "Nama di sertifikat saya salah, bagaimana cara memperbaikinya?", a: "Nama di sertifikat diambil dari nama profil Anda. Silakan ubah nama di menu 'Profil' lalu unduh ulang sertifikatnya." },
  { category: "Sertifikat", q: "Dalam format apa sertifikat akan diunduh?", a: "Sertifikat akan diunduh secara otomatis dalam bentuk gambar (JPG/PNG) beresolusi tinggi atau dokumen PDF." },
  { category: "Sertifikat", q: "Berapa lama sertifikat akan tersimpan di akun saya?", a: "Sertifikat akan terus tersimpan dan bisa diunduh kapan saja selama akun Anda aktif di database kami." },
  { category: "Sertifikat", q: "Mengapa sertifikat saya belum muncul padahal sudah lulus kuis?", a: "Coba muat ulang (refresh) halaman Anda. Jika belum muncul, pastikan Anda telah menyelesaikan kuis dengan skor di atas batas minimal kelulusan." },
  { category: "Sertifikat", q: "Apakah nilai kuis dicantumkan di dalam sertifikat?", a: "Tidak, sertifikat hanya menyatakan bahwa Anda telah berpartisipasi dan menyelesaikan modul asuhan kebidanan tersebut." },
  { category: "Sertifikat", q: "Bisakah saya membagikan sertifikat ke media sosial seperti LinkedIn?", a: "Tentu, Anda bebas membagikan pencapaian Anda ke media sosial manapun sebagai bentuk motivasi belajar." },
  { category: "Sertifikat", q: "Apakah sertifikat ini setara dengan uji kompetensi bidan (UKOM)?", a: "Sama sekali tidak. Sertifikat ini murni bagian dari gamifikasi pembelajaran LMS, bukan indikator legalitas kompetensi medis." },

  // Kategori: Teknis & Privasi
  { category: "Teknis", q: "Browser apa yang paling direkomendasikan untuk mengakses EduBidan?", a: "Kami sangat menyarankan Google Chrome, Microsoft Edge, atau Safari versi terbaru untuk pengalaman UI/UX yang optimal." },
  { category: "Teknis", q: "Mengapa halaman web terasa sangat lambat saat dimuat?", a: "Hal ini bisa disebabkan oleh koneksi lokal Anda, atau server hosting purwarupa kami sedang dalam status pemeliharaan (cold start)." },
  { category: "Teknis", q: "Tampilan web berantakan saat dibuka di HP saya, apa solusinya?", a: "Pastikan Anda tidak mematikan fitur JavaScript di browser HP. Anda juga bisa mencoba mengaksesnya dalam mode lanskap (miring)." },
  { category: "Teknis", q: "Beberapa tombol tidak bisa diklik, bagaimana cara mengatasinya?", a: "Cobalah untuk membersihkan cache browser Anda atau mengakses platform melalui fitur Incognito/Private Window." },
  { category: "Teknis", q: "Siapa saja yang bisa melihat nilai kuis dan progres belajar saya?", a: "Hanya Anda dan admin sistem (pengembang) yang dapat melihat progres belajar dan hasil kuis Anda di database." },
  { category: "Teknis", q: "Apakah data pribadi saya aman dan tidak dijual?", a: "Aman. EduBidan tidak memonetisasi data pengguna. Seluruh informasi dienkripsi standar untuk kebutuhan analisis akademik skripsi semata." },
  { category: "Teknis", q: "Berapa lama data saya disimpan setelah akun dihapus?", a: "Data akan segera diproses untuk dihapus dari basis data aktif segera setelah permintaan Anda dieksekusi oleh admin." },
  { category: "Teknis", q: "Bagaimana cara melaporkan celah keamanan atau bug?", a: "Anda dapat membantu perbaikan sistem dengan mengirimkan detail error atau bug ke email admin kami." },
  { category: "Teknis", q: "Kapan jam operasional tim pengembang EduBidan?", a: "Dukungan operasional bersifat fleksibel. Kami berusaha merespons email keluhan dalam waktu 1x24 jam di hari kerja." },
  { category: "Teknis", q: "Platform ini menggunakan teknologi apa?", a: "Platform ini merupakan prototipe aplikasi web modern berbasis Next.js, React, Tailwind CSS, dan infrastruktur database modern." }
];

export default function HelpCenterPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Pusat Bantuan | EduBidan";
  }, []);

  // Logika Filter
  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === "Semua" || faq.category === activeCategory;
    const searchLower = search.toLowerCase();
    const matchesSearch = search === "" || 
                          faq.q.toLowerCase().includes(searchLower) || 
                          faq.a.toLowerCase().includes(searchLower);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 font-sans text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* --- HERO SECTION --- */}
        <section className="bg-linear-to-br from-primary to-teal-600 py-16 md:py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
          
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">
              Pusat Bantuan
            </h1>
            <p className="text-white/90 text-lg mb-10 max-w-xl mx-auto">
              Temukan jawaban atas pertanyaan Anda seputar penggunaan platform pendamping pembelajaran EduBidan.
            </p>
            
            <div className="relative max-w-2xl mx-auto shadow-2xl shadow-primary/20">
              <Search size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                value={search} 
                onChange={(e) => {
                  setSearch(e.target.value);
                  setOpenFaq(null);
                }} 
                placeholder="Cari kendala, fitur, atau pertanyaan..." 
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-card text-foreground outline-none text-base border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" 
              />
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          
          {/* --- CATEGORIES --- */}
          <h2 className="text-2xl font-bold mb-6 text-foreground">Kategori Bantuan</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
            {categories.map((c, i) => {
              const count = c.id === "Semua" ? faqs.length : faqs.filter(f => f.category === c.id).length;
              return (
                <CategoryCard
                  key={i}
                  icon={c.icon}
                  title={c.title}
                  count={count}
                  isActive={activeCategory === c.id}
                  onClick={() => {
                    setActiveCategory(c.id);
                    setOpenFaq(null);
                  }}
                />
              );
            })}
          </div>

          {/* --- FAQ ACCORDION --- */}
          <div className="mb-6 flex justify-between items-end">
            <h2 className="text-2xl font-bold text-foreground">
              {search !== "" ? "Hasil Pencarian" : activeCategory === "Semua" ? "Pertanyaan Umum" : `Topik: ${activeCategory}`}
            </h2>
            <span className="text-sm text-muted-foreground">{filteredFaqs.length} ditemukan</span>
          </div>

          <div className="border border-border rounded-3xl p-4 md:p-6 bg-card/30 shadow-sm mb-2">
            <div className="space-y-4 max-h-105 overflow-y-auto pr-3 
                            [&::-webkit-scrollbar]:w-2 
                            [&::-webkit-scrollbar-track]:bg-transparent 
                            [&::-webkit-scrollbar-thumb]:bg-border 
                            [&::-webkit-scrollbar-thumb]:rounded-full 
                            hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/50"
            >
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, i) => (
                  <HelpFaqItem
                    key={i}
                    question={faq.q}
                    answer={faq.a}
                    isOpen={openFaq === i}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  />
                ))
              ) : (
                <div className="text-center py-12 bg-muted/30 rounded-3xl border border-dashed border-border">
                  <p className="text-muted-foreground">Tidak ada pertanyaan yang cocok dengan kata kunci "{search}".</p>
                  <button onClick={() => setSearch("")} className="mt-4 text-primary font-medium hover:underline">Hapus Pencarian</button>
                </div>
              )}
            </div>
          </div>

          {/* --- CONTACT SECTION --- */}
          <div className="mt-16 bg-card rounded-3xl border border-border p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-5 text-left w-full">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Mail size={28} />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">Masih Butuh Bantuan?</h3>
                <p className="text-sm text-muted-foreground">Tim pengembang kami siap merespons pertanyaan Anda.</p>
              </div>
            </div>
            <a 
              href="mailto:admin@edubidan.id" 
              className="w-full md:w-auto shrink-0 bg-primary text-primary-foreground px-6 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm text-sm"
            >
              <Mail size={18} /> Email Kami
            </a>
          </div>

        </section>
      </main>

      <Footer />
    </div>
  );
}