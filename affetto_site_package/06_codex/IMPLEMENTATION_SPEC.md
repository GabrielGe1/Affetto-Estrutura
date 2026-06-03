# Especificação técnica para implementação

## Componentes sugeridos

- `Layout`
- `Header`
- `Footer`
- `HeroSection`
- `ProofBar`
- `ServiceCards`
- `HowItWorks`
- `DifferentialsGrid`
- `CitiesSection`
- `FAQAccordion`
- `ReviewsSection`
- `StickyWhatsAppButton`
- `CTASection`
- `SEOHead`

## Conteúdo
Manter o conteúdo em estrutura editável, preferencialmente:

- `src/content/pages.ts` ou `src/content/pages.json`.
- `src/content/seo.ts`.
- `src/content/faqs.ts`.
- `src/content/whatsapp.ts`.

## WhatsApp
Criar helper:

```ts
function buildWhatsAppUrl(message: string): string {
  const phone = process.env.WHATSAPP_PHONE || '5547997655025';
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
```

## Eventos de tracking
Em cada CTA de WhatsApp:

```html
<a
  href="..."
  data-event="click_whatsapp_cortinas"
  data-service="cortinas"
  data-page="/lavagem-de-cortinas"
>
  Enviar foto da cortina pelo WhatsApp
</a>
```

Se houver dataLayer:

```js
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'click_whatsapp_cortinas',
  service: 'cortinas',
  page_path: '/lavagem-de-cortinas'
});
```

## SEO
Cada página deve ter:

- Title único.
- Meta description única.
- H1 único.
- Canonical.
- Open Graph básico.
- Schema LocalBusiness na Home.
- Schema FAQPage em páginas com FAQ, se possível.

## QA obrigatório

- Verificar mobile.
- Testar todos os CTAs.
- Validar mensagens de WhatsApp.
- Validar titles/metas.
- Validar links internos.
- Rodar Lighthouse.
- Validar acessibilidade básica.
