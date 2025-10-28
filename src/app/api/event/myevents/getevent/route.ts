"use server";
import { verifyAccessToken } from "@/lib/authenticateToken";
import { getEventById } from "@/modules/event/service";
import { NextRequest, NextResponse } from "next/server";

interface EventReq {
  userId: string;
  eventId: string;
}

export const POST = async (req: NextRequest) => {
  const body = (await req.json()) as EventReq;

  if (!body)
    return NextResponse.json(
      { message: "Cannot find the user or the event id" },
      { status: 404 }
    );

  try {
    const event = await getEventById(body.eventId, body.userId);
    if (!event)
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    return NextResponse.json(event, {
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
