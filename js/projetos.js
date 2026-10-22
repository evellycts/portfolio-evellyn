/* =====================================================================
   PORTFÓLIO EVELLYN SANTOS — DADOS CENTRAIS
   ---------------------------------------------------------------------
   Tudo o que aparece no site (projetos, contatos, fotos da galeria)
   sai deste arquivo. Para adicionar, editar ou remover um trabalho,
   mexa só aqui — o layout se monta sozinho.

   Campos de cada projeto:
     id          identificador único (igual ao nome da pasta em assets/projetos)
     titulo      nome do projeto
     categorias  lista: 'acessorios' | 'confeitaria' | 'moda' | 'infantil' | 'ensaios'
     natureza    'cliente' | 'autoral' | null (null = não exibe selo)
     cliente     nome da marca ou tipo de cliente
     producao    tipo de produção (ex.: "Reel de produto")
     resumo      frase curta do card
     sobre       contexto da marca
     objetivo    o que o conteúdo precisava comunicar
     papel       lista com o que VOCÊ fez (vazio = bloco escondido)
     processo    decisões de luz, enquadramento, ritmo, narrativa
     resultado   métricas reais ou o conteúdo final entregue
     capa        imagem de capa
     midias      lista de { tipo:'video'|'foto', src, capa?, preview?, formato:'vertical'|'horizontal', duracao? }

   ⚠️ Itens marcados com  CONFIRMAR  foram descritos a partir do que
   aparece nos vídeos. Revise: nome da marca, se foi trabalho para
   cliente ou autoral, e o seu papel em cada um.
   ===================================================================== */

