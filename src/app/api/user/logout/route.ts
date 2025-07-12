"user server"
import { addRevokeToken, isTokenRevoked } from "@/models/revokeTokens";
import  jwt  from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const accessToken = req.cookies.get("accessToken")?.value
    const refreshToken = req.cookies.get("refreshToken")?.value

    if (!accessToken || !refreshToken) return NextResponse.json({ message: "Token error" }, { status: 401 });
    try {
    
    const payload = jwt.verify(accessToken, process.env.JWT_SECRET!) as {userId: string}

    const userId = payload.userId

    if (!userId) return NextResponse.json({error: "Invalid token payload", status: 400})

    const revoked = await isTokenRevoked(refreshToken)
    if (!revoked) await addRevokeToken(refreshToken, userId)


    const response = NextResponse.json({message: "Logout succesfull", success: true})

    response.cookies.set("accessToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
        maxAge: 0, 
  });

    response.cookies.set("refreshToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
        maxAge: 0, 
    });
    return response 
    } catch (err) {
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 403 });
    }


}