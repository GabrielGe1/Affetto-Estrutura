# Prompt para Codex - Construção do site Affetto

Você é um engenheiro front-end sênior. Construa o novo site da Affetto Lavanderia usando os arquivos deste pacote como fonte de verdade.

## Objetivo
Criar um site responsivo, rápido, elegante e otimizado para SEO local e conversão por WhatsApp.

## Stack esperada
Preferencialmente React/Vite ou Next.js, com componentes reutilizáveis e conteúdo separado em arquivos de configuração/JSON/MDX sempre que fizer sentido.

## Páginas obrigatórias da primeira versão

1. `/`
2. `/lavagem-de-cortinas`
3. `/lavagem-de-edredons`
4. `/lavanderia-com-retirada-e-entrega`
5. `/avaliacoes`
6. `/duvidas-frequentes`
7. `/lavanderia-em-itapema`
8. `/lavanderia-em-balneario-camboriu`

## Requisitos funcionais

- Header responsivo.
- CTA fixo de WhatsApp no mobile.
- Mensagem de WhatsApp específica por página.
- FAQ em accordion.
- Cards de serviços.
- Cards de provas rápidas.
- Seção de cidades.
- Componentização de seções comuns.
- Links internos conforme `02_seo_architecture/internal_links.md`.
- SEO metadata por página conforme `02_seo_architecture/seo_metadata.md`.
- Design conforme `04_design_system/design_tokens.json`.
- Tracking preparado conforme `05_tracking/tracking_plan.md`.

## Requisitos de performance

- Mobile-first.
- Imagens otimizadas.
- Lazy loading em imagens abaixo da dobra.
- Evitar bibliotecas pesadas.
- HTML semântico.
- Acessibilidade básica: labels, contraste, foco visível e aria em accordions.

## Regras de conteúdo

- Não usar linguagem de "misturinha natural".
- Não prometer remoção total de mofo/manchas.
- Não usar garantia anti-encolhimento.
- Não prometer retirada gratuita universal.
- Usar "produtos profissionais biodegradáveis".
- Usar "processo profissional".
- Usar "inspeção cuidadosa" quando aplicável.

## Entregáveis esperados

- Código funcional.
- Componentes reutilizáveis.
- Rotas criadas.
- SEO metadata configurado.
- Eventos de clique no WhatsApp com data attributes ou camada dataLayer pronta para GTM.
- README técnico de instalação e deploy.

## Observação sobre imagens
Usar placeholders inicialmente, mas com nomes e posições claras para substituição por fotos reais da Affetto. Consultar `07_assets_brief/assets_checklist.md`.
