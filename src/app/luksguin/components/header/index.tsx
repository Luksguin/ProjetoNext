import style from "./index.module.css"
import spotify from '../../../../images/spotify.png'
import Image from "next/image"

export default function index() {
    return (
        <div className={style.header}>
            <h1>Spotify®</h1>
            <Image src={spotify} alt="Spotify"></Image>
        </div>
    )
}
