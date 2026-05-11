"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Play, User, Clock, Target, CheckCircle2, Wrench, ListOrdered, Video, HelpCircle } from "lucide-react";

// --- DUMMY DATA ---
// Data Playlist
const dummyPlaylist = [
  { kind: "materi", id: 1, title: "Pengantar ANC Terpadu", duration: "12:30" },
  { kind: "kuis", id: 2, title: "Kuis Cek Pemahaman", duration: "10" }
];

// Data Spesifik Materi yang Sedang Di-preview
const dummyMateriDetail = {
  id: 1,
  title: "Pengantar ANC Terpadu",
  videoSource: "embed",
  duration: "12:30",
  summary: "Pelajari teknik pemeriksaan fisik menyeluruh pada ibu hamil, mulai dari inspeksi kepala hingga ekstremitas bawah. Video ini mencakup teknik palpasi, perkusi, dan auskultasi yang sesuai dengan standar praktik kebidanan terkini.",
  objectives: ["Mampu melakukan pemeriksaan fisik head to toe secara sistematis", "Mengidentifikasi tanda-tanda abnormal pada ibu hamil", "Mendokumentasikan temuan"],
  tools: ["Stetoskop", "Tensimeter", "Timbangan", "Pita pengukur (metline)", "Doppler/Fetoscope", "Jangka panggul"]
};

export default function LecturerLessonPreviewPage() {
  const router = useRouter();
  const params = useParams(); 
  
  // Nanti data di-fetch menggunakan params.lessonId
  const materi = dummyMateriDetail; 
  const playlist = dummyPlaylist;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.title = `Pratinjau: ${materi.title} | EduBidan`;
  }, [materi]);

  if (!mounted) return null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10 sm:pb-12 max-w-350 mx-auto">
      
      {/* HEADER & TOMBOL KEMBALI */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <button 
          onClick={() => router.push(`/dashboard/lecturer/modules/${params.id}`)} 
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-muted-foreground hover:text-foreground transition-colors bg-card border border-border px-4 py-2.5 rounded-xl hover:bg-muted shadow-sm w-fit"
        >
          <ArrowLeft size={16} /> Kembali ke Editor Modul
        </button>

        {/* BADGE PRATINJAU DOSEN */}
        <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 font-extrabold text-xs flex items-center gap-2 w-fit">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          Mode Pratinjau Dosen
        </div>
      </div>

      {/* LAYOUT KONTEN 2 KOLOM */}
      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        
        {/* =========================================================
            KOLOM KIRI: VIDEO & KONTEN MATERI
        ============================================================= */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Video Player Box */}
          <div className="relative w-full aspect-video bg-black rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-border/50 group shrink-0">
            {materi.videoSource === "upload" ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <Video size={48} className="mb-4 opacity-50" />
                <p className="font-medium">Pratinjau Video (File Upload)</p>
              </div>
            ) : (
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080" 
                alt="Video Thumbnail" 
                className="w-full h-full object-cover opacity-70"
              />
            )}
            
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <button className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/90 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform backdrop-blur-sm">
                <Play size={32} className="ml-2" />
              </button>
            </div>
          </div>

          {/* Detail Materi Card */}
          <div className="bg-card rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-8 shadow-sm">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4 leading-tight">
              {materi.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold text-muted-foreground mb-6 pb-6 border-b border-border/50">
              <span className="flex items-center gap-2"><User size={16} className="text-primary" /> Instruktur Modul</span>
              <span className="flex items-center gap-2"><Clock size={16} className="text-teal-500" /> Durasi Video: {materi.duration}</span>
            </div>

            <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-muted-foreground font-medium leading-relaxed">
              <h3 className="text-foreground font-extrabold text-lg mb-3">Ringkasan Materi</h3>
              {materi.summary ? (
                <div dangerouslySetInnerHTML={{ __html: materi.summary.replace(/\n/g, '<br/>') }} />
              ) : (
                <p className="italic opacity-70">Belum ada ringkasan materi yang ditulis.</p>
              )}
            </div>
          </div>

        </div>

        {/* =========================================================
            KOLOM KANAN: SIDEBAR (Tujuan, Alat, Playlist)
        ============================================================= */}
        <div className="space-y-6 lg:sticky lg:top-6 self-start">
          
          {/* Tujuan Pembelajaran */}
          <div className="bg-card rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2.5 mb-4 border-b border-border/50 pb-3">
              <Target size={18} className="text-primary" />
              <h3 className="text-base font-extrabold text-foreground">Tujuan Pembelajaran</h3>
            </div>
            <ul className="space-y-3">
              {materi.objectives?.map((obj: string, idx: number) => obj.trim() && (
                <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground font-medium">
                  <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{obj}</span>
                </li>
              ))}
              {(!materi.objectives || materi.objectives.every((o:string) => !o.trim())) && (
                <li className="text-sm text-muted-foreground italic">Belum ada tujuan khusus.</li>
              )}
            </ul>
          </div>

          {/* Daftar Alat */}
          <div className="bg-card rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2.5 mb-4 border-b border-border/50 pb-3">
              <Wrench size={18} className="text-primary" />
              <h3 className="text-base font-extrabold text-foreground">Daftar Alat Pendukung</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {materi.tools?.map((tool: string, idx: number) => tool.trim() && (
                <span key={idx} className="px-3 py-1.5 bg-muted/50 border border-border rounded-lg text-xs font-bold text-foreground">
                  {tool}
                </span>
              ))}
              {(!materi.tools || materi.tools.every((t:string) => !t.trim())) && (
                <p className="text-sm text-muted-foreground italic">Tidak ada alat khusus.</p>
              )}
            </div>
          </div>

          {/* Pratinjau Playlist Modul */}
          <div className="bg-card rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 border-b border-border/50 pb-3">
              <div className="flex items-center gap-2.5">
                <ListOrdered size={18} className="text-primary" />
                <h3 className="text-base font-extrabold text-foreground">Susunan Modul</h3>
              </div>
            </div>
            
            <div className="space-y-1 relative before:absolute before:inset-y-0 before:left-4.75 before:w-0.5 before:bg-border">
              {playlist.map((item: any, idx: number) => {
                const isCurrent = item.id === materi.id;
                const isMateri = item.kind === "materi";
                return (
                  <div key={item.id} className={`relative flex items-center gap-3 p-3 rounded-xl transition-colors ${isCurrent ? "bg-primary/5 border border-primary/20" : "opacity-70 grayscale"}`}>
                    {/* Timeline Dot/Icon */}
                    <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 border-card ${isCurrent ? "bg-primary text-white shadow-md" : "bg-muted text-muted-foreground"}`}>
                      {isMateri ? <Video size={14} /> : <HelpCircle size={14} />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-extrabold truncate ${isCurrent ? "text-primary" : "text-foreground"}`}>
                        {item.title}
                      </p>
                      <p className="text-[10px] font-medium text-muted-foreground mt-0.5">
                        {isMateri ? `Durasi: ${item.duration || "-"}` : `Kuis Evaluasi`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}