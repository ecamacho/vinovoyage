// UI-string dictionary and language switching, mirroring js/theme.js's
// detect -> override -> toggle pattern. Wine content itself (introductions,
// tasting notes, etc.) lives in per-language JSON files and is handled by
// js/bordeaux.js; this file only covers static chrome text.
const I18N_DICT = {
  en: {
    'nav.regions': 'Regions',

    'toggle.themeAria': 'Toggle dark mode',
    'toggle.langAria': 'Switch language',
    'toggle.menuAria': 'Toggle menu',

    'hero.badge': 'A personal wine-learning journal',
    'hero.heading': 'Learning the World, <span class="text-accent">One Region</span> at a Time.',
    'hero.body': "VinoVoyage documents my journey into the world's great wine regions — their terroirs, history, grape varietals, and a curated selection of bottles to start understanding each one.",
    'hero.cta': 'Explore Regions',

    'regions.heading': 'Wine Regions',
    'regions.body': 'Each region gets its own deep dive: terroir, history, grape varietals, and a hand-picked wine selection to start tasting your way through it.',

    'home.explore': 'Explore',
    'home.comingSoon': 'Coming soon',
    'home.photoLabel': 'Photo:',
    'home.pageTitle': 'VinoVoyage — A Journey Through Wine Regions',

    'footer.tagline': "A personal journey through the world's wine regions.",

    'bordeaux.pageTitleTag': 'Bordeaux — VinoVoyage',
    'bordeaux.allRegions': 'All Regions',
    'bordeaux.countryLabel': 'France',
    'bordeaux.introHeading': 'An Introduction to Bordeaux',
    'bordeaux.loadingIntro': 'Loading introduction…',
    'bordeaux.terroirHeading': 'Terroir at a Glance',
    'bordeaux.leftBankLabel': 'Left Bank',
    'bordeaux.leftBankBody': 'Gravelly, fast-draining soil that favors Cabernet Sauvignon: firm tannin, cassis and graphite fruit, cedar and tobacco-leaf aromatics, built to age for decades.',
    'bordeaux.rightBankLabel': 'Right Bank',
    'bordeaux.rightBankBody': 'Cooler clay and limestone that suits Merlot and Cabernet Franc: plusher, more perfumed in youth — red plum, black cherry, mocha, violets.',
    'bordeaux.whitesLabel': 'Whites &amp; Sauternes',
    'bordeaux.whitesBody': 'Sauvignon Blanc and Sémillon make age-worthy dry whites, while noble rot along the Garonne yields the honeyed, apricot-scented dessert wines of Sauternes.',
    'bordeaux.selectionHeading': 'The Selection',
    'bordeaux.selectionBody': 'Classic and new-wave Bordeaux, Left Bank and Right Bank, across price ranges — a starting list for getting to know the region.',
    'bordeaux.filterAll': 'All Wines',
    'bordeaux.filterWhite': 'Whites',
    'bordeaux.modalCloseAria': 'Close',
    'bordeaux.photoCreditLine': 'Ch&acirc;teau La Tour de By, M&eacute;doc &middot; Photo: Slywire &middot; CC BY-SA 4.0',

    'wine.sommelierWhy': "Sommelier's Why",
    'wine.fullNotes': 'Full Notes',
    'wine.buyAt': 'Buy at',
    'wine.guideCompiledPrefix': 'Guide compiled',
    'wine.wineCountUnit': 'wines',
    'wine.tastingNotes': 'Tasting Notes',
    'wine.theWinery': 'The Winery',
    'wine.historicalSignificance': 'Historical Significance',
    'wine.reviews': 'Reviews',
    'wine.loadError': 'Unable to load the wine list right now.',
  },
  es: {
    'nav.regions': 'Regiones',

    'toggle.themeAria': 'Cambiar a modo oscuro',
    'toggle.langAria': 'Cambiar idioma',
    'toggle.menuAria': 'Abrir menú',

    'hero.badge': 'Un diario personal de aprendizaje sobre el vino',
    'hero.heading': 'Aprendiendo el Mundo, <span class="text-accent">Una Región</span> a la Vez.',
    'hero.body': 'VinoVoyage documenta mi recorrido por las grandes regiones vinícolas del mundo: sus terruños, su historia, sus variedades de uva, y una selección curada de botellas para empezar a entender cada una.',
    'hero.cta': 'Explorar Regiones',

    'regions.heading': 'Regiones Vinícolas',
    'regions.body': 'Cada región tiene su propia inmersión: terruño, historia, variedades de uva, y una selección de vinos elegida a mano para empezar a probar el camino.',

    'home.explore': 'Explorar',
    'home.comingSoon': 'Próximamente',
    'home.photoLabel': 'Foto:',
    'home.pageTitle': 'VinoVoyage — Un Viaje por las Regiones Vinícolas',

    'footer.tagline': 'Un viaje personal por las regiones vinícolas del mundo.',

    'bordeaux.pageTitleTag': 'Burdeos — VinoVoyage',
    'bordeaux.allRegions': 'Todas las Regiones',
    'bordeaux.countryLabel': 'Francia',
    'bordeaux.introHeading': 'Una Introducción a Burdeos',
    'bordeaux.loadingIntro': 'Cargando introducción…',
    'bordeaux.terroirHeading': 'El Terruño de un Vistazo',
    'bordeaux.leftBankLabel': 'Margen Izquierda',
    'bordeaux.leftBankBody': 'Suelo de grava, de drenaje rápido, que favorece al Cabernet Sauvignon: tanino firme, fruta de casis y grafito, aromas de cedro y hoja de tabaco, hecho para envejecer por décadas.',
    'bordeaux.rightBankLabel': 'Margen Derecha',
    'bordeaux.rightBankBody': 'Arcilla y caliza más frescas, ideales para el Merlot y el Cabernet Franc: vinos más carnosos y perfumados en su juventud — ciruela roja, cereza negra, moka, violetas.',
    'bordeaux.whitesLabel': 'Blancos y Sauternes',
    'bordeaux.whitesBody': 'El Sauvignon Blanc y el Sémillon producen blancos secos capaces de envejecer, mientras que la podredumbre noble a lo largo del Garona da los vinos de postre de Sauternes, dulces y con aromas a miel y chabacano.',
    'bordeaux.selectionHeading': 'La Selección',
    'bordeaux.selectionBody': 'Burdeos clásico y de nueva ola, Margen Izquierda y Margen Derecha, en distintos rangos de precio — una lista inicial para empezar a conocer la región.',
    'bordeaux.filterAll': 'Todos los Vinos',
    'bordeaux.filterWhite': 'Blancos',
    'bordeaux.modalCloseAria': 'Cerrar',
    'bordeaux.photoCreditLine': 'Ch&acirc;teau La Tour de By, M&eacute;doc &middot; Foto: Slywire &middot; CC BY-SA 4.0',

    'wine.sommelierWhy': 'La Opinión del Sommelier',
    'wine.fullNotes': 'Ficha Completa',
    'wine.buyAt': 'Comprar en',
    'wine.guideCompiledPrefix': 'Guía compilada el',
    'wine.wineCountUnit': 'vinos',
    'wine.tastingNotes': 'Notas de Cata',
    'wine.theWinery': 'La Bodega',
    'wine.historicalSignificance': 'Importancia Histórica',
    'wine.reviews': 'Reseñas',
    'wine.loadError': 'No se pudo cargar la lista de vinos en este momento.',
  },
};

