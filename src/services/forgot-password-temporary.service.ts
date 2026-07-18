import { randomBytes } from "node:crypto";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/services/email/email.service";

const APP_URL = process.env.APP_URL || "http://localhost:3000";

export type RequestTemporaryPasswordError =
  | "EMAIL_REQUIRED"
  | "USER_NOT_FOUND"
  | "USER_INACTIVE"
  | "EMAIL_NOT_CONFIGURED"
  | "EMAIL_SEND_FAILED";

export type RequestTemporaryPasswordResult =
  | {
      success: true;
      email: {
        sent: true;
        skipped: false;
        error: null;
      };
      error: null;
    }
  | {
      success: false;
      email: null;
      error: RequestTemporaryPasswordError;
    };

function generateTemporaryPassword() {
  // Selalu memuat huruf besar, huruf kecil, angka, dan simbol.
  // Contoh bentuk: Edu-AbCdEf12-9!
  return `Edu-${randomBytes(6).toString("base64url")}9!`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getTemporaryPasswordEmailHtml(params: {
  name: string;
  email: string;
  temporaryPassword: string;
}) {
  const loginUrl = `${APP_URL.replace(/\/$/, "")}/login`;
  const name = escapeHtml(params.name);
  const email = escapeHtml(params.email);
  const temporaryPassword = escapeHtml(params.temporaryPassword);

  return `
    <!doctype html>
    <html lang="id">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Kata Sandi Sementara EduBidan</title>
      </head>
      <body style="
        margin: 0;
        padding: 0;
        background: #f8fafc;
        font-family: Arial, sans-serif;
        color: #0f172a;
      ">
        <div style="display: none; max-height: 0; overflow: hidden;">
          Gunakan kata sandi sementara ini untuk masuk ke akun EduBidan.
        </div>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
          style="background: #f8fafc; padding: 32px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                style="
                  max-width: 560px;
                  background: #ffffff;
                  border: 1px solid #e2e8f0;
                  border-radius: 20px;
                  overflow: hidden;
                ">
                <tr>
                  <td style="padding: 24px 28px; background: #0f766e;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 22px; line-height: 1.3;">
                      EduBidan
                    </h1>
                    <p style="margin: 6px 0 0; color: #ccfbf1; font-size: 13px;">
                      Platform LMS Kebidanan Digital
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 28px;">
                    <h2 style="margin: 0 0 12px; font-size: 20px;">Halo, ${name}</h2>

                    <p style="margin: 0 0 16px; color: #334155; font-size: 14px; line-height: 1.7;">
                      Kami menerima permintaan pemulihan akun EduBidan. Kata sandi akun Anda
                      telah diganti dengan kata sandi sementara berikut.
                    </p>

                    <div style="margin: 18px 0; padding: 16px; background: #f1f5f9; border-radius: 14px;">
                      <p style="margin: 0; color: #64748b; font-size: 12px; font-weight: 700;">
                        Email Login
                      </p>
                      <p style="margin: 6px 0 0; color: #0f172a; font-size: 15px; font-weight: 700;">
                        ${email}
                      </p>
                    </div>

                    <div style="
                      margin: 18px 0;
                      padding: 16px;
                      background: #fff7ed;
                      border: 1px solid #fed7aa;
                      border-radius: 14px;
                    ">
                      <p style="margin: 0; color: #9a3412; font-size: 12px; font-weight: 700;">
                        Kata Sandi Sementara
                      </p>
                      <p style="
                        margin: 6px 0 0;
                        color: #0f172a;
                        font-size: 17px;
                        font-weight: 800;
                        font-family: monospace;
                        word-break: break-all;
                      ">
                        ${temporaryPassword}
                      </p>
                      <p style="margin: 10px 0 0; color: #9a3412; font-size: 12px; line-height: 1.6;">
                        Segera ubah kata sandi melalui menu Pengaturan Akun &gt; Keamanan setelah
                        berhasil masuk.
                      </p>
                    </div>

                    <div style="margin-top: 24px;">
                      <a href="${loginUrl}" style="
                        display: inline-block;
                        padding: 12px 18px;
                        background: #0f766e;
                        color: #ffffff;
                        border-radius: 12px;
                        text-decoration: none;
                        font-weight: 700;
                        font-size: 14px;
                      ">
                        Masuk ke EduBidan
                      </a>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="
                    padding: 20px 28px;
                    border-top: 1px solid #e2e8f0;
                    background: #f8fafc;
                  ">
                    <p style="margin: 0; color: #64748b; font-size: 12px; line-height: 1.6;">
                      Email ini dikirim otomatis oleh sistem EduBidan. Segera hubungi pengelola
                      apabila Anda tidak merasa melakukan permintaan pemulihan akun.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

export async function requestTemporaryPassword(params: {
  email: string | null;
}): Promise<RequestTemporaryPasswordResult> {
  const email = params.email?.trim().toLowerCase();

  if (!email) {
    return {
      success: false,
      email: null,
      error: "EMAIL_REQUIRED",
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      isActive: true,
    },
  });

  if (!user) {
    return {
      success: false,
      email: null,
      error: "USER_NOT_FOUND",
    };
  }

  if (!user.isActive) {
    return {
      success: false,
      email: null,
      error: "USER_INACTIVE",
    };
  }

  const temporaryPassword = generateTemporaryPassword();
  const hashedTemporaryPassword = await bcrypt.hash(temporaryPassword, 10);
  const previousPasswordHash = user.password;

  const activityLogId = await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedTemporaryPassword,
      },
    });

    const activityLog = await tx.activityLog.create({
      data: {
        userId: user.id,
        actionType: "FORGOT_PASSWORD",
        description: `Sistem mengirim kata sandi sementara untuk akun ${user.name}.`,
      },
      select: {
        id: true,
      },
    });

    return activityLog.id;
  });

  const emailResult = await sendEmail({
    to: user.email,
    subject: "Kata Sandi Sementara Akun EduBidan",
    html: getTemporaryPasswordEmailHtml({
      name: user.name,
      email: user.email,
      temporaryPassword,
    }),
  });

  if (!emailResult.success || emailResult.skipped) {
    // Cegah pengguna kehilangan akses bila email gagal dikirim.
    // updateMany bersyarat menghindari rollback menimpa perubahan sandi lain
    // yang mungkin terjadi secara bersamaan.
    await prisma.$transaction([
      prisma.user.updateMany({
        where: {
          id: user.id,
          password: hashedTemporaryPassword,
        },
        data: {
          password: previousPasswordHash,
        },
      }),
      prisma.activityLog.deleteMany({
        where: {
          id: activityLogId,
        },
      }),
    ]);

    if (emailResult.success && emailResult.skipped) {
      return {
        success: false,
        email: null,
        error: "EMAIL_NOT_CONFIGURED",
      };
    }

    console.error("Failed to send temporary password email:", emailResult.error);

    return {
      success: false,
      email: null,
      error: "EMAIL_SEND_FAILED",
    };
  }

  return {
    success: true,
    email: {
      sent: true,
      skipped: false,
      error: null,
    },
    error: null,
  };
}
