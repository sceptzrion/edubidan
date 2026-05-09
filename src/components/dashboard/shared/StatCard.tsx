import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color: string;
}

export function StatCard({ icon: Icon, label, value, color }: StatCardProps) {
  return (
    <div className="bg-card rounded-3xl border border-border p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-2xl ${color} border flex items-center justify-center mb-4`}>
        <Icon size={24} />
      </div>
      <p className="text-3xl font-black mb-1 tracking-tight text-foreground">{value}</p>
      <p className="text-sm font-semibold text-muted-foreground">{label}</p>
    </div>
  );
}