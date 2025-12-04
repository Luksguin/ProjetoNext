import style from './index.module.css'

export default function index() {
  return (
    <div className={style.footer}>
      <h2>GitHubs:</h2>
      <ul>
        <li><a target='_blank' href="https://github.com/astrogusss">Gustavo Senador</a></li>
        <li><a target='_blank' href="https://github.com/Luksguin">Lucas Albuquerque</a></li>
      </ul>

      <p>Obrigado!</p>

      <button>SAIR</button>
    </div>
  )
}
