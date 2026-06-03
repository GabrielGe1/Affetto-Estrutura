# Mapa de Assets — Affetto Lavanderia

Documento de referência para produção e entrega de assets antes do deploy em produção.

---

## Assets Obrigatórios

### 1. Hero — Home
- **Página:** `/`
- **Seção:** Hero (lado direito, acima da dobra)
- **Tipo:** Foto ou vídeo curto
- **Prioridade:** Obrigatória
- **Proporção/Tamanho:** 1600×1100px (landscape) ou vídeo 1080×1350px curto (4:5)
- **Descrição:** Imagem que transmite operação real: equipe em coleta, peça embalada, entrega ou bastidor. Sem aspecto genérico ou de banco de imagens.
- **O que fotografar/gravar:** Profissional carregando sacolas de cortinas ou edredons; entrega na porta de um apartamento; peça dobrada e embalada pronta para entrega.
- **Nome sugerido:** `hero-home.jpg` ou `hero-home.mp4`

---

### 2. Card — Cortinas
- **Página:** `/` (seção Serviços)
- **Seção:** Card de serviço Cortinas
- **Tipo:** Foto
- **Prioridade:** Obrigatória
- **Proporção/Tamanho:** 800×500px (landscape, 16:10)
- **Descrição:** Cortina limpa em ambiente limpo, dobrada para entrega, ou sendo retirada do trilho.
- **O que fotografar:** Cortina de voal ou blackout dobrada; cortina em secagem; profissional avaliando a peça antes da lavagem.
- **Nome sugerido:** `card-cortinas.jpg`

---

### 3. Card — Edredons
- **Página:** `/` (seção Serviços)
- **Seção:** Card de serviço Edredons
- **Tipo:** Foto
- **Prioridade:** Obrigatória
- **Proporção/Tamanho:** 800×500px (landscape, 16:10)
- **Descrição:** Edredom dobrado e embalado, pronto para entrega. Evitar cama arrumada genérica.
- **O que fotografar:** Edredom dobrado sobre fundo neutro; pilha de edredons limpos prontos para entrega; embalagem com peças.
- **Nome sugerido:** `card-edredons.jpg`

---

### 4. Card — Tapetes
- **Página:** `/` (seção Serviços)
- **Seção:** Card de serviço Tapetes
- **Tipo:** Foto
- **Prioridade:** Obrigatória
- **Proporção/Tamanho:** 800×500px (landscape, 16:10)
- **Descrição:** Tapete em processo de higienização ou após lavagem. Discreto e real.
- **O que fotografar:** Tapete estendido para avaliação; tapete em secagem; tapete dobrado após limpeza.
- **Nome sugerido:** `card-tapetes.jpg`

---

### 5. Hero — Lavagem de Cortinas
- **Página:** `/lavagem-de-cortinas/`
- **Seção:** Hero
- **Tipo:** Foto
- **Prioridade:** Obrigatória
- **Proporção/Tamanho:** 1600×1100px
- **Descrição:** Cortina em avaliação antes da higienização, sendo retirada de trilho, ou após limpeza.
- **O que fotografar:** Profissional avaliando cortina com mofo ou manchas; cortina sendo desmontada; cortina limpa e dobrada.
- **Nome sugerido:** `hero-cortinas.jpg`

---

### 6. Hero — Lavagem de Edredons
- **Página:** `/lavagem-de-edredons/`
- **Seção:** Hero
- **Tipo:** Foto
- **Prioridade:** Obrigatória
- **Proporção/Tamanho:** 1600×1100px
- **Descrição:** Edredom dobrado, embalado ou pronto para entrega. Volume e cuidado no acabamento.
- **O que fotografar:** Edredom king dobrado sobre bancada; embalagem com etiqueta; lote de edredons prontos para entrega.
- **Nome sugerido:** `hero-edredons.jpg`

---

### 7. Hero — Retirada e Entrega
- **Página:** `/lavanderia-com-retirada-e-entrega/`
- **Seção:** Hero
- **Tipo:** Foto
- **Prioridade:** Obrigatória
- **Proporção/Tamanho:** 1600×1100px
- **Descrição:** Logística local real: equipe, veículo, coleta ou entrega em porta de condomínio/apartamento.
- **O que fotografar:** Profissional carregando sacolas de peças; veículo de entrega; porta de condomínio com sacola etiquetada.
- **Nome sugerido:** `hero-retirada-entrega.jpg`

---

### 8. Avaliações — Prints do Google
- **Página:** `/avaliacoes/`
- **Seção:** Cards de avaliações
- **Tipo:** Print de tela (screenshot)
- **Prioridade:** Obrigatória
- **Proporção/Tamanho:** 1200×900px por print; proporção variável conforme tela
- **Descrição:** Prints reais do Google Meu Negócio da Affetto, com nome do cliente visível (ou anonimizado se necessário) e nota 5 estrelas. Sem edição que altere o conteúdo.
- **O que capturar:** Avaliações do perfil no Google Maps; prints de avaliações por serviço (cortinas, edredons) quando disponíveis.
- **Nome sugerido:** `review-01.png`, `review-02.png`, `review-cortinas-01.png`
- **Atenção:** Revisar dados sensíveis e obter autorização quando necessário antes de publicar.

