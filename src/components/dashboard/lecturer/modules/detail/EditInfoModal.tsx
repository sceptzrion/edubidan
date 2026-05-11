import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Save, Upload, Plus, Trash2 } from "lucide-react";

export function EditInfoModal({ info, onSave, onClose }: any) {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState(info);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  const updateObjective = (i: number, v: string) => {
    const next = [...form.objectives];
    next[i] = v;
    setForm({ ...form, objectives: next });
  };
  const addObjective = () => setForm({ ...form, objectives: [...form.objectives, ""] });
  const removeObjective = (i: number) => setForm({ ...form, objectives: form.objectives.filter((_: any, j: number) => j !== i) });

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose} />
      
      <div className="bg-card rounded-2xl sm:rounded-3xl border border-border w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col relative z-10 shadow-2xl animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-border shrink-0 bg-card">
          <h2 className="text-lg sm:text-xl font-extrabold text-foreground">Edit Informasi Modul</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted text-muted-foreground hover:text-foreground rounded-xl transition-colors"><X size={20} /></button>
        </div>
        
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto scrollbar-thin bg-muted/20">
          <div>
            <label className="text-xs sm:text-sm mb-2 block font-bold text-foreground">Gambar Cover/Banner</label>
            <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-border mb-3 aspect-16/5 bg-muted shadow-inner relative">
              {form.banner && <img src={form.banner} alt="banner" className="w-full h-full object-cover" />}
            </div>
            <button onClick={() => fileRef.current?.click()} className="w-full border-2 border-dashed border-border bg-card rounded-xl py-4 flex items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 hover:text-primary transition-colors text-xs sm:text-sm font-bold text-muted-foreground">
              <Upload size={18} /> Klik untuk unggah gambar baru
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setForm({ ...form, banner: URL.createObjectURL(f) });
            }} />
          </div>

          <div>
            <label className="text-xs sm:text-sm mb-2 block font-bold text-foreground">Estimasi Waktu Belajar</label>
            <input value={form.estimatedTime} onChange={(e) => setForm({ ...form, estimatedTime: e.target.value })}
              placeholder="Contoh: 6 Jam"
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm font-bold outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm" />
          </div>

          <div>
            <label className="text-xs sm:text-sm mb-2 block font-bold text-foreground">Deskripsi Modul</label>
            <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm resize-none leading-relaxed" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs sm:text-sm font-bold text-foreground">Tujuan Pembelajaran Modul</label>
              <button onClick={addObjective} className="text-xs sm:text-sm text-primary flex items-center gap-1 hover:underline font-extrabold">
                <Plus size={14} /> Tambah Tujuan
              </button>
            </div>
            <div className="space-y-3">
              {form.objectives.map((o: string, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary text-xs sm:text-sm flex items-center justify-center shrink-0 font-extrabold">{i + 1}</span>
                  <input value={o} onChange={(e) => updateObjective(i, e.target.value)}
                    placeholder={`Tujuan ${i + 1}`}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm font-medium outline-none focus:border-primary shadow-sm" />
                  <button onClick={() => removeObjective(i)} className="p-2.5 hover:bg-red-500/10 rounded-xl text-red-500 transition-colors"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 border-t border-border flex gap-3 shrink-0 bg-card rounded-b-2xl sm:rounded-3xl">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-border text-xs sm:text-sm font-bold text-foreground hover:bg-muted transition-colors">Batal</button>
          <button onClick={() => onSave(form)} className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 hover:bg-primary/90 shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5">
            <Save size={18} /> Simpan Perubahan
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}