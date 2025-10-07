'use strict';

const API_BASE_URL = document.body?.dataset?.apiBase || 'http://localhost:4000/api';
const FALLBACK_KEYS = {
    requests: 'fintechhubProviderRequests',
    contacts: 'fintechhubContacts',
    newsletter: 'fintechhubNewsletter'
};

const PAGE_INITIALIZERS = {
    home: () => {
        initCharts();
        initDirectoryFilters();
        initMapFilters();
        initSolutionsTabs();
    },
    providers: () => {
        initDirectoryFilters();
    },
    solutions: () => {
        initSolutionsTabs();
    },
    news: () => {
        initNewsPage();
    },
    regulation: () => {
        initRegulationPage();
    }
};

const toast = document.getElementById('formToast');
let toastTimeoutId;

function safeParse(key) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : [];
    } catch (error) {
        console.warn('Yerel veri okunamadı:', error);
        return [];
    }
}

function persistFallback(key, payload) {
    const current = safeParse(key);
    current.push(payload);
    try {
        localStorage.setItem(key, JSON.stringify(current));
    } catch (error) {
        console.warn('Yerel veri kaydedilemedi:', error);
    }
    return current;
}

function formatTimestamp(timestamp) {
    if (!timestamp) return 'Henüz kayıt yok';
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) return 'Henüz kayıt yok';
    return date.toLocaleString('tr-TR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatDate(dateString) {
    if (!dateString) return 'Güncelleniyor';
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return 'Güncelleniyor';
    return date.toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}

function applyOpsSummary(summary) {
    const opsRequestCountEl = document.getElementById('opsRequestsCount');
    const opsContactCountEl = document.getElementById('opsContactCount');
    const opsNewsletterCountEl = document.getElementById('opsNewsletterCount');
    const opsLatestUpdateEl = document.getElementById('opsLatestUpdate');

    if (!opsRequestCountEl || !opsContactCountEl || !opsNewsletterCountEl || !opsLatestUpdateEl) {
        return;
    }

    opsRequestCountEl.textContent = (summary?.requests ?? 0).toString();
    opsContactCountEl.textContent = (summary?.contacts ?? 0).toString();
    opsNewsletterCountEl.textContent = (summary?.newsletter ?? 0).toString();
    opsLatestUpdateEl.textContent = summary?.lastUpdate
        ? formatTimestamp(summary.lastUpdate)
        : 'Henüz kayıt yok';
}

function buildOpsSummaryFromFallback() {
    const requests = safeParse(FALLBACK_KEYS.requests);
    const contacts = safeParse(FALLBACK_KEYS.contacts);
    const newsletters = safeParse(FALLBACK_KEYS.newsletter);
    const allEntries = [...requests, ...contacts, ...newsletters]
        .filter(entry => entry && entry.timestamp)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return {
        requests: requests.length,
        contacts: contacts.length,
        newsletter: newsletters.length,
        lastUpdate: allEntries.length ? allEntries[0].timestamp : null
    };
}

