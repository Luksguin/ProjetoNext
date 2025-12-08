import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
    //qual a rota que o individuo esta querendo acessar
    const path = request.nextUrl.pathname;

  //rotas publicas
  const publicRoutes = [
    "/login",
    "/create",
    "/",
  ];

  //ver se a rota que estamos querendo acessar é publica
  const isPublic = publicRoutes.includes(path.toLowerCase());

  // ver o cookie da sessão
  const sessionCookie = request.cookies.get("session")?.value;

  // analiar token
  let sessionIsValid = false;
  if (sessionCookie) {
    try {
      // Pega a chave secreta do arquivo .env
      const secret = new TextEncoder().encode(process.env.TOKEN);
      await jose.jwtVerify(sessionCookie, secret);
      sessionIsValid = true;
    } catch (error) {
      // Token inválido ou expirado
      sessionIsValid = false;
    }
  }

 

  //caso nao esteja logado e queira pegar um rota privada
  if (!isPublic && !sessionIsValid) {
    //te manda para a tela de login
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  //se ele ja estiver logado e quiser ir para login ou create vamos barrar para nao fazer outro login
  if (
    sessionIsValid &&
    (path.toLowerCase() === "/login" || path.toLowerCase() === "/create")
  ) {
    // te manda para a pagina que vc tem acesso
    return NextResponse.redirect(new URL("/guinho", request.url));
  }

  // se passou em tudo, pode continuar
  return NextResponse.next();
}

// Configuração para o middleware ignorar arquivos internos do Next.js, imagens, etc.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
