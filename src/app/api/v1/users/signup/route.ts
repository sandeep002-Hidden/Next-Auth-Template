import connect from "@/db/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";
connect();
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return NextResponse.json({ message: "Email Already Exists" });
    }
    const userName = await User.findOne({ username });
    if (userName) {
      return NextResponse.json({
        message: "UserName already exists Already Exists",
      });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const userQ = await newUser.save();
    await sendEmail({ email, emailType: "VERIFY", userId: userQ._id });
    return NextResponse.json({ message: "user Registered Success fully" });
  } catch (error: any) {
    console.log("Error in Signup post");
    return NextResponse.json({ message: "Error" ,success:false});
  }
}
