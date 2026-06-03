module.exports = {
  defaults: {
    siteUrl: "https://affettolavanderia.com.br",
    whatsappPhone: "5547997655025",
    enableTracking: false,
    gtmId: "",
    ga4Id: "",
    metaPixelId: "",
    appEnv: "production"
  },
  company: {
    name: "Affetto Lavanderia",
    brandName: "Affetto",
    phoneDisplay: "+55 47 99765-5025",
    foundingDate: "2020",
    priceRange: "$$"
  },
  cities: ["Itapema", "Balneário Camboriú", "Itajaí", "Porto Belo"],
  services: [
    { name: "Cortinas", href: "/lavagem-de-cortinas/" },
    { name: "Edredons", href: "/lavagem-de-edredons/" },
    { name: "Retirada e entrega", href: "/lavanderia-com-retirada-e-entrega/" }
  ],
  proof: [
    ["Desde 2020", "Atendimento regional no litoral catarinense"],
    ["+1 milhão", "de peças lavadas"],
    ["+5 mil", "clientes atendidos"],
    ["5 estrelas", "avaliação no Google"],
    ["3 dias úteis", "prazo médio, conforme peça e agenda"]
  ],
  nav: [
    ["Início", "/"],
    ["Serviços", "/#servicos"],
    ["Cortinas", "/lavagem-de-cortinas/"],
    ["Edredons", "/lavagem-de-edredons/"],
    ["Retirada e entrega", "/lavanderia-com-retirada-e-entrega/"],
    ["Cidades", "/#cidades"],
    ["Avaliações", "/avaliacoes/"],
    ["Dúvidas", "/duvidas-frequentes/"]
  ],
  whatsappMessages: {
    home: "Olá, gostaria de solicitar uma coleta. Estou em [cidade/bairro] e quero lavar [peças].",
    cortinas:
      "Olá, gostaria de um orçamento para lavagem de cortinas. Estou em [cidade/bairro] e posso enviar fotos para avaliação.",
    edredons:
      "Olá, gostaria de agendar lavagem de edredons/roupas de cama. Estou em [cidade/bairro] e tenho [quantidade] peças.",
    retiradaEntrega: "Olá, gostaria de agendar uma coleta. Estou em [cidade/bairro] e quero lavar [peças].",
    itapema: "Olá, gostaria de agendar uma coleta em Itapema. Estou no bairro [bairro] e quero lavar [peças].",
    balnearioCamboriu:
      "Olá, gostaria de agendar uma coleta em Balneário Camboriú. Estou no bairro [bairro] e quero lavar [peças].",
    avaliacoes:
      "Olá, vi as avaliações da Affetto e gostaria de solicitar um orçamento. Estou em [cidade/bairro] e quero lavar [peças].",
    faq: "Olá, tenho uma dúvida sobre lavagem de [peça]. Estou em [cidade/bairro] e gostaria de orientação."
  },
  structuredData: {
    description:
      "Lavanderia especializada em cortinas, edredons, tapetes e roupas de cama, com retirada e entrega em Itapema, Balneário Camboriú, Itajaí e Porto Belo."
  },
  assets: {
    ogImage: "/assets/images/og-affetto.png",
    placeholders: [
      {
        page: "Home",
        location: "Hero Home",
        recommendedAsset: "Vídeo curto de coleta/entrega ou foto real da operação.",
        recommendedSize: "1600x1100px ou vídeo 1080x1350 curto",
        directory: "assets/images/ ou assets/videos/",
        purpose: "Mostrar operação local real e reforçar confiança acima da dobra."
      },
      {
        page: "Lavagem de cortinas",
        location: "Hero Cortinas",
        recommendedAsset: "Foto real de cortina em ambiente limpo, retirada ou inspeção.",
        recommendedSize: "1600x1100px",
        directory: "assets/images/",
        purpose: "Evidenciar cuidado técnico com peças grandes e sensíveis."
      },
      {
        page: "Lavagem de edredons",
        location: "Hero Edredons",
        recommendedAsset: "Foto real de edredom dobrado, embalado ou pronto para entrega.",
        recommendedSize: "1600x1100px",
        directory: "assets/images/",
        purpose: "Mostrar acabamento, volume e praticidade da entrega."
      },
      {
        page: "Retirada e entrega",
        location: "Hero Retirada e entrega",
        recommendedAsset: "Foto da equipe, veículo, embalagem ou entrega.",
        recommendedSize: "1600x1100px",
        directory: "assets/images/",
        purpose: "Reforçar logística local, rota e conveniência."
      },
      {
        page: "Avaliações",
        location: "Cards de avaliações",
        recommendedAsset: "Prints reais do Google, com dados sensíveis revisados quando necessário.",
        recommendedSize: "1200x900px",
        directory: "assets/reviews/",
        purpose: "Substituir placeholders sem inventar depoimentos."
      },
      {
        page: "Home",
        location: "Bloco institucional",
        recommendedAsset: "Foto real de bastidor, equipe, embalagem ou peça pronta.",
        recommendedSize: "1400x1000px",
        directory: "assets/images/",
        purpose: "Humanizar a operação e fugir de aparência genérica."
      }
    ]
  }
};
