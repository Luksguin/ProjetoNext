import { addAlbum } from '../utils/serverActions'
import { buscarAlbum } from '../utils/spotify'
import dados from '../db/albuns.json'
import Card from './Card/card'
import type { Metadata } from "next";
import style from './page.module.css'
import Image from 'next/image';
import add from '../images/plus.png'
import lupa from '../images/lupa.png'
import { isSessionValid } from "../../auth"; // Ajuste o caminho se necessário (ex: "@/app/auth")
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Library",
};

export default async function page() {
    const isLogged = await isSessionValid();

    if (!isLogged) {
    redirect("/login");
  }
    return (
        <div className={style.page}>
            <main>
                <div className={style.forms}>
                    <form action={addAlbum}>
                        <h2>Adicionar meu álbum</h2>

                        <hr />

                        <div className={style.inputs}>
                            <input type="text" name="name" placeholder='Nome' required />
                            <input type="text" name='image' placeholder='Imagem' required />
                            <input type="text" name='author' placeholder='Autor' required />
                            <input type="number" name='year' placeholder='   Ano de Lançamento' required />
                        </div>

                        <button type='submit'><Image src={add} alt='Criar'></Image></button>
                    </form>

                    <hr />

                    <form action={buscarAlbum}>
                        <h2>Buscar no <span className={style.spotify}>Spotify</span></h2>

                        <hr />

                        <div className={style.inputs}>
                            <input type="text" name="name" placeholder='Nome do Álbum' required />
                            <input type="text" name='author' placeholder='Autor' required />
                        </div>
                        
                        <button type='submit'><Image src={lupa} alt='Buscar'></Image></button>
                    </form>
                </div>

                <hr />

                <div className={style.cards}>
                    {dados.map((dado) => (
                        <Card
                            key={dado.id}
                            id={dado.id}
                            name={dado.name}
                            image={dado.image}
                            author={dado.author}
                            year={dado.year}
                            musics={dado.musics}
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}