function renderRegions() {
  const grid = document.getElementById('regions-grid');
  if (!grid) return;

  const lang = window.VinoI18n ? window.VinoI18n.effectiveLang() : 'en';
  const dict = window.VinoI18n ? window.VinoI18n.dict[lang] : {};

  grid.innerHTML = '';

  REGIONS.forEach((region) => {
    const card = document.createElement('a');
    card.href = region.href;
    card.className =
      'group relative overflow-hidden rounded-3xl border border-border dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 hover:shadow-xl dark:hover:shadow-black/40 hover:-translate-y-1';

    const heroStyle = region.heroImage
      ? `background-image: linear-gradient(180deg, rgba(15,23,42,0.05) 0%, rgba(15,23,42,0.85) 100%), url('${region.heroImage}'); background-size: cover; background-position: center;`
      : '';

    card.innerHTML = `
      <div class="${region.heroImage ? '' : 'region-card-gradient'} relative h-56 flex items-end p-8" style="${heroStyle}">
        <div>
          <p class="text-xs font-bold uppercase tracking-widest text-white/70">${region.country[lang]}</p>
          <h3 class="text-3xl font-display font-bold text-white">${region.name}</h3>
        </div>
        ${region.photoCredit ? `
        <a href="${region.photoCredit.sourceUrl}" target="_blank" rel="noopener noreferrer"
           class="absolute bottom-2 right-3 text-[9px] font-semibold text-white/50 hover:text-white/80 transition-colors">
          ${dict['home.photoLabel']} ${region.photoCredit.author}
        </a>` : ''}
      </div>
      <div class="p-8 space-y-6">
        <p class="text-sm text-muted dark:text-slate-400 leading-relaxed">${region.tagline[lang]}</p>
        <span class="inline-flex items-center space-x-2 font-bold text-accent">
          <span>${dict['home.explore']} ${region.name}</span>
          <i class="fa-solid fa-arrow-right-long group-hover:translate-x-1 transition-transform"></i>
        </span>
      </div>
    `;

    grid.appendChild(card);
  });

  UPCOMING_REGIONS.forEach((name) => {
    const ghost = document.createElement('div');
    ghost.className =
      'flex flex-col items-center justify-center text-center p-8 rounded-3xl border-2 border-dashed border-border dark:border-slate-700 text-muted dark:text-slate-500 min-h-[280px]';
    ghost.innerHTML = `
      <i class="fa-solid fa-map-location-dot text-2xl mb-4 text-border dark:text-slate-700"></i>
      <p class="text-sm font-bold uppercase tracking-widest">${name[lang]}</p>
      <p class="text-xs mt-1">${dict['home.comingSoon']}</p>
    `;
    grid.appendChild(ghost);
  });
}

document.addEventListener('DOMContentLoaded', renderRegions);
document.addEventListener('vinovoyage:langchange', renderRegions);
