# DJ Reinaldo — caderno de bordo

## Diretrizes
- Site estático sem build: HTML, CSS e JS puros. Sem dependências.
- **Público:** quem contrata DJ para eventos **sociais** (casamentos, formaturas, 15 anos, aniversários), **corporativos** (confraternizações, lançamentos, convenções, feiras) e também **baladas e casas noturnas** (o dono pediu para incluir em 08/10). O tom é de experiência e confiança.
- Identidade do cliente: grafite (`#141416`) e dourado (`#c8a96e`), logo branca. Fontes: Bodoni Moda (títulos) e Instrument Sans (texto).
- Dados: mais de 30 anos de pista, 2.000+ eventos, Castro e Ponta Grossa (PR). WhatsApp (42) 99851-3740, Instagram @dj_reinaldo_.
- Repertório: retrô (70/80/90), sertanejo, funknejo, eletrônica e funk.
- Galeria: fotos espalhadas que trocam sozinhas; os números usados ficam em `data-fotos` da `.mesa` no `index.html` (ficaram de fora logos antigas, flyer, print do Instagram e fotos de caixa de som).
- **Publicação:** Cloudflare Pages, projeto `djreinaldo`, automática a cada push na `main` → https://djreinaldo.com.br/. Todo push vai ao ar: testar antes.
- Commits em Conventional Commits (pt-BR).

## Estado atual
- v2.1.0 no ar em https://djreinaldo.com.br/ desde 08/10/2026 (refeito do zero sobre a v1.2.0).

## Registro
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
