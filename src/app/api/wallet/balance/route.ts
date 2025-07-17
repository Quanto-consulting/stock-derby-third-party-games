import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const gameName = searchParams.get("gameName");

    return NextResponse.json({ balance: 50000, userId, gameName });
}