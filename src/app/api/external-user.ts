import api from "@/lib/axios";
import { GameApiName } from "@/lib/enum";
import { NextRequest, NextResponse } from "next/server";

export const joinGame = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();
  const { gameName } = body;
  const { data } = await api.post("/game/join", {
    gameName: GameApiName.DICE,
    name: "testing connection",
    userId: "205",
  });
  console.log("data is: ", data);
  return NextResponse.json(data);
};
