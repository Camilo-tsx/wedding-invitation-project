"use server";
import { verifyAccessToken } from "@/lib/authenticateToken";
import { checkPermissions, createEvent } from "@/modules/event/service";
import { eventSchema } from "@/schemas/event.schema";
import { NextRequest, NextResponse } from "next/server";
import { safeParse } from "valibot";

export const POST = async (req: NextRequest) => {
  const accessToken = req.cookies.get("accessToken")?.value;
  if (!accessToken)
    return NextResponse.json(
      {
        error: "Debes iniciar sesion para poder crear una invitación",
        field: "dressCode",
      },
      { status: 401 }
    );
  const payload = verifyAccessToken(accessToken);
  if (!payload)
    return NextResponse.json(
      { error: "Can not get the payload", field: "dressCode" },
      { status: 400 }
    );
  const userId = payload.id;
  const isAuthorized = await checkPermissions(userId);
  if (!isAuthorized)
    return NextResponse.json(
      {
        error: "Es necesario pagar el servicio para poder crear una invitación",
        field: "dressCode",
      },
      { status: 403 }
    );
  const body = await req.json();
  const result = safeParse(eventSchema, body);
  if (!result.success) {
    return NextResponse.json(
      { message: "Validation Error", errors: result.issues },
      { status: 400 }
    );
  }

  const event = result.output;

  try {
    const newEvent = await createEvent(userId, event);
    if (!newEvent)
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    return NextResponse.json(newEvent, {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message });
    } else {
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
};
