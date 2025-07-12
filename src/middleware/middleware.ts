import { authenticateToken } from "@/lib/authenticateToken"
import { NextRequest, NextResponse } from "next/server"

export const redirectIfNotValid = async (req: NextRequest) => {
    const isAuthenticated = await authenticateToken(req);
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", req.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
    "/api/users/logout",
    "/api/users/delete",
    "/api/users/update",
    "/api/event/:path*"

  ]}