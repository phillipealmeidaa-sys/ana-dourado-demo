// Gera o site da Ana Dourado a partir da lista de imóveis abaixo.
// Uso: node gerar.mjs   (cria index.html e imoveis/<slug>.html)
// Para incluir um imóvel: crie img/<slug>/01.webp, 01-p.webp... e acrescente um item na lista IMOVEIS.
import fs from "node:fs"; import path from "node:path"; import { fileURLToPath } from "node:url";
const raiz = path.dirname(fileURLToPath(import.meta.url));

const ANA = {
  nome: "Ana Cláudia Dourado", curto: "Ana Dourado", creci: "CRECI PB 16673F",
  whatsapp: "5583986314748", zapVisivel: "(83) 98631-4748",
  instagram: "https://www.instagram.com/anaclaudiadouradocorretora/",
};

// capa = número da foto que abre a galeria. preco = null quando a ficha não traz o valor.
const IMOVEIS = [
  { slug: "ponta-de-campina-pe-na-areia", tipo: "Apartamento", bairro: "Ponta de Campina", cidade: "Cabedelo", preco: 3000000, area: 128, quartos: 3, suites: 3, vagas: 2, mar: "Pé na areia", capa: 1,
    titulo: "Apartamento pé na areia em Ponta de Campina", chamada: "Mobiliado em alto padrão, com estrutura de resort",
    texto: "Apartamento de 128 m² com 3 suítes, pé na areia em Ponta de Campina. Vem totalmente mobiliado, com mobília de alto padrão e móveis planejados Bom Tempo. O condomínio tem estrutura de resort, com piscina, academia e lazer completo.",
    detalhes: ["3 suítes", "2 vagas de garagem", "Totalmente mobiliado", "Mobília de alto padrão", "Móveis planejados Bom Tempo", "Pé na areia", "Estrutura estilo resort"],
    lazer: ["Piscina", "Academia", "Salão de festas", "Churrasqueira", "Brinquedoteca", "Estrutura completa de lazer"],
    local: "Em Ponta de Campina, Cabedelo/PB, perto do Get Mall, em uma localização privilegiada à beira-mar.", tags: "mar alto" },
  { slug: "camboinha-vista-areia-vermelha", tipo: "Apartamento", bairro: "Camboinha", cidade: "Cabedelo", preco: 1280000, area: 107, quartos: 3, suites: 2, vagas: 2, mar: "200 m da praia", capa: 15,
    titulo: "Apartamento mobiliado em Camboinha", chamada: "Vista para Areia Vermelha, a 200 m da praia",
    texto: "Apartamento de 107 m², com 3 quartos (2 suítes) e 2 vagas, pronto e totalmente mobiliado. Fica a 200 metros da praia de Camboinha, uma das mais procuradas pelos paraibanos para o veraneio, e tem vista para Areia Vermelha, o banco de areia avermelhada que aparece na maré baixa e pode ser visitado de catamarã, jet ski ou lancha.",
    detalhes: ["3 quartos, sendo 2 suítes", "2 vagas de garagem", "Pronto e totalmente mobiliado", "Vista para Areia Vermelha", "A 200 metros da praia"],
    lazer: ["Piscina", "Salão de festas", "Churrasqueira", "Academia", "Área gourmet", "Quadra de areia"],
    local: "A 200 metros da praia de Camboinha, em Cabedelo/PB, uma das praias mais procuradas para o veraneio, com vista para Areia Vermelha.", tags: "mar alto" },
  { slug: "areia-dourada-vista-mar", tipo: "Apartamento", bairro: "Areia Dourada", cidade: "Cabedelo", preco: 750000, area: 94, quartos: 3, suites: 1, vagas: 2, mar: "100 m do mar", capa: 4,
    titulo: "Apartamento com vista para o mar em Areia Dourada", chamada: "Varanda de quina a 100 m do mar",
    texto: "São 94 m², 3 quartos (1 suíte) e 2 vagas, a apenas 100 metros do mar. O destaque é a varanda de quina, com uma vista linda para o mar. O condomínio tem piscina e salão de festas.",
    detalhes: ["3 quartos, sendo 1 suíte", "2 vagas de garagem", "Varanda de quina com vista para o mar", "A 100 metros do mar"],
    lazer: ["Piscina", "Salão de festas"],
    local: "A apenas 100 metros do mar, no bairro Areia Dourada, em Cabedelo/PB.", tags: "mar ate800" },
  { slug: "poco-camboinha", tipo: "Apartamento", bairro: "Poço", cidade: "Cabedelo", preco: 2250000, area: 160, quartos: 3, suites: 3, vagas: 2, mar: "Perto do mar", capa: 5,
    titulo: "Apartamento com 3 suítes perto do mar no Poço", chamada: "160 m² na divisa com Camboinha",
    texto: "Apartamento de 160 m², com 3 suítes e 2 vagas, perto do mar, entre o Poço e Camboinha, uma região privilegiada do litoral paraibano. O condomínio tem piscina, churrasqueira e salão de festas.",
    detalhes: ["3 suítes", "2 vagas de garagem", "Perto do mar"],
    lazer: ["Piscina", "Salão de festas", "Churrasqueira"],
    local: "No Poço, divisa com Camboinha, em Cabedelo/PB, perto do mar, em uma região privilegiada do litoral paraibano.", tags: "alto" },
  { slug: "jardim-oceania", tipo: "Apartamento", bairro: "Jardim Oceania", cidade: "João Pessoa", preco: 1100000, area: 126, quartos: 3, suites: 3, vagas: 2, mar: "400 m da praia", capa: 11,
    titulo: "Apartamento nascente no Jardim Oceania", chamada: "3 suítes e varanda gourmet, a 400 m da praia",
    texto: "Apartamento nascente de 126 m², com 3 suítes, 2 vagas e uma varanda gourmet ampla. Fica a 400 metros da praia, perto do Parque Parahyba e de shoppings. O condomínio tem 2 piscinas, academia, brinquedoteca, churrasqueira e salão de festas.",
    detalhes: ["3 suítes", "2 vagas de garagem", "Apartamento nascente", "Varanda gourmet ampla", "A 400 metros da praia"],
    lazer: ["2 piscinas", "Churrasqueira", "Salão de festas", "Brinquedoteca", "Academia"],
    local: "No Jardim Oceania, em João Pessoa/PB, perto do Parque Parahyba e de shoppings, a 400 metros da praia.", tags: "alto" },
  { slug: "flat-intermares", tipo: "Flat", bairro: "Intermares", cidade: "Cabedelo", preco: 300000, area: 20, quartos: 0, suites: 0, vagas: 1, mar: "300 m da orla", capa: 19,
    titulo: "Flat mobiliado em Intermares", chamada: "Pronto para morar ou alugar, a 300 m da orla",
    texto: "Flat de 20 m², pronto e totalmente mobiliado, com 1 vaga de garagem. Fica a 300 metros da orla de Intermares, em uma das regiões mais valorizadas de Cabedelo. Uma boa opção para investir: está pronto para morar ou para colocar para alugar.",
    detalhes: ["Pronto e totalmente mobiliado", "1 vaga de garagem", "Ideal para investimento", "Pronto para morar ou alugar"],
    lazer: ["Piscina", "Salão de festas", "Churrasqueira", "Academia", "Área gourmet"],
    local: "A 300 metros da orla de Intermares, em Cabedelo/PB, em uma das regiões mais valorizadas da cidade.", tags: "flat ate800" },
  { slug: "flat-ponta-de-campina", tipo: "Flat", bairro: "Ponta de Campina", cidade: "Cabedelo", preco: 349000, area: 22, quartos: 0, suites: 0, vagas: 1, mar: "200 m da praia", capa: 10,
    titulo: "Flat mobiliado em Ponta de Campina", chamada: "A 200 m da praia, ideal para investir",
    texto: "Flat de 22 m², pronto e totalmente mobiliado, com 1 vaga de garagem. Fica a 200 metros de uma praia tranquila de Ponta de Campina, perto do Get Mall, um centro gastronômico com várias opções de alimentação. Ideal para investimento e locação.",
    detalhes: ["Pronto e totalmente mobiliado", "1 vaga de garagem", "A 200 metros da praia", "Ideal para investimento e locação"],
    lazer: ["Piscina", "Mini market", "Salão de festas", "Academia", "Churrasqueira"],
    local: "A 200 metros de uma praia tranquila, em Ponta de Campina, Cabedelo/PB, perto do Get Mall, centro gastronômico com diversas opções de alimentação.", tags: "mar flat ate800" },
  { slug: "miramar-reformado", tipo: "Apartamento", bairro: "Miramar", cidade: "João Pessoa", preco: 629000, area: 74, quartos: 3, suites: 2, vagas: 1, mar: "", capa: 4,
    titulo: "Apartamento reformado em Miramar", chamada: "Móveis planejados novos, entre a Epitácio e a Ruy Carneiro",
    texto: "Apartamento de 74 m², totalmente reformado, com 3 quartos (2 suítes), 1 vaga, móveis planejados novos e 2 aparelhos de ar-condicionado inclusos. Fica em Miramar, entre a Avenida Senador Ruy Carneiro e a Avenida Epitácio Pessoa, com acesso fácil a vários pontos da cidade.",
    detalhes: ["3 quartos, sendo 2 suítes", "1 vaga de garagem", "Totalmente reformado", "Móveis planejados novos", "2 aparelhos de ar-condicionado inclusos"],
    lazer: ["Piscina", "Salão de festas", "Playground"],
    local: "Em Miramar, João Pessoa/PB, entre duas das principais avenidas da cidade: a Senador Ruy Carneiro e a Epitácio Pessoa.", tags: "ate800" },
  { slug: "casa-cruz-das-armas", tipo: "Casa", bairro: "Cruz das Armas", cidade: "João Pessoa", preco: 895000, area: 300, terreno: 800, quartos: 5, suites: 2, vagas: 2, mar: "", capa: 7,
    titulo: "Casa com piscina em Cruz das Armas", chamada: "300 m² construídos em terreno de 800 m²",
    texto: "Casa ampla e bem conservada, com 5 quartos (2 suítes), 2 vagas, piscina e churrasqueira. São 300 m² de área construída em um terreno de 800 m², espaço de sobra para toda a família.",
    detalhes: ["5 quartos, sendo 2 suítes", "2 vagas de garagem", "Casa ampla e bem conservada", "Terreno de 800 m²", "Espaço para toda a família"],
    lazer: ["Piscina", "Churrasqueira"],
    local: "Em uma área residencial de Cruz das Armas, João Pessoa/PB, perto do Exército, do DNIT e da Caixa Econômica Federal, com acesso fácil a serviços e comércio.", tags: "" },
  { slug: "cobertura-bancarios", tipo: "Cobertura", bairro: "Bancários", cidade: "João Pessoa", preco: null, area: 172, quartos: 3, suites: 1, vagas: 2, mar: "", capa: 2,
    titulo: "Cobertura linear nos Bancários", chamada: "Área aberta com vista para João Pessoa",
    texto: "Cobertura linear de 172 m², toda em um andar só, com 3 quartos (1 suíte) e 2 vagas. A área aberta tem vista para a cidade e espaço gourmet com churrasqueira. Fica nos Bancários, perto das universidades e da região das Três Ruas: um bairro completo, com tudo o que você precisa no dia a dia.",
    detalhes: ["3 quartos, sendo 1 suíte", "2 vagas de garagem", "Cobertura linear, em um andar só", "Área aberta com vista para João Pessoa", "Lavabo e depósito"],
    lazer: ["Área gourmet com churrasqueira"],
    local: "No bairro dos Bancários, em João Pessoa/PB, perto das universidades, da região das Três Ruas e de um comércio amplo. Um bairro completo, com estrutura própria.", tags: "" },
];

