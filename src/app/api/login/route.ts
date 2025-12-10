import { NextResponse } from "next/server";
import db from "../../../../lib/db";
import { createSessionToken } from "../../auth"; 

export async function POST(request) {
    const { email, password } = await request.json();

    const busca = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?");
    const usuarioEncontrado = busca.get(email, password);

    if (usuarioEncontrado) {
      await createSessionToken({ 
        sub: usuarioEncontrado.id.toString(), 
        email: usuarioEncontrado.email 
      });

      return NextResponse.json({ message: "Login sucesso" }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Credenciais inválidas" },
        { status: 401 }
      );
    }
}