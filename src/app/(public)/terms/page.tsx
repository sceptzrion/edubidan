"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Scale } from "lucide-react";

export default function TermsPage() {
  useEffect(() => {
    document.title = "Syarat & Ketentuan | EduBidan";
  }, []);

  const sections = [
    {
      title: "1. Ketentuan Umum",
      content: "Dengan mengakses dan menggunakan platform EduBidan, Anda menyetujui untuk terikat oleh Syarat dan Ketentuan ini. EduBidan adalah platform purwarupa (prototype) media edukasi kebidanan berbasis digital untuk keperluan akademik, yang mencakup modul pembelajaran dan kuis evaluasi."
    },
    {
      title: "2. Akun Pengguna",
      content: "Pengguna bertanggung jawab penuh untuk menjaga kerahasiaan informasi akun, termasuk email dan kata sandi. Anda wajib memberikan informasi yang akurat saat mendaftar. Pengelola berhak menangguhkan atau menghapus akun yang terindikasi melakukan penyalahgunaan sistem."
    },
    {
      title: "3. Hak Kekayaan Intelektual",
      content: "Seluruh konten yang tersedia di platform EduBidan, termasuk teks, gambar, grafik, logo, dan ringkasan materi pembelajaran, ditujukan murni untuk keperluan edukasi. Pengguna tidak diperkenankan menyalin, mendistribusikan, atau menggunakan konten tersebut untuk tujuan komersial."
    },
    {
      title: "4. Penggunaan Layanan",
      content: "Pengguna dilarang keras: (a) Menggunakan platform untuk tujuan ilegal; (b) Melakukan tindakan yang dapat merusak, memberatkan, atau mengganggu server dan arsitektur sistem platform; (c) Mengunggah atau menyisipkan kode berbahaya (virus/malware)."
    },
    {
      title: "5. Evaluasi dan Nilai",
      content: "Fitur kuis yang disediakan oleh EduBidan bertujuan sebagai alat evaluasi mandiri bagi mahasiswa. Skor atau pencapaian yang diperoleh di dalam platform ini tidak memiliki nilai hukum dan tidak setara dengan sertifikasi kompetensi resmi dari lembaga pemerintahan maupun institusi pendidikan terkait."
    },
    {
      title: "6. Ketersediaan dan Batasan Tanggung Jawab",
      content: "Mengingat platform ini dikembangkan dalam tahap purwarupa, sistem disediakan 'sebagaimana adanya'. Kami tidak menjamin bahwa layanan akan selalu bebas dari *bug*, *error*, atau gangguan teknis (downtime). EduBidan tidak bertanggung jawab atas hilangnya data evaluasi pengguna akibat kendala server."
    },
    {
      title: "7. Perubahan Ketentuan",
      content: "Pengelola berhak mengubah, menambah, atau menghapus bagian dari Syarat dan Ketentuan ini sewaktu-waktu sesuai dengan kebutuhan pengembangan sistem. Penggunaan layanan secara berkelanjutan dianggap sebagai persetujuan atas ketentuan yang telah diperbarui."
    },
    {
      title: "8. Kontak dan Bantuan",
      content: "Jika Anda menemukan kendala teknis atau memiliki pertanyaan lebih lanjut mengenai penggunaan platform EduBidan, silakan hubungi pengembang melalui email di admin@edubidan.id."
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
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
              <Scale size={28} />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight text-foreground">
              Syarat & Ketentuan
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