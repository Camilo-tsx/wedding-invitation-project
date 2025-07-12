import { partialGuestSchema, updateGuest } from "@/models/guest";
import { NextRequest, NextResponse } from "next/server";
import { safeParse } from "valibot";

interface Params {
    params: Record<string, string>
}

export const PATCH = async (req: NextRequest, {params}: Params) => {
    const eventId = params.id
    const body = await req.json();
    const result = safeParse(partialGuestSchema, body)
    if (!result.success) {
        return NextResponse.json({message: "Bad Request", error: result.issues}, {status: 400})
    }

    try {
        const guest = result.output
        const updatedGuest = await updateGuest(guest, eventId)
        if (!updatedGuest) return NextResponse.json({message: "Guest not found"}, {status: 404})
        return NextResponse.json(updatedGuest, {status: 200, headers: {"Content-Type": "application/json"}})
    } catch (err) {
        if (err instanceof Error) {
            console.error("Error: ", err.message)
            return NextResponse.json({message: "An error has ocurred"}, {status: 500})
        } else {
            return NextResponse.json({message: "Internal Server Error"}, {status: 500})
        }
    }
}