"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { EduBidanLogo } from "@/components/ui/EduBidanLogo";
import { Mail, Phone, MapPin, Heart } from "lucide-react";

// --- Ikon SVG Manual ---
const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const YoutubeIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

export function Footer() {
  const router = useRouter();

  const socialLinks = [
    { Icon: InstagramIcon, href: "#" },
    { Icon: FacebookIcon, href: "#" },
    { Icon: YoutubeIcon, href: "#" }
  ];

  return (
    <footer className="relative pt-20 pb-10 overflow-hidden bg-[#020617]">
      {/* Efek Latar Belakang */}
      <div className="absolute inset-0 bg-linear-to-b from-[#042F2E]/30 to-transparent pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 text-white/70">
          
          {/* Kolom 1: Branding */}
          <div className="space-y-6">
            <EduBidanLogo size="sm" variant="white" />
            <p className="text-sm leading-relaxed text-slate-400">
              Platform edukasi kebidanan digital terdepan untuk mencetak bidan cerdas, kompeten, dan siap praktik di era digital.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((item, i) => {
                const IconComponent = item.Icon;
                return (
                  <button 
                    key={i} 
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm"
                  >
                    <IconComponent size={16} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Kolom 2: Platform */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Platform</h4>
            <div className="space-y-3 text-sm">
              <p onClick={() => router.push("#about")} className="hover:text-primary cursor-pointer transition-colors">Tentang Kami</p>
              <p onClick={() => router.push("/register")} className="hover:text-primary cursor-pointer transition-colors">Mulai Belajar</p>
              <p className="hover:text-primary cursor-pointer transition-colors">Pusat Bantuan</p>
            </div>
          </div>

          {/* Kolom 3: Dukungan */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Dukungan</h4>
            <div className="space-y-3 text-sm">
              <p className="hover:text-primary cursor-pointer transition-colors text-slate-400">Syarat & Ketentuan</p>
              <p className="hover:text-primary cursor-pointer transition-colors text-slate-400">Kebijakan Privasi</p>
              <p className="hover:text-primary cursor-pointer transition-colors text-slate-400">Cookie Policy</p>
            </div>
          </div>

          {/* Kolom 4: Kontak */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Kontak</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Mail size={14} />
                </div>
                <span>admin@edubidan.id</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Phone size={14} />
                </div>
                <span>+62 812 3456 7890</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin size={14} />
                </div>
                <span className="leading-relaxed text-slate-400 text-left">
                  Karawang, Jawa Barat<br />
                  Indonesia
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; 2026 EduBidan. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            Dibuat dengan <Heart size={12} className="text-rose-500 fill-rose-500" /> untuk Bidan Indonesia
          </div>
        </div>
      </div>
    </footer>
  );
}