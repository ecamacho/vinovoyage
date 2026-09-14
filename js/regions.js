// Registry of wine regions available on the site. Add an entry here (and its
// own <region>_recommendations/wine_list.json [+ wine_list.es.json] + photos/)
// to publish a new region. Text fields that appear on the page are {en, es}
// pairs so js/home.js can render the active language.
const REGIONS = [
  {
    id: 'bordeaux',
    name: 'Bordeaux',
    country: { en: 'France', es: 'Francia' },
    tagline: {
      en: 'Left Bank power, Right Bank elegance, and three centuries of classification.',
      es: 'La fuerza de la Rive Gauche, la elegancia de la Rive Droite, y tres siglos de clasificación.',
    },
    href: 'bordeaux.html',
    dataUrl: {
      en: 'bordeaux_recommendations/wine_list.json',
      es: 'bordeaux_recommendations/wine_list.es.json',
    },
    heroImage: 'bordeaux_recommendations/photos/region_header_chateau_la_tour_de_by.jpg',
    photoCredit: {
      caption: 'Château La Tour de By, Médoc',
      author: 'Slywire',
      license: 'CC BY-SA 4.0',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Chateau_La_Tour_de_By_Vignoble.jpg',
    },
  },
];

// Regions on the roadmap but without content yet, shown as a "coming soon" teaser.
const UPCOMING_REGIONS = [
  { en: 'Tuscany', es: 'Toscana' },
  { en: 'Rioja', es: 'Rioja' },
  { en: 'Napa Valley', es: 'Valle de Napa' },
];
