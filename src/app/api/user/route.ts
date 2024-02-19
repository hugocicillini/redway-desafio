import { NextResponse } from "next/server";
import { z } from "zod";

import db from "@/lib/db";

const userSchema = z
  .object({
    username: z.string().min(1, 'Nome inválido!').max(30),
    email: z.string().min(1, 'Email inválido!').email('Email inválido!')
  })

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email } = userSchema.parse(body)

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email }
    })

    if (existingUserByEmail) {
      return NextResponse.json({ user: null, message: "Email já existe!" }, { status: 409 });
    }

    const newUser = await db.user.create({
      data: { username, email }
    })

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Algo deu errado!" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const queryParams = new URL(request.url).searchParams;
    const userEmail = queryParams.get('email');

    if (!userEmail) {
      return NextResponse.json({ message: "O parâmetro de email está faltando!" }, { status: 400 });
    }

    const existingUserByEmail = await db.user.findUnique({
      where: { email: userEmail }
    });

    if (!existingUserByEmail) {
      return NextResponse.json({ user: null, message: "Usuário não encontrado!" }, { status: 404 });
    }

    return NextResponse.json({ user: existingUserByEmail }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Algo deu errado!" }, { status: 500 });
  }
}
