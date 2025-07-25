import api from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";
import { initializeRedis } from "@/lib/initRedis"; // Add this import

export async function POST(req: NextRequest) {
  // Initialize Redis data on first API call
  await initializeRedis();

  const body = await req.json();
  const { gameName } = body;

  console.log("gameName is: ", gameName);
  const userId = "1";
  const name = "testing connection";

  // Prepare payload as required by backend
  const payload = {
    gameName,
    name,
    userId,
  };

  // Send API key in header from env
  const response = await api.post("/api/external-user/", payload, {
    headers: {
      "api-key": process.env.API_KEY,
    },
  });

  const data = response.data;

  console.log("data is: ", data);
  return NextResponse.json(data);
}
