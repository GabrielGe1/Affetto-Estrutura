const fs = require("fs");
const path = require("path");
const siteConfig = require("../site.config");

function loadDotEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^["']|["']$/g, "");
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}

const envFile = process.env.ENV_FILE || ".env";
loadDotEnv(path.join(process.cwd(), envFile));

function envOrDefault(key, fallback, options = {}) {
  const value = process.env[key];
  if (value === undefined || value === "") {
    if (options.warn) console.warn(`[build-site] ${key} not set. Using fallback: ${fallback || "(empty)"}`);
    return fallback;
  }
  return value;
}

function cleanSiteUrl(value) {
  return String(value || siteConfig.defaults.siteUrl).replace(/\/+$/, "");
}

function parseBoolean(value) {
  return ["1", "true", "yes", "on"].includes(String(value).toLowerCase());
}

const SITE_URL = cleanSiteUrl(envOrDefault("SITE_URL", siteConfig.defaults.siteUrl, { warn: true }));
const WHATSAPP_PHONE = envOrDefault("WHATSAPP_PHONE", siteConfig.defaults.whatsappPhone, { warn: true }).replace(/\D/g, "");
const ENABLE_TRACKING = parseBoolean(envOrDefault("ENABLE_TRACKING", String(siteConfig.defaults.enableTracking)));
const GTM_ID = envOrDefault("GTM_ID", siteConfig.defaults.gtmId);
const GA4_ID = envOrDefault("GA4_ID", siteConfig.defaults.ga4Id);
const META_PIXEL_ID = envOrDefault("META_PIXEL_ID", siteConfig.defaults.metaPixelId);
const APP_ENV = envOrDefault("APP_ENV", siteConfig.defaults.appEnv);

if (!WHATSAPP_PHONE) {
  throw new Error("[build-site] WHATSAPP_PHONE is required to build WhatsApp links.");
}

if (ENABLE_TRACKING && !GTM_ID && !GA4_ID && !META_PIXEL_ID) {
  console.warn("[build-site] ENABLE_TRACKING=true but GTM_ID, GA4_ID and META_PIXEL_ID are empty. No tracking scripts will be injected.");
}

const proof = siteConfig.proof;
const nav = siteConfig.nav;
const messages = siteConfig.whatsappMessages;

