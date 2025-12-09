'use server'

import albuns from "../db/albuns.json"
import { promises as fs } from 'fs';
import path from 'path';

export async function addAlbum(form: FormData) {
    const arq = JSON.parse(await fs.readFile(path.join(process.cwd(), 'src/app/luksguin/db', 'albuns.json'), { encoding: 'utf-8', flag: 'r' }))

    const novo = {
        id: Date.now().toString(),
        name: form.get('name'),
        image: form.get('image'),
        author: form.get('author'),
        year: form.get('year'),
        musics: []
    }

    arq.push(novo)

    await fs.writeFile(path.join(process.cwd(), 'src/app/luksguin/db', 'albuns.json'), JSON.stringify(arq, null, 2))
}

export async function editAlbum(id: string, form: FormData) {
    const novo = albuns.map((dado: any) => {
        if (dado.id === id) {
            return {
                id: id,
                name: form.get('name') || dado.name,
                image: form.get('image') || dado.image,
                author: form.get('author') || dado.author,
                year: form.get('year') || dado.year,
                musics: dado.musics
            }
        }
        return dado
    })

    await fs.writeFile(path.join(process.cwd(), 'src/app/luksguin/db', 'albuns.json'), JSON.stringify(novo, null, 2))
}

export async function rmAlbum(id: string) {
    const arq = JSON.parse(await fs.readFile(path.join(process.cwd(), 'src/app/luksguin/db', 'albuns.json'), { encoding: 'utf-8', flag: 'r' }))

    const nova = arq.filter((item: any) => item.id !== id)

    await fs.writeFile(path.join(process.cwd(), 'src/app/luksguin/db', 'albuns.json'), JSON.stringify(nova, null, 2))
}

export async function addMusica(idAlbum: string, form: FormData) {
    const arq = JSON.parse(await fs.readFile(path.join(process.cwd(), 'src/app/luksguin/db', 'albuns.json'), { encoding: 'utf-8', flag: 'r' }))

    const album = arq[arq.findIndex((i: any) => i.id === idAlbum)]

    const nova = {
        id: Date.now().toString(),
        number: album.musics.length + 1,
        name: form.get('name'),
        link: form.get('link'),
        duration: form.get('duration')
    }
    console.log(nova)

    album.musics.push(nova)

    await fs.writeFile(path.join(process.cwd(), 'src/app/luksguin/db', 'albuns.json'), JSON.stringify(arq, null, 2))
}

export async function rmMusica(idAlbum: string, idMusica: string) {
    const arq = JSON.parse(await fs.readFile(path.join(process.cwd(), 'src/app/luksguin/db', 'albuns.json'), { encoding: 'utf-8', flag: 'r' }))

    const album = arq[arq.findIndex((i: any) => i.id === idAlbum)]
    const filtro = album.musics.filter((m: any) => m.id !== idMusica)
    album.musics = filtro

    for(let i in album.musics) album.musics[i].number = parseInt(i) + 1

    await fs.writeFile(path.join(process.cwd(), 'src/app/luksguin/db', 'albuns.json'), JSON.stringify(arq, null, 2))
}