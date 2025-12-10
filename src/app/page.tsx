import Link from "next/link";
import style from './page.module.css'

export default function Home() {
  return (
    <div className={style.main}>
         <Link href={"/login"}>Começar experiência musical!</Link>
    </div>
  );
}
