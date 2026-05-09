import React from "react";

interface ModuleProgressProps {
  title: string;
  progress: number;
  lessons: number;
  completed: number;
  onClick: () => void;
}

export function ModuleProgress({ title, progress, lessons, completed, onClick }: ModuleProgressProps) {
  return (
    <div className="group">
      <div className="flex sm:items-center justify-between mb-3 flex-col sm:flex-row gap-2">
        <button 
          onClick={onClick} 
          className="text-base font-bold group-hover:text-primary transition-colors text-left line-clamp-1 text-foreground"
        >
          {title}
        </button>
        <span className="text-sm font-semibold text-muted-foreground shrink-0 bg-muted px-3 py-1 rounded-full">
          {completed}/{lessons} Sub-materi
        </span>
      </div>
      <div className="w-full h-3 bg-muted rounded-full overflow-hidden relative">
        <div 
          className="absolute top-0 left-0 h-full bg-linear-to-r from-primary to-teal-400 rounded-full transition-all duration-1000" 
          style={{ width: `${progress}%` }} 
        />
      </div>
    </div>
  );
}