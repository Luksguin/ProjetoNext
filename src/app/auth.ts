"use server";

import * as jose from "jose";
import { cookies } from "next/headers";

//abrir sessão de cookie
export async function openSessionToken(token: string) {
  const senha = new TextEncoder().encode(process.env.TOKEN);
  const { payload } = await jose.jwtVerify(token, senha);
  return payload;
}

//funcao para criar a sessão e salvar nos cookie
export async function createSessionToken(payload = {}) {
  const senha = new TextEncoder().encode(process.env.TOKEN);

  const sessao = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(senha);

  const { exp } = await openSessionToken(sessao);

  const cookieStore = await cookies();

  cookieStore.set("session", sessao, {
    expires: (exp as number) * 1000,
    path: "/",
    httpOnly: true,
  });
}

//validar se a sessão existe
export async function isSessionValid() {
  const sessaoCookie = (await cookies()).get("session");

  if (sessaoCookie) {
    const { value } = sessaoCookie;
    const { exp } = await openSessionToken(value);
    const data = new Date().getTime();
    return (exp as number) * 1000 > data;
  }

  return false;
}

//funcao de deletar a sessão
export async function SessionOff() {
    const sessaoCookie = (await cookies())
    sessaoCookie.delete("session")
}
