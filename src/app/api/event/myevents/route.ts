"use server";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/requireAuth";
import { getAllEvents } from "@/modules/event/service";

export async function GET() {
  const { user, newAccessToken } = await requireAuth();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const events = await getAllEvents(user.id);

    if (!events) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }

    const res = NextResponse.json({ events, userId: user.id }, { status: 200 });

    // Si se renovó el accessToken → setear cookie en la misma response
    if (newAccessToken) {
      res.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
        maxAge: 60 * 30,
      });
    }

    return res;
  } catch (err) {
    return NextResponse.json(
      { message: err instanceof Error ? err.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