const pages = [
  {
    slug: "",
    event: "click_whatsapp_home",
    service: "generic",
    messageType: "home",
    title: "Lavanderia em Itapema com Retirada e Entrega | Affetto",
    description:
      "Lavanderia especializada em cortinas, edredons, tapetes e roupas de cama. Retirada e entrega em Itapema, Balneário Camboriú, Itajaí e Porto Belo.",
    h1: "Lavanderia especializada em cortinas, edredons e tapetes em Itapema e região",
    heroText:
      "Cuidamos das suas peças com retirada e entrega, processo profissional, produtos biodegradáveis e atenção a cada detalhe. Atendemos Itapema, Balneário Camboriú, Itajaí e Porto Belo.",
    cta: "Solicitar coleta pelo WhatsApp",
    ctaSecondary: ["Conhecer os serviços", "#servicos"],
    message: messages.home,
    heroImage: "Coleta, cuidado e entrega em Itapema e região",
    heroImg: "hero-home-coleta-entrega.png",
    heroImgAlt: "Equipe Affetto realizando coleta e entrega de peças em condomínio",
    heroImgPosition: "center center",
    sections: "home"
  },
  {
    slug: "lavagem-de-cortinas",
    event: "click_whatsapp_cortinas",
    service: "cortinas",
    messageType: "cortinas",
    title: "Lavagem de Cortinas em Itapema e Região | Affetto",
    description:
      "Lavagem profissional de cortinas com retirada e entrega em Itapema, Balneário Camboriú, Itajaí e Porto Belo. Produtos biodegradáveis e inspeção cuidadosa.",
    h1: "Lavagem de cortinas com retirada e entrega em Itapema e região",
    heroText:
      "A Affetto cuida das suas cortinas com processo profissional, produtos biodegradáveis e inspeção cuidadosa antes da higienização. Atendemos Itapema, Balneário Camboriú, Itajaí e Porto Belo.",
    cta: "Enviar foto da cortina pelo WhatsApp",
    ctaSecondary: ["Ver como funciona", "#como-funciona"],
    message: messages.cortinas,
    heroImage: "Cortinas avaliadas antes da higienização",
    heroImg: "hero-cortinas.png",
    heroImgAlt: "Profissional da Affetto avaliando cortina antes da higienização",
    heroImgPosition: "center top",
    sections: "cortinas",
    faq: [
      ["Vocês retiram a cortina?", "Sim, conforme rota e disponibilidade nas cidades atendidas."],
      [
        "Vocês reinstalam a cortina?",
        "A reinstalação pode estar disponível conforme tipo de cortina, estrutura, local e região atendida. Confirmamos durante o atendimento."
      ],
      [
        "O mofo sempre sai?",
        "Nem sempre. O resultado depende do tecido, tempo da mancha, umidade acumulada e estado da peça."
      ],
      ["Quanto tempo demora?", "O prazo médio é de 3 dias úteis, podendo variar conforme volume, tipo de peça e agenda."],
      [
        "Como peço orçamento?",
        "Envie fotos da cortina, cidade e bairro pelo WhatsApp para uma orientação inicial."
      ]
    ]
  },
  {
    slug: "lavagem-de-edredons",
    event: "click_whatsapp_edredons",
    service: "edredons",
    messageType: "edredons",
    title: "Lavagem de Edredons em Itapema e Região | Affetto",
    description:
      "Lavagem profissional de edredons, cobertores, mantas e roupas de cama com retirada e entrega em Itapema, Balneário Camboriú, Itajaí e Porto Belo.",
    h1: "Lavagem de edredons e roupas de cama com retirada e entrega",
    heroText:
      "A Affetto lava edredons, cobertores, mantas, lençóis e peças volumosas com processo profissional, produtos biodegradáveis e coleta em Itapema, Balneário Camboriú, Itajaí e Porto Belo.",
    cta: "Agendar coleta pelo WhatsApp",
    ctaSecondary: ["Ver peças atendidas", "#pecas"],
    message: messages.edredons,
    heroImage: "Edredons limpos, dobrados e prontos para entrega",
    heroImg: "hero-edredons.png",
    heroImgAlt: "Profissional Affetto organizando edredons em lavanderia",
    heroImgPosition: "center center",
    sections: "edredons",
    faq: [
      ["Vocês lavam edredom king?", "Sim, conforme avaliação e disponibilidade operacional."],
      ["Vocês retiram e entregam?", "Sim, conforme rota e disponibilidade."],
      ["Quanto tempo demora?", "O prazo médio é de 3 dias úteis, podendo variar conforme volume, peça e agenda."],
      ["Posso mandar cobertor, manta e lençol junto?", "Sim. A coleta pode incluir outras roupas de cama."],
      [
        "Como peço orçamento?",
        "Informe cidade, bairro, quantidade de peças e tamanhos aproximados pelo WhatsApp."
      ]
    ]
  },
  {
    slug: "lavanderia-com-retirada-e-entrega",
    event: "click_whatsapp_retirada_entrega",
    service: "delivery",
    messageType: "retirada_entrega",
    title: "Lavanderia com Retirada e Entrega em Itapema e Região | Affetto",
    description:
      "Lavanderia com retirada e entrega em Itapema, Balneário Camboriú, Itajaí e Porto Belo. Lavagem de cortinas, edredons, tapetes e roupas de cama.",
    h1: "Lavanderia com retirada e entrega em Itapema e região",
    heroText:
      "A Affetto busca suas peças, realiza a higienização profissional e entrega de volta com praticidade, cuidado e prazo médio de 3 dias úteis. Atendemos conforme rota e disponibilidade.",
    cta: "Agendar coleta pelo WhatsApp",
    ctaSecondary: ["Ver cidades atendidas", "#cidades"],
    message: messages.retiradaEntrega,
    heroImage: "Retirada e entrega para casas, apartamentos e condomínios",
    heroImg: "hero-retirada-entrega.png",
    heroImgAlt: "Equipe Affetto realizando entrega de peças limpas em condomínio",
    heroImgPosition: "center center",
    sections: "delivery",
    faq: [
      ["A retirada tem custo?", "Depende da cidade, rota, valor do pedido e disponibilidade."],
      ["Vocês atendem meu bairro?", "Atendemos Itapema, Balneário Camboriú, Itajaí e Porto Belo conforme rota e agenda."],
      ["Preciso estar em casa?", "Depende do local. Em condomínios com portaria, pode ser possível combinar."],
      ["Qual o prazo de entrega?", "O prazo médio é de 3 dias úteis, podendo variar conforme peça, volume e agenda."],
      ["Que peças vocês buscam?", "Cortinas, edredons, roupas de cama, tapetes e outros itens têxteis conforme avaliação."]
    ]
  },
  {
    slug: "lavanderia-em-itapema",
    event: "click_whatsapp_itapema",
    service: "local",
    city: "Itapema",
    messageType: "cidade",
    title: "Lavanderia em Itapema com Retirada e Entrega | Affetto",
    description:
      "Lavanderia em Itapema especializada em cortinas, edredons, tapetes e roupas de cama. Retirada e entrega conforme rota e disponibilidade.",
    h1: "Lavanderia em Itapema com retirada e entrega",
    heroText:
      "A Affetto atende Itapema com lavagem profissional de cortinas, edredons, tapetes e roupas de cama, usando produtos biodegradáveis, processo cuidadoso e retirada conforme rota e disponibilidade.",
    cta: "Agendar coleta em Itapema",
    ctaSecondary: ["Ver serviços", "#servicos"],
    message: messages.itapema,
    heroImage: "Atendimento de lavanderia com retirada e entrega em Itapema",
    heroImg: "hero-home-coleta-entrega.png",
    heroImgAlt: "Atendimento Affetto com retirada e entrega em Itapema",
    heroImgPosition: "center center",
    sections: "itapema",
    faq: [
      ["Vocês atendem todos os bairros de Itapema?", "Depende de rota, agenda e disponibilidade."],
      ["Vocês retiram em condomínio com portaria?", "Em muitos casos, sim, conforme orientação do cliente e regras do prédio."],
      ["Qual o prazo médio em Itapema?", "O prazo médio é de 3 dias úteis, podendo variar."],
      ["Posso enviar cortinas e edredons juntos?", "Sim. A coleta pode incluir mais de um tipo de peça."],
      ["A retirada tem custo?", "Depende da rota, cidade, valor do pedido e disponibilidade."]
    ]
  },
  {
    slug: "lavanderia-em-balneario-camboriu",
    event: "click_whatsapp_bc",
    service: "local",
    city: "Balneário Camboriú",
    messageType: "cidade",
    title: "Lavanderia em Balneário Camboriú com Retirada e Entrega | Affetto",
    description:
      "Lavanderia em Balneário Camboriú para cortinas, edredons, tapetes e roupas de cama. Retirada e entrega conforme rota e disponibilidade.",
    h1: "Lavanderia em Balneário Camboriú com retirada e entrega",
    heroText:
      "A Affetto atende Balneário Camboriú com lavagem profissional de cortinas, edredons, tapetes e roupas de cama, com processo cuidadoso, produtos biodegradáveis e coleta conforme rota e disponibilidade.",
    cta: "Agendar coleta em Balneário Camboriú",
    ctaSecondary: ["Ver serviços", "#servicos"],
    message: messages.balnearioCamboriu,
    heroImage: "Atendimento para apartamentos, casas e imóveis de temporada em Balneário Camboriú",
    heroImg: "hero-cortinas.png",
    heroImgAlt: "Atendimento Affetto para cortinas e peças da casa em Balneário Camboriú",
    heroImgPosition: "center center",
    sections: "bc",
    faq: [
      ["Vocês atendem Balneário Camboriú?", "Sim, conforme rota, agenda e disponibilidade."],
      ["A coleta em Balneário Camboriú tem custo?", "Depende da rota, valor do pedido e disponibilidade."],
      ["Vocês retiram em apartamento com portaria?", "Em muitos casos, sim, conforme orientação do cliente e regras do prédio."],
      ["Posso enviar cortinas, edredons e tapetes juntos?", "Sim. A coleta pode incluir diferentes peças."],
      ["Qual o prazo médio?", "O prazo médio é de 3 dias úteis, podendo variar."]
    ]
  },
  {
    slug: "avaliacoes",
    event: "click_whatsapp_avaliacoes",
    service: "proof",
    messageType: "avaliacoes",
    title: "Avaliações da Affetto Lavanderia | Clientes e Prova Social",
    description:
      "Veja avaliações, números e provas de confiança da Affetto Lavanderia. Desde 2020, mais de 1 milhão de peças lavadas e mais de 5 mil clientes atendidos.",
    h1: "Clientes que confiam na Affetto",
    heroText:
      "Desde 2020, a Affetto cuida de cortinas, edredons, tapetes, roupas de cama e outros têxteis do lar em Itapema, Balneário Camboriú, Itajaí e Porto Belo.",
    cta: "Solicitar orçamento pelo WhatsApp",
    ctaSecondary: ["Ver serviços", "/#servicos"],
    message: messages.avaliacoes,
    heroImage: "Provas reais e atendimento regional desde 2020",
    heroImg: "avaliacoes-affetto.png",
    heroImgAlt: "Avaliações de clientes da Affetto em dispositivo móvel",
    heroImgPosition: "center center",
    sections: "avaliacoes"
  },
  {
    slug: "duvidas-frequentes",
    event: "click_whatsapp_faq",
    service: "faq",
    messageType: "faq",
    title: "Dúvidas Frequentes sobre Lavagem de Cortinas, Edredons e Tapetes | Affetto",
    description:
      "Tire dúvidas sobre lavagem de cortinas, edredons, tapetes, retirada e entrega, mofo, manchas, tecidos sensíveis e produtos biodegradáveis.",
    h1: "Dúvidas frequentes sobre os serviços da Affetto",
    heroText:
      "Veja respostas sobre lavagem de cortinas, edredons, tapetes, roupas de cama, retirada e entrega, mofo, manchas, tecidos sensíveis e produtos biodegradáveis.",
    cta: "Tirar dúvida pelo WhatsApp",
    ctaSecondary: ["Ver categorias", "#faq"],
    message: messages.faq,
    heroImage: "Respostas diretas para decidir com segurança",
    sections: "faq",
    faq: [
      ["Vocês retiram e entregam?", "Sim. A Affetto realiza retirada e entrega conforme cidade, rota, agenda e disponibilidade."],
      ["Quais cidades vocês atendem?", "Itapema, Balneário Camboriú, Itajaí e Porto Belo, conforme rota e disponibilidade."],
      ["A retirada tem custo?", "Depende da cidade, rota, valor do pedido e disponibilidade."],
      ["Vocês lavam cortinas?", "Sim, com avaliação prévia quando necessário."],
      [
        "Cortina com mofo pode ser lavada?",
        "Pode passar por avaliação. O resultado depende do tecido, tempo da mancha e estado da peça."
      ],
      ["Vocês lavam edredons?", "Sim. Edredons, cobertores, mantas, colchas e roupas de cama."],
      ["Vocês higienizam tapetes?", "Sim, conforme avaliação do material, tamanho, manchas, odores e estado."],
      [
        "Toda mancha sai?",
        "Não. Manchas antigas, oxidação, desgaste e tentativas anteriores de limpeza podem limitar o resultado."
      ],
      [
        "Vocês usam produtos naturais?",
        "A Affetto utiliza produtos profissionais biodegradáveis e adequados ao processo de lavanderia. Não trabalha com misturas caseiras."
      ],
      ["Qual é o prazo médio?", "3 dias úteis, podendo variar conforme peça, volume e agenda."],
      ["Como faço orçamento?", "Pelo WhatsApp, com cidade, bairro, tipo de peça, quantidade e fotos quando possível."]
    ]
  }
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pagePath(page) {
  return page.slug ? `/${page.slug}/` : "/";
}

function canonical(page) {
  return `${SITE_URL}${page.slug ? `/${page.slug}/` : "/"}`;
}

function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

function imgPath(page, filename) {
  return `${page.slug ? "../" : ""}assets/images/${filename}`;
}

function waAttrs(page, ctaLocation = "content") {
  return [
    `href="${whatsappUrl(page.message)}"`,
    `target="_blank"`,
    `rel="noopener noreferrer"`,
    `data-whatsapp-url="${whatsappUrl(page.message)}"`,
    `data-event="${page.event}"`,
    `data-page="${pagePath(page)}"`,
    `data-service="${page.service}"`,
    page.city ? `data-city="${escapeHtml(page.city)}"` : "",
    `data-cta-location="${escapeHtml(ctaLocation)}"`,
    `data-message-type="${page.messageType}"`,
    `data-whatsapp-message="${escapeHtml(page.message)}"`
  ]
    .filter(Boolean)
    .join(" ");
}

function waIcon() {
  return `<svg class="wa-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M12.04 4.5a7.43 7.43 0 0 0-6.35 11.28l.3.49-.54 2 2.06-.54.48.28A7.44 7.44 0 1 0 12.04 4.5Z" stroke="currentColor" stroke-width="1.8"/><path d="M9.56 8.55c-.15-.33-.3-.34-.44-.35h-.38c-.13 0-.34.05-.52.25-.18.2-.69.68-.69 1.66s.71 1.92.82 2.05c.1.13 1.4 2.13 3.39 2.99 1.68.72 2.02.58 2.39.54.36-.05 1.16-.48 1.32-.94.16-.46.16-.85.11-.94-.05-.08-.18-.13-.38-.23l-1.36-.67c-.2-.1-.34-.15-.49.15-.15.3-.56.67-.69.82-.13.15-.25.16-.46.05-.2-.1-.86-.32-1.64-1.01-.61-.54-1.02-1.2-1.14-1.41-.12-.2-.01-.31.09-.41.09-.09.2-.24.3-.36.1-.13.13-.21.2-.35.07-.13.03-.25-.02-.35l-.61-1.49Z" fill="currentColor"/></svg>`;
}

function header(page) {
  return `<header class="site-header">
  <div class="container nav-wrap">
    <a class="brand" href="/" aria-label="Affetto Lavanderia">
      <strong>Affetto</strong>
      <span>Lavanderia</span>
    </a>
    <nav class="nav-links" data-nav aria-label="Navegação principal">
      ${nav.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}
    </nav>
    <a class="button button-primary nav-cta" ${waAttrs(page, "header")}>${waIcon()} WhatsApp</a>
    <button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-label="Abrir menu">
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M5 7h14M5 12h14M5 17h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
    </button>
  </div>
</header>`;
}

function hero(page) {
  const secondary = page.ctaSecondary
    ? `<a class="button button-secondary" href="${page.ctaSecondary[1]}">${page.ctaSecondary[0]}</a>`
    : "";
  return `<section class="hero">
  <div class="container">
    <div class="hero-grid">
      <div data-reveal>
        <span class="eyebrow">Affetto Lavanderia</span>
        <h1>${escapeHtml(page.h1)}</h1>
        <p class="lead">${escapeHtml(page.heroText)}</p>
        <div class="hero-actions">
          <a class="button button-primary" ${waAttrs(page, "hero")}>${waIcon()} ${escapeHtml(page.cta)}</a>
          ${secondary}
        </div>
      </div>
      <div class="hero-media" data-reveal>
        ${page.heroImg
          ? `<img src="${imgPath(page, page.heroImg)}" alt="${escapeHtml(page.heroImgAlt)}" width="1200" height="675" loading="eager" decoding="async"${page.heroImgPosition && page.heroImgPosition !== "center center" ? ` style="object-position:${page.heroImgPosition}"` : ""}>`
          : `<!-- Substituir por foto ou vídeo real da Affetto relacionado a esta página. -->
        <div class="photo-placeholder">
          <strong>${escapeHtml(page.heroImage)}</strong>
          <span>Espaço preparado para imagem real da operação, equipe, coleta ou peça higienizada.</span>
        </div>`}
      </div>
    </div>
    ${proofBar()}
  </div>
</section>`;
}

function proofBar() {
  return `<div class="proof-bar" aria-label="Provas rápidas da Affetto">
  ${proof.map(([title, text]) => `<div class="proof-item"><strong>${title}</strong><span>${text}</span></div>`).join("")}
</div>`;
}

function sectionHeader(title, text) {
  return `<div class="section-header" data-reveal><h2>${escapeHtml(title)}</h2>${text ? `<p>${escapeHtml(text)}</p>` : ""}</div>`;
}

function serviceCards(page) {
  const cards = [
    {
      title: "Cortinas",
      text: "Lavagem profissional de cortinas com avaliação da peça, retirada e entrega na região.",
      href: "/lavagem-de-cortinas/",
      cta: "Ver lavagem de cortinas",
      img: "card-cortinas.png",
      imgAlt: "Profissional da Affetto avaliando cortina em ambiente residencial"
    },
    {
      title: "Edredons e roupas de cama",
      text: "Higienização de edredons, cobertores, mantas, lençóis e peças volumosas.",
      href: "/lavagem-de-edredons/",
      cta: "Ver lavagem de edredons",
      img: "card-edredons.png",
      imgAlt: "Edredom limpo e dobrado em lavanderia profissional Affetto"
    },
    {
      title: "Tapetes",
      text: "Higienização de tapetes conforme avaliação do material, manchas, odores e condições da peça.",
      href: "/duvidas-frequentes/#tapetes",
      cta: "Tirar dúvidas sobre tapetes",
      img: "card-tapetes.png",
      imgAlt: "Profissional da Affetto avaliando tapete em processo de higienização"
    }
  ];
  return `<div class="grid-3">
    ${cards
      .map(
        (card) => `<article class="card" data-reveal>
        <div class="service-thumb">
          <img src="${imgPath(page, card.img)}" alt="${escapeHtml(card.imgAlt)}" width="800" height="450" loading="lazy" decoding="async">
        </div>
        <h3>${card.title}</h3>
        <p>${card.text}</p>
        <a class="card-link" href="${card.href}">${card.cta}</a>
      </article>`
      )
      .join("")}
  </div>`;
}

function steps(items) {
  return `<div class="steps">
  ${items.map(([title, text]) => `<div class="step" data-reveal><h3>${title}</h3><p>${text}</p></div>`).join("")}
</div>`;
}

function faqList(faq) {
  return `<div class="faq-list">
  ${faq
    .map(
      ([question, answer], index) => `<div class="faq-item${index === 0 ? " is-open" : ""}" id="${slugify(question)}">
      <button class="faq-question" type="button" data-faq-toggle aria-expanded="${index === 0 ? "true" : "false"}"><span>${escapeHtml(question)}</span></button>
      <div class="faq-answer"${index === 0 ? "" : " hidden"}><p>${escapeHtml(answer)}</p></div>
    </div>`
    )
    .join("")}
</div>`;
}

function slugify(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function homeSections(page) {
  const quickFaq = [
    ["Vocês retiram e entregam?", "Sim. A Affetto realiza retirada e entrega conforme cidade, rota, agenda e disponibilidade."],
    ["Qual é o prazo médio?", "O prazo médio é de 3 dias úteis, podendo variar conforme tipo de peça, volume e agenda."],
    [
      "Vocês lavam cortinas com mofo?",
      "Cortinas com mofo passam por avaliação. O resultado depende do tecido, tempo da mancha, umidade acumulada e estado da peça."
    ],
    [
      "Vocês usam produtos naturais?",
      "Utilizamos produtos profissionais biodegradáveis, adequados ao processo de lavanderia. Não trabalhamos com misturas caseiras."
    ],
    ["Atendem condomínios com portaria?", "Em muitos casos, sim, conforme orientação do cliente e regras do condomínio."]
  ];
  return `
<section class="section section-white" id="servicos">
  <div class="container">
    ${sectionHeader("O que você pode lavar com a Affetto", "Serviços especializados para peças importantes da casa, com praticidade do início ao fim.")}
    ${serviceCards(page)}
  </div>
</section>
<section class="section" id="como-funciona">
  <div class="container">
    ${sectionHeader("Como funciona", "Você solicita pelo WhatsApp, a Affetto organiza a retirada, higieniza suas peças e entrega tudo pronto.")}
    ${steps([
      ["Solicite pelo WhatsApp", "Informe sua cidade, bairro e quais peças deseja lavar."],
      ["Agendamos a retirada", "Organizamos a coleta conforme rota, agenda e disponibilidade."],
      ["Higienizamos com cuidado", "Processo profissional, produtos biodegradáveis e atenção ao tipo de material."],
      ["Entregamos suas peças", "Prazo médio de 3 dias úteis, conforme peça, volume e agenda."]
    ])}
  </div>
</section>
<section class="section section-white">
  <div class="container split">
    <div data-reveal>
      <span class="eyebrow">Processo profissional</span>
      <h2>Cuidado profissional para peças importantes da sua casa</h2>
      <p class="lead">A Affetto não trabalha com soluções improvisadas. Somos uma lavanderia especializada, com processo, equipe e estrutura para cuidar de têxteis do lar.</p>
    </div>
    <div class="grid-2">
      ${[
        ["Produtos biodegradáveis", "Produtos profissionais biodegradáveis e adequados ao processo de lavanderia."],
        ["Inspeção cuidadosa", "Avaliamos manchas, mofo, desgaste e tecidos sensíveis quando necessário."],
        ["Retirada e entrega", "Mais praticidade para casas, apartamentos, condomínios e rotinas corridas."],
        ["Atendimento regional", "Itapema, Balneário Camboriú, Itajaí e Porto Belo conforme rota e disponibilidade."]
      ]
        .map(([title, text]) => `<article class="card" data-reveal><h3>${title}</h3><p>${text}</p></article>`)
        .join("")}
    </div>
  </div>
</section>
<section class="section">
  <div class="container split">
    <div class="visual-panel" data-reveal>
      <img src="${imgPath(page, "bastidor-affetto.png")}" alt="Bastidor da lavanderia Affetto com peças limpas e organizadas" width="1200" height="675" loading="lazy" decoding="async" style="object-position:30% center">
    </div>
    <div data-reveal>
      <h2>Uma lavanderia local, especializada e próxima da sua rotina</h2>
      <p class="lead">Desde 2020, a Affetto atende clientes que valorizam praticidade, qualidade e confiança no cuidado com cortinas, edredons, tapetes e roupas de cama.</p>
      <div class="section-actions"><a class="button button-primary" ${waAttrs(page)}>${waIcon()} Falar com a Affetto</a></div>
    </div>
  </div>
</section>
${citiesSection(page)}
<section class="section section-white" id="avaliacoes">
  <div class="container reviews-strip">
    <div class="card card-accent" data-reveal><span class="big-number">5.000+</span><p>clientes atendidos desde 2020, com reputação local construída em atendimento, cuidado e qualidade.</p></div>
    <div data-reveal>
      <h2>Clientes que confiam na Affetto</h2>
      <p class="lead">Nossa reputação local é construída com atendimento, cuidado e qualidade na entrega de cada peça.</p>
      <div class="section-actions"><a class="button button-secondary" href="/avaliacoes/">Ver avaliações</a></div>
    </div>
  </div>
</section>
<section class="section" id="duvidas">
  <div class="container">
    ${sectionHeader("Dúvidas frequentes", "Respostas curtas para as principais dúvidas antes de solicitar uma coleta.")}
    ${faqList(quickFaq)}
    <div class="section-actions"><a class="button button-secondary" href="/duvidas-frequentes/">Ver dúvidas frequentes</a></div>
  </div>
</section>
${ctaFinal(page, "Quer agendar uma coleta?", "Fale com a Affetto pelo WhatsApp, informe sua cidade, bairro e as peças que deseja lavar. Nossa equipe orienta orçamento, retirada e prazo.")}`;
}

function citiesSection(page) {
  const cities = [
    ["Itapema", "/lavanderia-em-itapema/", "Praça principal, com atendimento conforme rota e disponibilidade."],
    ["Balneário Camboriú", "/lavanderia-em-balneario-camboriu/", "Atendimento para apartamentos, casas e imóveis de temporada."],
    ["Itajaí", "/lavanderia-com-retirada-e-entrega/", "Consulte disponibilidade de rota para seu bairro."],
    ["Porto Belo", "/lavanderia-com-retirada-e-entrega/", "Coleta e entrega conforme agenda regional."]
  ];
  return `<section class="section section-white" id="cidades">
  <div class="container">
    ${sectionHeader("Atendemos Itapema e região", "Consulte a disponibilidade de retirada e entrega para sua cidade e bairro.")}
    <div class="grid-4">
      ${cities
        .map(
          ([city, href, text]) => `<article class="city-card" data-reveal><div><h3>${city}</h3><p>${text}</p></div><a class="card-link" href="${href}">Ver atendimento</a></article>`
        )
        .join("")}
    </div>
    <p class="note">O atendimento depende de rota, agenda e disponibilidade para cada região.</p>
    <div class="section-actions"><a class="button button-primary" ${waAttrs(page)}>${waIcon()} Consultar minha cidade pelo WhatsApp</a></div>
  </div>
</section>`;
}

function ctaFinal(page, title, text) {
  return `<section class="section">
  <div class="container">
    <div class="cta-band" data-reveal>
      <h2>${escapeHtml(title)}</h2>
      <p>${escapeHtml(text)}</p>
      <div class="section-actions"><a class="button button-primary" ${waAttrs(page, "final_cta")}>${waIcon()} ${escapeHtml(page.cta)}</a></div>
    </div>
  </div>
</section>`;
}

function standardLanding(page, config) {
  return `
<section class="section section-white">
  <div class="container split">
    <div data-reveal>
      <span class="eyebrow">${escapeHtml(config.eyebrow)}</span>
      <h2>${escapeHtml(config.problemTitle)}</h2>
      <p class="lead">${escapeHtml(config.problemText)}</p>
    </div>
    <div class="card" data-reveal>
      <h3>Pontos de atenção</h3>
      <ul class="list-clean">${config.points.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </div>
  </div>
</section>
<section class="section" id="como-funciona">
  <div class="container">
    ${sectionHeader("Como funciona", config.stepsIntro)}
    ${steps(config.steps)}
    <div class="section-actions"><a class="button button-primary" ${waAttrs(page)}>${waIcon()} ${escapeHtml(config.midCta)}</a></div>
  </div>
</section>
<section class="section section-white" id="${config.anchor || "pecas"}">
  <div class="container">
    ${sectionHeader(config.featureTitle, config.featureText)}
    <div class="grid-3">${config.features
      .map(([title, text]) => `<article class="card" data-reveal><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`)
      .join("")}</div>
  </div>
</section>
${config.extra || ""}
${citiesSection(page)}
<section class="section" id="faq">
  <div class="container">
    ${sectionHeader("Dúvidas frequentes", "Respostas diretas para seguir com orçamento pelo WhatsApp.")}
    ${faqList(page.faq)}
  </div>
</section>
${ctaFinal(page, config.finalTitle, config.finalText)}`;
}

function pageSections(page) {
  if (page.sections === "home") return homeSections(page);
  if (page.sections === "cortinas") {
    return standardLanding(page, {
      eyebrow: "Cortinas",
      problemTitle: "Cortinas acumulam poeira, umidade e sinais de mofo com o tempo",
      problemText:
        "No litoral, é comum que cortinas acumulem poeira, odor de umidade e sinais de mofo, principalmente em casas, apartamentos e imóveis que ficam fechados por períodos mais longos.",
      points: ["Poeira acumulada", "Odor de ambiente fechado", "Sinais de mofo", "Manchas aparentes", "Tecido sensível", "Transporte e secagem"],
      stepsIntro: "Envie uma foto pelo WhatsApp e a equipe orienta orçamento, retirada e prazo.",
      steps: [
        ["Envie uma foto", "Mande uma foto da cortina pelo WhatsApp e informe cidade e bairro."],
        ["Receba orientação", "A equipe avalia as informações iniciais e orienta orçamento e retirada."],
        ["Agendamos a coleta", "Retirada organizada conforme cidade, rota e disponibilidade."],
        ["Higienizamos e entregamos", "Processo profissional e prazo médio de 3 dias úteis."]
      ],
      midCta: "Solicitar orientação pelo WhatsApp",
      featureTitle: "Inspeção cuidadosa antes da higienização",
      featureText:
        "Antes da lavagem, avaliamos sinais de mofo, manchas, desgaste, fragilidade do tecido e possíveis riscos. Quando identificamos alguma condição sensível, avisamos o cliente antes de seguir.",
      features: [
        ["Avaliação prévia", "Atenção a manchas, mofo, desgaste e tecidos sensíveis quando necessário."],
        ["Produtos biodegradáveis", "Produtos profissionais biodegradáveis e adequados ao processo de lavanderia."],
        ["Comunicação transparente", "Sem promessa absoluta de resultado sem avaliação da peça."]
      ],
      extra: `<section class="section"><div class="container">${sectionHeader("Aproveite a coleta", "Além das cortinas, você pode enviar edredons, cobertores, mantas, lençóis, travesseiros, tapetes e roupas de cama.")}<div class="section-actions"><a class="button button-secondary" href="/lavagem-de-edredons/">Ver lavagem de edredons</a><a class="button button-primary" ${waAttrs(page)}>${waIcon()} Enviar outras peças junto</a></div></div></section>`,
      finalTitle: "Quer lavar suas cortinas com praticidade e segurança?",
      finalText: "Envie uma foto da cortina pelo WhatsApp e nossa equipe orienta orçamento, retirada e prazo."
    });
  }
  if (page.sections === "edredons") {
    return standardLanding(page, {
      eyebrow: "Edredons e roupas de cama",
      problemTitle: "Edredons e peças volumosas precisam de estrutura adequada",
      problemText:
        "Edredons, cobertores e mantas são peças grandes, difíceis de lavar em máquinas comuns e exigem secagem adequada para evitar cheiro de umidade.",
      points: ["Peças grandes e pesadas", "Dificuldade de lavar em casa", "Risco de cheiro de umidade", "Acúmulo de suor, poeira e odores", "Troca de estação"],
      stepsIntro: "A coleta facilita a rotina e evita transportar peças volumosas.",
      steps: [
        ["Chame no WhatsApp", "Informe cidade, bairro e peças."],
        ["Agendamos a coleta", "Conforme rota, agenda e disponibilidade."],
        ["Higienizamos as peças", "Processo profissional com produtos biodegradáveis."],
        ["Entregamos prontas", "Prazo médio de 3 dias úteis, conforme volume e agenda."]
      ],
      midCta: "Agendar minha coleta",
      featureTitle: "Peças atendidas",
      featureText: "Edredons, cobertores, mantas, colchas, cobre-leitos, lençóis, fronhas, travesseiros conforme avaliação e roupas de cama em geral.",
      features: [
        ["Retirada e entrega", "Você não precisa carregar peças grandes."],
        ["Secagem adequada", "Ajuda a reduzir risco de cheiro de umidade."],
        ["Troca de estação", "Ideal antes de usar, depois do inverno ou antes de guardar novamente."]
      ],
      extra: `<section class="section"><div class="container">${sectionHeader("Aproveite a coleta", "Na mesma retirada, você pode enviar cortinas, tapetes, mantas, cobertores, lençóis, fronhas, travesseiros e roupas de inverno.")}<div class="section-actions"><a class="button button-secondary" href="/lavagem-de-cortinas/">Ver lavagem de cortinas</a><a class="button button-primary" ${waAttrs(page)}>${waIcon()} Consultar outras peças</a></div></div></section>`,
      finalTitle: "Quer agendar a lavagem dos seus edredons?",
      finalText: "Fale com a Affetto pelo WhatsApp, informe cidade, bairro e peças."
    });
  }
  if (page.sections === "delivery") {
    return standardLanding(page, {
      eyebrow: "Retirada e entrega",
      problemTitle: "Cuide das peças da casa sem sair de casa",
      problemText:
        "Se você precisa lavar cortinas, edredons, tapetes ou roupas de cama, mas não quer desmontar, carregar ou transportar peças grandes, a Affetto organiza a retirada e entrega para facilitar sua rotina.",
      points: ["Casas e apartamentos", "Condomínios com portaria", "Famílias e governantas", "Imóveis de temporada", "Peças grandes ou volumosas", "Rotina corrida"],
      stepsIntro: "A coleta é combinada conforme cidade, bairro, rota e disponibilidade.",
      steps: [
        ["Solicite pelo WhatsApp", "Informe cidade, bairro e peças."],
        ["Combinamos a retirada", "Conforme rota, agenda e disponibilidade."],
        ["Higienizamos suas peças", "Processo profissional com produtos biodegradáveis."],
        ["Entregamos de volta", "Prazo médio de 3 dias úteis, conforme peça e agenda."]
      ],
      midCta: "Solicitar coleta agora",
      featureTitle: "Peças que você pode enviar",
      featureText: "Cortinas, edredons, roupas de cama, tapetes residenciais e outras peças têxteis conforme orientação.",
      features: [
        ["Cortinas", "Cortinas de tecido, voal, blackout e peças volumosas, conforme avaliação."],
        ["Edredons", "Solteiro, casal, queen e king, além de mantas e cobertores."],
        ["Condomínios e portaria", "Em muitos casos, é possível combinar conforme regras do local."]
      ],
      anchor: "pecas",
      finalTitle: "Quer agendar uma coleta?",
      finalText: "Fale com a Affetto pelo WhatsApp, informe cidade, bairro e peças."
    });
  }
  if (page.sections === "itapema" || page.sections === "bc") {
    const city = page.city;
    return `<section class="section section-white" id="servicos"><div class="container">${sectionHeader(`Serviços em ${city}`, "Cortinas, edredons, tapetes, roupas de cama e retirada conforme rota e disponibilidade.")}${serviceCards(page)}</div></section>
<section class="section" id="como-funciona"><div class="container">${sectionHeader("Como funciona", `Informe bairro e peças pelo WhatsApp para consultar rota em ${city}.`)}${steps([
      ["Chame pelo WhatsApp", "Informe bairro, peças e necessidade."],
      ["Confirmamos a rota", "Verificamos agenda e disponibilidade."],
      ["Coletamos as peças", "Retirada combinada conforme acesso ao local e rota."],
      ["Entregamos prontas", "Prazo médio de 3 dias úteis, conforme peça e agenda."]
    ])}<div class="section-actions"><a class="button button-primary" ${waAttrs(page)}>${waIcon()} Consultar rota em ${city}</a></div></div></section>
<section class="section section-white"><div class="container split"><div data-reveal><h2>Casas, apartamentos e condomínios</h2><p class="lead">A Affetto atende clientes que buscam praticidade no cuidado com cortinas, edredons, tapetes e roupas de cama. Em condomínios com portaria, pode ser possível combinar a retirada conforme orientação do cliente e regras do prédio.</p></div><div class="card" data-reveal><h3>Diferenciais</h3><ul class="list-clean"><li>Especialização em têxteis do lar.</li><li>Produtos profissionais biodegradáveis.</li><li>Inspeção cuidadosa quando necessário.</li><li>Experiência local desde 2020.</li></ul></div></div></section>
<section class="section" id="faq"><div class="container">${sectionHeader("Dúvidas frequentes", `Perguntas comuns sobre atendimento em ${city}.`)}${faqList(page.faq)}</div></section>
${ctaFinal(page, `Quer agendar uma coleta em ${city}?`, "Fale com a Affetto pelo WhatsApp, informe bairro e peças para consultar rota, prazo e disponibilidade.")}`;
  }
  if (page.sections === "avaliacoes") {
    return `<section class="section section-white"><div class="container">${sectionHeader("O que os clientes dizem sobre a Affetto", "A reputação da Affetto é construída no atendimento, no cuidado com as peças e na entrega de uma experiência prática para o cliente.")}<div class="grid-3"><article class="card" data-reveal><div class="service-thumb"><img src="${imgPath(page, "avaliacoes-affetto.png")}" alt="Avaliações de clientes da Affetto no Google" width="800" height="450" loading="lazy" decoding="async"></div><h3>Avaliações no Google</h3><p>Clientes que avaliaram os serviços da Affetto. Inserir prints reais autorizados antes da publicação final.</p></article><article class="card" data-reveal><h3>Prova por serviço</h3><p>Cortinas, edredons, tapetes e retirada com links para as páginas principais.</p><a class="card-link" href="/lavagem-de-cortinas/">Ver cortinas</a></article><article class="card" data-reveal><h3>Atendimento regional</h3><p>Itapema, Balneário Camboriú, Itajaí e Porto Belo conforme rota e disponibilidade.</p></article></div></div></section>
<section class="section"><div class="container">${sectionHeader("Números da Affetto", "Provas objetivas de operação e confiança local.")}<div class="grid-4">${proof.map(([title, text]) => `<article class="card" data-reveal><span class="big-number">${title}</span><p>${text}</p></article>`).join("")}</div></div></section>
<section class="section section-white"><div class="container split"><div data-reveal><h2>Nosso compromisso</h2><p class="lead">Processo profissional, produtos biodegradáveis, comunicação transparente, inspeção cuidadosa quando necessário e atendimento pelo WhatsApp.</p></div><div class="card" data-reveal><h3>Provas por serviço</h3><ul class="list-clean"><li><a href="/lavagem-de-cortinas/">Lavagem de cortinas</a></li><li><a href="/lavagem-de-edredons/">Lavagem de edredons</a></li><li><a href="/lavanderia-com-retirada-e-entrega/">Retirada e entrega</a></li><li><a href="/duvidas-frequentes/">Dúvidas frequentes</a></li></ul></div></div></section>
${ctaFinal(page, "Quer solicitar um orçamento?", "Fale com a Affetto pelo WhatsApp, informe cidade, bairro e peças.")}`;
  }
  if (page.sections === "faq") {
    return `<section class="section section-white" id="faq"><div class="container">${sectionHeader("Categorias de dúvidas", "Retirada e entrega, cortinas, edredons, tapetes, mofo, manchas, tecidos sensíveis, produtos biodegradáveis, prazo e orçamento.")}${faqList(page.faq)}</div></section>${ctaFinal(page, "Ainda ficou com dúvida?", "Envie sua pergunta pelo WhatsApp com cidade, bairro e tipo de peça. A equipe orienta com transparência.")}`;
  }
  return "";
}

function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.company.name,
    description: siteConfig.structuredData.description,
    areaServed: siteConfig.cities,
    url: SITE_URL,
    sameAs: [],
    telephone: siteConfig.company.phoneDisplay,
    foundingDate: siteConfig.company.foundingDate,
    priceRange: siteConfig.company.priceRange
  };
}

