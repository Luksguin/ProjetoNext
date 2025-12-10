"use client";
import Link from "next/link";
import style from "./page.module.css";
import { SessionOff } from "./auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const fazerLogout = async () => {
    await SessionOff();
    router.push("/login");
  };

  return (
    <div className={style.main}>
      <button onClick={fazerLogout}>
        <Link href={"/login"}>Começar experiência musical!</Link>
      </button>
    </div>
  );
}
