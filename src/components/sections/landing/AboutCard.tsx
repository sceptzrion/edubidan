import React from "react";

// Mendefinisikan tipe data yang dibutuhkan oleh kartu ini
interface AboutCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function AboutCard({ icon, title, description }: AboutCardProps) {
  return (
    <div className="text-center p-8 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all group bg-background/50">
      <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      {/* Mengganti inline style dengan font-semibold */}
      <h3 className="text-xl font-semibold mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
}