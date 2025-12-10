# PROJETO SPOTGUINHO

## Feito pelos membros Gustavo Senador e Lucas Albuquerque

Primeiro temos que instalar as depedências do projeto

```bash
npm i 
#ou pode ser npm install
```

Logo ápos temos que criar um arquivo .env: <br>
TOKEN="AlgumValorDefinidoPeloUsuario"
SPOTIFY_CLIENT_ID=db9321717f024b27828ff12fc7081def
SPOTIFY_CLIENT_SECRET=c8ce8ed0e6ed46fd83baece41d4c9297


Em seguida, vamos rodar o projeto
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Para a realização do projeto foi utilizado NEXTjs, tanto no Frontend (baseado em React ) quando no Backend, na qual apresenta as seguintes funcionalidades:
1- Create/Login de usuário para validação da entrada (via JWT), criptografia de token, hospedagem em cookie, armazenamento de cadastro e validações de formulários
2- Rota Privada, na qual precisa-se de email e senha validas(ou token válido) para o acesso da mesma
3- CRUD de álbuns e música
4- Integração com API do Spotify, a fim de listar as musicas hospedadas no site, utilizando-se de métodos POST/GET para a realização de tal tarefa


Para a execução do trabalho foi utilizados das tecnolgia:

* JWT
* NextResponse
* NextRequest
* Yup
* Better-Sqlite3

## Imagens da aplicação

Tela de apresentação:
![ImagemAplicacao](src/images/1.png)

Tela de login:
![ImagemLogin](src/images/2.png)

Tela de Create:
![ImagemCreate](src/images/3.png)

Tela de Inclusão de Álbuns proprietários e com API do Spotify:
![ImagemAlbuns](src/images/4.png)

Tela de listagem de Álbuns:
![ImagemListagem](src/images/5.png)

Tela de Adicionar Músicas ao Álbum específico:
![ImagemAddMusic](src/images/6.png)

Tela de Edição das especificações do Álbum:
![ImagemEditAlbum](src/images/7.png)

