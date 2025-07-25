import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    // You can process the request body here if needed
    console.log(req.body,"=======================================================>");
    return NextResponse.json({ success: true }, { status: 200 });
}