async function apiRequest(endpoint, payload) {
    const url = `${API_BASE_URL.replace(/\/$/, '')}/${endpoint}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const message = errorBody?.error || 'Sunucuya ulaşılamadı';
        throw new Error(message);
    }

    return response.json();
}

async function fetchOpsSummary() {
    try {
        const response = await fetch(`${API_BASE_URL.replace(/\/$/, '')}/admin/summary`);
        if (!response.ok) throw new Error('Ops özeti alınamadı');
        const data = await response.json();
        applyOpsSummary(data?.totals || data);
    } catch (error) {
        console.info('Canlı ops özeti alınamadı, yerel veriye düşülüyor:', error.message);
        applyOpsSummary(buildOpsSummaryFromFallback());
    }
}

function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    toast.setAttribute('aria-hidden', 'false');
    clearTimeout(toastTimeoutId);
    toastTimeoutId = setTimeout(() => {
        toast.classList.remove('is-visible');
        toast.setAttribute('aria-hidden', 'true');
    }, 4200);
}

async function handleSubmission(endpoint, payload, fallbackKey, successMessage) {
    const timestamped = { ...payload, timestamp: new Date().toISOString() };
    try {
        const result = await apiRequest(endpoint, timestamped);
        if (result?.totals) {
            applyOpsSummary(result.totals);
        }
        showToast(result?.message || successMessage);
    } catch (error) {
        persistFallback(fallbackKey, timestamped);
        applyOpsSummary(buildOpsSummaryFromFallback());
        showToast(`${successMessage} (Offline kaydedildi)`);
        console.warn('API hatası, yerel depolama kullanıldı:', error.message);
    }
}

function setActiveNavigation(currentPage) {
    if (!currentPage) return;
    document.querySelectorAll(`[data-nav="${currentPage}"]`).forEach(link => {
        link.classList.add('is-active');
        const listItem = link.closest('li');
        if (listItem) {
            listItem.classList.add('is-active');
        }
    });
}

function initHomeLinkRouting() {
    document.querySelectorAll('[data-home-target]').forEach(link => {
        link.addEventListener('click', event => {
            const target = link.getAttribute('data-home-target');
            if (!target) return;
            const href = link.getAttribute('href');
            if (href && href.startsWith('#') && document.querySelector(href)) {
                return;
            }
            if (document.body?.dataset?.page && document.body.dataset.page !== 'home') {
                event.preventDefault();
                window.location.href = target;
            }
        });
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', event => {
            const selector = anchor.getAttribute('href');
            if (!selector || selector.length === 1) {
                return;
            }
            const target = document.querySelector(selector);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function initMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (!menuToggle || !mainNav) return;

    menuToggle.addEventListener('click', () => {
        const isOpen = mainNav.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('is-open')) {
                mainNav.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(contactForm);
        const payload = Object.fromEntries(formData.entries());
        handleSubmission('contact', payload, FALLBACK_KEYS.contacts, 'Mesajınız alındı! En kısa sürede dönüş yapacağız.');
        contactForm.reset();
    });
}

function initNewsletterForms() {
    document.querySelectorAll('.newsletter-form').forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(form);
            const payload = Object.fromEntries(formData.entries());
            payload.source = form.getAttribute('data-source') || 'footer';
            handleSubmission('newsletter', payload, FALLBACK_KEYS.newsletter, 'Bülten aboneliğiniz oluşturuldu.');
            form.reset();
        });
    });
}

function initRequestModal(currentPage) {
    const requestModal = document.getElementById('requestModal');
    const requestForm = document.getElementById('providerRequestForm');
    const requestProviderInput = document.getElementById('requestProvider');
    const requestIntentInput = document.getElementById('requestIntent');
    const requestSourceInput = document.getElementById('requestSource');
    const requestTitle = document.getElementById('requestModalTitle');
    const requestSubtitle = document.getElementById('requestModalSubtitle');
    const requestButtons = document.querySelectorAll('[data-request]');
    let lastRequestTrigger = null;

    if (!requestModal || !requestForm || !requestProviderInput || !requestIntentInput) {
        return;
    }

    const intentLabels = {
        info: 'detaylı bilgi talebi',
        demo: 'demo talebi',
        application: 'başvuru talebi'
    };
    const intentDescriptions = {
        info: 'Teknik doküman, fiyatlandırma ve kullanım senaryolarını paylaşıyoruz.',
        demo: 'Canlı demo takvimi ve entegrasyon ön koşullarını sizinle eşleştiriyoruz.',
        application: 'Sözleşme ve kurulum sürecini başlatmak için gerekli belgeleri iletiyoruz.'
    };

    const closeRequestModal = () => {
        requestModal.classList.remove('is-visible');
        requestModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        requestForm.reset();
        if (lastRequestTrigger) {
            lastRequestTrigger.focus();
            lastRequestTrigger = null;
        }
    };

    const openRequestModal = (trigger) => {
        if (!trigger) return;
        const providerName = trigger.dataset.provider
            || trigger.closest('.provider-card')?.querySelector('.provider-info h3')?.textContent?.trim()
            || trigger.closest('.solution-card')?.querySelector('h3')?.textContent?.trim()
            || 'FintechUBB Talebi';
        const key = intentLabels[trigger.dataset.request] ? trigger.dataset.request : 'info';
        requestForm.reset();
        requestProviderInput.value = providerName;
        requestIntentInput.value = key;
        if (requestSourceInput) {
            requestSourceInput.value = trigger.dataset.source || currentPage || 'web';
        }
        requestTitle.textContent = `${providerName} için ${intentLabels[key]}`;
        requestSubtitle.textContent = intentDescriptions[key] || 'Talebiniz FintechUBB uzmanlarına iletilir ve 24 saat içinde yanıtlanır.';
        requestModal.classList.add('is-visible');
        requestModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        lastRequestTrigger = trigger;
        const focusField = requestForm.querySelector('input[name="fullName"]');
        if (focusField && typeof focusField.focus === 'function') {
            try {
                focusField.focus({ preventScroll: true });
            } catch (error) {
                focusField.focus();
            }
        }
    };

    requestButtons.forEach(button => {
        button.addEventListener('click', () => {
            openRequestModal(button);
        });
    });

    requestModal.addEventListener('click', event => {
        if (event.target.closest('[data-close-request]')) {
            event.preventDefault();
            closeRequestModal();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && requestModal.classList.contains('is-visible')) {
            closeRequestModal();
        }
    });

    requestForm.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(requestForm);
        const payload = Object.fromEntries(formData.entries());
        handleSubmission('requests', payload, FALLBACK_KEYS.requests, 'Talebiniz alındı! Sağlayıcı ekibi kısa sürede iletişime geçecek.');
        closeRequestModal();
    });
}

function initDirectoryFilters() {
    const directory = document.getElementById('providersList');
    if (!directory) return;

    const directoryCards = Array.from(directory.querySelectorAll('.provider-card'));
    const categoryFilter = document.getElementById('providerCategoryFilter');
    const slaFilter = document.getElementById('providerSlaFilter');
    const searchInput = document.getElementById('providerSearch');
    const resetButton = document.getElementById('providerReset');
    const emptyState = document.createElement('div');
    emptyState.className = 'provider-empty';
    emptyState.innerHTML = '<i class="fas fa-circle-info"></i> Filtrelere uyan sağlayıcı bulunamadı. Filtreleri genişletin veya bize talep gönderin.';

    const applyDirectoryFilters = () => {
        const categoryValue = categoryFilter ? categoryFilter.value : 'all';
        const slaValue = slaFilter ? slaFilter.value : 'all';
        const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
        let visibleCount = 0;

        directoryCards.forEach(card => {
            const matchesCategory = categoryValue === 'all' || card.dataset.category === categoryValue;
            const matchesSla = slaValue === 'all' || card.dataset.sla === slaValue;
            const tags = (card.dataset.tags || '').toLowerCase();
            const matchesQuery = !query || card.textContent.toLowerCase().includes(query) || tags.includes(query);
            const isVisible = matchesCategory && matchesSla && matchesQuery;
            card.style.display = isVisible ? 'flex' : 'none';
            if (isVisible) visibleCount += 1;
        });

        if (visibleCount === 0) {
            if (!directory.contains(emptyState)) {
                directory.appendChild(emptyState);
            }
        } else if (directory.contains(emptyState)) {
            directory.removeChild(emptyState);
        }
    };

    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyDirectoryFilters);
    }
    if (slaFilter) {
        slaFilter.addEventListener('change', applyDirectoryFilters);
    }
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            window.requestAnimationFrame(applyDirectoryFilters);
        });
    }
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            if (categoryFilter) categoryFilter.value = 'all';
            if (slaFilter) slaFilter.value = 'all';
            if (searchInput) searchInput.value = '';
            applyDirectoryFilters();
        });
    }

    applyDirectoryFilters();
}

function initSolutionsTabs() {
    const detailTabs = document.querySelectorAll('.detail-tab');
    const detailPanels = document.querySelectorAll('.detail-panel');
    const detailHelper = document.getElementById('detailHelper');

    if (!detailTabs.length || !detailPanels.length) return;

    detailTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.target;
            detailTabs.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            detailPanels.forEach(panel => {
                const isTarget = panel.id === targetId;
                panel.hidden = !isTarget;
                panel.classList.toggle('active', isTarget);
            });
            if (detailHelper) {
                detailHelper.textContent = tab.dataset.helper || tab.textContent;
            }
        });
    });
}

function initMapFilters() {
    const mapCategoryButtons = document.querySelectorAll('.filter-btn');
    const mapRegionButtons = document.querySelectorAll('.chip-btn');
    const mapCards = document.querySelectorAll('.map-card');
    const mapStatus = document.querySelector('.map-status');

    if (!mapCategoryButtons.length || !mapCards.length) return;

    let activeCategory = 'all';
    let activeRegion = 'all';
    let activeRegionLabel = 'Türkiye';

    const updateMapResults = () => {
        let visible = 0;
        mapCards.forEach(card => {
            const matchesCategory = activeCategory === 'all' || card.dataset.mapCategory === activeCategory;
            const matchesRegion = activeRegion === 'all' || card.dataset.mapRegion === activeRegion;
            if (matchesCategory && matchesRegion) {
                card.style.display = 'flex';
                visible += 1;
            } else {
                card.style.display = 'none';
            }
        });
        if (mapStatus) {
            const scope = activeRegion === 'all' ? 'Türkiye genelinde' : `${activeRegionLabel} bölgesinde`;
            mapStatus.textContent = `${scope} ${visible} sonuç listeleniyor.`;
        }
    };

    mapCategoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            mapCategoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.mapCategory || 'all';
            updateMapResults();
        });
    });

    mapRegionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            mapRegionButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeRegion = btn.dataset.mapRegion || 'all';
            activeRegionLabel = btn.dataset.regionLabel || 'Türkiye';
            updateMapResults();
        });
    });

    updateMapResults();
}

function initFaqToggles() {
    document.querySelectorAll('.faq-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const expanded = trigger.getAttribute('aria-expanded') === 'true';
            trigger.setAttribute('aria-expanded', expanded ? 'false' : 'true');
            const panel = trigger.nextElementSibling;
            if (panel) {
                panel.hidden = expanded;
            }
        });
    });
}

function initComparisonFilters() {
    const scenarioSelect = document.getElementById('comparisonScenario');
    const comparisonRows = document.querySelectorAll('.comparison-table .comparison-row:not(.comparison-head)');
    const comparisonReset = document.getElementById('comparisonReset');
    const downloadComparisonBtn = document.getElementById('downloadComparison');

    if (!scenarioSelect && !comparisonReset && !downloadComparisonBtn) return;

    const updateComparisonRows = value => {
        const highlight = value !== 'all';
        comparisonRows.forEach(row => {
            const scenarios = (row.dataset.scenario || '').split(' ');
            const matches = value === 'all' || scenarios.includes(value);
            if (matches) {
                row.classList.remove('filtered');
                row.setAttribute('aria-hidden', 'false');
                row.classList.toggle('focused', highlight);
            } else {
                row.classList.add('filtered');
                row.classList.remove('focused');
                row.setAttribute('aria-hidden', 'true');
            }
        });
    };

    if (scenarioSelect) {
        scenarioSelect.addEventListener('change', () => {
            updateComparisonRows(scenarioSelect.value);
        });
    }

    if (comparisonReset) {
        comparisonReset.addEventListener('click', () => {
            if (scenarioSelect) {
                scenarioSelect.value = 'all';
            }
            comparisonRows.forEach(row => {
                row.classList.remove('filtered', 'focused');
                row.setAttribute('aria-hidden', 'false');
            });
        });
    }

    if (downloadComparisonBtn) {
        downloadComparisonBtn.addEventListener('click', () => {
            const rows = Array.from(document.querySelectorAll('.comparison-row')).map(row =>
                Array.from(row.children).map(cell => cell.innerText.replace(/\s+/g, ' ').trim())
            );
            const csvContent = rows.map(r => r.map(value => `"${value.replace(/"/g, '""')}"`).join(',')).join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'fintechhub-odeme-karsilastirma.csv';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        });
    }
}

