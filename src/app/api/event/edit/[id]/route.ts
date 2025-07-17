"user server";
import { editEvent } from "@/event/service";
import { validatePartialEvent } from "@/event/validation";
import { decodedToken } from "@/lib/authenticateToken";
import { NextRequest, NextResponse } from "next/server";
import { safeParse } from "valibot";

interface Params {
  params: Record<string, string>;
}

export const PATCH = async (req: NextRequest, { params }: Params) => {
  const payload = await decodedToken(req);
  if (!payload)
    return NextResponse.json(
      { message: "Can not get the payload" },
      { status: 400 }
    );
  const userId = payload.id;
  const id = params.id;
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
        { message: "Failed to edit the event" },
        { status: 400 }
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
