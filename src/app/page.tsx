import Link from "next/link";
export default function Home() {
  return (
    <div>
         <Link href={"/login"}>Clique aqui para ir para a janela de login</Link>
    </div>
  );
}
