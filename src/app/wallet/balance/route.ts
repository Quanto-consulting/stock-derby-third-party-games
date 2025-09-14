import { NextRequest, NextResponse } from "next/server";
import { getBalance } from "@/lib/redisOperation";

// JWT token provided by user
const JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6InVzZXIiLCJjb21wYW55SWQiOjQsImlhdCI6MTc1NzUwMzQwMCwiZXhwIjoxNzYwMDk1NDAwfQ.qSvl0dfuVHiBBqpVjYio7IdFkqIsNkn_Zge8zPSniJA";

// Decode JWT token to get user ID
function decodeJWT(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const gameName = searchParams.get("gameName");

    console.log("Wallet balance API called with userId:", userId, "gameName:", gameName);

    // Get user ID from JWT token if not provided
    const decoded = decodeJWT(JWT_TOKEN);
    const actualUserId = userId || decoded?.id?.toString() || "3";

    // Get balance from Redis
    const balance = await getBalance(actualUserId);

    if (balance === null) {
      return NextResponse.json(
        { error: "User not found", balance: 0 },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      balance,
      userId: actualUserId,
      gameName,
      message: "Balance retrieved successfully"
    });
  } catch (error) {
    console.error("Error in wallet balance API:", error);
    return NextResponse.json(
      { error: "Internal server error", balance: 0 },
      { status: 500 }
    );
  }
}