async function loadContent(section) {
    try {
        const response = await fetch(`${API_BASE_URL.replace(/\/$/, '')}/content/${section}`);
        if (!response.ok) throw new Error('İçerik alınamadı');
        const data = await response.json();
        return Array.isArray(data?.items) ? data.items : [];
    } catch (error) {
        console.warn(`${section} içeriği alınamadı:`, error.message);
        return [];
    }
}

function renderNews(items) {
    const list = document.querySelector('[data-news-list]');
    const empty = list ? list.querySelector('[data-news-empty]') : null;
    if (!list) return;
    if (empty) {
        empty.remove();
    }
    list.innerHTML = '';

    if (!items.length) {
        if (empty) {
            empty.hidden = false;
            list.appendChild(empty);
        }
        return;
    }

    if (empty) {
        empty.hidden = true;
    }

    const fragment = document.createDocumentFragment();
    items.forEach(item => {
        const article = document.createElement('article');
        article.className = 'news-card';
        article.innerHTML = `
            <div class="news-content">
                <div class="news-meta">
                    <span><i class="fas fa-tag"></i> ${item.category || 'Fintek'}</span>
                    <span><i class="fas fa-calendar"></i> ${formatDate(item.publishedAt)}</span>
                </div>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
                <div class="news-actions">
                    <a class="btn-link" href="${item.url}" target="_blank" rel="noopener"><i class="fas fa-arrow-up-right-from-square"></i> Haberi oku</a>
                    ${item.source ? `<span class="news-source-chip"><i class="fas fa-newspaper"></i> ${item.source}</span>` : ''}
                </div>
                <div class="news-comment">
                    <span class="comment-label">FintechUBB Yorumu</span>
                    <p>${item.analysis || 'Veri odaklı yorum hazırlanıyor.'}</p>
                    ${item.insight ? `<p class="insight-note"><i class="fas fa-lightbulb"></i> ${item.insight}</p>` : ''}
                </div>
            </div>
        `;
        fragment.appendChild(article);
    });
    list.appendChild(fragment);

    if (empty) {
        list.appendChild(empty);
    }
}

