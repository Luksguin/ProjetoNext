'use client'

import CardButtons from '../CardButtons/cardButtons'
import style from './card.module.css'
import Music from '../Music/music'
import { TiposMusic } from '../Music/music'
import { useState } from 'react'

type TiposAlbum = {
    id: string
    name: string
    image: string
    author: string
    year: number | string
    musics: TiposMusic[]
}

export default function Card({ id, name, image, author, year, musics }: TiposAlbum) {
    const [editando, setEditando] = useState(false)

    return (
        <div className={style.card}>
            <div className={style.header}>
                <h2>{name}</h2>
                <img src={image} alt="" />
                <p>{author} • {year}</p>
            </div>

            <hr />

            <div className={style.list}>
                <div className={style.music}>
                    {musics.map((m) => (
                        <Music
                            key={m.id}
                            id={m.id}
                            idAlbum={id}
                            number={m.number}
                            name={m.name}
                            author={author}
                            link={m.link}
                            duration={m.duration}
                        />
                    ))}
                </div>
            </div>

            <hr />

            <div className={`${editando ? style.formsEditing : style.buttonsDefault}`}> {/* Altera o tamanho da div; */}
                {/* Passa o id do álbum para conseguir trabalhar com ele e recebe o estado de edição atual através da função estadoAtual; */}
                <CardButtons id={id} estadoAtual={(estado) => setEditando(estado)} />
            </div>
        </div>
    )
}