/* ---------- utilidades ---------- */
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const reais = (n) => n == null ? "Consulte o valor" : n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const nfotos = (s) => fs.readdirSync(path.join(raiz, "img", s)).filter((f) => /^\d+\.webp$/.test(f)).length;
const ordemFotos = (im) => { const n = nfotos(im.slug), l = [im.capa]; for (let i = 1; i <= n; i++) if (i !== im.capa) l.push(i); return l; };
const num = (i) => String(i).padStart(2, "0");
const quartosTxt = (im) => im.quartos ? `${im.quartos} quartos${im.suites ? ` (${im.suites === im.quartos ? "todos suítes" : im.suites + (im.suites > 1 ? " suítes" : " suíte")})` : ""}` : "";
const zap = (msg) => `https://wa.me/${ANA.whatsapp}?text=${encodeURIComponent(msg)}`;

const ICONES = `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
<symbol id="i-area" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="M4 9h3M4 14h3M9 4v3M14 4v3"/></symbol>
<symbol id="i-cama" viewBox="0 0 24 24"><path d="M3 18V7M3 13h18v5M21 18v-3a3 3 0 0 0-3-3h-7v1"/><circle cx="7" cy="10" r="1.6"/></symbol>
<symbol id="i-suite" viewBox="0 0 24 24"><path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2Z"/><path d="M6 12V6a2 2 0 0 1 4 0M7 19l-1 2M17 19l1 2"/></symbol>
<symbol id="i-carro" viewBox="0 0 24 24"><path d="M5 16h14M6 16v2M18 16v2M4 16v-4l2-5h12l2 5v4"/><path d="M4 12h16"/><circle cx="8" cy="14" r=".6"/><circle cx="16" cy="14" r=".6"/></symbol>
<symbol id="i-onda" viewBox="0 0 24 24"><path d="M2 9c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"/></symbol>
<symbol id="i-check" viewBox="0 0 24 24"><path d="M5 12.5 10 17l9-10"/></symbol>
<symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></symbol>
<symbol id="i-foto" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m21 16-5-5-8 8"/></symbol>
<symbol id="i-terreno" viewBox="0 0 24 24"><path d="M3 20h18M5 20V9l7-5 7 5v11"/><path d="M10 20v-5h4v5"/></symbol>
</svg>`;
const ico = (n) => `<svg class="ico"><use href="#i-${n}"/></svg>`;
const ZAPSVG = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2c.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>`;

function head({ titulo, desc, base, extra = "" }) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex, nofollow"><!-- RASCUNHO: tirar o noindex quando a Ana aprovar e o domínio estiver pronto -->
<meta name="theme-color" content="#0F2C3A">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(desc)}">
<link rel="icon" href="${base}favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,500&family=Jost:wght@300;400;500&display=optional" rel="stylesheet">
<link rel="stylesheet" href="${base}assets/estilo.css?v=6">
<script>
  /* Configuração de rastreio e contato. IDs de Pixel/GA4/Ads são públicos; nunca coloque senha ou token aqui. */
  window.SITE = {
    META_PIXEL_ID: "",          // preencher quando a campanha estiver pronta
    GA4_ID: "",
    GOOGLE_ADS_ID: "",
    ADS_LEAD_LABEL: "",
    ADS_WHATSAPP_LABEL: "",
    WHATSAPP: "${ANA.whatsapp}",
    WHATSAPP_MSG: "Olá, Ana! Vim pelo site e quero ajuda para encontrar um imóvel.",
    FORM_ENDPOINT: "",          // URL do Apps Script da planilha (ver LEIAME). Vazio = o pedido vai para o WhatsApp
    FORM_DESTINO: "whatsapp",
    PRIVACIDADE_URL: "${base}privacidade.html"
  };
</script>
<script src="${base}assets/site.js" defer></script>
<script src="${base}assets/imoveis.js?v=6" defer></script>
${extra}
</head>`;
}

