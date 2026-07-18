"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { AuthShell } from "@/components/auth/shared/AuthShell";
import { ForgotPasswordEmailStep } from "@/components/auth/forgot-password/ForgotPasswordEmailStep";
import { ForgotPasswordSuccess } from "@/components/auth/forgot-password/ForgotPasswordSuccess";
import { AppToast, type AppToastState } from "@/components/ui/AppToast";

export type ForgotPasswordStep = "email" | "success";

type ForgotPasswordApiResponse = {
  success: boolean;
  message: string;
  data: null;
};

function getFriendlyForgotPasswordError(message: string) {
  const messages: Record<string, string> = {
    "Email is required": "Email wajib diisi.",
    "User not found": "Email tidak ditemukan.",
    "User is inactive": "Akun sedang nonaktif. Silakan hubungi admin.",
    "Email service is not configured":
      "Layanan email belum dikonfigurasi. Silakan hubungi admin.",
    "Failed to send temporary password":
      "Kata sandi sementara gagal dikirim. Kata sandi lama tetap dapat digunakan.",
    "Failed to request temporary password":
      "Permintaan kata sandi sementara gagal diproses.",
  };

  return messages[message] ?? "Terjadi kesalahan. Silakan coba lagi.";
}

export function ForgotPasswordFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<ForgotPasswordStep>("email");
  const [email, setEmail] = useState(() => searchParams.get("email") ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<AppToastState>(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const toastTimeoutRef = useRef<number | null>(null);

  const showToast = useCallback((nextToast: NonNullable<AppToastState>) => {
    if (toastTimeoutRef.current !== null) {
      window.clearTimeout(toastTimeoutRef.current);
    }

    setToast(nextToast);

    toastTimeoutRef.current = window.setTimeout(() => {
      setToast(null);
      toastTimeoutRef.current = null;
    }, nextToast.durationMs ?? 3500);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current !== null) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const handleEmailChange = (nextEmail: string) => {
    setEmail(nextEmail);
    setEmailErrorMessage("");
  };

  const handleBack = () => {
    if (isSubmitting) return;

    if (step === "email") {
      router.push("/login");
      return;
    }

    setStep("email");
  };

  const requestTemporaryPassword = async () => {
    if (isSubmitting) return;

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setEmailErrorMessage("Email wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    setEmailErrorMessage("");

    try {
      const response = await fetch(
        "/api/auth/forgot-password/request-temporary-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: normalizedEmail,
          }),
        }
      );

      const result = (await response.json()) as ForgotPasswordApiResponse;

      if (!response.ok || !result.success) {
        if (result.message === "User not found") {
          setEmailErrorMessage("Email belum terdaftar di sistem.");
          return;
        }

        showToast({
          type: "error",
          title: "Kata sandi sementara gagal dikirim",
          message: getFriendlyForgotPasswordError(result.message),
        });
        return;
      }

      setEmail(normalizedEmail);
      setStep("success");

      showToast({
        type: "success",
        title: "Kata sandi sementara dikirim",
        message:
          "Silakan periksa kotak masuk atau folder spam pada email Anda.",
      });
    } catch (error) {
      console.error("Request temporary password error:", error);

      showToast({
        type: "error",
        title: "Koneksi bermasalah",
        message:
          "Terjadi kesalahan koneksi saat meminta kata sandi sementara.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      sideTitle="Pulihkan Akses Akun"
      sideDescription="Masukkan email terdaftar untuk menerima kata sandi sementara akun EduBidan."
      sideVariant="primary"
      hideBackButton={step === "success"}
      onBackClick={handleBack}
    >
      {step === "email" && (
        <ForgotPasswordEmailStep
          email={email}
          isSubmitting={isSubmitting}
          errorMessage={emailErrorMessage}
          onEmailChange={handleEmailChange}
          onSubmit={requestTemporaryPassword}
        />
      )}

      {step === "success" && <ForgotPasswordSuccess email={email} />}

      <AppToast toast={toast} onClose={() => setToast(null)} />
    </AuthShell>
  );
}