function faqSchema(page) {
  if (!page.faq) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer
      }
    }))
  };
}

function publicRuntimeConfig() {
  return `<script>
window.AFFETTO_SITE_CONFIG = ${JSON.stringify({
    siteUrl: SITE_URL,
    appEnv: APP_ENV,
    enableTracking: ENABLE_TRACKING,
    whatsappPhone: WHATSAPP_PHONE,
    companyName: siteConfig.company.name
  })};
window.dataLayer = window.dataLayer || [];
</script>`;
}

function trackingHead() {
  if (!ENABLE_TRACKING) return "";
  const parts = [];

  if (GTM_ID) {
    parts.push(`<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');</script>
<!-- End Google Tag Manager -->`);
  }

  if (GA4_ID) {
    parts.push(`<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA4_ID}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}');</script>
<!-- End Google Analytics 4 -->`);
  }

  if (META_PIXEL_ID) {
    parts.push(`<!-- Meta Pixel -->
<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');</script>
<!-- End Meta Pixel -->`);
  }

  return parts.join("\n  ");
}

function trackingBodyStart() {
  if (!ENABLE_TRACKING) return "";
  const parts = [];
  if (GTM_ID) {
    parts.push(`<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`);
  }
  if (META_PIXEL_ID) {
    parts.push(`<noscript><img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1"></noscript>`);
  }
  return parts.join("\n");
}

