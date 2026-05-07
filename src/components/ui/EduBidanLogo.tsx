import React from "react";

// Mendefinisikan interface props agar TypeScript lebih rapi
interface EduBidanLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  variant?: "default" | "white";
}

export function EduBidanLogo({ size = "md", showText = true, variant = "default" }: EduBidanLogoProps) {
  const sizes = { sm: "w-9 h-9", md: "w-11 h-11", lg: "w-16 h-16" };
  const textSizes = { sm: "text-xl", md: "text-2xl", lg: "text-4xl" };
  const iconScale = { sm: 0.55, md: 0.7, lg: 1 };
  const isWhite = variant === "white";

  return (
    <div className="flex items-center gap-2.5">
      {/* Box logo dibiarkan menggunakan hex agar warna gradien identitas brand tetap konsisten */}
      <div className={`${sizes[size]} rounded-2xl bg-linear-to-br from-[#0D9488] via-[#14B8A6] to-[#5EEAD4] flex items-center justify-center relative shadow-md shadow-primary/20`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          style={{ width: `${iconScale[size] * 36}px`, height: `${iconScale[size] * 36}px` }}
        >
          {/* Mother & baby silhouette with stethoscope heart */}
          <path d="M24 6C20.5 6 18 8.5 18 11.5C18 14.5 20.5 17 24 17C27.5 17 30 14.5 30 11.5C30 8.5 27.5 6 24 6Z" fill="white" opacity="0.95" />
          <path d="M16 20C14 21 13 23.5 13 26V34C13 35.5 14 37 16 37.5L20 38.5V42H28V38.5L32 37.5C34 37 35 35.5 35 34V26C35 23.5 34 21 32 20C30.5 19.2 27.5 18.5 24 18.5C20.5 18.5 17.5 19.2 16 20Z" fill="white" opacity="0.9" />
          {/* Baby circle */}
          <circle cx="33" cy="30" r="5.5" fill="white" opacity="0.85" />
          <circle cx="33" cy="28.5" r="2" fill="white" opacity="0.5" />
          {/* Heart/medical cross accent */}
          <path d="M22 28C22 26.5 23 25.5 24 25.5C25 25.5 26 26.5 26 28C26 30 24 32 24 32C24 32 22 30 22 28Z" fill="#0D9488" opacity="0.7" />
          {/* Stethoscope line */}
          <path d="M20 22C18.5 24 18 26 18.5 28" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        </svg>
      </div>
      {showText && (
        // Mengganti inline style dengan class font-black
        <span className={`${textSizes[size]} tracking-tight font-black`}>
          <span className={isWhite ? "text-white" : "text-primary"}>Edu</span>
          {/* Mengganti teks hardcode menjadi text-foreground agar responsif terhadap Dark Mode */}
          <span className={isWhite ? "text-white/80" : "text-[#134E4A]"}>Bidan</span>
        </span>
      )}
    </div>
  );
}