import { getDataFromToken } from "@/helper/dataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import connect from "@/db/dbConfig";

connect();

export async function GET(req: NextRequest) {
  try {
    const userId =await getDataFromToken(req);
    const user = await User.find({ _id: userId })
    return NextResponse.json({ message: "User Found", data: user[0] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
