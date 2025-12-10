
import { NextResponse } from "next/server";
import db from "../../../../lib/db"; //importar o banco de dados

export async function POST(req: Request) {
    // Pegar os dados do front
    const dados = await req.json();
    const { email, password } = dados;

    //fazendo um query no banco de dados
    const BuscasArgumentos = db.prepare("SELECT * FROM users WHERE email = ?");
    const validacao = BuscasArgumentos.get(email);

    if (validacao) {
      return NextResponse.json(
        { message: "Usuário já cadastrado" },
        { status: 400 }
      );
    }

    //inserir dentro do banco de dados com os argumentos para serem preenchidos
    const inserirArgumentos = db.prepare("INSERT INTO users (email, password) VALUES (?, ?)");
    const info = inserirArgumentos.run(email, password);

    // Manda mensagem pro front
    return NextResponse.json(
      { 
        message: "Cadastro realizado com sucesso!",
        id: info.lastInsertRowid // O SQLite retorna o ID gerado automaticamente
      },
      { status: 201 }
    );

}