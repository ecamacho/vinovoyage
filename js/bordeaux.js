document.addEventListener('DOMContentLoaded', () => {
  const region = REGIONS.find((r) => r.id === 'bordeaux');
  const introEl = document.getElementById('region-intro');
  const metaEl = document.getElementById('region-meta');
  const grid = document.getElementById('wine-grid');
  const tabs = document.querySelectorAll('.filter-tab');
  const modal = document.getElementById('wine-modal');
  const modalContent = document.getElementById('wine-modal-content');
  const modalClose = document.getElementById('wine-modal-close');

  const ACTIVE_TAB_CLASSES = ['bg-primary', 'text-white', 'dark:bg-white', 'dark:text-primary', 'shadow-lg'];
  const INACTIVE_TAB_CLASSES = [
    'border', 'border-border', 'dark:border-slate-700',
    'text-primary', 'dark:text-slate-200',
    'hover:bg-white', 'dark:hover:bg-slate-800', 'hover:shadow-md',
  ];

  const dataCache = {};
  let wines = [];
  let activeFilter = 'all';

  const currentLang = () => (window.VinoI18n ? window.VinoI18n.effectiveLang() : 'en');
  const currentDict = () => (window.VinoI18n ? window.VinoI18n.dict[currentLang()] : {});

  // Category is derived from the stable id prefix, never the translated
  // display text (wine.bank / wine.wine_color change per language).
  const categoryOf = (wine) => {
    if (wine.id.startsWith('white_') || wine.id.startsWith('sweet_white')) return 'white';
    if (wine.id.startsWith('right_bank')) return 'right';
    return 'left';
  };

  const formatPrice = (price) => {
    if (!price) return '';
    const amount = Number(price.amount).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return `$${amount} ${price.currency}`;
  };

  const bestReview = (reviews) => {
    if (!reviews || reviews.length === 0) return null;
    return reviews.find((r) => r.score) || reviews[0];
  };

  const renderIntro = (data) => {
    const dict = currentDict();
    if (introEl) {
      introEl.innerHTML = data.introduction
        .split('\n\n')
        .map((p) => `<p class="text-muted dark:text-slate-400 leading-relaxed">${p}</p>`)
        .join('');
    }
    if (metaEl) {
      const lang = currentLang();
      const date = new Date(data.generated_at);
      const formatted = Number.isNaN(date.getTime())
        ? data.generated_at
        : date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      metaEl.textContent = `${dict['wine.guideCompiledPrefix']} ${formatted} · ${data.wines.length} ${dict['wine.wineCountUnit']}`;
    }
  };

  const wineCard = (wine) => {
    const dict = currentDict();
    const review = bestReview(wine.reviews);
    const card = document.createElement('div');
    card.className =
      'wine-card bg-white dark:bg-slate-900 border border-border dark:border-slate-800 rounded-3xl overflow-hidden transition-all duration-300 group';
    card.dataset.category = categoryOf(wine);

    card.innerHTML = `
      <div class="relative h-[320px] bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-10 overflow-hidden">
        <img class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
             src="bordeaux_recommendations/${wine.photo}"
             alt="${wine.wine_name}" loading="lazy" />
      </div>
      <div class="p-8 space-y-6">
        <div class="flex justify-between items-start gap-4">
          <div>
            <h3 class="text-lg font-bold text-primary dark:text-white leading-snug">${wine.wine_name}</h3>
            <p class="text-xs text-muted dark:text-slate-400 font-bold uppercase tracking-widest mt-1">${wine.bank} &middot; ${wine.style}${wine.vintage ? ' &middot; ' + wine.vintage : ''}</p>
          </div>
          <span class="text-accent font-display font-bold text-lg whitespace-nowrap">${formatPrice(wine.price)}</span>
        </div>

        <div class="space-y-3">
          <p class="text-[10px] font-bold text-accent uppercase tracking-tighter">${dict['wine.sommelierWhy']}</p>
          <p class="text-sm text-muted dark:text-slate-400 leading-relaxed line-clamp-3 italic">&ldquo;${wine.why_this_wine}&rdquo;</p>
        </div>

        <div class="flex flex-wrap gap-2 py-4 border-y border-border/50 dark:border-slate-800">
          <span class="px-3 py-1 rounded-lg bg-surface dark:bg-slate-800 text-[10px] font-bold text-primary dark:text-slate-200 uppercase border border-border/50 dark:border-slate-700">${wine.appellation}</span>
          <span class="px-3 py-1 rounded-lg bg-surface dark:bg-slate-800 text-[10px] font-bold text-primary dark:text-slate-200 uppercase border border-border/50 dark:border-slate-700">${wine.price_tier}</span>
        </div>

        <div class="flex items-center justify-between min-h-[20px]">
          ${review ? `<span class="text-xs font-bold text-muted dark:text-slate-400">${review.score ? review.score + ' &middot; ' + review.critic : review.note}</span>` : '<span></span>'}
        </div>

        <div class="flex flex-col gap-3">
          <button type="button" class="view-details w-full border-2 border-border dark:border-slate-700 text-primary dark:text-slate-200 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:border-accent hover:text-accent transition-all" data-id="${wine.id}">
            ${dict['wine.fullNotes']}
          </button>
          <a href="${wine.buy_link}" target="_blank" rel="noopener noreferrer"
             class="w-full block text-center bg-primary text-white dark:bg-white dark:text-primary py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-accent dark:hover:bg-slate-200 transition-all">
            ${dict['wine.buyAt']} ${wine.store}
          </a>
        </div>
      </div>
    `;

    return card;
  };

  const renderWines = (list) => {
    grid.innerHTML = '';
    list.forEach((wine) => grid.appendChild(wineCard(wine)));
  };

  const applyActiveFilter = () => {
    const filtered = activeFilter === 'all' ? wines : wines.filter((w) => categoryOf(w) === activeFilter);
    renderWines(filtered);
  };

  const openModal = (wine) => {
    const dict = currentDict();
    const review = bestReview(wine.reviews);
    modalContent.innerHTML = `
      <div class="grid md:grid-cols-2 gap-8">
        <img class="w-full h-full max-h-[420px] object-contain bg-slate-50 dark:bg-slate-800 rounded-2xl" src="bordeaux_recommendations/${wine.photo}" alt="${wine.wine_name}" />
        <div class="space-y-5">
          <div>
            <p class="text-xs font-bold text-accent uppercase tracking-widest">${wine.bank} &middot; ${wine.style} &middot; ${wine.price_tier}</p>
            <h3 class="text-2xl font-display font-bold text-primary dark:text-white mt-1">${wine.wine_name}</h3>
            <p class="text-sm text-muted dark:text-slate-400 mt-1">${wine.appellation} &middot; ${wine.classification}${wine.vintage ? ' &middot; ' + wine.vintage : ''}</p>
          </div>
          <p class="text-sm font-bold text-primary dark:text-slate-200">${wine.grape_varietals}</p>
          <p class="text-lg font-display font-bold text-accent">${formatPrice(wine.price)}</p>
          <a href="${wine.buy_link}" target="_blank" rel="noopener noreferrer" class="inline-block bg-primary text-white dark:bg-white dark:text-primary px-6 py-3 rounded-xl text-sm font-bold hover:bg-accent dark:hover:bg-slate-200 transition-all">
            ${dict['wine.buyAt']} ${wine.store}
          </a>
        </div>
      </div>
      <div class="mt-10 space-y-8">
        <section>
          <h4 class="text-xs font-bold text-accent uppercase tracking-widest mb-2">${dict['wine.tastingNotes']}</h4>
          <p class="text-muted dark:text-slate-400 leading-relaxed">${wine.tasting_notes}</p>
        </section>
        <section>
          <h4 class="text-xs font-bold text-accent uppercase tracking-widest mb-2">${dict['wine.theWinery']}</h4>
          <p class="text-muted dark:text-slate-400 leading-relaxed">${wine.winery_info}</p>
        </section>
        <section>
          <h4 class="text-xs font-bold text-accent uppercase tracking-widest mb-2">${dict['wine.historicalSignificance']}</h4>
          <p class="text-muted dark:text-slate-400 leading-relaxed">${wine.historical_significance}</p>
        </section>
        ${wine.reviews && wine.reviews.length ? `
        <section>
          <h4 class="text-xs font-bold text-accent uppercase tracking-widest mb-2">${dict['wine.reviews']}</h4>
          <ul class="space-y-2">
            ${wine.reviews.map((r) => `<li class="text-sm text-muted dark:text-slate-400"><span class="font-bold text-primary dark:text-white">${r.critic}:</span> ${r.score || r.note}</li>`).join('')}
          </ul>
        </section>` : ''}
      </div>
    `;
    modal.removeAttribute('hidden');
    modal.classList.add('flex');
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    modal.setAttribute('hidden', '');
    modal.classList.remove('flex');
    document.body.classList.remove('modal-open');
  };

  grid.addEventListener('click', (event) => {
    const button = event.target.closest('.view-details');
    if (!button) return;
    const wine = wines.find((w) => w.id === button.dataset.id);
    if (wine) openModal(wine);
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.remove(...ACTIVE_TAB_CLASSES);
        t.classList.add(...INACTIVE_TAB_CLASSES);
      });
      tab.classList.remove(...INACTIVE_TAB_CLASSES);
      tab.classList.add(...ACTIVE_TAB_CLASSES);

      activeFilter = tab.dataset.filter;
      applyActiveFilter();
    });
  });

  const loadAndRender = () => {
    const lang = currentLang();
    const url = region.dataUrl[lang] || region.dataUrl.en;

    const ready = dataCache[lang]
      ? Promise.resolve(dataCache[lang])
      : fetch(url).then((res) => res.json()).then((data) => {
          dataCache[lang] = data;
          return data;
        });

    ready
      .then((data) => {
        wines = data.wines;
        renderIntro(data);
        applyActiveFilter();
      })
      .catch((err) => {
        console.error('Failed to load Bordeaux wine list', err);
        grid.innerHTML = `<p class="text-muted dark:text-slate-400 col-span-full text-center">${currentDict()['wine.loadError']}</p>`;
      });
  };

  loadAndRender();
  document.addEventListener('vinovoyage:langchange', loadAndRender);
});
