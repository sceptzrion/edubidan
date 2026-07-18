"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

interface ForgotPasswordSuccessProps {
  email: string;
}

export function ForgotPasswordSuccess({
  email,
}: ForgotPasswordSuccessProps) {
  const router = useRouter();

  return (
    <div className="text-center py-8 animate-in zoom-in-95 duration-500">
      <div className="w-24 h-24 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
        <div
          className="absolute inset-0 bg-teal-500/20 rounded-full animate-ping"
          style={{ animationDuration: "3s" }}
        />
        <CheckCircle2 size={48} className="text-teal-600 relative z-10" />
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight mb-4 text-foreground">
        Periksa Email Anda
      </h1>

      <p className="text-muted-foreground mb-3 text-base leading-relaxed max-w-sm mx-auto">
        Kata sandi sementara telah dikirim ke:
      </p>

      <p className="font-bold text-foreground mb-5 break-all">{email}</p>

      <p className="text-muted-foreground mb-10 text-sm leading-relaxed max-w-sm mx-auto">
        Gunakan kata sandi sementara untuk masuk, lalu segera ubah melalui menu
        Pengaturan Akun &gt; Keamanan.
      </p>

      <button
        type="button"
        onClick={() => router.push("/login")}
        className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl hover:opacity-90 transition-all font-bold text-base shadow-lg shadow-primary/20"
      >
        Masuk dengan Kata Sandi Sementara
      </button>
    </div>
  );
}