window.PORTFOLIO = (function () {
  const P = (id, f) => `assets/projetos/${id}/${f}`;
  const video = (id, nome, formato, duracao) => ({
    tipo: 'video', formato, duracao,
    src: P(id, `${nome}.mp4`), capa: P(id, `${nome}-capa.jpg`), preview: P(id, `${nome}-preview.mp4`)
  });
  const fotos = (id, n) => Array.from({ length: n }, (_, i) => {
    const k = String(i + 1).padStart(2, '0');
    return { tipo: 'foto', src: P(id, `foto-${k}.webp`), mini: P(id, `foto-${k}-mini.webp`), formato: 'vertical' };
  });

  const projetos = [
    {
      id: 'moda-praia-lookbook',
      titulo: 'Lookbook de verão à beira-mar',
      categorias: ['moda', 'acessorios'],
      natureza: 'cliente',                       // CONFIRMAR
      cliente: 'Marca de moda praia',            // CONFIRMAR — nome da marca
      producao: 'Reel de lookbook',
      resumo: 'Estampa, conforto, leveza e estilo em um reel com luz natural e tecidos ao vento.',
      sobre: 'Marca de moda praia com peças estampadas, tecidos leves e bolsas artesanais.',
      objetivo: 'Apresentar a coleção através de quatro sensações — estampa, conforto, leveza e estilo — que conduzem o vídeo do início ao fim.',
      papel: [],                                 // CONFIRMAR — ex.: ['Roteiro', 'Captação', 'Edição']
      processo: 'Externa à beira-mar com luz natural. Planos de detalhe do tecido em movimento com o vento, closes nas bolsas e acessórios, tipografia serifada sobre a imagem e um ritmo leve que alterna planos abertos e fechados.',
      resultado: 'Reel vertical de 37 segundos.',
      capa: P('moda-praia-lookbook', 'lookbook-capa.jpg'),
      midias: [video('moda-praia-lookbook', 'lookbook', 'vertical', '0:37')]
    },
    {
      id: 'ensaio-casal-praia',
      titulo: 'Ensaio de casal à beira-mar',
      categorias: ['ensaios'],
      natureza: null,                            // CONFIRMAR
      cliente: 'Ensaio fotográfico',
      producao: 'Fotografia + vídeo',
      resumo: 'Céu nublado, figurino neutro e movimentos espontâneos em fotos e dois vídeos.',
      sobre: 'Ensaio de casal ao ar livre, entre o coqueiral e a areia.',
      objetivo: 'Registrar a cumplicidade do casal de forma natural, sem poses rígidas.',
      papel: [],                                 // CONFIRMAR
      processo: 'Luz suave de céu nublado, figurino em branco e bege para conversar com a paisagem e direção de movimentos espontâneos — giros, abraços e caminhadas na areia. Versão vertical para Reels e horizontal para tela cheia.',
      resultado: '6 fotografias, 1 vídeo vertical (0:27) e 1 vídeo horizontal (0:28).',
      capa: P('ensaio-casal-praia', 'vertical-capa.jpg'),
      midias: [
        video('ensaio-casal-praia', 'vertical', 'vertical', '0:27'),
        video('ensaio-casal-praia', 'horizontal', 'horizontal', '0:28'),
        ...fotos('ensaio-casal-praia', 6)
      ]
    },
    {
      id: 'confeitaria-doceria',
      titulo: 'Doceria — fotografia de produto',
      categorias: ['confeitaria'],
      natureza: null,                            // CONFIRMAR
      cliente: 'Doceria',                        // CONFIRMAR — nome da marca
      producao: 'Fotografia de produto',
      resumo: 'Bolos, cupcakes e sobremesas com luz de janela e fundo suave.',
      sobre: 'Doceria com bolos decorados, cupcakes, tortas e sobremesas no copo.',
      objetivo: 'Mostrar cada doce como protagonista, com textura e cor que despertam vontade.',
      papel: [],                                 // CONFIRMAR
      processo: 'Luz natural vinda da janela, fundo desfocado do próprio salão e composição em diagonal. Os tons da marca — rosa e dourado — se repetem nas flores, laços e pratos.',
      resultado: '5 fotografias de produto.',
      capa: P('confeitaria-doceria', 'foto-01-mini.webp'),
      midias: fotos('confeitaria-doceria', 5)
    },
    {
      id: 'moda-vestidos-estampados',
      titulo: 'Vestidos estampados em detalhe',
      categorias: ['moda', 'acessorios'],
      natureza: 'cliente',                       // CONFIRMAR
      cliente: 'Loja de moda feminina',          // CONFIRMAR
      producao: 'Reel de produto',
      resumo: 'Estampas, colares e acabamentos em close, no ritmo de uma vitrine.',
      sobre: 'Loja de moda feminina com vestidos estampados e acessórios.',
      objetivo: 'Valorizar estampa e caimento das peças e levar o público até o Instagram da loja.',
      papel: [],                                 // CONFIRMAR
      processo: 'Peças no manequim com colares compondo o look, closes de estampa e acabamento, transições pelo verde das folhagens e fechamento com chamada para o perfil.',
      resultado: 'Reel vertical de 20 segundos.',
      capa: P('moda-vestidos-estampados', 'vestidos-capa.jpg'),
      midias: [video('moda-vestidos-estampados', 'vestidos', 'vertical', '0:20')]
    },
    {
      id: 'evento-cha-da-noiva',
      titulo: 'Chá da noiva',
      categorias: ['ensaios'],
      natureza: null,                            // CONFIRMAR
      cliente: 'Cobertura de evento',
      producao: 'Vídeo + fotografia',
      resumo: 'Decoração em vermelho e rosa, detalhes da mesa e a alegria das convidadas.',
      sobre: 'Celebração de despedida de solteira com decoração temática em vermelho, rosa e branco.',
      objetivo: 'Guardar a atmosfera da festa — dos detalhes da decoração às reações espontâneas.',
      papel: [],                                 // CONFIRMAR
      processo: 'Primeiro os detalhes: doces, lembranças, painel e flores. Depois as pessoas: chegada da noiva, brincadeiras e abraços, com câmera próxima e cortes no ritmo da música.',
      resultado: '2 vídeos verticais (1:12 e 0:20) e 10 fotografias.',
      capa: P('evento-cha-da-noiva', 'celebracao-capa.jpg'),
      midias: [
        video('evento-cha-da-noiva', 'celebracao', 'vertical', '1:12'),
        video('evento-cha-da-noiva', 'decoracao', 'vertical', '0:20'),
        ...fotos('evento-cha-da-noiva', 10)
      ]
    },
    {
      id: 'infantil-depoimentos',
      titulo: 'Perguntamos às nossas clientes',
      categorias: ['infantil'],
      natureza: 'cliente',                       // CONFIRMAR
      cliente: 'Brechó infantil',                // CONFIRMAR — nome da loja
      producao: 'Reel de depoimentos',
      resumo: 'Mães respondem na loja — e as falas se completam em uma só frase.',
      sobre: 'Brechó infantil com roupas, brinquedos e acessórios para bebês e crianças.',
      objetivo: 'Mostrar, pela voz das clientes, por que elas escolhem a loja.',
      papel: [],                                 // CONFIRMAR
      processo: 'Entrevistas curtas gravadas na loja, legendas destacadas palavra a palavra e uma montagem em que a fala de várias clientes forma uma única frase.',
      resultado: 'Reel vertical de 59 segundos.',
      capa: P('infantil-depoimentos', 'depoimentos-capa.jpg'),
      midias: [video('infantil-depoimentos', 'depoimentos', 'vertical', '0:59')]
    },
    {
      id: 'confeitaria-bolo-de-milho',
      titulo: 'Bolo de milho — clima de São João',
      categorias: ['confeitaria'],
      natureza: null,                            // CONFIRMAR
      cliente: 'Confeitaria',                    // CONFIRMAR
      producao: 'Reel de produto + foto',
      resumo: 'Toalha xadrez, mãos partindo o bolo e a textura em primeiro plano.',
      sobre: 'Produção de bolos caseiros com temática junina.',
      objetivo: 'Fazer quem assiste sentir a textura e a umidade do bolo.',
      papel: [],                                 // CONFIRMAR
      processo: 'Mesa montada com toalha xadrez e elementos de São João. Closes das mãos partindo o bolo, câmera bem próxima e cortes curtos para manter o apetite em alta.',
      resultado: 'Reel vertical de 20 segundos e 1 fotografia.',
      capa: P('confeitaria-bolo-de-milho', 'bolo-de-milho-capa.jpg'),
      midias: [video('confeitaria-bolo-de-milho', 'bolo-de-milho', 'vertical', '0:20'), ...fotos('confeitaria-bolo-de-milho', 1)]
    },
    {
      id: 'moda-loja-site-oficial',
      titulo: 'Lançamento do site oficial',
      categorias: ['moda'],
      natureza: 'cliente',                       // CONFIRMAR
      cliente: 'Loja de moda feminina',          // CONFIRMAR
      producao: 'Reel de anúncio',
      resumo: 'A dona da loja conversa com o público e apresenta o novo site.',
      sobre: 'Loja de moda feminina que passou a vender também por um site próprio.',
      objetivo: 'Anunciar o site de forma próxima, respondendo a um pedido real das clientes.',
      papel: [],                                 // CONFIRMAR
      processo: 'Roteiro em tom de conversa, notificações de mensagens de clientes simuladas na tela, legendas dinâmicas e demonstração do site no fechamento.',
      resultado: 'Reel vertical de 59 segundos.',
      capa: P('moda-loja-site-oficial', 'site-oficial-capa.jpg'),
      midias: [video('moda-loja-site-oficial', 'site-oficial', 'vertical', '0:59')]
    },
    {
      id: 'infantil-evento-8-ou-80',
      titulo: 'Evento “8 ou 80”',
      categorias: ['infantil'],
      natureza: 'cliente',                       // CONFIRMAR
      cliente: 'Brechó infantil',                // CONFIRMAR
      producao: 'Cobertura de evento',
      resumo: 'Movimento, volume de peças e a energia de um dia de promoção.',
      sobre: 'Brechó infantil promovendo um evento especial de preços.',
      objetivo: 'Transmitir a energia do evento e a variedade de peças disponíveis.',
      papel: [],                                 // CONFIRMAR
      processo: 'Moldura gráfica com a identidade do evento, câmera na mão acompanhando a movimentação da loja e cortes rápidos que mostram o volume de peças.',
      resultado: 'Reel vertical de 28 segundos.',
      capa: P('infantil-evento-8-ou-80', 'evento-capa.jpg'),
      midias: [video('infantil-evento-8-ou-80', 'evento', 'vertical', '0:28')]
    },
    {
      id: 'ensaio-por-do-sol',
      titulo: 'Pré-wedding ao entardecer',
      categorias: ['ensaios'],
      natureza: null,                            // CONFIRMAR
      cliente: 'Ensaio de casal',
      producao: 'Vídeo horizontal',
      resumo: 'Hora dourada, mar nas pedras e o casal em primeiro plano.',
      sobre: 'Ensaio pré-casamento na orla, no fim da tarde.',
      objetivo: 'Contar a história do casal com a luz do entardecer como cenário.',
      papel: [],                                 // CONFIRMAR
      processo: 'Hora dourada, ondas quebrando nas pedras como textura, planos abertos alternados com closes e título com os nomes do casal na abertura.',
      resultado: 'Vídeo horizontal de 38 segundos.',
      capa: P('ensaio-por-do-sol', 'pre-wedding-capa.jpg'),
      midias: [video('ensaio-por-do-sol', 'pre-wedding', 'horizontal', '0:38')]
    },
    {
      id: 'infantil-reposicao',
      titulo: '+1000 peças de reposição',
      categorias: ['infantil'],
      natureza: 'cliente',                       // CONFIRMAR
      cliente: 'Brechó infantil',                // CONFIRMAR
      producao: 'Reel de bastidores',
      resumo: '“Vem comigo”: bastidores da chegada de peças novas, em primeira pessoa.',
      sobre: 'Brechó infantil apresentando a reposição de estoque.',
      objetivo: 'Mostrar a novidade de perto e convidar as clientes a visitar a loja.',
      papel: [],                                 // CONFIRMAR
      processo: 'Narrativa em primeira pessoa, planos de detalhe das etiquetas e tecidos e moldura com a identidade da loja.',
      resultado: 'Reel vertical de 1 minuto e 37 segundos.',
      capa: P('infantil-reposicao', 'reposicao-capa.jpg'),
      midias: [video('infantil-reposicao', 'reposicao', 'vertical', '1:37')]
    },
    {
      id: 'moda-editorial-cetim',
      titulo: 'Editorial em cetim',
      categorias: ['moda'],
      natureza: null,                            // CONFIRMAR
      cliente: 'Fotografia de moda',
      producao: 'Fotografia',
      resumo: 'Brilho do cetim, luz quente e uma composição limpa.',
      sobre: 'Retrato de moda com vestido de cetim em ambiente interno.',
      objetivo: 'Destacar o caimento e o brilho do tecido.',
      papel: [],                                 // CONFIRMAR
      processo: 'Luz quente indireta vinda do teto, parede neutra e enquadramento de corpo inteiro e meio corpo para mostrar o tecido.',
      resultado: '2 fotografias.',
      capa: P('moda-editorial-cetim', 'foto-01-mini.webp'),
      midias: fotos('moda-editorial-cetim', 2)
    }
  ];

  return {
    categorias: [
      { id: 'todos', nome: 'Todos' },
      { id: 'acessorios', nome: 'Acessórios & Lifestyle' },
      { id: 'confeitaria', nome: 'Confeitaria' },
      { id: 'moda', nome: 'Moda' },
      { id: 'infantil', nome: 'Infantil' },
      { id: 'ensaios', nome: 'Ensaios & Eventos' }
    ],

    projetos,

    /* Showreel. Troque pelo arquivo final e mude provisorio para false. */
    showreel: {
      src: 'assets/showreel/showreel-provisorio.mp4',
      capa: 'assets/showreel/showreel-capa.jpg',
      provisorio: true
    },

    /* Fotos da galeria horizontal (seção Fotografia). */
    galeria: [
      ['confeitaria-doceria', 1, 'Bolo decorado com laço'],
      ['ensaio-casal-praia', 1, 'Casal à beira-mar'],
      ['confeitaria-doceria', 2, 'Cupcakes'],
      ['moda-editorial-cetim', 1, 'Vestido de cetim'],
      ['ensaio-casal-praia', 3, 'Casal no coqueiral'],
      ['confeitaria-doceria', 3, 'Sobremesa no copo com frutas'],
      ['evento-cha-da-noiva', 2, 'Bolo da festa com laço vermelho'],
      ['ensaio-casal-praia', 2, 'Abraço na areia'],
      ['confeitaria-bolo-de-milho', 1, 'Bolo de milho na mesa junina'],
      ['confeitaria-doceria', 5, 'Torta com flores ao fundo'],
      ['evento-cha-da-noiva', 9, 'Noiva ao lado do bolo']
    ].map(([id, n, alt]) => {
      const k = String(n).padStart(2, '0');
      return { projeto: id, src: P(id, `foto-${k}.webp`), mini: P(id, `foto-${k}-mini.webp`), alt };
    }),

    /* Contatos — preencha com os seus links reais.
       Botões sem link aparecem como “em breve”. */
    contato: {
      whatsapp: '',   // ex.: 'https://wa.me/5581999999999'
      email: '',      // ex.: 'mailto:seuemail@gmail.com'
      linkedin: '',   // ex.: 'https://www.linkedin.com/in/seu-perfil'
      instagram: '',  // ex.: 'https://www.instagram.com/seu-perfil'
      curriculo: ''   // ex.: 'assets/curriculo-evellyn-santos.pdf'
    },

    /* Sua foto para a seção Sobre mim (ex.: 'assets/evellyn.webp').
       Vazio = mostra um espaço reservado identificado. */
    fotoPerfil: ''
  };
})();
