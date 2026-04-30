/**
 * APP MODULE - P2613 Project Web
 * Main application logic: rendering, filters, modals, interactions
 */

(function() {
  'use strict';

  // ============ UTILS ============
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);
  const escapeHtml = (str) => str.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[m]));

  // ============ NAVBAR SCROLL ============
  function initNavbar() {
    const navbar = $('#navbar');
    const mobileBtn = $('#mobile-menu-btn');
    const mobileMenu = $('#mobile-menu');

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    mobileBtn?.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const isHidden = mobileMenu.classList.contains('hidden');
      mobileBtn.setAttribute('aria-expanded', String(!isHidden));
      const icon = mobileBtn.querySelector('[data-lucide]');
      if (icon) {
        icon.setAttribute('data-lucide', isHidden ? 'menu' : 'x');
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    });

    // Close mobile menu on link click
    $$('.mobile-link').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  // ============ COMPARISON TABLE ============
  function renderComparison() {
    const tbody = $('#comparison-table-body');
    if (!tbody || typeof COMPARISON === 'undefined') return;

    tbody.innerHTML = COMPARISON.map(row => `
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="px-6 py-4 font-medium text-brand-dark">${escapeHtml(row.param)}</td>
        <td class="px-6 py-4 text-center text-brand-gray">${escapeHtml(row.sprayball)}</td>
        <td class="px-6 py-4 text-center text-brand-blue font-semibold">${escapeHtml(row.twister)}</td>
        <td class="px-6 py-4 text-center">
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${row.variation === 'Reduccion' || row.variation === 'Incremento' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}">
            ${row.variation === 'Reduccion' ? '<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>' : row.variation === 'Incremento' ? '<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>' : '<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>'}
            ${escapeHtml(row.variation)}
          </span>
        </td>
      </tr>
    `).join('');
  }

  // ============ SCENARIOS ============
  const PROFILE_SCENARIOS = ['01','04','05','11','16','17'];
  const hasProfile = (id) => PROFILE_SCENARIOS.includes(String(id).padStart(2,'0'));

  function renderScenarios(filter = 'all') {
    const grid = $('#scenarios-grid');
    if (!grid || typeof SCENARIOS === 'undefined' || typeof STATUS_CONFIG === 'undefined') return;

    const filtered = filter === 'all' ? SCENARIOS : SCENARIOS.filter(s => s.status === filter);

    grid.innerHTML = filtered.map(sc => {
      const cfg = STATUS_CONFIG[sc.status] || STATUS_CONFIG.na;
      const scHasProfile = hasProfile(sc.id);
      const imgNum = String(sc.id).padStart(2, '0');

      return `
        <div class="scenario-card bg-white rounded-2xl shadow-card hover:shadow-card-hover border border-gray-100 overflow-hidden cursor-pointer group"
             data-scenario-id="${sc.id}"
             data-status="${sc.status}" role="button" tabindex="0" aria-label="${escapeHtml(sc.code)}: ${escapeHtml(sc.name)}">
          <div class="relative aspect-[16/10] overflow-hidden bg-gray-50">
            <img src="assets/infografias/fig_scenario_${imgNum}_summary.png" 
                 alt="${escapeHtml(sc.code)}" 
                 class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                 loading="lazy">
            <div class="absolute top-3 left-3">
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white ${cfg.color} shadow-lg">
                ${cfg.label}
              </span>
            </div>
            <div class="absolute top-3 right-3">
              <span class="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur text-xs font-bold text-brand-dark shadow">
                ${escapeHtml(sc.code)}
              </span>
            </div>
            ${scHasProfile ? '<div class="absolute bottom-3 right-3"><span class="px-2 py-1 rounded-lg bg-brand-blue/80 text-white text-xs font-medium backdrop-blur">Perfil disponible</span></div>' : ''}
          </div>
          <div class="p-4">
            <h4 class="font-semibold text-brand-dark text-sm mb-2 line-clamp-2 leading-snug">${escapeHtml(sc.name)}</h4>
            <div class="flex items-center justify-between text-xs text-brand-gray">
              <span class="flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                ${sc.q} USgpm
              </span>
              <span class="flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
                ${sc.p !== null ? sc.p + ' psig' : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function initScenarioFilters() {
    $$('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.filter-btn').forEach(b => {
          b.classList.remove('active', 'bg-brand-dark', 'text-white', 'shadow-md');
          b.classList.add('bg-white', 'text-brand-gray', 'border', 'border-gray-200');
        });
        btn.classList.add('active', 'bg-brand-dark', 'text-white', 'shadow-md');
        btn.classList.remove('bg-white', 'text-brand-gray', 'border', 'border-gray-200');
        renderScenarios(btn.dataset.filter);
      });
    });
  }

  // ============ SCENARIO MODAL ============
  window.openScenarioModal = function(id) {
    if (typeof SCENARIOS === 'undefined' || typeof STATUS_CONFIG === 'undefined' || typeof DOCUMENTS === 'undefined') return;
    const sc = SCENARIOS.find(s => s.id === id);
    if (!sc) return;

    const cfg = STATUS_CONFIG[sc.status] || STATUS_CONFIG.na;
    const imgNum = String(sc.id).padStart(2, '0');
    const scHasProfile = hasProfile(sc.id);

    const titleEl = $('#modal-title');
    const subtitleEl = $('#modal-subtitle');
    const imageEl = $('#modal-image');
    if (titleEl) titleEl.textContent = sc.code;
    if (subtitleEl) subtitleEl.textContent = sc.name;
    if (imageEl) {
      imageEl.src = `assets/infografias/fig_scenario_${imgNum}_summary.png`;
      imageEl.alt = `Infografia ${sc.code}: ${sc.name}`;
    }

    const pVal = sc.p != null ? sc.p : null;
    const vVal = sc.v != null ? sc.v : null;
    const reVal = sc.re != null ? sc.re.toLocaleString() : 'N/A';

    const statsHtml = `
      <div class="flex justify-between py-2 border-b border-gray-100"><span class="text-brand-gray">Caudal</span><span class="font-semibold text-brand-dark">${sc.q != null ? sc.q : 'N/A'} USgpm</span></div>
      <div class="flex justify-between py-2 border-b border-gray-100"><span class="text-brand-gray">Presion disp.</span><span class="font-semibold ${pVal !== null ? (pVal >= 58 ? 'text-emerald-600' : 'text-rose-600') : 'text-brand-gray'}">${pVal !== null ? pVal + ' psig' : 'N/A'}</span></div>
      <div class="flex justify-between py-2 border-b border-gray-100"><span class="text-brand-gray">Velocidad</span><span class="font-semibold text-brand-dark">${vVal !== null ? vVal + ' m/s' : 'N/A'}</span></div>
      <div class="flex justify-between py-2 border-b border-gray-100"><span class="text-brand-gray">Reynolds</span><span class="font-semibold text-brand-dark">${reVal}</span></div>
      <div class="flex justify-between py-2"><span class="text-brand-gray">Estado</span><span class="font-semibold ${cfg.text}">${cfg.label}</span></div>
    `;
    const statsEl = $('#modal-stats');
    if (statsEl) statsEl.innerHTML = statsHtml;

    const docItem = DOCUMENTS.find(d => d.id === `P2613-PR-MC-${imgNum.padStart(3,'0')}`);
    const docUrl = docItem?.url;
    const actionsEl = $('#modal-actions');
    if (actionsEl) {
      actionsEl.innerHTML = `
        ${docUrl ? `
        <a href="${escapeHtml(docUrl)}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 w-full px-4 py-3 bg-brand-dark text-white rounded-xl font-semibold hover:bg-brand-blue transition-colors" aria-label="Descargar simulacion ${escapeHtml(sc.code)}">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          Descargar Simulacion
        </a>
        ` : `
        <span class="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-100 text-gray-400 rounded-xl font-semibold cursor-not-allowed" title="Documento disponible bajo solicitud">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          Simulacion bajo solicitud
        </span>
        `}
        ${scHasProfile ? `
        <button id="modal-view-profile" class="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white text-brand-dark border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-colors" type="button">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
          Ver Perfil Hidraulico
        </button>
        ` : ''}
      `;
      const profileBtn = $('#modal-view-profile');
      if (profileBtn) {
        profileBtn.addEventListener('click', () => {
          closeScenarioModal();
          setTimeout(() => {
            const tabBtn = document.querySelector('[data-tab="perfiles"]');
            if (tabBtn) tabBtn.click();
            const selector = document.getElementById('profile-selector');
            if (selector) {
              selector.value = imgNum;
              selector.dispatchEvent(new Event('change'));
            }
            const analisis = document.getElementById('analisis');
            if (analisis) analisis.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        });
      }
    }

    const modalEl = $('#scenario-modal');
    if (modalEl) {
      modalEl.classList.remove('hidden');
      modalEl.setAttribute('aria-hidden', 'false');
    }
    document.body.style.overflow = 'hidden';
  };

  window.closeScenarioModal = function() {
    const modal = $('#scenario-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = '';
  };

  // ============ EQUIPMENT ============
  function renderEquipment() {
    const grid = $('#equipment-grid');
    if (!grid || typeof EQUIPMENT === 'undefined') return;

    grid.innerHTML = EQUIPMENT.map(eq => {
      const statusColors = {
        ok: 'bg-emerald-50 text-emerald-600',
        limitada: 'bg-amber-50 text-amber-600',
        propuesta: 'bg-indigo-50 text-indigo-600',
        activo: 'bg-sky-50 text-sky-600'
      };
      const statusLabels = { ok: 'OK', limitada: 'Limitada', propuesta: 'Propuesta', activo: 'Activo' };
      const statusClass = statusColors[eq.status] || statusColors.ok;
      const statusLabel = statusLabels[eq.status] || 'OK';

      return `
        <div class="equipment-card bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover border border-gray-100 cursor-pointer"
             data-equipment-id="${escapeHtml(eq.id)}" role="button" tabindex="0" aria-label="${escapeHtml(eq.name)}: ${escapeHtml(eq.model)}">
          <div class="flex items-start justify-between mb-4">
            <div>
              <span class="text-xs font-semibold text-brand-blue uppercase tracking-wider">${escapeHtml(eq.category)}</span>
              <h3 class="text-lg font-bold text-brand-dark mt-1">${escapeHtml(eq.name)}</h3>
              <p class="text-sm text-brand-gray">${escapeHtml(eq.model)}</p>
            </div>
            <span class="px-2.5 py-1 rounded-full text-xs font-bold ${statusClass}">${statusLabel}</span>
          </div>
          <div class="space-y-2">
            ${eq.specs.slice(0, 3).map(s => `
              <div class="flex justify-between text-sm">
                <span class="text-brand-gray">${escapeHtml(s.label)}</span>
                <span class="font-medium text-brand-dark">${escapeHtml(s.value)}</span>
              </div>
            `).join('')}
          </div>
          ${eq.image ? `
          <div class="mt-4 pt-4 border-t border-gray-100">
            <img src="${escapeHtml(eq.image)}" alt="${escapeHtml(eq.name)}" class="w-full h-32 object-contain rounded-lg bg-gray-50" loading="lazy">
          </div>
          ` : ''}
        </div>
      `;
    }).join('');

    $$('.equipment-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.equipmentId;
        openEquipmentModal(id);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = card.dataset.equipmentId;
          openEquipmentModal(id);
        }
      });
    });
  }

  window.openEquipmentModal = function(id) {
    if (typeof EQUIPMENT === 'undefined') return;
    const eq = EQUIPMENT.find(e => e.id === id);
    if (!eq) return;

    const titleEl = $('#eq-modal-title');
    if (titleEl) titleEl.textContent = eq.name;

    let content = `
      <p class="text-brand-gray mb-4">${escapeHtml(eq.model)}</p>
      <div class="bg-brand-light rounded-xl p-4 mb-4">
        <h5 class="font-semibold text-brand-dark mb-3">Especificaciones Tecnicas</h5>
        <div class="space-y-2">
          ${eq.specs.map(s => `
            <div class="flex justify-between py-2 border-b border-gray-200 last:border-0 text-sm">
              <span class="text-brand-gray">${escapeHtml(s.label)}</span>
              <span class="font-semibold text-brand-dark">${escapeHtml(s.value)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    if (eq.image) {
      const safeImage = eq.image.replace(/'/g, "\\'");
      const safeName = eq.name.replace(/'/g, "\\'");
      content += `
        <div class="rounded-xl overflow-hidden border border-gray-100">
          <img src="${escapeHtml(eq.image)}" alt="${escapeHtml(eq.name)}" class="w-full object-contain bg-gray-50 cursor-zoom-in" onclick="openLightbox('${safeImage}', '${safeName}')">
        </div>
      `;
    }

    const contentEl = $('#eq-modal-content');
    if (contentEl) contentEl.innerHTML = content;
    const modal = $('#equipment-modal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');
    }
    document.body.style.overflow = 'hidden';
  };

  window.closeEquipmentModal = function() {
    const modal = $('#equipment-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = '';
  };

  // ============ ANALYSIS TABS ============
  function initAnalysisTabs() {
    $$('.analysis-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        $$('.analysis-tab').forEach(t => {
          t.classList.remove('active', 'bg-brand-dark', 'text-white', 'shadow-md');
          t.classList.add('bg-white', 'text-brand-gray', 'border', 'border-gray-200');
        });
        tab.classList.add('active', 'bg-brand-dark', 'text-white', 'shadow-md');
        tab.classList.remove('bg-white', 'text-brand-gray', 'border', 'border-gray-200');

        $$('.analysis-content').forEach(c => c.classList.add('hidden'));
        $(`#tab-${tab.dataset.tab}`).classList.remove('hidden');
      });
    });

    // Profile selector
    const selector = $('#profile-selector');
    selector?.addEventListener('change', (e) => {
      const num = e.target.value;
      const names = {
        '01': 'ESC-01: Operacion normal sin sanitizacion activa',
        '04': 'ESC-04: Sanitizacion de un tanque',
        '05': 'ESC-05: Sanitizacion de una linea',
        '11': 'ESC-11: Sanitizacion simultanea tanque + linea',
        '16': 'ESC-16: Maxima demanda simultanea',
        '17': 'ESC-17: Propuesta C218 + VDC'
      };
      $('#profile-image').src = `assets/perfiles/fig_scenario_${num}_profile.png`;
      $('#profile-caption').textContent = names[num] || '';
    });
  }

  // ============ THERMAL TABLE ============
  function renderThermal() {
    const tbody = $('#thermal-table-body');
    if (!tbody || typeof THERMAL === 'undefined') return;

    tbody.innerHTML = THERMAL.map((t, i) => `
      <tr class="hover:bg-white transition-colors">
        <td class="px-4 py-3 font-medium text-brand-dark">${escapeHtml(t.scenario)}</td>
        <td class="px-4 py-3 text-center text-brand-gray">${escapeHtml(t.length)}</td>
        <td class="px-4 py-3 text-center text-brand-gray">${escapeHtml(t.diam)}</td>
        <td class="px-4 py-3 text-center text-brand-gray">${escapeHtml(t.insulation)}</td>
        <td class="px-4 py-3 text-center">
          <span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            ${escapeHtml(t.temp)}
          </span>
        </td>
      </tr>
    `).join('');
  }

  // ============ DOCUMENTS ============
  function renderDocuments(docs) {
    const tbody = $('#documents-table-body');
    if (!tbody) return;

    const catColors = {
      'Informes': 'bg-blue-50 text-blue-700',
      'Hoja de Datos': 'bg-amber-50 text-amber-700',
      'Simulaciones': 'bg-emerald-50 text-emerald-700',
      'Planos': 'bg-rose-50 text-rose-700',
      'Transmittal': 'bg-purple-50 text-purple-700'
    };

    tbody.innerHTML = docs.map(doc => `
      <tr class="doc-row" data-category="${escapeHtml(doc.category)}">
        <td class="px-4 py-3 font-medium text-brand-dark whitespace-nowrap">${escapeHtml(doc.item)}</td>
        <td class="px-4 py-3 font-mono text-sm text-brand-blue">${escapeHtml(doc.id)}</td>
        <td class="px-4 py-3">
          <div class="flex items-start gap-2">
            <span class="inline-block px-2 py-0.5 rounded text-xs font-semibold ${catColors[doc.category] || 'bg-gray-100 text-gray-600'} shrink-0 mt-0.5">${escapeHtml(doc.category)}</span>
            <span class="text-brand-dark">${escapeHtml(doc.desc)}</span>
          </div>
          ${doc.note ? `<p class="text-xs text-amber-600 mt-1 ml-16">${escapeHtml(doc.note)}</p>` : ''}
        </td>
        <td class="px-4 py-3 text-center">
          <span class="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-brand-light text-brand-dark text-xs font-bold">${escapeHtml(doc.rev)}</span>
        </td>
        <td class="px-4 py-3 text-center text-brand-gray">${doc.pages}</td>
        <td class="px-4 py-3 text-center">
          ${doc.url ? `
          <a href="${escapeHtml(doc.url)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-brand-dark text-white text-xs font-semibold hover:bg-brand-blue transition-colors" aria-label="Descargar ${escapeHtml(doc.id)}">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            Descargar
          </a>
          ` : `
          <span class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-100 text-gray-400 text-xs font-semibold cursor-not-allowed" title="Documento disponible bajo solicitud">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            Bajo solicitud
          </span>
          `}
        </td>
      </tr>
    `).join('');
  }

  function initDocumentFilters() {
    let currentFilter = 'all';
    let currentSearch = '';

    function filterDocs() {
      let docs = DOCUMENTS || [];
      if (currentFilter !== 'all') {
        docs = docs.filter(d => d.category === currentFilter);
      }
      if (currentSearch) {
        const q = currentSearch.toLowerCase();
        docs = docs.filter(d => 
          d.id.toLowerCase().includes(q) || 
          d.desc.toLowerCase().includes(q) ||
          d.item.toLowerCase().includes(q)
        );
      }
      renderDocuments(docs);
    }

    $$('.doc-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.doc-filter').forEach(b => {
          b.classList.remove('active', 'bg-brand-dark', 'text-white', 'shadow-md');
          b.classList.add('bg-white', 'text-brand-gray', 'border', 'border-gray-200');
        });
        btn.classList.add('active', 'bg-brand-dark', 'text-white', 'shadow-md');
        btn.classList.remove('bg-white', 'text-brand-gray', 'border', 'border-gray-200');
        currentFilter = btn.dataset.dfilter;
        filterDocs();
      });
    });

    $('#doc-search')?.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      filterDocs();
    });

    filterDocs();
  }

  // ============ CONCLUSIONS ============
  function renderConclusions() {
    const container = $('#conclusions-timeline');
    if (!container || typeof CONCLUSIONS === 'undefined') return;

    container.innerHTML = CONCLUSIONS.map((c, i) => {
      const isLeft = i % 2 === 0;
      return `
        <div class="timeline-item relative flex items-start gap-6 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}">
          <!-- Dot -->
          <div class="absolute left-4 lg:left-1/2 w-8 h-8 -ml-4 lg:-ml-4 rounded-full bg-brand-dark border-4 border-white shadow-lg z-10 flex items-center justify-center timeline-badge">
            <span class="text-white text-xs font-bold">${c.num}</span>
          </div>
          
          <!-- Content -->
          <div class="ml-14 lg:ml-0 ${isLeft ? 'lg:pr-16 lg:w-1/2 lg:text-right' : 'lg:pl-16 lg:w-1/2'}">
            <div class="bg-white rounded-2xl p-6 shadow-card border border-gray-100 hover:shadow-card-hover transition-shadow">
              <div class="flex items-center gap-3 mb-3 ${isLeft ? 'lg:justify-end' : ''}">
                <span class="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold text-sm">${c.num}</span>
                <h4 class="font-bold text-brand-dark">Conclusion ${c.num}</h4>
              </div>
              <p class="text-brand-gray leading-relaxed text-sm">${escapeHtml(c.text)}</p>
            </div>
          </div>
          
          <!-- Spacer for opposite side -->
          <div class="hidden lg:block lg:w-1/2"></div>
        </div>
      `;
    }).join('');
  }

  // ============ LIGHTBOX ============
  window.openLightbox = function(src, altText) {
    const img = $('#lightbox-image');
    if (img) {
      img.src = src;
      img.alt = altText || 'Imagen ampliada';
    }
    const modal = $('#lightbox');
    if (modal) {
      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');
    }
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function() {
    const modal = $('#lightbox');
    if (modal) {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = '';
  };

  // ============ KEYBOARD NAVIGATION ============
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeScenarioModal();
      closeEquipmentModal();
      closeLightbox();
    }
  });

  // ============ DASHBOARD DATA INJECTION ============
  function injectDashboardData() {
    if (typeof SCENARIOS === 'undefined' || typeof THERMAL === 'undefined') return;

    const passCount = SCENARIOS.filter(s => s.status === 'cumple').length;
    const esc17 = SCENARIOS.find(s => s.id === 17);
    const failScenarios = SCENARIOS.filter(s => s.status === 'nocumple' && typeof s.p === 'number');
    const minFailP = failScenarios.length > 0 ? Math.min(...failScenarios.map(s => s.p)) : null;

    // Calculate minimum margin among passing scenarios dynamically
    const passScenarios = SCENARIOS.filter(s => s.status === 'cumple' && typeof s.p === 'number');
    const criticalMargin = passScenarios.length > 0
      ? Math.min(...passScenarios.map(s => s.p - 58))
      : 0;

    const esc17Margin = (esc17 && typeof esc17.p === 'number') ? (esc17.p - 58) : 8.5;

    const minTemp = THERMAL.reduce((min, t) => {
      const val = parseFloat(t.temp);
      return val < min ? val : min;
    }, 999);
    const tempMargin = minTemp - 80;

    // Inject values
    const setText = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    setText('dash-pass-count', passCount);
    setText('dash-pass-text', passCount);
    setText('dash-critical-margin', criticalMargin.toFixed(2) + ' psig');
    if (minFailP !== null) setText('dash-min-fail-psig', minFailP.toFixed(2));
    if (esc17 && typeof esc17.p === 'number') {
      setText('dash-esc17-psig', esc17.p.toFixed(2) + ' psig');
      setText('dash-esc17-margin', esc17Margin.toFixed(1));
      setText('dash-esc17-margin-text', esc17Margin.toFixed(1));
    }
    setText('thermal-min-temp', minTemp.toFixed(2) + ' C');
    setText('thermal-min-margin', (tempMargin >= 0 ? '+' : '') + tempMargin.toFixed(2) + ' C');
  }

  // ============ INITIALIZATION ============
  function init() {
    initNavbar();
    injectDashboardData();
    renderComparison();
    renderScenarios('all');
    initScenarioFilters();
    renderEquipment();
    initAnalysisTabs();
    renderThermal();
    initDocumentFilters();
    renderConclusions();
    // Animate timeline items after they've been injected into the DOM
    if (typeof initTimelineAnimations === 'function') {
      initTimelineAnimations();
    }

    console.log('[App] P2613 Web App initialized');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
