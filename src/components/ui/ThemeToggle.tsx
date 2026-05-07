"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-lg hover:bg-muted transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
      title={isDark ? "Mode Terang" : "Mode Gelap"}
    >
      {isDark ? (
        <Sun size={20} className="text-amber-500" /> 
      ) : (
        <Moon size={20} className="text-muted-foreground" />
      )}
    </button>
  );
}