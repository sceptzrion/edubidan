import React, { useState, useRef } from "react";
import { Camera, Upload, Trash2, X, Image as ImageIcon } from "lucide-react";
import { createPortal } from "react-dom";

export function ProfileTab() {
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fungsi pura-pura untuk upload
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="animate-in fade-in duration-300 relative">
      <h2 className="text-base sm:text-lg font-extrabold text-foreground mb-6">Informasi Profil</h2>
      
      {/* AREA FOTO PROFIL */}
      <div className="flex items-center gap-4 sm:gap-6 mb-8">
        <div className="relative shrink-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-primary to-teal-400 flex items-center justify-center text-white text-xl sm:text-2xl font-extrabold shadow-sm">
            I
          </div>
          <button 
            onClick={() => setIsAvatarModalOpen(true)}
            className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center text-white border-2 border-card hover:bg-primary/90 transition-all hover:scale-110 shadow-md cursor-pointer"
          >
            <Camera size={14} className="sm:w-4 sm:h-4" />
          </button>
        </div>
        <div>
          <p className="text-base sm:text-lg font-extrabold text-foreground">Ikhsan Rizqi</p>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-0.5">Mahasiswa UNSIKA</p>
        </div>
      </div>
      
      {/* FORM PROFIL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        <div>
          <label className="text-xs sm:text-sm mb-2 block font-bold text-muted-foreground">Nama Lengkap</label>
          <input defaultValue="Ikhsan Rizqi" className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-card border border-border outline-none focus:border-primary focus:ring-1 focus:ring-primary text-xs sm:text-sm font-medium text-foreground transition-all" />
        </div>
        <div>
          <label className="text-xs sm:text-sm mb-2 block font-bold text-muted-foreground">NPM (Nomor Pokok Mahasiswa)</label>
          <input defaultValue="2010631170000" disabled className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-muted/50 border border-border/50 outline-none text-xs sm:text-sm font-medium text-muted-foreground cursor-not-allowed" />
        </div>
        <div>
          <label className="text-xs sm:text-sm mb-2 block font-bold text-muted-foreground">Email Institusi</label>
          <input defaultValue="ikhsan@unsika.ac.id" disabled className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-muted/50 border border-border/50 outline-none text-xs sm:text-sm font-medium text-muted-foreground cursor-not-allowed" />
        </div>
        <div>
          <label className="text-xs sm:text-sm mb-2 block font-bold text-muted-foreground">No. Telepon</label>
          <input defaultValue="+62 812 3456 7890" className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-card border border-border outline-none focus:border-primary focus:ring-1 focus:ring-primary text-xs sm:text-sm font-medium text-foreground transition-all" />
        </div>
      </div>
      
      <button className="mt-8 bg-primary text-primary-foreground px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl hover:bg-primary/90 transition-all font-bold text-xs sm:text-sm shadow-lg shadow-primary/20 hover:-translate-y-0.5 w-full sm:w-auto">
        Simpan Perubahan
      </button>

      {/* ==============================================================
          MODAL UBAH FOTO PROFIL (Menggunakan Portal agar overlay sempurna)
      ================================================================== */}
      {isAvatarModalOpen && typeof document !== "undefined" && createPortal(
        <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsAvatarModalOpen(false)} />
          
          <div className="bg-card border border-border w-full max-w-sm rounded-3xl p-6 shadow-2xl relative z-10 animate-in zoom-in-95 duration-200 flex flex-col items-center text-center">
            
            <button onClick={() => setIsAvatarModalOpen(false)} className="absolute right-4 top-4 p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors">
              <X size={18} />
            </button>
            
            <h3 className="text-base sm:text-lg font-extrabold text-foreground mb-6">Ubah Foto Profil</h3>
            
            {/* Preview Bulat Besar */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-linear-to-br from-primary to-teal-400 flex items-center justify-center text-white text-3xl sm:text-4xl font-extrabold shadow-inner mb-6 relative overflow-hidden group">
               I
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={handleUploadClick}>
                 <Camera size={24} className="text-white" />
               </div>
            </div>

            {/* Hidden File Input */}
            <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={() => { setIsAvatarModalOpen(false); alert("File terpilih! (Simulasi)"); }} />
            
            <div className="w-full space-y-2.5">
              <button onClick={handleUploadClick} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
                <ImageIcon size={16} /> Pilih dari Galeri
              </button>
              <button onClick={() => { setIsAvatarModalOpen(false); alert("Foto dihapus! (Simulasi)"); }} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border text-red-500 font-bold text-xs sm:text-sm hover:bg-red-500/10 transition-colors">
                <Trash2 size={16} /> Hapus Foto Saat Ini
              </button>
            </div>
            
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}