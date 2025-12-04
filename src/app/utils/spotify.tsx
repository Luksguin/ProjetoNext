'use server'

import albuns from "../db/albuns.json"
import { promises as fs } from 'fs';
import path from 'path';

const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

async function getToken() {
    const basic = Buffer.from(`${clientID}:${clientSecret}`).toString('base64'); // Tokens deve ser tratados como strings de base 64;

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
        })
    });

    const data = await response.json();
    return data.access_token;
}

export async function buscarAlbum(form: FormData) {
    const token = await getToken();

    const nomeAlbum = form.get('name')?.toString()
    const autor = form.get('author')?.toString()
    
    // encodeURIComponent garante que espaços e acentos não quebrem a URL;
    // limit=1 garante que só venha o primeiro resultado;
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(`${nomeAlbum} ${autor}`)}&type=album&limit=1`;

    const resposta = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    const data = await resposta.json();
    const album = data.albums.items[0]

    const arq = JSON.parse(await fs.readFile(path.join(process.cwd(), 'src/app/db', 'albuns.json'), { encoding: 'utf-8', flag: 'r' }))

    const novo = {
        id: album.id,
        name: album.name,
        image: album.images[0].url,
        author: album.artists[0].name,
        year: album.release_date.split('-')[0],
        musics: await getMusicas(album.id)
    }

    arq.push(novo)
    await fs.writeFile(path.join(process.cwd(), 'src/app/db', 'albuns.json'), JSON.stringify(arq, null, 2))
}

export async function getMusicas(albumId: string) {
    const token = await getToken();

    const resposta = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks?limit=50`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await resposta.json();
    const musicasData = data.items
    const musicas = []

    for(let m of musicasData){
        const nova = {
            id: m.id,
            number: m.track_number,
            name: m.name,
            link: m.external_urls.spotify,
            duration: Math.round(m.duration_ms / 1000)
        }

        musicas.push(nova)
    }
    
    return musicas || [];
}
