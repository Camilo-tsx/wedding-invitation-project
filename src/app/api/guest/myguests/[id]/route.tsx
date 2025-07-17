import { getAllGuest } from "@/guest/service";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Record<string, string>;
}

export const GET = async (req: NextRequest, { params }: Params) => {
  const eventId = params.id;
  try {
    const guests = await getAllGuest(eventId);
    if (guests === null)
      return NextResponse.json(
        { message: "Unable to retrieve guest or event not found" },
        { status: 404 }
      );
    if (guests.length == 0) return NextResponse.json(guests, { status: 204 });
    return NextResponse.json(guests, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message });
    } else {
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500, headers: { Content_Type: "application/json" } }
      );
    }
  }
};
