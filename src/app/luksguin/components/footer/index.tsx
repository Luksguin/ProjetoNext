import style from './index.module.css'
import Image from 'next/image'
import logout from '../../../../images/logout.png'
import Link from 'next/link'

export default function index() {
  return (
    <div className={style.footer}>
      <h2>GitHubs:</h2>
      <ul>
        <li><a target='_blank' href="https://github.com/astrogusss">Gustavo Senador</a></li>
        <li><a target='_blank' href="https://github.com/Luksguin">Lucas Albuquerque</a></li>
      </ul>

      <p>Obrigado!</p>

      <Link href={"/login"}><button><Image src={logout} alt='Sair'/></button></Link>
    </div>
  )
}
