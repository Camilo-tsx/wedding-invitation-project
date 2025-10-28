"use server";
import { requireAuth } from "@/lib/requireAuth";
import { checkOwner } from "@/modules/event/service";
import { getAllGuest } from "@/modules/guest/service";
import { NextResponse } from "next/server";

export const GET = async (
  _req: Request,
  { params }: { params: { eventId: string } }
) => {
  const { eventId } = params;

  // 1. Verificar autenticación
  const { user, newAccessToken } = await requireAuth();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // 2. Verificar ownership
  const isOwner = await checkOwner(user.id, eventId);
  if (!isOwner) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  // 3. Traer invitados
  try {
    const guests = await getAllGuest(eventId);

    if (!guests) {
      return NextResponse.json(
        { message: "Unable to retrieve guest or event not found" },
        { status: 404 }
      );
    }

    if (guests.length === 0) {
      return NextResponse.json(guests, { status: 204 });
    }

    // 4. Preparar respuesta
    const response = NextResponse.json(guests, { status: 200 });

    // Si hay un nuevo accessToken, setearlo en cookies
    if (newAccessToken) {
      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60, // 1h
      });
    }

    return response;
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
