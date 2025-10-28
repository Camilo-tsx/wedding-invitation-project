"use server";
import { verifyAccessToken } from "@/lib/authenticateToken";
import { editEvent } from "@/modules/event/service";
import { validatePartialEvent } from "@/schemas/event.schema";
import { NextRequest, NextResponse } from "next/server";
import { safeParse } from "valibot";

interface Params {
  params: Record<string, string>;
}

//Edit event
export const PATCH = async (req: NextRequest, { params }: Params) => {
  const accessToken = req.cookies.get("accessToken")?.value;
  if (!accessToken)
    return NextResponse.json(
      {
        error: "No estas autorizado a realizar esta acción",
        field: "dressCode",
      },
      { status: 401 }
    );
  const payload = verifyAccessToken(accessToken);
  if (!payload)
    return NextResponse.json(
      { message: "Can not get the payload" },
      { status: 400 }
    );
  const userId = payload.id;
  const id = params.eventId;
  const body = await req.json();
  const result = safeParse(validatePartialEvent, body);
  if (!result.success) {
    return NextResponse.json(
      { message: "Validation Error", error: result.issues },
      { status: 400 }
    );
  }

  try {
    const event = result.output;
    const editedEvent = await editEvent(id, event, userId);
    if (!editedEvent)
      return NextResponse.json(
        { error: "El evento que estas intentando editar no existe" },
        { status: 404 }
      );
    return NextResponse.json(editedEvent, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message });
    } else {
      return NextResponse.json(
        { message: "Internar Server Error" },
        { status: 500 }
      );
    }
  }
};
