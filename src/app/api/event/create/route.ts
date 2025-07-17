"user server";
import { checkPermissions, createEvent } from "@/event/service";
import { eventSchema } from "@/event/validation";
import { decodedToken } from "@/lib/authenticateToken";
import { NextRequest, NextResponse } from "next/server";
import { safeParse } from "valibot";

export const POST = async (req: NextRequest) => {
  const payload = await decodedToken(req);
  if (!payload)
    return NextResponse.json(
      { message: "Can not get the payload" },
      { status: 400 }
    );
  const userId = payload.id;
  const isAuthorized = await checkPermissions(userId);
  if (!isAuthorized)
    return NextResponse.json(
      { message: "Not authorized to create an event" },
      { status: 403 }
    );
  const body = await req.json();
  body.eventDate = new Date(body.eventDate);
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
