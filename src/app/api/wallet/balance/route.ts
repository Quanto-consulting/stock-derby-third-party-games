import { getBalance } from "@/lib/redisOperation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const gameName = searchParams.get("gameName");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const balance = await getBalance(userId);

  return NextResponse.json({ balance, userId, gameName });
}
