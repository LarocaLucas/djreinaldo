# DJ Reinaldo — site oficial

Site do DJ Reinaldo, no ar em [djreinaldo.com.br](https://djreinaldo.com.br/): estático (HTML, CSS e JS puros, sem build), voltado a quem contrata DJ para eventos sociais e corporativos.

- **Publicação:** Cloudflare Pages (projeto `djreinaldo`), automática a cada push na branch `main`.
- **Rodar local:** `python -m http.server 8766` e abrir http://127.0.0.1:8766/

## Estrutura
- `index.html` — todo o conteúdo
- `css/style.css` — layout, paleta grafite e dourado
- `js/main.js` — entradas ao rolar, números, galeria e visor
- Galeria: vem só do `galeria.json` publicado pela Central em `https://arquivos.djreinaldo.com.br/site/galeria.json` (grade 3x3 montada no `js/main.js`; fotos `ocultas` não aparecem). Sem JSON, a seção some.

Desenvolvido por [laroca.dev](https://laroca.dev).
