/* =========================================================
   Yasmin Ferreira — versão 2
   ========================================================= */

/* ---------- Configuração ---------- */
const WHATSAPP_NUMBER = "5535988954584";
const WHATSAPP_MESSAGE = "Olá Yasmin, vim do site e gostaria de mais informações";
// "send_to" da conversão do Google Ads (ex.: "AW-123456789/AbCdEfGhIj"). Vazio = desligado.
const GOOGLE_ADS_SEND_TO = "";

/* ---------- WhatsApp: links + medição por botão ---------- */
const whatsUrl =
  "https://api.whatsapp.com/send/?phone=" + WHATSAPP_NUMBER +
  "&text=" + encodeURIComponent(WHATSAPP_MESSAGE) +
  "&type=phone_number&app_absent=0";

window.dataLayer = window.dataLayer || [];

document.querySelectorAll("[data-whats]").forEach((link) => {
  link.href = whatsUrl;
  link.target = "_blank";
  link.rel = "noopener";
  link.addEventListener("click", () => {
    const local = link.dataset.whats || "desconhecido";
    window.dataLayer.push({ event: "whatsapp_click", botao: local });
    if (typeof window.clarity === "function") window.clarity("event", "whatsapp_" + local);
    if (typeof window.gtag === "function") {
      window.gtag("event", "whatsapp_click", { botao: local });
      if (GOOGLE_ADS_SEND_TO) window.gtag("event", "conversion", { send_to: GOOGLE_ADS_SEND_TO });
    }
  });
});

/* ---------- Menu no celular ---------- */
const header = document.querySelector(".header");
const toggle = document.querySelector(".header__toggle");
if (header && toggle) {
  const setOpen = (open) => {
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  };
  toggle.addEventListener("click", () => setOpen(!header.classList.contains("is-open")));
  header.querySelectorAll(".header__nav a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
}

/* ---------- Sinais: abas + frases marcáveis ---------- */
const tabs = Array.from(document.querySelectorAll('.tabs [role="tab"]'));
const selectTab = (tab) => {
  tabs.forEach((t) => {
    const on = t === tab;
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
  });
};
tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => selectTab(tab));
  tab.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
    selectTab(next);
    next.focus();
  });
});

const frases = Array.from(document.querySelectorAll(".frases button"));
const result = document.querySelector(".sinais__result");
const countText = document.querySelector("[data-count-text]");
const updateCount = () => {
  const n = frases.filter((b) => b.getAttribute("aria-pressed") === "true").length;
  if (!countText) return;
  countText.textContent =
    n === 0 ? "Nenhuma frase marcada." :
    n === 1 ? "Você marcou 1 frase." :
    "Você marcou " + n + " frases.";
  result && result.classList.toggle("has-marks", n > 0);
};
frases.forEach((b) =>
  b.addEventListener("click", () => {
    b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed") !== "true"));
    updateCount();
  })
);
updateCount();

/* ---------- Vídeo: carrega o YouTube só ao clicar ---------- */
document.querySelectorAll("[data-youtube]").forEach((box) => {
  const btn = box.querySelector(".video__btn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube-nocookie.com/embed/" + box.dataset.youtube + "?autoplay=1&rel=0";
    iframe.title = "Como a terapia pode te ajudar?";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    btn.replaceWith(iframe);
  });
});

/* ---------- Mapa: carrega só ao clicar ---------- */
document.querySelectorAll("[data-map]").forEach((box) => {
  const btn = box.querySelector("button");
  btn && btn.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.title = "Mapa do consultório";
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.src = "https://www.google.com/maps?q=" + encodeURIComponent(box.dataset.map) + "&output=embed";
    box.replaceChildren(iframe);
  });
});

/* ---------- Barra fixa no celular: aparece depois do topo ---------- */
const barra = document.querySelector(".barra");
const hero = document.querySelector(".hero");
const final = document.querySelector(".final");
if (barra && hero && "IntersectionObserver" in window) {
  let heroVisible = true, finalVisible = false;
  const paint = () => barra.classList.toggle("is-visible", !heroVisible && !finalVisible);
  new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; paint(); }).observe(hero);
  if (final) new IntersectionObserver(([e]) => { finalVisible = e.isIntersecting; paint(); }).observe(final);
}

/* ---------- Barra de leitura (Política de Privacidade) ---------- */
const progress = document.querySelector(".read-progress span");
if (progress) {
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
}

/* ---------- Ano ---------- */
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
