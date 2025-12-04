'use client'

import { useState } from 'react'
import { editItem } from '../../../utils/serverActions'
import { rmItem } from '../../../utils/serverActions'
import Image from 'next/image'
import edit from '../../../../images/edit.png'
import cancel from '../../../images/cancel.png'
import remove from '../../../../images/remove.png'
import ok from '../../../../images/ok.png'
import style from './cardButtons.module.css'

export default function EditButton({ id }: { id: string }) {
    const [editando, setEditando] = useState(false)

    async function editar(form: FormData) {
        await editItem(id, form)
        setEditando(false)
    }

    return (
        <div className={style.edit}>
            <button onClick={() => setEditando(!editando)}>{editando ? <></> : <Image src={edit} alt='Editar'></Image>}</button>

            {!editando && (
                <button onClick={rmItem.bind(null, id)}><Image src={remove} alt='Remover'></Image></button>
            )}

            {editando && (
                <form action={editar}>
                    <h2>Editando</h2>

                    <hr />

                    <div className={style.inputs}>
                        <input type="text" name='name' placeholder="Alterar Nome" />
                        <input type="text" name='image' placeholder="Alterar Imagem" />
                        <input type="text" name='author' placeholder="Alterar Autor" />
                        <input type="text" name='year' placeholder="Alterar Ano" />
                    </div>

                    <button type='submit'><Image src={ok} alt='Salvar'></Image></button>
                </form>
            )
            }
        </div>
    )
}
