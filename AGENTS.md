# DJ Reinaldo — caderno de bordo

## Diretrizes
- Site estático sem build: HTML, CSS e JS puros. Sem dependências.
- **Público:** quem contrata DJ para eventos **sociais** (casamentos, formaturas, 15 anos, aniversários), **corporativos** (confraternizações, lançamentos, convenções, feiras) e também **baladas e casas noturnas** (o dono pediu para incluir em 08/10). O tom é de experiência e confiança.
- Identidade do cliente: grafite (`#141416`) e dourado (`#c8a96e`), logo branca. Fontes: Newsreader (títulos) e Instrument Sans (texto).
- Dados: mais de 30 anos de pista, 2.000+ eventos, Castro e Ponta Grossa (PR). WhatsApp (42) 99851-3740, Instagram @dj_reinaldo_.
- Repertório: retrô (70/80/90), sertanejo, funknejo, eletrônica e funk.
- Galeria: grade de 3 colunas (2 no celular) com as fotos aparecendo ao rolar e visor com setas; a ordem/números das fotos ficam em `data-fotos` da `.grade` no `index.html` (ficaram de fora logos antigas, flyer, print do Instagram e fotos de caixa de som).
- **Publicação:** Cloudflare Pages, projeto `djreinaldo`, automática a cada push na `main` → https://djreinaldo.com.br/. Todo push vai ao ar: testar antes.
- Commits em Conventional Commits (pt-BR).

## Estado atual
- v2.3.0 (04/11/2026); antes v2.1.0 no ar em https://djreinaldo.com.br/ desde 08/10/2026 (refeito do zero sobre a v1.2.0).