async function initNewsPage() {
    const items = await loadContent('news');
    renderNews(items);
}

function renderRegulations(items) {
    const list = document.querySelector('[data-regulation-list]');
    const empty = list ? list.querySelector('[data-regulation-empty]') : null;
    if (!list) return;
    if (empty) {
        empty.remove();
    }
    list.innerHTML = '';

    if (!items.length) {
        if (empty) {
            empty.hidden = false;
            list.appendChild(empty);
        }
        return;
    }

    if (empty) {
        empty.hidden = true;
    }

    const fragment = document.createDocumentFragment();
    items.forEach(item => {
        const card = document.createElement('article');
        card.className = 'regulation-card';
        const actionsList = Array.isArray(item.actions)
            ? item.actions.map(action => `<li><i class="fas fa-check"></i>${action}</li>`).join('')
            : '';
        card.innerHTML = `
            <header>
                <div class="regulation-meta">
                    <span class="regulation-agency"><i class="fas fa-landmark"></i> ${item.agency || 'Regülatör'}</span>
                    <span class="regulation-date"><i class="fas fa-calendar-day"></i> ${formatDate(item.effectiveDate)}</span>
                </div>
                <h3>${item.title}</h3>
            </header>
            <p>${item.summary || ''}</p>
            <div class="regulation-impact">
                <h4><i class="fas fa-bolt"></i> Etki</h4>
                <p>${item.impact || 'Detaylandırma bekleniyor.'}</p>
            </div>
            ${actionsList ? `<ul class="regulation-actions">${actionsList}</ul>` : ''}
        `;
        fragment.appendChild(card);
    });
    list.appendChild(fragment);

    if (empty) {
        list.appendChild(empty);
    }
}

