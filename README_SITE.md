# Site Affetto Lavanderia

Site estatico multi-page criado a partir de `affetto_site_package`, sem framework e sem dependencias externas de build.

## Como rodar localmente

```bash
npm run build
npm run start
```

Abra `http://localhost:4173` ou `http://127.0.0.1:4173`.

## Como fazer build

```bash
npm run build
```

O build gera as paginas HTML, `sitemap.xml`, `robots.txt` e atualiza este README a partir de `scripts/build-site.js`.

## Como fazer build de staging

1. Copie `.env.staging.example` para `.env.staging`.
2. Substitua `SITE_URL` pela URL real de staging (ex: URL do Vercel, Netlify ou subdominio customizado).
3. Rode o build:

```bash
npm run build:staging
```

O build lerá automaticamente `.env.staging` e usará a URL de staging em canonical, OG, sitemap e robots.

Confirmar apos o build:
- `<link rel="canonical"` usa a URL de staging.
- `<loc>` no sitemap.xml usa a URL de staging.
- `Sitemap:` no robots.txt usa a URL de staging.
- WhatsApp continua usando 5547997655025.
- Tracking permanece desativado (ENABLE_TRACKING=false).

## Como publicar

Publique a raiz do projeto como site estatico:

- `index.html`
- pastas de rotas, como `lavagem-de-cortinas/index.html`
- `styles.css`
- `main.js`
- `assets/`
- `sitemap.xml`
- `robots.txt`

### Deploy via Vercel (recomendado para staging rapido)

Arquivo `vercel.json` ja esta configurado na raiz do projeto.

1. Instalar Vercel CLI (opcional, uma vez): `npm i -g vercel`
2. No diretorio raiz: `vercel`
3. Seguir o wizard: framework = Other, build command = `npm run build`, output = `. (ponto)`
4. Definir as variaveis de ambiente no dashboard Vercel:
   - `SITE_URL` = URL do projeto Vercel gerada (ex: `https://affetto-lavanderia.vercel.app`)
   - `WHATSAPP_PHONE` = `5547997655025`
   - `ENABLE_TRACKING` = `false`
   - `APP_ENV` = `staging`
5. Fazer redeploy para que as variaveis sejam aplicadas.
6. Apontar `SITE_URL` para o dominio customizado quando disponivel.

### Deploy via Netlify

Arquivo `netlify.toml` ja esta configurado na raiz do projeto.

1. Instalar Netlify CLI (opcional): `npm i -g netlify-cli`
2. No diretorio raiz: `netlify deploy --build`
3. Definir as variaveis de ambiente no dashboard Netlify (Site settings > Environment):
   - `SITE_URL`, `WHATSAPP_PHONE`, `ENABLE_TRACKING`, `APP_ENV`
4. Para producao: `netlify deploy --build --prod`

### Deploy manual (qualquer provedor de hospedagem estatica)

1. Rodar `npm run build` (ou `build:staging` para staging) com as variaveis corretas.
2. Enviar todos os arquivos da raiz do projeto para o servidor (exceto `.env*`, `node_modules/`, pastas auxiliares).
3. Configurar o servidor para servir `index.html` em cada diretorio (ex: Apache `DirectoryIndex index.html`, Nginx `try_files`).
4. Garantir que a URL de staging esta correta em `SITE_URL` antes do build.

## Estrutura

- `.env.example`: exemplo seguro das variaveis de ambiente.
- `site.config.js`: dados publicos versionados, defaults e mensagens de WhatsApp.
- `styles.css`: design system, componentes e responsivo.
- `main.js`: menu mobile, accordion, tracking e UTMs nos links de WhatsApp.
- `scripts/build-site.js`: conteudo, SEO, schema, tracking condicional e geracao das paginas estaticas.
- `index.html` e pastas de rotas: paginas publicas geradas.
- `sitemap.xml` e `robots.txt`: SEO tecnico basico.
- `assets/images/`: fotos reais da operacao, equipe e pecas.
- `assets/videos/`: videos curtos reais.
- `assets/reviews/`: prints reais de avaliacoes do Google.
- `assets/placeholders/README.md`: mapa de substituicao dos placeholders.

## Configuracao

As variaveis podem ser passadas pelo ambiente no momento do build ou em um arquivo local `.env` que nao deve ser versionado. O fallback seguro fica em `site.config.js`.

```bash
SITE_URL=https://staging.affettolavanderia.com.br
WHATSAPP_PHONE=5547997655025
ENABLE_TRACKING=false
GTM_ID=
GA4_ID=
META_PIXEL_ID=
APP_ENV=staging
```

## Onde trocar o WhatsApp

Numero atual: +55 47 99765-5025

Env:

```bash
WHATSAPP_PHONE=5547997655025
```

Fallback versionado: `site.config.js > defaults.whatsappPhone`.