function topo(base) {
  return `${ICONES}
<header class="topo">
  <div class="wrap">
    <a class="marca" href="${base}./" aria-label="Ana Dourado, página inicial"><b>Ana <i>Dourado</i></b><small>Imóveis perto do mar</small></a>
    <nav aria-label="Principal">
      <a href="${base}./#imoveis">Imóveis</a>
      <a href="${base}./#encomende">Encomende seu imóvel</a>
      <a href="${base}./#sobre">Sobre a Ana</a>
      <a class="btn btn-ouro" href="${base}./#encomende" data-whatsapp data-local="topo" aria-label="Falar com a Ana no WhatsApp">${ZAPSVG}<span>Falar com a Ana</span></a>
    </nav>
  </div>
</header>`;
}

function rodape(base) {
  return `<footer>
  <div class="wrap">
    <div>
      <a class="marca" href="${base}./"><b>Ana <i>Dourado</i></b><small>Imóveis perto do mar</small></a>
      <p>${ANA.nome}, corretora de imóveis em Cabedelo e João Pessoa (PB).<br>${ANA.creci}</p>
    </div>
    <div>
      <a href="${base}./#encomende" data-whatsapp data-local="rodape">WhatsApp ${ANA.zapVisivel}</a><br>
      <a href="${ANA.instagram}" target="_blank" rel="noopener">Instagram @anaclaudiadouradocorretora</a>
    </div>
    <div>
      <a href="${base}privacidade.html">Política de privacidade</a><br>
      <a href="#" data-cookies>Preferências de cookies</a>
    </div>
    <p class="rascunho">Rascunho para aprovação. Valores e características conforme as fichas da corretora, sujeitos a alteração sem aviso. Fotos dos próprios imóveis.</p>
  </div>
</footer>`;
}

