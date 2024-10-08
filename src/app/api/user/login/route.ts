import { NextRequest, NextResponse } from "next/server";
import { DB } from "@lib/DB";
import jwt from "jsonwebtoken";
//POST /api/user/login
export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { username, password } = body;

  //username validation(optional, skip validation)

  //check if username is valid
  const user = DB.users.find((u)=>u.username === username&&u.password === password);
  if(!user) {  return NextResponse.json(
    {
      ok: false,
      message: "Username or password is incorrect",
    },
    { status: 400 }
  );
}

  const secret = process.env.JWT_SECRET || "This is another secret";
  //generate token
  const token = jwt.sign(
    {username: username, role: user.role, studentId: user.studentId}, //payload
    secret,
    {expiresIn: "8h"}); //อยากให้อยู่กี่ชม.

  return NextResponse.json({ ok: true,token : token });
};
