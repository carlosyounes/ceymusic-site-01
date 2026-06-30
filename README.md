# CEY Music — Portfolio & Audio Platform

Uma plataforma multipáginas (8 seções) de alto desempenho, desenvolvida com uma arquitetura modular baseada em **HTML5, CSS3 Squeomórfico e JavaScript Vanilla**, focada em portfólio de produção musical, artigos técnicos e distribuição de mídias.

## 🚀 Filosofia do Projeto: Performance & Modularidade

Este ecossistema foi projetado sob severas restrições de hardware, otimizado para rodar com fluidez absoluta em dispositivos legados (como um **MacBook Pro 2011 com 4GB de RAM**) e smartphones antigos, dividindo as responsabilidades de forma cirúrgica:

- **Arquitetura Compartimentada (Componentização):** Folhas de estilo e scripts totalmente isolados por função. Se o problema é no player, a manutenção ocorre estritamente dentro de `playerjs.css` e `playerjs.js`, sem afetar o resto do ecossistema.
- **CSS para Estados Visuais:** Toda a interatividade de navegação e persistência de estados dos menus são feitas nativamente via seletores CSS e Radio Buttons ocultos, economizando processamento.
- **JavaScript Não-Bloqueante (Unobtrusive JS):** O JavaScript entra de forma modular e sob demanda apenas onde o HTML/CSS puro não alcança: gerenciando a API nativa de Áudio do navegador, criando playlists dinâmicas e manipulando o Zoom inteligente do carrossel.
- **Sem Motor de Cache Bloqueante:** Substituição da regra `@import` por carregamento paralelo direto via tags `<link>` no HTML.
- **Otimização de RAM & Mídia:** Implementação de pré-carga tipográfica (`preload`) e barreira de download de arquivos de áudio sob demanda (`preload="none"`).

## 🎨 Identidade Visual & Engenharia UI

O design do projeto adota uma estética **Dark Futurista** (Cyberpunk/Sci-Fi) de alto impacto visual, desenhada para poupar o processamento da GPU:
- **Squeomorfismo Real:** Uso de iluminação e sombras tridimensionais reversas (`box-shadow`, `border` de luz e `inset`) para emular o volume de botões analógicos e faders afundados.
- **Tipografia Fluida:** Harmonização de fontes variáveis (**Orbitron Variable** para títulos imponentes e **Plus Jakarta Variable** para leitura ergonômica de textos longos) calibradas dinamicamente com a função `clamp()`.
- **Logotipo de Osciloscópio:** Onda de áudio triangular com vértices suavizados por curvas de Bézier cúbicas, montada em vetor **SVG animado via CSS** sobre uma linha de grade estática.

## 🛠️ Recursos Técnicos Implementados

1. **Menu de Navegação Persistente:** Alternância e retenção de estado aceso do botão através de mecânica de *Radio Buttons* ocultos vinculados a `<label>`.
2. **Artigos com Diagramação Campeã:** Textos longos formatados com ritmo vertical estrito (`max-width: 68ch`) para evitar fadiga ocular, incluindo cards de citação (`blockquote`) e links com efeito de brilho neon (*glow*).
3. **Carrossel Interativo 16:9:** Loops visuais baseados em *Keyframes*, com controle avançado via JavaScript para cliques de zoom in/out e transições suaves de fade.
4. **Player de Áudio & Playlist Modular:** Sistema de áudio dark customizado integrado a scripts isolados para gerenciamento de faixas `.mp3` sob demanda.
5. **Formulário 3D Auto-Validável:** Layout tridimensional que altera seu contorno para neon verde (válido) ou neon vermelho (inválido) nativamente.

## 📁 Estrutura do Repositório

.
├── index.html                  (Home do site na raiz)
├── musica.html                 (Página principal de mídias)
├── tecnologia.html             (Página principal de tecnologia)
├── arte-edu.html
├── servicos.html
├── produtos.html
├── contato.html
├── template.html
├── README.md
│
├── artigos/                    (Banco de dados de artigos organizados por subpastas)
│   ├── index.html              (Listagem de artigos - 1 nível abaixo)
│   ├── musica/                 (Ex: mus01-2026-06-29-lilia-rosa.html - 2 níveis abaixo)
│   ├── tecnologia/             (Ex: tec01-audio-01.html - 2 níveis abaixo)
│   ├── arte-cultura/
│   └── personalidades/
│
├── fonts/                      (Fontes locais on-board)
│   ├── orbitron-variable.woff2
│   ├── plusjakarta-variable.woff2
│   ├── exo2-variable.woff2
│   ├── exo2-italic-variable.woff2
│   ├── jetbrains-variable.woff2
│   └── nasalization.woff2
│
├── img/                        (Imagens e elementos gráficos)
│   └── caps/                   (Capas e pôsteres .jpg leves para mídias)
│
├── media/                      (Central de streaming local leve)
│   ├── audio/                  (Arquivos de música .mp3)
│   └── video/                  (Vídeos locais .mp4)
│
├── docs/                       (Central de downloads seguros)
│   ├── pdf/
│   ├── txt/
│   └── midi/
│
├── js/                         (Componentes JavaScript isolados e independentes)
│   ├── playerjs.js             (Controle lógico do player de áudio)
│   ├── playlists.js            (Gerenciador de faixas e listas)
│   └── carouseljs.js           (Interatividade e manipulação de Zoom do carrossel)
│
└── css/                        (Folhas de estilo CSS compartimentalizadas)
    ├── var.css                 (Design system: variáveis de luz, cores e neons)
    ├── reset.css               (Limpeza inicial padrão de margens e box-sizing)
    ├── layout.css              (Grid global, containers e Sticky Footer)
    ├── typo.css                (Tipografia fluida com clamp e classes fx-neon)
    └── components/             (Estilos isolados dos módulos)
        ├── nav.css             (Navbar com estado fixo e Logotipo SVG)
        ├── footer.css          (Rodapé tridimensional em Grid simétrico de 3 colunas)
        ├── card.css            (Cards com sombras tridimensionais volumosas)
        ├── archive.css         (Estilização do banco de artigos)
        ├── carouseljs.css      (Estilo do carrossel em Fade com Zoom)
        ├── playerjs.css        (Visual do player de áudio nativo dark)
        ├── playlistjs.css      (Visual da listagem de faixas da playlist)
        └── form.css            (Formulário tridimensional auto-validável)

## 🔒 Segurança e Infraestrutura

- **Hospedagem:** Distribuído de forma estática de alta performance via **GitHub Pages**.
- **Segurança e Proxy:** Camada de proteção contra ataques e otimização de entrega global gerenciada pela **Cloudflare**.
- **Backend Serverless:** Captação de formulários via **Web3Forms / Formspree** integrados a e-mails com criptografia de ponta a ponta (**ProtonMail / Tuta**).

---
Desenvolvido com foco em longevidade de hardware, portabilidade de código e paixão por música e tecnologia. 🎹🦾