function card(im, base) {
  const f = num(im.capa);
  const ficha = [
    `<span>${ico("area")}${im.area} m²</span>`,
    im.quartos ? `<span>${ico("cama")}${im.quartos} quartos</span>` : `<span>${ico("cama")}Studio</span>`,
    im.suites ? `<span>${ico("suite")}${im.suites} ${im.suites > 1 ? "suítes" : "suíte"}</span>` : "",
    `<span>${ico("carro")}${im.vagas} ${im.vagas > 1 ? "vagas" : "vaga"}</span>`,
  ].join("");
  return `<a class="card" href="${base}imoveis/${im.slug}.html" data-preco="${im.preco ?? ""}" data-bairro="${esc(im.bairro)}" data-tipo="${im.tipo}" data-tags="${im.tags}">
      <div class="foto"><img src="${base}img/${im.slug}/${f}-p.webp" alt="${esc(im.titulo)}" loading="lazy" width="720" height="540">${im.mar ? `<span class="selo">${esc(im.mar)}</span>` : ""}</div>
      <div class="info">
        <span class="onde">${esc(im.tipo)} · ${esc(im.bairro)}, ${esc(im.cidade)}</span>
        <h3>${esc(im.chamada)}</h3>
        <div class="fichinha">${ficha}</div>
        <div class="preco"><b>${reais(im.preco)}</b><span>Ver imóvel →</span></div>
      </div>
    </a>`;
}

