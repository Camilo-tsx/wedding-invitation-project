"user server"
import { decodedToken } from "@/lib/authenticateToken";
import { getEventById } from "@/models/events";
import { NextRequest, NextResponse } from "next/server";

interface Params {
   params: Record<string, string>
}

export const GET = async (req: NextRequest, {params}: Params) => {
    const payload = await decodedToken(req)
    if (!payload) return NextResponse.json({message: "Can not get the payload"}, {status: 400})
    const userId = payload.id
    const id = params.id
    try {
        const event = await getEventById(id, userId)
         if (!event) return NextResponse.json({message: "Event not found"}, {status: 404})
        return NextResponse.json(event, {status: 201, headers: {"Content-Type": "application/json"}})
    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({message: err.message})
        } else {
            return NextResponse.json({message: "Internal Server Error"}, {status: 500})
        }
    }
}