async function initRegulationPage() {
    const items = await loadContent('regulations');
    renderRegulations(items);
}

function initCharts() {
    initPaymentVolumeChart();
    initPaymentMethodsChart();
    initGrowthTrendChart();
    initRegionalChart();
    initMonthlyVolumeChart();
}

// Hero Chart - Payment Volume Trend
function initPaymentVolumeChart() {
    const ctx = document.getElementById('paymentVolumeChart');
    if (!ctx) return;

    const context = ctx.getContext('2d');
    const gradientStroke = context.createLinearGradient(0, 0, 0, ctx.height || 320);
    gradientStroke.addColorStop(0, '#1c60f5');
    gradientStroke.addColorStop(1, '#1bc5a4');

    const gradientFill = context.createLinearGradient(0, 0, 0, ctx.height || 320);
    gradientFill.addColorStop(0, 'rgba(28, 96, 245, 0.24)');
    gradientFill.addColorStop(1, 'rgba(27, 197, 164, 0.08)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [{
                label: 'Toplam Dijital Ödeme Hacmi (₺B)',
                data: [45.2, 67.8, 89.4, 103.7, 127.3],
                borderColor: gradientStroke,
                backgroundColor: gradientFill,
                borderWidth: 3,
                fill: true,
                tension: 0.45,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#ff7a59',
                pointBorderWidth: 0,
                segment: {
                    borderDash: ctx => ctx.p0DataIndex === 0 ? [0, 0] : [4, 4]
                }
            }, {
                label: 'Mobil Ödeme Hacmi (₺B)',
                data: [12.4, 19.3, 26.2, 32.8, 41.6],
                borderColor: '#1bc5a4',
                backgroundColor: 'rgba(27, 197, 164, 0.18)',
                borderWidth: 2,
                fill: true,
                tension: 0.45,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#1bc5a4',
                pointBorderWidth: 0,
                borderDash: [6, 6]
            }, {
                label: 'Ortalama İşlem Tutarı (₺)',
                data: [128, 142, 155, 169, 187],
                borderColor: '#ff7a59',
                backgroundColor: 'rgba(255, 122, 89, 0.18)',
                borderWidth: 2,
                fill: false,
                tension: 0.35,
                pointRadius: 4,
                pointHoverRadius: 6,
                yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#051433',
                        usePointStyle: true,
                        padding: 18
                    }
                },
                tooltip: {
                    callbacks: {
                        label: context => {
                            if (context.dataset.label.includes('Tutar')) {
                                return ` ${context.dataset.label}: ₺${context.parsed.y.toLocaleString('tr-TR')}`;
                            }
                            return ` ${context.dataset.label}: ₺${context.parsed.y.toFixed(1)}B`;
                        }
                    }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(28, 96, 245, 0.12)'
                    },
                    ticks: {
                        color: '#1c2c4d',
                        callback: value => `₺${value}B`
                    }
                },
                y1: {
                    position: 'right',
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        color: '#1c2c4d',
                        callback: value => `₺${value}`
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(28, 96, 245, 0.08)'
                    },
                    ticks: {
                        color: '#1c2c4d'
                    }
                }
            }
        }
    });
}

