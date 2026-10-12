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

// ─── INIT ────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  renderProjects("projects-grid");
});
