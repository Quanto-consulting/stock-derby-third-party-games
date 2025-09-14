import { NextRequest, NextResponse } from "next/server";

// JWT token provided by user
const JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6InVzZXIiLCJjb21wYW55SWQiOjQsImlhdCI6MTc1NzUwMzQwMCwiZXhwIjoxNzYwMDk1NDAwfQ.qSvl0dfuVHiBBqpVjYio7IdFkqIsNkn_Zge8zPSniJA";

// Decode JWT token to get user information
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
    const companyId = searchParams.get("companyId");
    const page = searchParams.get("page") || "1";
    const search = searchParams.get("search") || "";
    const limit = searchParams.get("limit") || "1000";

    console.log("Schedule API called with:", { companyId, page, search, limit });

    // Check for authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Missing token" },
        { status: 401 }
      );
    }

    // Verify the token
    const token = authHeader.replace("Bearer ", "");
    const decoded = decodeJWT(token);
    
    if (!decoded) {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }

    // Mock schedule data
    const scheduleData = {
      success: true,
      data: {
        schedules: [
          {
            id: 1,
            companyId: parseInt(companyId || "4"),
            gameName: "derby",
            startTime: "09:00",
            endTime: "17:00",
            status: "active",
            description: "Stock Derby Game Schedule"
          },
          {
            id: 2,
            companyId: parseInt(companyId || "4"),
            gameName: "seven_up_down",
            startTime: "10:00",
            endTime: "18:00",
            status: "active",
            description: "7 Up Down Game Schedule"
          }
        ],
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: 2,
          totalPages: 1
        },
        search: search,
        companyId: parseInt(companyId || "4")
      },
      message: "Schedule retrieved successfully"
    };

    return NextResponse.json(scheduleData);
  } catch (error) {
    console.error("Error in schedule API:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