function initPaymentMethodsChart() {
    const ctx = document.getElementById('paymentMethodsChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Kredi Kartı', 'Banka Kartı', 'Mobil Ödeme', 'Dijital Cüzdan', 'Kripto'],
            datasets: [{
                label: '2024 Payı',
                data: [34.6, 27.9, 19.7, 13.2, 4.6],
                backgroundColor: [
                    '#1c60f5',
                    '#5aa8ff',
                    '#1bc5a4',
                    '#6f4ef2',
                    '#ff7a59'
                ],
                borderColor: '#ffffff',
                borderWidth: 3,
                hoverOffset: 10,
                cutout: '58%'
            }, {
                label: '2023 Payı',
                data: [37.1, 29.4, 16.5, 11.2, 3.8],
                backgroundColor: [
                    'rgba(28, 96, 245, 0.18)',
                    'rgba(90, 168, 255, 0.18)',
                    'rgba(27, 197, 164, 0.18)',
                    'rgba(111, 78, 242, 0.18)',
                    'rgba(255, 122, 89, 0.18)'
                ],
                borderColor: '#ffffff',
                borderWidth: 2,
                hoverOffset: 6,
                cutout: '72%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        color: '#051433'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: context => ` ${context.dataset.label} - ${context.label}: ${context.parsed.toFixed(1)}%`
                    }
                }
            }
        }
    });
}

function initGrowthTrendChart() {
    const ctx = document.getElementById('growthTrendChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
                label: '2023 Gelir Büyümesi',
                data: [18.2, 22.1, 19.8, 25.3],
                backgroundColor: 'rgba(28, 96, 245, 0.45)',
                borderRadius: 12,
                borderSkipped: false
            }, {
                label: '2024 Gelir Büyümesi',
                data: [21.4, 26.7, 23.1, 28.9],
                backgroundColor: 'rgba(27, 197, 164, 0.7)',
                borderRadius: 12,
                borderSkipped: false
            }, {
                type: 'line',
                label: 'Aktif Müşteri Artışı',
                data: [16.5, 18.9, 21.4, 24.8],
                borderColor: '#ff7a59',
                backgroundColor: 'rgba(255, 122, 89, 0.18)',
                borderWidth: 3,
                tension: 0.35,
                yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#051433'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: context => ` ${context.dataset.label}: %${context.parsed.y.toFixed(1)}`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(28, 96, 245, 0.12)'
                    },
                    ticks: {
                        color: '#1c2c4d',
                        callback: value => `%${value}`
                    }
                },
                y1: {
                    position: 'right',
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        color: '#1c2c4d',
                        callback: value => `%${value}`
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(28, 96, 245, 0.08)'
                    },
                    ticks: {
                        color: '#1c2c4d'
                    }
                }
            }
        }
    });
}