/* ---------- página inicial ---------- */
function inicial() {
  const bairros = [...new Set(IMOVEIS.map((i) => i.bairro))].sort((a, b) => a.localeCompare(b, "pt-BR"));
  const tipos = [...new Set(IMOVEIS.map((i) => i.tipo))];
  const desc = "Apartamentos, flats e casas à venda em Cabedelo e João Pessoa, perto do mar. Atendimento direto com a corretora Ana Dourado, CRECI PB 16673F.";
  return `${head({ titulo: "Ana Dourado · Imóveis perto do mar em Cabedelo e João Pessoa", desc, base: "",
    extra: `<link rel="preload" as="image" href="img/topo-mar.webp" media="(min-width:701px)"><link rel="preload" as="image" href="img/poco-camboinha/05-p.webp" media="(max-width:700px)">
<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "RealEstateAgent", name: "Ana Dourado · Imóveis Cabedelo e João Pessoa", description: desc, telephone: "+55 83 98631-4748", areaServed: ["Cabedelo, PB", "João Pessoa, PB"], sameAs: [ANA.instagram] })}</script>` })}
<body class="tem-barra">
${topo("")}
<main>
<section class="hero" data-topo>
  <picture>
    <source media="(max-width:700px)" srcset="img/poco-camboinha/05-p.webp">
    <img src="img/topo-mar.webp" alt="Piscinas de um condomínio à beira-mar em Ponta de Campina, Cabedelo" fetchpriority="high">
  </picture>
  <div class="wrap">
    <p class="kicker">Ana Dourado · Corretora de imóveis</p>
    <h1>Seu próximo endereço <em>perto do mar.</em></h1>
    <p class="sub">Apartamentos, flats e casas selecionados em Cabedelo e João Pessoa, com atendimento direto de quem conhece cada praia.</p>
    <div class="acoes">
      <a class="btn btn-ouro" href="#imoveis">Ver os imóveis</a>
      <a class="btn btn-linha" href="#encomende" data-whatsapp data-local="hero">${ZAPSVG}Falar com a Ana</a>
    </div>
  </div>
</section>

<div class="busca">
  <div class="wrap">
    <form id="busca" role="search" aria-label="Buscar imóveis">
      <div><label for="b-bairro">Bairro</label><select id="b-bairro" name="bairro"><option value="">Todos os bairros</option>${bairros.map((b) => `<option>${esc(b)}</option>`).join("")}</select></div>
      <div><label for="b-tipo">Tipo</label><select id="b-tipo" name="tipo"><option value="">Todos os tipos</option>${tipos.map((t) => `<option>${t}</option>`).join("")}</select></div>
      <div><label for="b-ate">Valor até</label><select id="b-ate" name="ate"><option value="">Qualquer valor</option><option value="400000">R$ 400 mil</option><option value="800000">R$ 800 mil</option><option value="1500000">R$ 1,5 milhão</option><option value="3000000">R$ 3 milhões</option></select></div>
      <button class="btn btn-mar" type="submit">Buscar imóveis</button>
    </form>
  </div>
</div>

<div class="provas">
  <div class="wrap">
    <ul>
      <li><b>${IMOVEIS.length} <em>imóveis</em></b><span>selecionados à venda</span></li>
      <li><b>Cabedelo <em>e</em> JP</b><span>Ponta de Campina, Camboinha e outras praias</span></li>
      <li><b>1º <em>lugar</em></b><span>em VGC entre os agentes single da RE/MAX na Paraíba, 1º tri/2026</span></li>
      <li><b>CRECI</b><span>PB 16673F</span></li>
    </ul>
  </div>
</div>

<section class="claro">
  <div class="wrap">
    <div class="cab"><div><p class="kicker">Por onde começar</p><h2>O que você <em>procura?</em></h2></div></div>
    <div class="atalhos">
      <button class="atalho" type="button" data-atalho="mar"><img src="img/ponta-de-campina-pe-na-areia/02-p.webp" alt="" loading="lazy"><span><b>Pé na areia e beira-mar</b><small>Até 200 m da praia</small></span></button>
      <button class="atalho" type="button" data-atalho="flat"><img src="img/flat-intermares/19-p.webp" alt="" loading="lazy"><span><b>Flats para investir</b><small>Prontos e mobiliados</small></span></button>
      <button class="atalho" type="button" data-atalho="ate800"><img src="img/areia-dourada-vista-mar/04-p.webp" alt="" loading="lazy"><span><b>Até R$ 800 mil</b><small>Ótimas oportunidades</small></span></button>
      <button class="atalho" type="button" data-atalho="alto"><img src="img/camboinha-vista-areia-vermelha/15-p.webp" alt="" loading="lazy"><span><b>Alto padrão</b><small>Acima de R$ 1 milhão</small></span></button>
    </div>
  </div>
</section>

<section class="vitrine" id="imoveis">
  <div class="wrap">
    <div class="cab">
      <div><p class="kicker">À venda agora</p><h2>Imóveis <em>selecionados</em></h2></div>
      <div class="filtros"><span id="contagem" aria-live="polite"></span>
        <label class="hp" for="ordem">Ordenar</label>
        <select id="ordem" aria-label="Ordenar imóveis"><option value="">Destaques primeiro</option><option value="menor">Menor valor</option><option value="maior">Maior valor</option></select>
      </div>
    </div>
    <div class="ativo" id="ativo" hidden><span></span><button type="button" data-limpar>Ver todos</button></div>
    <div class="grade" id="grade">
    ${IMOVEIS.map((i) => card(i, "")).join("\n    ")}
    <div class="convite" id="convite"><h3>Procurando algo <em>diferente?</em></h3><p>A Ana tem outras opções em Cabedelo e João Pessoa além destas. Conte o que você procura.</p><a class="btn btn-ouro" href="#encomende">Encomendar meu imóvel</a></div>
    </div>
    <div class="vazio" id="vazio" hidden><p>Nenhum imóvel com esse filtro agora.</p><button type="button" class="btn btn-linha" data-limpar>Ver todos os imóveis</button> <a class="btn btn-ouro" href="#encomende">Encomendar o meu</a></div>
  </div>
</section>

<section class="encomenda" id="encomende" data-esconde-barra>
  <div class="wrap">
    <div>
      <p class="kicker" style="color:var(--dourado-claro)">Imóvel sob encomenda</p>
      <h2>Não achou o que procura? <em>A Ana encontra para você.</em></h2>
      <p class="lead">Conte o que você quer e quanto pretende investir. Ela também tem oportunidades que nem sempre estão anunciadas.</p>
      <ul>
        <li>${ico("check")}<span>Imóveis em Ponta de Campina, Camboinha, Formosa, Intermares e outras praias de Cabedelo e João Pessoa</span></li>
        <li>${ico("check")}<span>Para morar ou para investir</span></li>
        <li>${ico("check")}<span>Resposta direto no seu WhatsApp</span></li>
      </ul>
    </div>
    <div class="form">
      <form data-lead="encomenda" data-ok="encomenda-ok" data-whatsapp-intro="Olá, Ana! Quero encomendar um imóvel pelo site.">
        <div class="duas">
          <div><label for="nome">Seu nome</label><input id="nome" name="nome" autocomplete="name" required data-msg="Escreva seu nome."></div>
          <div><label for="whatsapp">WhatsApp com DDD</label><input id="whatsapp" name="whatsapp" type="tel" inputmode="numeric" autocomplete="tel-national" placeholder="(00) 00000-0000" required data-msg="Escreva seu WhatsApp com DDD."></div>
        </div>
        <div class="duas">
          <div><label for="procura">O que você procura?</label>
            <select id="procura" name="procura" required data-msg="Escolha o tipo de imóvel."><option value="">Escolha</option><option>Apartamento</option><option>Flat</option><option>Casa</option><option>Cobertura</option><option>Terreno</option><option>Ainda não sei</option></select></div>
          <div><label for="faixa">Quanto quer investir?</label>
            <select id="faixa" name="faixa"><option value="">Prefiro conversar</option><option>Até R$ 400 mil</option><option>De R$ 400 mil a R$ 800 mil</option><option>De R$ 800 mil a R$ 1,5 milhão</option><option>Acima de R$ 1,5 milhão</option></select></div>
        </div>
        <div><label for="regiao">Bairro ou praia preferida <span style="font-weight:400">(opcional)</span></label><input id="regiao" name="regiao" placeholder="Ex.: Camboinha, perto do mar"></div>
        <div class="hp" aria-hidden="true"><label for="website">Não preencha</label><input id="website" name="website" tabindex="-1" autocomplete="off"></div>
        <label class="check"><input type="checkbox" name="aceite" value="sim" required data-msg="Para continuar, aceite a Política de privacidade."><span>Concordo em receber contato pelo WhatsApp e li a <a href="privacidade.html">Política de privacidade</a>.</span></label>
        <p class="erro" data-erro role="alert"></p>
        <button class="btn btn-ouro" type="submit">Quero que a Ana me ajude</button>
      </form>
      <div class="ok" id="encomenda-ok" hidden>
        <h3>Pronto, <span data-nome>recebido</span>!</h3>
        <p>A Ana vai chamar você no WhatsApp para entender melhor o que você procura.</p>
        <a class="btn btn-mar" href="#encomende" data-whatsapp="Olá, Ana! Acabei de pedir ajuda pelo site para encontrar um imóvel." data-local="pos-form">Falar agora no WhatsApp</a>
      </div>
    </div>
  </div>
</section>

<section class="sobre claro" id="sobre">
  <div class="wrap">
    <div class="retrato"><img src="img/ana-retrato.webp" alt="Ana Cláudia Dourado, corretora de imóveis em Cabedelo e João Pessoa" decoding="async" style="position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;object-position:50% 30%"></div>
    <div>
      <p class="kicker">Quem vai te atender</p>
      <h2>Ana Cláudia <em>Dourado</em></h2>
      <p>Corretora de imóveis em Cabedelo e João Pessoa, especialista em ajudar quem está planejando morar perto do mar. Conhece de perto Ponta de Campina, Camboinha, Formosa e Intermares, e ajuda você a acertar na escolha, para morar ou para investir.</p>
      <div class="marcos">
        <div><b>1º lugar em VGC</b><span>entre os agentes single da RE/MAX na Paraíba, 1º trimestre de 2026</span></div>
        <div><b>7 vendas em 10 dias</b><span>no começo de 2026</span></div>
        <div><b>${ANA.creci}</b><span>corretora registrada</span></div>
      </div>
      <a class="btn btn-mar" href="#encomende" data-whatsapp data-local="sobre">${ZAPSVG}Conversar com a Ana</a>
    </div>
  </div>
</section>
</main>
${rodape("")}
<a class="zap-flutuante" href="#encomende" data-whatsapp data-local="flutuante" aria-label="Falar com a Ana no WhatsApp"><svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true">${ZAPSVG.replace(/^<svg[^>]*>|<\/svg>$/g, "")}</svg></a>
<div class="barra" data-barra-fixa><a class="btn btn-ouro" href="#encomende" data-whatsapp data-local="barra">${ZAPSVG}Falar com a Ana</a></div>
</body>
</html>
`;
}

