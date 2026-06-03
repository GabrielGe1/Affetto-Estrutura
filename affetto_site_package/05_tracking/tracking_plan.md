# Plano de tracking e tagueamento

## Objetivo
Medir cliques qualificados para WhatsApp, origem do lead, desempenho por página e preparar base para Google Ads, Meta Ads e remarketing.

## Ferramentas recomendadas
- Google Tag Manager.
- Google Analytics 4.
- Google Ads Conversion Tracking.
- Meta Pixel.
- Meta Conversions API em fase posterior.
- UTMs em todos os links de mídia paga.

## Eventos obrigatórios

| Página | Evento |
|---|---|
| `/` | `click_whatsapp_home` |
| `/lavagem-de-cortinas` | `click_whatsapp_cortinas` |
| `/lavagem-de-edredons` | `click_whatsapp_edredons` |
| `/lavanderia-com-retirada-e-entrega` | `click_whatsapp_retirada_entrega` |
| `/lavanderia-em-itapema` | `click_whatsapp_itapema` |
| `/lavanderia-em-balneario-camboriu` | `click_whatsapp_bc` |
| `/avaliacoes` | `click_whatsapp_avaliacoes` |
| `/duvidas-frequentes` | `click_whatsapp_faq` |

## Parâmetros recomendados para eventos

- `page_path`.
- `page_title`.
- `cta_label`.
- `service`.
- `city` quando aplicável.
- `whatsapp_message_type`.
- `utm_source`.
- `utm_medium`.
- `utm_campaign`.
- `utm_content`.
- `utm_term`.

## UTM Google Ads

```text
utm_source=google
utm_medium=cpc
utm_campaign=cortinas_itapema
utm_content=anuncio_01
utm_term=lavagem_de_cortinas
```

## UTM Meta Ads

```text
utm_source=meta
utm_medium=paid_social
utm_campaign=cortinas_whatsapp
utm_content=reels_bastidor_01
```

## Conversões primárias

1. Clique no WhatsApp em páginas de serviço.
2. Clique no WhatsApp em páginas locais.
3. Clique no WhatsApp na Home.

## Conversões secundárias

1. Scroll 75% em página de serviço.
2. Clique em "Ver avaliações".
3. Clique em "Dúvidas frequentes".
4. Clique em cards de serviços.

## Observação
O clique no WhatsApp não é venda. Depois será necessário integrar com CRM/sistema para medir lead qualificado, orçamento, pedido e receita por origem.
