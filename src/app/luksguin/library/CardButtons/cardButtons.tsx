'use client'

import { useState } from 'react'
import { editAlbum } from '../../utils/serverActions'
import { rmAlbum } from '../../utils/serverActions'
import Image from 'next/image'
import edit from '../../images/edit.png'
import remove from '../../images/remove.png'
import ok from '../../images/ok.png'
import add from '../../images/plus.png'
import style from './cardButtons.module.css'

type TypeButtons = {
    id: string;
    estadoAtual: (estado: boolean) => void; // Declara a função que vai mandar o estado pro Card;
}

type TypeEdit = {
    id: string;
    estaEditando: boolean; // Armazena se esta em estado de edição ou não;
    inversor: () => void; // Inverte o estado de edição;
}

type TypeRemove = {
    id: string;
}

export default function CardButtons({ id, estadoAtual }: TypeButtons) {
    const [editando, setEditando] = useState(false)

    {/* Quando clicar no botão de edição vai atualizar os estados; */}
    function gerenciarEdicao(estado: boolean) {
        setEditando(estado); // Usado para apagar os botões e ligar o form;
        estadoAtual(estado); // Manda o estado novo pro Card;
    }

    return (
        <div>
            {!editando && (
                <AddMusicButton />
            )}

            <EditAlbumButton id={id} estaEditando={editando} inversor={() => gerenciarEdicao(!editando)} />

            {!editando && (
                <RemoveAlbumButton id={id} />
            )}
        </div >
    )
}

function AddMusicButton() {
    return (
        <div>
            <button><Image src={add} alt='Adicionar' /></button>
        </div>
    )
}

// Recebe o id do álbum a ser editado, o estado de edição atual e a função que inverte tal estado;
function EditAlbumButton({ id, estaEditando, inversor }: TypeEdit) {
    // Chamada quando terminar a edição. Inverte o estado de edição e chama a função que edita o JSON de fato;
    async function concluir(form: FormData) {
        await editAlbum(id, form)
        inversor()
    }

    return (
        <div className={style.edit}>
            {estaEditando ? (
                <form action={concluir}>
                    <h2>Editando</h2>

                    <hr />

                    <div className={style.inputs}>
                        <input type="text" name='name' placeholder="Alterar Nome" />
                        <input type="text" name='image' placeholder="Alterar Imagem" />
                        <input type="text" name='author' placeholder="Alterar Autor" />
                        <input type="text" name='year' placeholder="Alterar Ano" />
                    </div>

                    <button type='submit'><Image src={ok} alt='Salvar' /></button>
                </form>

            ) : (
                <button onClick={inversor}><Image src={edit} alt='Editar' /></button>
            )}
        </div>
    )
}

function RemoveAlbumButton({ id }: TypeRemove) {
    return (
        <div>
            <button onClick={rmAlbum.bind(null, id)}><Image src={remove} alt='Remover'></Image></button>
        </div>
    )
}