/* ---------- página do imóvel ---------- */
function pagina(im) {
  const fotos = ordemFotos(im), base = "../", total = fotos.length;
  const msgVisita = `Olá, Ana! Vi no site o imóvel "${im.titulo}" (${reais(im.preco)}) e quero agendar uma visita.`;
  const desc = `${im.titulo}, ${im.cidade}/PB: ${im.area} m²${im.quartos ? ", " + quartosTxt(im) : ""}, ${im.vagas} ${im.vagas > 1 ? "vagas" : "vaga"}. ${reais(im.preco)}. Agende sua visita com a corretora Ana Dourado.`;
  const ficha = [
    [ "area", `${im.area} m²`, im.terreno ? "construídos" : "de área" ],
    im.terreno ? [ "terreno", `${im.terreno} m²`, "de terreno" ] : null,
    im.quartos ? [ "cama", `${im.quartos}`, "quartos" ] : [ "cama", "Studio", "mobiliado" ],
    im.suites ? [ "suite", `${im.suites}`, im.suites > 1 ? "suítes" : "suíte" ] : null,
    [ "carro", `${im.vagas}`, im.vagas > 1 ? "vagas" : "vaga" ],
    im.mar ? [ "onda", im.mar.replace(/ d[ao] (mar|praia|orla)$/, ""), /^\d/.test(im.mar) ? im.mar.replace(/^\d+ m /, "") : "localização" ] : null,
  ].filter(Boolean).map(([i, b, s]) => `<div>${ico(i)}<span><b>${esc(b)}</b>${esc(s)}</span></div>`).join("");
  const galeria = fotos.slice(0, 5).map((n, k) => `<button type="button" data-abre="${k}" aria-label="Ampliar foto ${k + 1} de ${total}"><img src="${base}img/${im.slug}/${num(n)}${k === 0 ? "" : "-p"}.webp"${k === 0 ? ` srcset="${base}img/${im.slug}/${num(n)}-p.webp 720w, ${base}img/${im.slug}/${num(n)}.webp 1600w" sizes="(max-width:760px) 86vw, 60vw" fetchpriority="high"` : ` loading="lazy"`} alt="${esc(im.titulo)}, foto ${k + 1}"></button>`).join("")
;
  const mobileExtra = fotos.slice(5).map((n, k) => `<button type="button" data-abre="${k + 5}" class="so-celular" aria-label="Ampliar foto ${k + 6} de ${total}"><img src="${base}img/${im.slug}/${num(n)}-p.webp" loading="lazy" alt="${esc(im.titulo)}, foto ${k + 6}"></button>`).join("");
  const visor = fotos.map((n, k) => `<figure><img data-src="${base}img/${im.slug}/${num(n)}.webp" alt="${esc(im.titulo)}, foto ${k + 1} de ${total}"></figure>`).join("");
  const outros = IMOVEIS.filter((o) => o.slug !== im.slug).sort((a, b) => (a.cidade === im.cidade ? 0 : 1) - (b.cidade === im.cidade ? 0 : 1)).slice(0, 3);
  const schema = { "@context": "https://schema.org", "@type": "RealEstateListing", name: im.titulo, description: im.texto,
    image: `img/${im.slug}/${num(im.capa)}.webp`,
    about: { "@type": im.tipo === "Casa" ? "SingleFamilyResidence" : "Apartment", floorSize: { "@type": "QuantitativeValue", value: im.area, unitCode: "MTK" }, numberOfRooms: im.quartos || undefined,
      address: { "@type": "PostalAddress", addressLocality: im.cidade, addressRegion: "PB", addressCountry: "BR", streetAddress: im.bairro } },
    offers: im.preco ? { "@type": "Offer", price: im.preco, priceCurrency: "BRL" } : undefined };
  return `${head({ titulo: `${im.titulo} | Ana Dourado`, desc, base, extra: `<script type="application/ld+json">${JSON.stringify(schema)}</script>
<style>@media (min-width:761px){.so-celular{display:none!important}}</style>` })}
<body class="tem-barra">
${topo(base)}
<main>
<div class="wrap" data-topo>
  <nav class="migalha" aria-label="Você está em"><a href="${base}./">Início</a> › <a href="${base}./#imoveis">Imóveis</a> › ${esc(im.cidade)} › ${esc(im.bairro)}</nav>
  <div class="titulo-imovel">
    <div><p class="onde">${esc(im.tipo)} à venda · ${esc(im.bairro)}, ${esc(im.cidade)}/PB</p><h1>${esc(im.titulo)}</h1></div>
    <div class="valor"><small>Valor</small><b>${reais(im.preco)}</b></div>
  </div>
  <div class="galeria-caixa"><div class="galeria">${galeria}${mobileExtra}</div><button type="button" class="todas" data-abre="0">${ico("foto")}Ver as ${total} fotos</button></div>
</div>

<div class="wrap corpo">
  <div>
    <div class="ficha">${ficha}</div>
    <div class="bloco"><h2>Sobre o imóvel</h2><p>${esc(im.texto)}</p></div>
    <div class="bloco"><h2>Detalhes</h2><ul class="lista">${im.detalhes.map((d) => `<li>${ico("check")}<span>${esc(d)}</span></li>`).join("")}</ul></div>
    <div class="bloco"><h2>Lazer e comodidades</h2><ul class="lista">${im.lazer.map((d) => `<li>${ico("check")}<span>${esc(d)}</span></li>`).join("")}</ul></div>
    <div class="bloco"><h2>Localização</h2><p>${esc(im.local)}</p>
      <a class="mapa" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${im.bairro}, ${im.cidade} - PB`)}" target="_blank" rel="noopener">${ico("pin")}Ver ${esc(im.bairro)} no mapa</a>
      <p style="font-size:14px;color:var(--suave);margin-top:10px">O endereço exato é passado no agendamento da visita.</p></div>
  </div>
  <aside class="lado" data-esconde-barra>
    <div class="cartao">
      <div class="valor"><small>Valor de venda</small><b>${reais(im.preco)}</b><span>${esc(im.tipo)} · ${im.area} m² · ${esc(im.bairro)}</span></div>
      <a class="btn btn-ouro" href="#agendar" data-whatsapp="${esc(msgVisita)}" data-local="cartao">${ZAPSVG}Agendar visita no WhatsApp</a>
      <p class="ou">ou peça para a Ana te chamar</p>
      <form id="agendar" data-lead="visita" data-ok="visita-ok" data-whatsapp-intro="${esc(`Olá, Ana! Quero agendar uma visita: ${im.titulo} (${reais(im.preco)}).`)}">
        <div><label for="v-nome">Seu nome</label><input id="v-nome" name="nome" autocomplete="name" required data-msg="Escreva seu nome."></div>
        <div><label for="v-zap">WhatsApp com DDD</label><input id="v-zap" name="whatsapp" type="tel" inputmode="numeric" autocomplete="tel-national" placeholder="(00) 00000-0000" required data-msg="Escreva seu WhatsApp com DDD."></div>
        <input type="hidden" name="imovel" value="${esc(im.titulo)}">
        <div class="hp" aria-hidden="true"><label for="v-website">Não preencha</label><input id="v-website" name="website" tabindex="-1" autocomplete="off"></div>
        <label class="check"><input type="checkbox" name="aceite" value="sim" required data-msg="Para continuar, aceite a Política de privacidade."><span>Concordo em receber contato pelo WhatsApp e li a <a href="${base}privacidade.html">Política de privacidade</a>.</span></label>
        <p class="erro" data-erro role="alert"></p>
        <button class="btn btn-mar" type="submit">Quero visitar</button>
      </form>
      <div class="ok" id="visita-ok" hidden><h3>Combinado, <span data-nome>obrigado</span>!</h3><p>A Ana vai chamar você no WhatsApp para marcar o melhor horário.</p></div>
    </div>
    <div class="corretora"><img class="av" src="${base}img/ana-rosto.webp" alt="" style="width:52px;height:52px;object-fit:cover"><span><b>${ANA.nome}</b><span>Corretora · ${ANA.creci}</span></span></div>
  </aside>
