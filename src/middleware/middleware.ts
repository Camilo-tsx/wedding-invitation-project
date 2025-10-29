import { verifyAccessToken } from "@/core/services/auth/authenticateToken";
import { NextRequest, NextResponse } from "next/server";

export const redirectIfNotValid = async (req: NextRequest) => {
  const accessToken = req.cookies.get("accessToken")?.value;
  if (!accessToken)
    return NextResponse.json({ message: "Missing Token" }, { status: 401 });
  const isAuthenticated = verifyAccessToken(accessToken);
  if (!isAuthenticated) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/api/user/delete", "/api/user/update", "/api/event/:path*"],
};
