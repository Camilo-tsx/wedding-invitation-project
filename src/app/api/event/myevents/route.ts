"user server";
import { getAllEvents } from "@/event/service";
import { decodedToken } from "@/lib/authenticateToken";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const payload = await decodedToken(req);
  if (!payload)
    return NextResponse.json(
      { message: "Can not get the payload" },
      { status: 400 }
    );
  const userId = payload.id;

  try {
    const events = await getAllEvents(userId);
    if (!events)
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    return NextResponse.json(events, {
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
