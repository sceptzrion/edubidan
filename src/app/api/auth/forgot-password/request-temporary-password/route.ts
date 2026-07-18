import { NextRequest, NextResponse } from "next/server";

import {
  requestTemporaryPassword,
  type RequestTemporaryPasswordError,
} from "@/services/forgot-password-temporary.service";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function getErrorMessage(error: RequestTemporaryPasswordError) {
  const messages: Record<RequestTemporaryPasswordError, string> = {
    EMAIL_REQUIRED: "Email is required",
    USER_NOT_FOUND: "User not found",
    USER_INACTIVE: "User is inactive",
    EMAIL_NOT_CONFIGURED: "Email service is not configured",
    EMAIL_SEND_FAILED: "Failed to send temporary password",
  };

  return messages[error];
}

function getErrorStatus(error: RequestTemporaryPasswordError) {
  const statuses: Record<RequestTemporaryPasswordError, number> = {
    EMAIL_REQUIRED: 400,
    USER_NOT_FOUND: 404,
    USER_INACTIVE: 403,
    EMAIL_NOT_CONFIGURED: 503,
    EMAIL_SEND_FAILED: 502,
  };

  return statuses[error];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = await requestTemporaryPassword({
      email: typeof body.email === "string" ? body.email : null,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: getErrorMessage(result.error),
          data: null,
        },
        {
          status: getErrorStatus(result.error),
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Temporary password sent successfully",
      data: null,
      meta: {
        email: result.email,
      },
    });
  } catch (error) {
    console.error(
      "POST /api/auth/forgot-password/request-temporary-password error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to request temporary password",
        data: null,
      },
      {
        status: 500,
      }
    );
  }
}
