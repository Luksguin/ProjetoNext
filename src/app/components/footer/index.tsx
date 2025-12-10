"use client";

import style from './index.module.css'
import Image from 'next/image'
import logout from '../../../images/logout.png'
import { SessionOff } from '@/app/auth'
import { useRouter } from 'next/navigation'

export default function HandleLogout() {
  const router = useRouter();
  const fazerLogout = async () => {
    await SessionOff();
    router.push("/login")
  }

  return (
    <div className={style.footer}>
      <p>Obrigado!</p>

      <div className={style.bottom}>
        <div>
          <h2>GitHubs:</h2>
          <ul>
            <li><a target='_blank' href="https://github.com/astrogusss">Gustavo Senador</a></li>
            <li><a target='_blank' href="https://github.com/Luksguin">Lucas Albuquerque</a></li>
          </ul>
        </div>

        <button onClick={fazerLogout} className='hover:cursor-pointer'><Image src={logout} alt='Sair' /></button>
      </div>


    </div>
  )
}