function html(page) {
  const schema = [page.slug === "" ? localBusinessSchema() : null, faqSchema(page)].filter(Boolean);
  const ogImage = siteConfig.assets.ogImage ? `${SITE_URL}${siteConfig.assets.ogImage}` : "";
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <link rel="canonical" href="${canonical(page)}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="Affetto Lavanderia">
  <meta property="og:title" content="${escapeHtml(page.title)}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:url" content="${canonical(page)}">
  ${ogImage ? `<meta property="og:image" content="${escapeHtml(ogImage)}">` : ""}
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${page.slug ? "../" : ""}styles.css">
  ${publicRuntimeConfig()}
  ${trackingHead()}
  ${schema.map((item) => `<script type="application/ld+json">${JSON.stringify(item)}</script>`).join("\n  ")}
</head>
<body>
${trackingBodyStart()}
${header(page)}
<main>
${hero(page)}
${pageSections(page)}
</main>
${footer(page)}
<script src="${page.slug ? "../" : ""}main.js" defer></script>
</body>
</html>
`;
}

function footer(page) {
  return `<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <a class="brand" href="/"><strong>Affetto</strong><span>Lavanderia</span></a>
      <p>Lavanderia especializada em cortinas, edredons, tapetes e roupas de cama, com retirada e entrega em Itapema, Balneário Camboriú, Itajaí e Porto Belo.</p>
    </div>
    <div><h3>Serviços</h3><div class="footer-links"><a href="/lavagem-de-cortinas/">Cortinas</a><a href="/lavagem-de-edredons/">Edredons</a><a href="/lavanderia-com-retirada-e-entrega/">Retirada e entrega</a></div></div>
    <div><h3>Cidades</h3><div class="footer-links"><a href="/lavanderia-em-itapema/">Itapema</a><a href="/lavanderia-em-balneario-camboriu/">Balneário Camboriú</a><a href="/lavanderia-com-retirada-e-entrega/">Itajaí e Porto Belo</a></div></div>
    <div><h3>Contato</h3><div class="footer-links"><a ${waAttrs(page, "footer")}>WhatsApp</a><a href="/avaliacoes/">Avaliações</a><a href="/duvidas-frequentes/">Dúvidas frequentes</a></div></div>
  </div>
  <a class="button button-primary sticky-whatsapp" ${waAttrs(page, "sticky_whatsapp")}>${waIcon()} WhatsApp</a>
</footer>`;
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

["assets/images", "assets/videos", "assets/reviews", "assets/placeholders"].forEach((dir) => {
  fs.mkdirSync(path.join(process.cwd(), dir), { recursive: true });
});

for (const page of pages) {
  const filePath = page.slug ? path.join(process.cwd(), page.slug, "index.html") : path.join(process.cwd(), "index.html");
  writeFile(filePath, html(page));
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${canonical(page)}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page.slug ? "0.8" : "1.0"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

writeFile(path.join(process.cwd(), "sitemap.xml"), sitemap);
writeFile(
  path.join(process.cwd(), "robots.txt"),
  `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
);

