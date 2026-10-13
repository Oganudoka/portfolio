/**
 * app.js — Portfolio data and dynamic rendering logic
 * Author: Udoka Ogan
 *
 * Architecture: project data is decoupled from markup.
 * renderProjects() loops the array and injects cards into the DOM.
 */

// ─── DATA ───────────────────────────────────────────────────────────────────

const projects = [
  {
    id: "campus-shuttle",
    title: "Campus Shuttle Monitoring System",
    description:
      "Web-based GPS tracking platform for university transit, bridging driver and student interfaces with real-time location updates and route visualisation.",
    tech: ["HTML", "CSS", "JavaScript", "Leaflet.js", "Firebase Realtime DB"],
    highlights: [
      "Real-time GPS telemetry streamed via Firebase listeners",
      "Interactive Leaflet.js map with live polyline route drawing",
      "Dual interface: driver dashboard & student tracking view",
    ],
    category: "Web / GIS",
  },
  {
    id: "whatsapp-commerce",
    title: "WhatsApp Social Commerce Engine",
    description:
      "Automated checkout workflow for local merchants, handling order capture, routing, and dispatch entirely within the WhatsApp messaging surface.",
    tech: ["JavaScript", "REST APIs", "Database Design"],
    highlights: [
      "Conversational state machine for end-to-end order flow",
      "Webhook-driven order routing to merchant fulfilment queues",
      "Relational schema optimised for catalogue and inventory queries",
    ],
    category: "Backend / Automation",
  },
];

// ─── RENDERER ────────────────────────────────────────────────────────────────

/**
 * Builds and injects a project card element for each item in the projects array.
 * @param {string} containerId - The id of the DOM element to render cards into.
 */
function renderProjects(containerId) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`[renderProjects] Container #${containerId} not found.`);
    return;
  }

  console.log(
    `[renderProjects] Injecting ${projects.length} project card(s) from data array.`
  );

  projects.forEach((project, index) => {
    // Build tech badge markup
    const badgesHTML = project.tech
      .map(
        (t) =>
          `<span class="tech-badge inline-block text-xs font-mono font-medium px-2 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200">${t}</span>`
      )
      .join("");

    // Build highlights list markup
    const highlightsHTML = project.highlights
      .map(
        (h) =>
          `<li class="flex items-start gap-2 text-sm text-slate-600"><span class="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-sky-600"></span><span>${h}</span></li>`
      )
      .join("");

    // Compose the full card element
    const card = document.createElement("article");
    card.setAttribute("data-project-id", project.id);
    card.setAttribute("data-index", index);
    card.className =
      "project-card group relative flex flex-col bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-sky-400 transition-all duration-300";

    card.innerHTML = `
      <div class="flex items-start justify-between gap-4 mb-4">
        <div>
          <span class="inline-block text-xs font-semibold tracking-widest uppercase text-sky-600 mb-2">${project.category}</span>
          <h3 class="text-lg sm:text-xl font-bold text-slate-900 leading-snug">${project.title}</h3>
        </div>
        <span class="flex-shrink-0 w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-sky-600 group-hover:border-sky-300 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
        </span>
      </div>
      <p class="text-slate-600 text-sm leading-relaxed mb-5">${project.description}</p>
      <ul class="space-y-2 mb-6" aria-label="Technical highlights">${highlightsHTML}</ul>
      <div class="mt-auto flex flex-wrap gap-2" aria-label="Technologies used">${badgesHTML}</div>
    `;

    container.appendChild(card);
    console.log(`  [${index + 1}/${projects.length}] Rendered: "${project.title}"`);
  });

  console.log("[renderProjects] Done. All cards injected into #" + containerId);
}

// ─── CONTACT SECTION ADAPTATION ──────────────────────────────────────────────

const CONTACT_EMAIL = "oganudoka204@gmail.com";
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}`;
const MAILTO_URL = `mailto:${CONTACT_EMAIL}`;

const MAIL_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`;

const EXTERNAL_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>`;

/**
 * Detects whether the visitor is using a mobile phone.
 * Combines User-Agent sniffing, navigator.userAgentData, and coarse pointer / narrow viewport heuristics.
 * @returns {boolean}
 */
function isMobilePhone() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera || "";
  const mobileRegex = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isMobileUA = mobileRegex.test(userAgent);
  const isMobileClientHint = Boolean(navigator.userAgentData && navigator.userAgentData.mobile);
  const hasCoarsePointer = Boolean(window.matchMedia && window.matchMedia("(pointer: coarse)").matches);
  const isSmallScreen = Boolean(window.matchMedia && window.matchMedia("(max-width: 768px)").matches);

  return isMobileUA || isMobileClientHint || (hasCoarsePointer && isSmallScreen);
}

/**
 * Updates contact section buttons depending on mobile phone vs. desktop/laptop environment.
 */
function updateContactEmailButtons() {
  const primaryBtn = document.getElementById("contact-primary-email");
  const secondaryBtn = document.getElementById("contact-secondary-email");

  if (!primaryBtn || !secondaryBtn) return;

  const isMobile = isMobilePhone();

  if (isMobile) {
    // Mobile phones:
    // Primary: "Open Email App" -> mailto link
    // Secondary: "Use Gmail in Browser" -> Gmail web compose
    primaryBtn.href = MAILTO_URL;
    primaryBtn.removeAttribute("target");
    primaryBtn.removeAttribute("rel");
    primaryBtn.setAttribute("aria-label", "Open Email App with oganudoka204@gmail.com");
    primaryBtn.innerHTML = `${MAIL_ICON_SVG}<span>Open Email App</span>`;

    secondaryBtn.href = GMAIL_COMPOSE_URL;
    secondaryBtn.target = "_blank";
    secondaryBtn.rel = "noopener noreferrer";
    secondaryBtn.setAttribute("aria-label", "Use Gmail in Browser to email oganudoka204@gmail.com");
    secondaryBtn.innerHTML = `${EXTERNAL_ICON_SVG}<span>Use Gmail in Browser</span>`;
  } else {
    // Desktop / laptops:
    // Primary: "Send Email with Gmail" -> Gmail web compose
    // Secondary: "Use Desktop Email App" -> mailto link
    primaryBtn.href = GMAIL_COMPOSE_URL;
    primaryBtn.target = "_blank";
    primaryBtn.rel = "noopener noreferrer";
    primaryBtn.setAttribute("aria-label", "Send Email with Gmail to oganudoka204@gmail.com");
    primaryBtn.innerHTML = `${MAIL_ICON_SVG}<span>Send Email with Gmail</span>`;

    secondaryBtn.href = MAILTO_URL;
    secondaryBtn.removeAttribute("target");
    secondaryBtn.removeAttribute("rel");
    secondaryBtn.setAttribute("aria-label", "Use Desktop Email App to email oganudoka204@gmail.com");
    secondaryBtn.innerHTML = `${EXTERNAL_ICON_SVG}<span>Use Desktop Email App</span>`;
  }
}

// ─── INIT ────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  renderProjects("projects-grid");
  updateContactEmailButtons();

  // Listen for window resize or viewport changes to adapt dynamically if device mode changes
  window.addEventListener("resize", updateContactEmailButtons);
  if (window.matchMedia) {
    window.matchMedia("(max-width: 768px)").addEventListener("change", updateContactEmailButtons);
    window.matchMedia("(pointer: coarse)").addEventListener("change", updateContactEmailButtons);
  }
});
