import { rmMusica } from '../../utils/serverActions'
import Image from 'next/image'
import play from '../../images/play.png'
import remove from '../../images/remove.png'
import style from './music.module.css'

export type TiposMusic = {
    id: string
    idAlbum: string
    number: number
    name: string
    author?: string
    link: string
    duration: number
}

type TypeRemove = {
    idAlbum: string;
    idMusica: string;
}

export default function Music({ id, idAlbum, number, name, link, author, duration }: TiposMusic) {
    return (
        <div className={style.music}>
            <h3>{number}</h3>
            <a href={link} target='_blank'><Image src={play} alt='Play'></Image></a>

            <div>
                <h4>{name}</h4>
                <p>{author}</p>
            </div>

            <p className={style.time}>{Math.round(duration / 60)}:{Math.round(duration % 60).toString().padStart(2, '0')}</p>
            <RemoveMusicaButton idAlbum={idAlbum} idMusica={id}></RemoveMusicaButton>
        </div>
    )
}

function RemoveMusicaButton({idAlbum, idMusica} : TypeRemove) {
    return (
        <div>
            <button onClick={rmMusica.bind(null, idAlbum, idMusica)}><Image src={remove} alt='Remover'></Image></button>
        </div>
    )
}