(function () {
  const STORAGE_KEY = 'vinovoyage-lang';
  const SUPPORTED = ['en', 'es'];

  const getStoredLang = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED.includes(stored) ? stored : null;
  };

  const detectBrowserLang = () => {
    const nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    return nav.startsWith('es') ? 'es' : 'en';
  };

  const effectiveLang = () => getStoredLang() || detectBrowserLang();

  const applyStaticText = (lang) => {
    document.documentElement.lang = lang;
    const dict = I18N_DICT[lang];

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = dict[el.dataset.i18n];
      if (value != null) el.innerHTML = value;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      el.dataset.i18nAttr.split(';').forEach((pair) => {
        const [attr, key] = pair.split(':');
        const value = dict[key];
        if (attr && value != null) el.setAttribute(attr, value);
      });
    });
  };

  const applyLang = (lang) => {
    applyStaticText(lang);
    const toggle = document.getElementById('lang-toggle');
    if (toggle) toggle.textContent = lang === 'es' ? 'EN' : 'ES';
    document.dispatchEvent(new CustomEvent('vinovoyage:langchange', { detail: { lang } }));
  };

  window.VinoI18n = {
    dict: I18N_DICT,
    effectiveLang,
    setLang(lang) {
      localStorage.setItem(STORAGE_KEY, lang);
      applyLang(lang);
    },
  };

  document.addEventListener('DOMContentLoaded', () => {
    applyLang(effectiveLang());
    const toggle = document.getElementById('lang-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      const next = effectiveLang() === 'es' ? 'en' : 'es';
      window.VinoI18n.setLang(next);
    });
  });
})();