writeFile(
  path.join(process.cwd(), "README_SITE.md"),
  `# Site Affetto Lavanderia

Site estatico multi-page criado a partir de \`affetto_site_package\`, sem framework e sem dependencias externas de build.

## Como rodar localmente

\`\`\`bash
npm run build
npm run start
\`\`\`

Abra \`http://localhost:4173\` ou \`http://127.0.0.1:4173\`.

## Como fazer build

\`\`\`bash
npm run build
\`\`\`

O build gera as paginas HTML, \`sitemap.xml\`, \`robots.txt\` e atualiza este README a partir de \`scripts/build-site.js\`.

## Como fazer build de staging

1. Copie \`.env.staging.example\` para \`.env.staging\`.
2. Substitua \`SITE_URL\` pela URL real de staging (ex: URL do Vercel, Netlify ou subdominio customizado).
3. Rode o build:

\`\`\`bash
npm run build:staging
\`\`\`

O build lerá automaticamente \`.env.staging\` e usará a URL de staging em canonical, OG, sitemap e robots.

Confirmar apos o build:
- \`<link rel="canonical"\` usa a URL de staging.
- \`<loc>\` no sitemap.xml usa a URL de staging.
- \`Sitemap:\` no robots.txt usa a URL de staging.
- WhatsApp continua usando 5547997655025.
- Tracking permanece desativado (ENABLE_TRACKING=false).

## Como publicar

Publique a raiz do projeto como site estatico:

- \`index.html\`
- pastas de rotas, como \`lavagem-de-cortinas/index.html\`
- \`styles.css\`
- \`main.js\`
- \`assets/\`
- \`sitemap.xml\`
- \`robots.txt\`

### Deploy via Vercel (recomendado para staging rapido)

Arquivo \`vercel.json\` ja esta configurado na raiz do projeto.

1. Instalar Vercel CLI (opcional, uma vez): \`npm i -g vercel\`
2. No diretorio raiz: \`vercel\`
3. Seguir o wizard: framework = Other, build command = \`npm run build\`, output = \`.\ (ponto)\`
4. Definir as variaveis de ambiente no dashboard Vercel:
   - \`SITE_URL\` = URL do projeto Vercel gerada (ex: \`https://affetto-lavanderia.vercel.app\`)
   - \`WHATSAPP_PHONE\` = \`5547997655025\`
   - \`ENABLE_TRACKING\` = \`false\`
   - \`APP_ENV\` = \`staging\`
5. Fazer redeploy para que as variaveis sejam aplicadas.
6. Apontar \`SITE_URL\` para o dominio customizado quando disponivel.

### Deploy via Netlify

Arquivo \`netlify.toml\` ja esta configurado na raiz do projeto.

1. Instalar Netlify CLI (opcional): \`npm i -g netlify-cli\`
2. No diretorio raiz: \`netlify deploy --build\`
3. Definir as variaveis de ambiente no dashboard Netlify (Site settings > Environment):
   - \`SITE_URL\`, \`WHATSAPP_PHONE\`, \`ENABLE_TRACKING\`, \`APP_ENV\`
4. Para producao: \`netlify deploy --build --prod\`

### Deploy manual (qualquer provedor de hospedagem estatica)

1. Rodar \`npm run build\` (ou \`build:staging\` para staging) com as variaveis corretas.
2. Enviar todos os arquivos da raiz do projeto para o servidor (exceto \`.env*\`, \`node_modules/\`, pastas auxiliares).
3. Configurar o servidor para servir \`index.html\` em cada diretorio (ex: Apache \`DirectoryIndex index.html\`, Nginx \`try_files\`).
4. Garantir que a URL de staging esta correta em \`SITE_URL\` antes do build.

## Estrutura

- \`.env.example\`: exemplo seguro das variaveis de ambiente.
- \`site.config.js\`: dados publicos versionados, defaults e mensagens de WhatsApp.
- \`styles.css\`: design system, componentes e responsivo.
- \`main.js\`: menu mobile, accordion, tracking e UTMs nos links de WhatsApp.
- \`scripts/build-site.js\`: conteudo, SEO, schema, tracking condicional e geracao das paginas estaticas.
- \`index.html\` e pastas de rotas: paginas publicas geradas.
- \`sitemap.xml\` e \`robots.txt\`: SEO tecnico basico.
- \`assets/images/\`: fotos reais da operacao, equipe e pecas.
- \`assets/videos/\`: videos curtos reais.
- \`assets/reviews/\`: prints reais de avaliacoes do Google.
- \`assets/placeholders/README.md\`: mapa de substituicao dos placeholders.

## Configuracao

As variaveis podem ser passadas pelo ambiente no momento do build ou em um arquivo local \`.env\` que nao deve ser versionado. O fallback seguro fica em \`site.config.js\`.

\`\`\`bash
SITE_URL=${SITE_URL}
WHATSAPP_PHONE=${WHATSAPP_PHONE}
ENABLE_TRACKING=${ENABLE_TRACKING}
GTM_ID=${GTM_ID}
GA4_ID=${GA4_ID}
META_PIXEL_ID=${META_PIXEL_ID}
APP_ENV=${APP_ENV}
\`\`\`

## Onde trocar o WhatsApp

Numero atual: ${siteConfig.company.phoneDisplay}

Env:

\`\`\`bash
WHATSAPP_PHONE=5547997655025
\`\`\`

Fallback versionado: \`site.config.js > defaults.whatsappPhone\`.

## Onde trocar dominio

Dominio atual:

\`\`\`bash
SITE_URL=${SITE_URL}
\`\`\`

Fallback versionado: \`site.config.js > defaults.siteUrl\`.

O \`SITE_URL\` alimenta canonical, Open Graph URL, sitemap, robots e schema LocalBusiness.

## Como ativar tracking

Por padrao, tracking fica desligado e nenhum script de GTM/GA4/Meta e carregado.

### GTM

\`\`\`bash
ENABLE_TRACKING=true
GTM_ID=GTM-XXXXXXX
npm run build
\`\`\`

### GA4

\`\`\`bash
ENABLE_TRACKING=true
GA4_ID=G-XXXXXXXXXX
npm run build
\`\`\`

### Meta Pixel

\`\`\`bash
ENABLE_TRACKING=true
META_PIXEL_ID=000000000000000
npm run build
\`\`\`

Nao usar IDs inventados. Se \`ENABLE_TRACKING=false\` ou os IDs estiverem vazios, os scripts nao sao injetados.

## Eventos de tracking

Todos os CTAs de WhatsApp enviam payload para \`window.dataLayer\` antes de abrir o link:

- \`click_whatsapp_home\`
- \`click_whatsapp_cortinas\`
- \`click_whatsapp_edredons\`
- \`click_whatsapp_retirada_entrega\`
- \`click_whatsapp_itapema\`
- \`click_whatsapp_bc\`
- \`click_whatsapp_avaliacoes\`
- \`click_whatsapp_faq\`

Payload minimo: \`event\`, \`page_path\`, \`page_title\`, \`service\`, \`city\` quando aplicavel, \`cta_location\`, \`whatsapp_message\`, \`timestamp\` e UTMs quando presentes.

## Onde inserir fotos reais

Use \`assets/images/\` para fotos reais da operacao, equipe, coleta, entrega, cortinas, edredons, embalagens e bastidores. O mapa de placeholders esta em \`assets/placeholders/README.md\`.

## Onde inserir prints reais do Google

Use \`assets/reviews/\`. Nao inventar depoimentos, nomes, predios ou cidades. Revisar dados sensiveis e autorizacao antes de publicar.

## Como validar WhatsApp

1. Rode \`npm run build\`.
2. Abra uma pagina local.
3. Clique no CTA de WhatsApp.
4. Verifique se o link usa \`wa.me/5547997655025\`.
5. Confirme se a mensagem da pagina foi preservada.
6. Em DevTools, confira se o clique adiciona o evento correto em \`window.dataLayer\`.

## Como validar sitemap e robots

\`\`\`bash
curl -I http://localhost:4173/sitemap.xml
curl -I http://localhost:4173/robots.txt
\`\`\`

Ambos devem retornar \`200 OK\`. O \`robots.txt\` deve apontar para \`${SITE_URL}/sitemap.xml\`.

## Checklist antes de staging

- [ ] Rodar \`npm run build\` sem erros.
- [ ] Todas as 8 paginas respondem 200 OK no preview local.
- [ ] Confirmar 1 H1 por pagina.
- [ ] Confirmar title, meta description, canonical e Open Graph por pagina.
- [ ] Confirmar \`sitemap.xml\` e \`robots.txt\`.
- [ ] Testar menu mobile, FAQ accordion e CTA fixo.
- [ ] Clicar no WhatsApp em todas as paginas e verificar numero \`5547997655025\`.
- [ ] Confirmar que nao existe numero placeholder antigo.
- [ ] Confirmar que nao ha linguagem proibida ou promessa absoluta.
- [ ] Confirmar que \`ENABLE_TRACKING=false\` e que nenhum script de rastreamento e carregado.
- [ ] Confirmar que nenhum ID falso foi inserido.
- [ ] Testar em mobile 360px, 430px, tablet e desktop.

## Checklist antes de producao

- [ ] Tudo do checklist de staging aprovado.
- [ ] Substituir todos os placeholders por fotos e videos reais da Affetto.
- [ ] Inserir prints reais de avaliacoes do Google com autorizacao.
- [ ] Confirmar dominio final em \`SITE_URL\`.
- [ ] Configurar GTM/GA4/Meta Pixel somente com IDs reais e ativar \`ENABLE_TRACKING=true\`.
- [ ] Rodar \`npm run build\` com variaveis de producao.
- [ ] Verificar schema LocalBusiness e FAQPage com Google Rich Results Test.
- [ ] Confirmar que \`sitemap.xml\` aponta para o dominio correto.
- [ ] Confirmar \`robots.txt\` esta correto.
- [ ] Testar links de WhatsApp em producao com telefone real.
- [ ] Confirmar imagem de Open Graph \`og:image\` quando disponivel.

## Pendencias antes de producao

- Trocar placeholders por fotos e videos reais da Affetto.
- Inserir prints reais de avaliacoes do Google, com autorizacao quando necessario.
- Confirmar dominio final.
- Configurar GTM/GA4/Meta Pixel quando as IDs reais existirem.
- Inserir imagem de Open Graph em \`site.config.js > assets.ogImage\`.
`
);

console.log(`Generated ${pages.length} pages, sitemap.xml, robots.txt and README_SITE.md`);