## Registro
### 04/11/2026 — Claude Code (fonte, galeria que troca e fotos da Central, v2.3.0)
- **Feito:** (1) serifada trocada de Bodoni Moda para Newsreader (400-600, com itálico), `letter-spacing` dos títulos suavizado. (2) Galeria: a cada 3 s uma foto da grade, em lugar aleatório, troca por outra ainda não exibida (fade de opacidade); só com a grade na tela, aba ativa, visor fechado e sem `prefers-reduced-motion`. (3) `js/main.js` busca `https://arquivos.djreinaldo.com.br/site/galeria.json` (`cache: 'no-cache'`; formato da Central: `eventos[{folder,total,miniaturas}]`, fotos `<folder>/NN.jpg`, miniatura `<folder>/mini/NN.webp`); eventos mais novos primeiro, antes das fotos locais; visor e rotação usam o conjunto todo. Se falhar, só as locais, sem erro visível.
- **Atenção:** o domínio `arquivos.djreinaldo.com.br` ainda não existe (aguarda ok do dono). Enquanto isso as 18 fotos locais já ocupam os 18 lugares da grade, então **não há troca** até entrarem fotos novas.
- **Versões:** CSS e JS `?v=2.3.0`.
- **Testes:** `node --check` ok; prints locais 1440 e 500 (fonte nova); troca testada com um galeria.json falso local (fotos remotas entraram na grade). Não testado: celular real, aba em segundo plano, R2 real.
### 04/11/2026 — Claude Code (correção: site desmontado)
- O dono viu o site "todo desconfigurado, só uma foto grande". Causa: a galeria nova mudou o CSS, mas o `index.html` continuou chamando `css/style.css?v=2.1.0`; o cache do Cloudflare e dos navegadores entregava o CSS antigo com o HTML novo. Corrigido com `?v=2.2.0` no CSS.
- Regra: **sempre que mudar `css/style.css` ou `js/main.js`, suba o `?v=` correspondente no `index.html`.**
- Testes: print do site no ar (500x900) com o topo e o texto certos.
### 03/11/2026 — Claude Code (galeria em grade, v2.2.0)
- **Feito:** galeria trocada, a pedido do dono, por grade regular (3 colunas, 2 no celular, fotos 4:5 com cantos de 6 px) das mesmas 18 fotos; entrada ao rolar com opacidade + deslocamento de 24 px em 400 ms, cascata de 70 ms por coluna, desligada com `prefers-reduced-motion`. Visor (dialog) com setas, teclado ←/→/Esc, arrastar horizontal no celular, botão fechar, contador "n / 18", foco preso (dialog modal) e devolvido à foto ao fechar. Sem bibliotecas. Resto do site intocado.
- **Arquivos:** `index.html`, `css/style.css`, `js/main.js`, `AGENTS.md`.
- **Testes:** `node --check` ok; Edge headless 1440 e 500 px: grade e visor (abrir e avançar) renderizam certo. Não testado: iPhone/Android reais, gesto de arrastar, Esc/teclas (lógica simples, sem teste automatizado), efeito de entrada ao rolar (o headless não rola de verdade).
### 08/10/2026 — Claude Code (baladas e SEO, v2.1.0)
- **Feito:** incluído que ele também toca em baladas: terceiro bloco "Baladas e casas noturnas" na seção de eventos (agora em 3 colunas), etiqueta e texto do hero, faixa correndo, frase do sobre e metadados. Os itens do bloco (festas temáticas, open, universitárias, festivais) são suposição: confirmar com o Reinaldo.
- **SEO (feito):** título e descrição com "DJ em Castro e Ponta Grossa, PR", dados estruturados (`WebSite` + negócio com endereço em Castro/PR e área atendida), `robots.txt`, `sitemap.xml`, `404.html` (antes qualquer endereço inexistente devolvia a página inicial com código 200) e, no Cloudflare, regra de redirecionamento 301 de `www` para o domínio raiz.
- **SEO (depende do dono, exige login na conta Google):** criar a propriedade de domínio no Google Search Console, passar o código `google-site-verification` para entrar no DNS (Cloudflare), enviar o sitemap e pedir indexação da página inicial; criar ou reivindicar o Perfil da Empresa no Google (é o que mais pesa em buscas locais como "dj em castro pr").
- **Arquivos:** `index.html`, `css/style.css`, `robots.txt`, `sitemap.xml`, `404.html`.
- **Testes:** Chrome 1440x900: três blocos lado a lado, sem rolagem horizontal; no ar: robots, sitemap, 404 e redirecionamento do `www` conferidos por HTTP. Não testado: celular nesta rodada.
- **Próximo passo:** dono fazer a parte do Search Console e do Perfil da Empresa; validar a copy com o Reinaldo.
### 08/10/2026 — Claude Code (ajustes de qualidade, v2.0.1)
- **Feito:** correções apontadas pelo verificador do impeccable: dourado do texto sobre o fundo claro escurecido para passar no contraste (`#755a1a`), fim das animações de `padding` (topo e linhas do repertório, que agora deslizam com `translate`), etiqueta do hero sem caixa alta, `overflow-x: clip` removido do `html` (não era necessário) e números "01 —" retirados das etiquetas de seção.
- **Exceções registradas em `.impeccable/config.json` (fora do git), decididas pelo Claude sem consultar o dono:** `cramped-padding` e `flat-type-hierarchy` no `index.html` (falsos positivos: o detector não enxerga o recuo do `.wrap` nem os `clamp()` dos títulos), `overused-font` para a Instrument Sans (escolha intencional) e `marquee` (faixa reaproveitada do DJ Laroca).
- **Arquivos:** `css/style.css`, `index.html`.
- **Testes:** Chrome em ~930px e 390x844, página inteira rolada: sem rolagem horizontal e nenhum elemento passando da largura da tela. Não testado: celular real.
- **Próximo passo:** validar a copy com o Reinaldo.
### 08/10/2026 — Claude Code (site refeito, v2.0.0)
- **Feito:** site refeito a pedido do dono (laroca.dev), reaproveitando o que funcionou no DJ Laroca v3: hero com retrato em arco, faixa correndo com os tipos de evento, blocos "eventos sociais" e "eventos corporativos", frase que acende com a rolagem, números que contam, "como funciona" em 3 passos, repertório, galeria de fotos espalhadas com visor, contato em dourado e botão flutuante do WhatsApp. SEO: título e descrição por tipo de evento e cidade, dados estruturados, favicon SVG. `_headers` para o Cloudflare.
- **Suposições na copy (confirmar com o Reinaldo):** os 3 passos do "como funciona", os itens de eventos corporativos (lançamentos, convenções, feiras) e "outras cidades sob consulta". Não foi citado equipamento de som/luz porque não havia essa informação.
- **Arquivos:** `index.html`, `css/style.css`, `js/main.js`, `favicon.svg`, `_headers`, `README.md`.
- **Testes:** Chrome 1440x900 e 390x844: todos os blocos aparecem ao rolar, sem rolagem horizontal, console sem erros. Não testado: celular real, clique para ampliar fotos.
- **Próximo passo:** validar a copy com o Reinaldo; pedir fotos de casamentos/formaturas/eventos de empresa (as atuais são quase todas de balada).
