# DJ Reinaldo — site oficial

Site institucional do DJ Reinaldo, para quem contrata DJ em eventos sociais, corporativos e casas noturnas.

- **Status:** no ar
- **Endereço:** https://djreinaldo.com.br/
- **Cliente:** DJ Reinaldo (dono do site); desenvolvimento pela laroca.dev

## Principais funções

- Apresentação, repertório e diferenciais, com contato por WhatsApp.
- Galeria em grade 3x3 com visor e troca automática, alimentada por um `galeria.json` publicado fora do repositório; sem o arquivo, a seção some.
- Entradas animadas ao rolar a página e contadores.

## Stack

HTML5, CSS3 e JavaScript puros, sem build e sem dependências.

## Estrutura

```
index.html     conteúdo
css/style.css  layout e paleta (grafite e dourado)
js/main.js     animações, galeria e visor
_headers       cabeçalhos de segurança e cache
```

## Rodar localmente

```bash
python -m http.server 8766   # abrir http://127.0.0.1:8766/
```

## Publicar

Cloudflare Pages, automático a cada push na `main`. Todo push vai ao ar: teste antes.

## Licença

Proprietário — todos os direitos reservados.

## Contato

Desenvolvido pela [laroca.dev](https://laroca.dev) · contato@laroca.dev
