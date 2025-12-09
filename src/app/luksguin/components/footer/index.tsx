import style from './index.module.css'
import Image from 'next/image'
import logout from '../../images/logout.png'

export default function index() {
  return (
    <div className={style.footer}>
      <h2>GitHubs:</h2>
      <ul>
        <li><a target='_blank' href="https://github.com/astrogusss">Gustavo Senador</a></li>
        <li><a target='_blank' href="https://github.com/Luksguin">Lucas Albuquerque</a></li>
      </ul>

      <p>Obrigado!</p>

      <button><Image src={logout} alt='Sair'/></button>
    </div>
  )
}
