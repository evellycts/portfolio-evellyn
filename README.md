# Portfólio — Evellyn Santos

Site estático (HTML + CSS + JavaScript puro). Não precisa instalar nada nem rodar build:
abra o `index.html` com dois cliques para ver no navegador.

## Estrutura

```
portfolio-evellyn/
├── index.html            ← estrutura das seções
├── css/style.css         ← cores, fontes, layout e animações
├── js/projetos.js        ← ✏️ TODOS os conteúdos: projetos, contatos, showreel, galeria
├── js/main.js            ← interações (3D do hero, filtros, modal, rolagens)
├── assets/
│   ├── evellyn.webp      ← sua foto (Sobre mim)
│   ├── brand/            ← logotipo e monograma vetorizados (SVG), favicon e og.jpg
│   ├── showreel/         ← showreel (provisório) e capa
│   └── projetos/<nome>/  ← uma pasta por trabalho: vídeo, prévia, capa e fotos (web)
├── originais/            ← arquivos originais separados por trabalho (NÃO vão para o site)
├── netlify.toml
└── .gitignore
```

### Os 12 trabalhos

| Pasta | Nicho | Conteúdo |
|---|---|---|
| moda-praia-lookbook | Moda · Acessórios | 1 reel (0:37) |
| moda-vestidos-estampados | Moda · Acessórios | 1 reel (0:20) |
| moda-loja-site-oficial | Moda | 1 reel (0:59) |
| moda-editorial-cetim | Moda | 2 fotos |
| confeitaria-doceria | Confeitaria | 5 fotos |
| confeitaria-bolo-de-milho | Confeitaria | 1 reel (0:20) + 1 foto |
| infantil-evento-8-ou-80 | Infantil | 1 reel (0:28) |
| infantil-depoimentos | Infantil | 1 reel (0:59) |
| infantil-reposicao | Infantil | 1 reel (1:37) |
| ensaio-casal-praia | Ensaios & Eventos | 2 vídeos + 6 fotos |
| ensaio-por-do-sol | Ensaios & Eventos | 1 vídeo horizontal (0:38) |
| evento-cha-da-noiva | Ensaios & Eventos | 2 vídeos + 10 fotos |

## Como editar

Tudo fica em **`js/projetos.js`**:

- **Nome da marca, cliente/autoral e seu papel** — procure por `CONFIRMAR`.
  `natureza: 'cliente'` ou `'autoral'` mostra o selo; `papel: ['Roteiro', 'Captação', 'Edição']`
  mostra o bloco "Meu papel" (vazio = escondido).
- **Contatos** — lista `contato` (rótulo + link). Para o currículo, salve o PDF em
  `assets/curriculo-evellyn-santos.pdf` e preencha o `url` do item "Baixar currículo".
- **Sua foto** — substitua `assets/evellyn.webp` mantendo o mesmo nome.
- **Showreel final** — substitua `assets/showreel/showreel-provisorio.mp4` (ou mude `src`)
  e troque `provisorio: true` por `false`.
- **Novo projeto** — crie `assets/projetos/<nome>/` e copie um bloco existente em `projetos`.
  Dica: vídeo MP4 H.264 com o arquivo original (sem recomprimir), prévia de 4 s em 480px,
  capa WebP 720px e fotos WebP em tamanho original.

### Peso do site
A página inicial carrega só capas, fotos leves e 3 prévias curtas (~2 MB).
Os vídeos completos (originais, sem perda de qualidade) só baixam quando alguém clica para assistir.

Link direto para um projeto (bom para mandar a recrutadores):
`https://SEU-SITE.netlify.app/#projeto=moda-praia-lookbook`

## Publicar (GitHub + Netlify)

1. Crie um repositório no GitHub (ex.: `portfolio-evellyn`) e envie esta pasta
   (a pasta `originais/` fica de fora automaticamente pelo `.gitignore`).
2. No Netlify: **Add new site → Import an existing project → GitHub** → escolha o repositório.
3. Build command: *(vazio)* · Publish directory: `.` → **Deploy**.
4. Cada novo `git push` atualiza o site sozinho.

Alternativa sem GitHub: arraste a pasta (sem `originais/`) em <https://app.netlify.com/drop>.
