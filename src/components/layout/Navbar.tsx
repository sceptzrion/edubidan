"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EduBidanLogo } from "@/components/ui/EduBidanLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface NavbarProps {
  isDark: boolean;
  onToggleDark: () => void;
}

export function Navbar({ isDark, onToggleDark }: NavbarProps) {
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#">
          <EduBidanLogo size="sm" />
        </a>

        {/* Menu Navigasi (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Tentang
          </a>
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Fitur
          </a>
          <a href="#alur-belajar" className="text-sm font-medium transition-colors text-muted-foreground hover:text-foreground">
            Alur Belajar
          </a>
          <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            FAQ
          </a>
        </div>

        {/* Action Buttons (Sesuai Gap & Button di Figma) */}
        <div className="flex items-center gap-3">
          <ThemeToggle isDark={isDark} onToggle={onToggleDark} />
          
          {/* Tombol Masuk */}
          <button 
            onClick={() => router.push("/login")} 
            className="text-sm text-primary hover:underline font-semibold"
          >
            Masuk
          </button>
          
          {/* Tombol Daftar */}
          <button 
            onClick={() => router.push("/register")} 
            className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-semibold"
          >
            Daftar
          </button>
        </div>
      </div>
    </nav>
  );
}