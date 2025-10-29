import { verifyAccessToken } from "@/core/services/auth/authenticateToken";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken)
    return NextResponse.json({ message: "Token required" }, { status: 401 });

  const payload = verifyAccessToken(accessToken);
  if (!payload)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  return NextResponse.json({
    user: {
      id: payload.id,
      userName: payload.userName,
      email: payload.email,
      isAllowed: payload.isAllowed,
      roles: payload.roles,
    },
  });
};
