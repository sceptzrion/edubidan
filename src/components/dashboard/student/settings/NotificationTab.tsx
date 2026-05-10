import React, { useState } from "react";

export function NotificationTab() {
  const [notifications, setNotifications] = useState({ email: true, quiz: true, module: false });

  const notifItems = [
    { key: "email" as const, label: "Notifikasi Email", desc: "Terima pemberitahuan mingguan melalui email institusi" },
    { key: "quiz" as const, label: "Pengingat Kuis", desc: "Ingatkan saya jika ada tugas atau kuis yang belum dikerjakan" },
    { key: "module" as const, label: "Update Modul", desc: "Pemberitahuan saat dosen mengunggah materi baru" },
  ];

  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-base sm:text-lg font-extrabold text-foreground mb-6">Preferensi Notifikasi</h2>
      <div className="space-y-3 sm:space-y-4">
        {notifItems.map(n => (
          <div key={n.key} className="flex items-center justify-between p-4 sm:p-5 rounded-2xl border border-border hover:bg-muted/30 transition-colors">
            <div className="pr-4">
              <p className="text-sm font-extrabold text-foreground mb-1">{n.label}</p>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">{n.desc}</p>
            </div>
            <button 
              onClick={() => setNotifications({ ...notifications, [n.key]: !notifications[n.key] })} 
              className={`w-12 h-6 sm:w-14 sm:h-7 rounded-full transition-colors relative shrink-0 border-2 ${notifications[n.key] ? "bg-primary border-primary" : "bg-muted border-border"}`}
            >
              <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white absolute top-0.5 transition-all shadow-sm ${notifications[n.key] ? "left-5.5 sm:left-6.5" : "left-0.5 sm:left-0.75"}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}