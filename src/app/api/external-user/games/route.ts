import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return NextResponse.json({ message: "Missing API_KEY" }, { status: 500 });
    }

    const res = await fetch("https://api.stockderby.org/api/external-user/games", {
      method: "GET",
      headers: {
        "api-key": apiKey,
        Accept: "application/json",
      },
      // 10s timeout via AbortController if needed in the future
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { message: "Upstream error", status: res.status, body: text },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}