function initRegionalChart() {
    const ctx = document.getElementById('regionalChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Marmara', 'Ege', 'İç Anadolu', 'Akdeniz', 'Karadeniz', 'Doğu Anadolu', 'Güneydoğu'],
            datasets: [{
                label: '2024 Aktif Fintech Oranı',
                data: [92, 76, 58, 47, 39, 21, 27],
                backgroundColor: 'rgba(28, 96, 245, 0.18)',
                borderColor: '#1c60f5',
                pointBackgroundColor: '#1c60f5',
                pointBorderColor: '#ffffff',
                borderWidth: 2
            }, {
                label: '2023 Aktif Fintech Oranı',
                data: [85, 70, 52, 42, 33, 18, 22],
                backgroundColor: 'rgba(27, 197, 164, 0.12)',
                borderColor: '#1bc5a4',
                pointBackgroundColor: '#1bc5a4',
                pointBorderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#051433'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: context => ` ${context.label}: %${Number(context.parsed).toFixed(1)}`
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: 'rgba(28, 96, 245, 0.15)'
                    },
                    ticks: {
                        display: false
                    },
                    pointLabels: {
                        color: '#1c2c4d',
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
}

function initMonthlyVolumeChart() {
    const ctx = document.getElementById('monthlyVolumeChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
            datasets: [{
                label: 'Kredi Kartı POS Hacmi (₺B)',
                data: [6.1, 5.8, 6.7, 6.5, 7.4, 7.2, 8.1, 7.8, 8.6, 8.3, 9.1, 10.2],
                backgroundColor: 'rgba(28, 96, 245, 0.28)',
                borderColor: '#1c60f5',
                borderWidth: 1.5,
                borderRadius: 12,
                borderSkipped: false,
                yAxisID: 'y',
                order: 1
            }, {
                label: 'Havale/EFT Hacmi (₺B)',
                data: [3.1, 2.9, 3.4, 3.3, 3.8, 3.7, 4.2, 4.0, 4.5, 4.4, 4.9, 5.4],
                backgroundColor: 'rgba(27, 197, 164, 0.35)',
                borderColor: '#1bc5a4',
                borderWidth: 1.5,
                borderRadius: 12,
                borderSkipped: false,
                yAxisID: 'y',
                order: 1
            }, {
                type: 'line',
                label: 'İşlem Adedi (Milyon)',
                data: [118, 112, 124, 119, 131, 128, 137, 133, 145, 141, 152, 165],
                borderColor: '#ff7a59',
                backgroundColor: 'rgba(255, 122, 89, 0.22)',
                borderWidth: 3,
                fill: false,
                tension: 0.35,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#ff7a59',
                pointBorderWidth: 0,
                yAxisID: 'y1',
                order: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#051433'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: context => context.dataset.yAxisID === 'y'
                            ? ` ${context.dataset.label}: ₺${context.parsed.y.toFixed(1)}B`
                            : ` ${context.dataset.label}: ${context.parsed.y.toFixed(0)}M`
                    }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(28, 96, 245, 0.12)'
                    },
                    ticks: {
                        color: '#1c2c4d',
                        callback: value => `₺${value}B`
                    }
                },
                y1: {
                    position: 'right',
                    beginAtZero: true,
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        color: '#1c2c4d',
                        callback: value => `${value}M`
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(28, 96, 245, 0.08)'
                    },
                    ticks: {
                        color: '#1c2c4d'
                    }
                }
            }
        }
    });
}

function initPage(currentPage) {
    const initializer = PAGE_INITIALIZERS[currentPage];
    if (typeof initializer === 'function') {
        initializer();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const currentPage = document.body?.dataset?.page || 'home';
    setActiveNavigation(currentPage);
    initHomeLinkRouting();
    initSmoothScrolling();
    initMenuToggle();
    initContactForm();
    initNewsletterForms();
    initRequestModal(currentPage);
    initFaqToggles();
    initComparisonFilters();
    initPage(currentPage);
    fetchOpsSummary();
});
