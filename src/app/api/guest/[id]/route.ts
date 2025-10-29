import { deleteGuest } from "@/core/services/guest/service";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    id: string;
  };
}
// Delete guest
export const DELETE = async (req: NextRequest, { params }: Params) => {
  const guestId = params.id;
  if (!guestId)
    return NextResponse.json(
      { message: "Can not delete your guest" },
      { status: 400 }
    );

  try {
    await deleteGuest(guestId);
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
