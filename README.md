# DJ Reinaldo — site oficial

Site do DJ Reinaldo, no ar em [djreinaldo.com.br](https://djreinaldo.com.br/): estático (HTML, CSS e JS puros, sem build), voltado a quem contrata DJ para eventos sociais e corporativos.

- **Publicação:** Cloudflare Pages (projeto `djreinaldo`), automática a cada push na branch `main`.
- **Rodar local:** `python -m http.server 8766` e abrir http://127.0.0.1:8766/

## Estrutura
- `index.html` — todo o conteúdo
- `css/style.css` — layout, paleta grafite e dourado
- `js/main.js` — entradas ao rolar, números, galeria e visor
- `assets/images/galeria/foto-NNN.jpg` — fotos; as que aparecem estão listadas em `data-fotos` da `.mesa` no `index.html`

Desenvolvido por [laroca.dev](https://laroca.dev).
