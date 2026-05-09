import React from "react";
import { Calendar } from "lucide-react";

interface UpcomingQuizCardProps {
  title: string;
  date: string;
  onClick?: () => void;
}

export function UpcomingQuizCard({ title, date, onClick }: UpcomingQuizCardProps) {
  return (
    <div 
      onClick={onClick}
      className="p-4 rounded-2xl bg-muted/30 border border-border hover:border-primary/40 transition-colors cursor-pointer group"
    >
      <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
        {title}
      </p>
      <div className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 w-fit px-2.5 py-1 rounded-md mt-3">
        <Calendar size={14} /> {date}
      </div>
    </div>
  );
}