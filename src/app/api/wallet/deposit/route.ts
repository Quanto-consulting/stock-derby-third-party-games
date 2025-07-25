import { updateBalance } from "@/lib/redisOperation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // You can process the request body here if needed
  const { userId, amount } = await req.json();
  console.log("userId is: ", userId);
  console.log("amount is: ", amount);
  if (!userId || !amount) {
    return NextResponse.json(
      { error: "userId and amount are required" },
      { status: 400 }
    );
  }
  const newBalance = await updateBalance(userId, amount);
  return NextResponse.json({ success: true, newBalance }, { status: 200 });
}