</div>

<section class="outros">
  <div class="wrap">
    <div class="cab"><div><p class="kicker">Continue olhando</p><h2>Outros <em>imóveis</em></h2></div><a class="btn btn-linha" style="color:var(--mar)" href="${base}./#imoveis">Ver todos</a></div>
    <div class="grade">${outros.map((o) => card(o, base)).join("")}</div>
  </div>
</section>
</main>
${rodape(base)}
<div class="visor" id="visor" hidden role="dialog" aria-modal="true" aria-label="Fotos do imóvel">
  <div class="barra-visor"><span data-conta>1 / ${total}</span><button type="button" class="fechar" aria-label="Fechar fotos">✕</button></div>
  <div class="trilho">${visor}</div>
  <button type="button" class="seta ant" aria-label="Foto anterior">‹</button><button type="button" class="seta prox" aria-label="Próxima foto">›</button>
</div>
<div class="barra" data-barra-fixa><span class="v">Valor<b>${reais(im.preco)}</b></span><a class="btn btn-ouro" href="#agendar" data-whatsapp="${esc(msgVisita)}" data-local="barra">${ZAPSVG}Agendar visita</a></div>
</body>
</html>
`;
}

fs.mkdirSync(path.join(raiz, "imoveis"), { recursive: true });
fs.writeFileSync(path.join(raiz, "index.html"), inicial());
for (const im of IMOVEIS) fs.writeFileSync(path.join(raiz, "imoveis", im.slug + ".html"), pagina(im));
fs.writeFileSync(path.join(raiz, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n<url><loc>./</loc></url>\n${IMOVEIS.map((i) => `<url><loc>imoveis/${i.slug}.html</loc></url>`).join("\n")}\n</urlset>\n`);
console.log(`Gerado: index.html + ${IMOVEIS.length} páginas de imóvel.`);