## Onde trocar dominio

Dominio atual:

```bash
SITE_URL=https://staging.affettolavanderia.com.br
```

Fallback versionado: `site.config.js > defaults.siteUrl`.

O `SITE_URL` alimenta canonical, Open Graph URL, sitemap, robots e schema LocalBusiness.

## Como ativar tracking

Por padrao, tracking fica desligado e nenhum script de GTM/GA4/Meta e carregado.

### GTM

```bash
ENABLE_TRACKING=true
GTM_ID=GTM-XXXXXXX
npm run build
```

### GA4

```bash
ENABLE_TRACKING=true
GA4_ID=G-XXXXXXXXXX
npm run build
```

### Meta Pixel

```bash
ENABLE_TRACKING=true
META_PIXEL_ID=000000000000000
npm run build
```

Nao usar IDs inventados. Se `ENABLE_TRACKING=false` ou os IDs estiverem vazios, os scripts nao sao injetados.

## Eventos de tracking

Todos os CTAs de WhatsApp enviam payload para `window.dataLayer` antes de abrir o link:

- `click_whatsapp_home`
- `click_whatsapp_cortinas`
- `click_whatsapp_edredons`
- `click_whatsapp_retirada_entrega`
- `click_whatsapp_itapema`
- `click_whatsapp_bc`
- `click_whatsapp_avaliacoes`
- `click_whatsapp_faq`

Payload minimo: `event`, `page_path`, `page_title`, `service`, `city` quando aplicavel, `cta_location`, `whatsapp_message`, `timestamp` e UTMs quando presentes.

## Onde inserir fotos reais

Use `assets/images/` para fotos reais da operacao, equipe, coleta, entrega, cortinas, edredons, embalagens e bastidores. O mapa de placeholders esta em `assets/placeholders/README.md`.

## Onde inserir prints reais do Google

Use `assets/reviews/`. Nao inventar depoimentos, nomes, predios ou cidades. Revisar dados sensiveis e autorizacao antes de publicar.

## Como validar WhatsApp

1. Rode `npm run build`.
2. Abra uma pagina local.
3. Clique no CTA de WhatsApp.
4. Verifique se o link usa `wa.me/5547997655025`.
5. Confirme se a mensagem da pagina foi preservada.
6. Em DevTools, confira se o clique adiciona o evento correto em `window.dataLayer`.

## Como validar sitemap e robots

```bash
curl -I http://localhost:4173/sitemap.xml
curl -I http://localhost:4173/robots.txt
```

Ambos devem retornar `200 OK`. O `robots.txt` deve apontar para `https://staging.affettolavanderia.com.br/sitemap.xml`.

## Checklist antes de staging

- [ ] Rodar `npm run build` sem erros.
- [ ] Todas as 8 paginas respondem 200 OK no preview local.
- [ ] Confirmar 1 H1 por pagina.
- [ ] Confirmar title, meta description, canonical e Open Graph por pagina.
- [ ] Confirmar `sitemap.xml` e `robots.txt`.
- [ ] Testar menu mobile, FAQ accordion e CTA fixo.
- [ ] Clicar no WhatsApp em todas as paginas e verificar numero `5547997655025`.
- [ ] Confirmar que nao existe numero placeholder antigo.
- [ ] Confirmar que nao ha linguagem proibida ou promessa absoluta.
- [ ] Confirmar que `ENABLE_TRACKING=false` e que nenhum script de rastreamento e carregado.
- [ ] Confirmar que nenhum ID falso foi inserido.
- [ ] Testar em mobile 360px, 430px, tablet e desktop.

## Checklist antes de producao

- [ ] Tudo do checklist de staging aprovado.
- [ ] Substituir todos os placeholders por fotos e videos reais da Affetto.
- [ ] Inserir prints reais de avaliacoes do Google com autorizacao.
- [ ] Confirmar dominio final em `SITE_URL`.
- [ ] Configurar GTM/GA4/Meta Pixel somente com IDs reais e ativar `ENABLE_TRACKING=true`.
- [ ] Rodar `npm run build` com variaveis de producao.
- [ ] Verificar schema LocalBusiness e FAQPage com Google Rich Results Test.
- [ ] Confirmar que `sitemap.xml` aponta para o dominio correto.
- [ ] Confirmar `robots.txt` esta correto.
- [ ] Testar links de WhatsApp em producao com telefone real.
- [ ] Confirmar imagem de Open Graph `og:image` quando disponivel.

## Pendencias antes de producao

- Trocar placeholders por fotos e videos reais da Affetto.
- Inserir prints reais de avaliacoes do Google, com autorizacao quando necessario.
- Confirmar dominio final.
- Configurar GTM/GA4/Meta Pixel quando as IDs reais existirem.
- Inserir imagem de Open Graph em `site.config.js > assets.ogImage`.
