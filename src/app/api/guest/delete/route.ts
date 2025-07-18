import { deleteGuest } from "@/guest/service";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  const body = await req.json();
  const { id } = body;
  if (!id)
    return NextResponse.json(
      { message: "Can not delete your guest" },
      { status: 400 }
    );

  try {
    await deleteGuest(id);
    return NextResponse.json({ message: "Delete Succefull" }, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    } else {
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
};
