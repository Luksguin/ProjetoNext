'use server'

import albuns from "../db/albuns.json"
import { promises as fs } from 'fs';
import path from 'path';

export async function addItem(form: FormData) {
    const arq = JSON.parse(await fs.readFile(path.join(process.cwd(), 'src/app/db', 'albuns.json'), { encoding: 'utf-8', flag: 'r' }))

    const novo = {
        id: Date.now(),
        name: form.get('name'),
        image: form.get('image'),
        author: form.get('author'),
        year: form.get('year')
    }

    arq.push(novo)

    await fs.writeFile(path.join(process.cwd(), 'src/app/db', 'albuns.json'), JSON.stringify(arq, null, 2))
}

export async function editItem(id: string, form: FormData) {
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

    await fs.writeFile(path.join(process.cwd(), 'src/app/db', 'albuns.json'), JSON.stringify(novo, null, 2))
}

export async function rmItem(id: string) {
    const arq = JSON.parse(await fs.readFile(path.join(process.cwd(), 'src/app/db', 'albuns.json'), { encoding: 'utf-8', flag: 'r' }))

    const nova = arq.filter((item: any) => item.id !== id)

    await fs.writeFile(path.join(process.cwd(), 'src/app/db', 'albuns.json'), JSON.stringify(nova, null, 2))
}