---

### 9. Bloco Institucional — Bastidor
- **Página:** `/` (seção central)
- **Seção:** "Uma lavanderia local, especializada e próxima da sua rotina"
- **Tipo:** Foto
- **Prioridade:** Obrigatória
- **Proporção/Tamanho:** 1400×1000px (landscape)
- **Descrição:** Foto de bastidor real: equipe, separação de peças, embalagem ou estrutura da lavanderia. Humaniza a marca.
- **O que fotografar:** Profissional separando cortinas por tipo; bancada de separação de edredons; estrutura interna da lavanderia; embalagem de peças prontas.
- **Nome sugerido:** `bastidor-01.jpg`

---

### 10. Open Graph — Imagem Principal
- **Página:** Todas (og:image)
- **Seção:** Compartilhamento em redes sociais / WhatsApp
- **Tipo:** Foto
- **Prioridade:** Obrigatória
- **Proporção/Tamanho:** 1200×630px (landscape, proporção OG padrão)
- **Descrição:** Imagem da marca para compartilhamento. Pode ser adaptação do hero ou foto institucional com logotipo sobreposto de forma limpa.
- **O que fotografar:** Versão composta da foto hero com identidade visual da Affetto.
- **Nome sugerido:** `og-affetto.jpg`
- **Onde configurar:** `site.config.js > assets.ogImage` (ex: `/assets/images/og-affetto.jpg`)

---

## Assets Recomendados

### 11. Vídeo — Hero Home (curto)
- **Página:** `/`
- **Tipo:** Vídeo
- **Prioridade:** Recomendada
- **Proporção/Tamanho:** 1080×1350px ou 1080×1080px, 5–8 segundos, sem áudio obrigatório
- **Descrição:** Vídeo mostrando coleta, entrega ou bastidor. Loop suave, sem texto sobreposto.
- **Nome sugerido:** `hero-home.mp4`

### 12. Vídeo — Coleta/Entrega
- **Página:** `/lavanderia-com-retirada-e-entrega/`
- **Tipo:** Vídeo
- **Prioridade:** Recomendada
- **Proporção/Tamanho:** 1080×1350px, 5–10 segundos
- **Descrição:** Profissional na coleta ou entrega em porta de condomínio.
- **Nome sugerido:** `coleta-entrega.mp4`

### 13. Vídeo — Bastidor
- **Página:** `/` (bloco institucional)
- **Tipo:** Vídeo
- **Prioridade:** Recomendada
- **Proporção/Tamanho:** 1080×1080px, 5–8 segundos
- **Descrição:** Bastidor da lavanderia: separação, embalagem, estrutura.
- **Nome sugerido:** `bastidor.mp4`

### 14. Fotos Verticais Mobile
- **Página:** Todas as páginas com hero
- **Tipo:** Foto
- **Prioridade:** Recomendada
- **Proporção/Tamanho:** 800×1100px (portrait, 3:4)
- **Descrição:** Versão vertical das fotos hero para melhor exibição em dispositivos móveis.
- **Nome sugerido:** `hero-home-mobile.jpg`, `hero-cortinas-mobile.jpg`, etc.

### 15. Prints de Avaliações por Serviço
- **Página:** `/avaliacoes/`
- **Tipo:** Print de tela
- **Prioridade:** Recomendada
- **Proporção/Tamanho:** variável
- **Descrição:** Avaliações específicas sobre cortinas, edredons ou tapetes — ajudam a prova social por serviço.
- **Nome sugerido:** `review-cortinas-01.png`, `review-edredons-01.png`

### 16. Foto — Embalagem
- **Página:** Múltiplas
- **Tipo:** Foto
- **Prioridade:** Recomendada
- **Proporção/Tamanho:** 800×600px
- **Descrição:** Peças embaladas prontas para entrega. Reforça cuidado e capricho.
- **Nome sugerido:** `embalagem-01.jpg`

---

## Regras Gerais de Assets

- Não usar imagens aleatórias da internet.
- Não usar imagens com aparência de IA ou banco de imagens genérico.
- Não inventar depoimentos, nomes, prédios ou condomínios.
- Não citar clientes ou locais sem autorização.
- Comprimir imagens antes de publicar (JPEG 85%, WebP quando possível).
- Conferir se prints de avaliações não expõem dados sensíveis sem autorização.
- Fotos de bastidor: ambiente limpo, organizado e real. Sem pose exagerada.

---

## Onde Inserir no Site

- Fotos/vídeos de hero e bastidor: `assets/images/` e `assets/videos/`
- Prints de avaliações: `assets/reviews/`
- Open Graph: `assets/images/og-affetto.jpg` + atualizar `site.config.js > assets.ogImage`
- Após inserir os arquivos, referenciar no `scripts/build-site.js` (hero) e rodar `npm run build`.
