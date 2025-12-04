import CardButtons from './CardButtons/cardButtons'
import style from './card.module.css'
import Music from '../Music/music'
import { TiposMusic } from '../Music/music'

type TiposCard = {
    id: string
    name: string
    image: string
    author: string
    year: number | string
    musics: TiposMusic[]
}

export default function Card({ id, name, image, author, year, musics }: TiposCard) {
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

            <div className={style.buttons}>
                <CardButtons id={id} />
            </div>
        </div>
    )
}
