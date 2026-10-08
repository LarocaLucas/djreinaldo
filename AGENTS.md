# DJ Reinaldo — caderno de bordo

## Diretrizes
- Site estático sem build: HTML, CSS e JS puros. Sem dependências.
- **Público:** quem contrata DJ para eventos **sociais** (casamentos, formaturas, 15 anos, aniversários) e **corporativos** (confraternizações, lançamentos, convenções, feiras). O tom é de experiência e confiança, não de balada.
- Identidade do cliente: grafite (`#141416`) e dourado (`#c8a96e`), logo branca. Fontes: Bodoni Moda (títulos) e Instrument Sans (texto).
- Dados: mais de 30 anos de pista, 2.000+ eventos, Castro e Ponta Grossa (PR). WhatsApp (42) 99851-3740, Instagram @dj_reinaldo_.
- Repertório: retrô (70/80/90), sertanejo, funknejo, eletrônica e funk.
- Galeria: fotos espalhadas que trocam sozinhas; os números usados ficam em `data-fotos` da `.mesa` no `index.html` (ficaram de fora logos antigas, flyer, print do Instagram e fotos de caixa de som).
- **Publicação:** Cloudflare Pages, projeto `djreinaldo`, automática a cada push na `main` → https://djreinaldo.com.br/. Todo push vai ao ar: testar antes.
- Commits em Conventional Commits (pt-BR).

## Estado atual
- v2.0.0 no ar em https://djreinaldo.com.br/ desde 08/10/2026 (refeito do zero sobre a v1.2.0).

## Registro
### 08/10/2026 — Claude Code (site refeito, v2.0.0)
- **Feito:** site refeito a pedido do dono (laroca.dev), reaproveitando o que funcionou no DJ Laroca v3: hero com retrato em arco, faixa correndo com os tipos de evento, blocos "eventos sociais" e "eventos corporativos", frase que acende com a rolagem, números que contam, "como funciona" em 3 passos, repertório, galeria de fotos espalhadas com visor, contato em dourado e botão flutuante do WhatsApp. SEO: título e descrição por tipo de evento e cidade, dados estruturados, favicon SVG. `_headers` para o Cloudflare.
- **Suposições na copy (confirmar com o Reinaldo):** os 3 passos do "como funciona", os itens de eventos corporativos (lançamentos, convenções, feiras) e "outras cidades sob consulta". Não foi citado equipamento de som/luz porque não havia essa informação.
- **Arquivos:** `index.html`, `css/style.css`, `js/main.js`, `favicon.svg`, `_headers`, `README.md`.
- **Testes:** Chrome 1440x900 e 390x844: todos os blocos aparecem ao rolar, sem rolagem horizontal, console sem erros. Não testado: celular real, clique para ampliar fotos.
- **Próximo passo:** validar a copy com o Reinaldo; pedir fotos de casamentos/formaturas/eventos de empresa (as atuais são quase todas de balada).
