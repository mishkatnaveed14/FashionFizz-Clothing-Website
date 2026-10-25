const imageBase = 'https://images.unsplash.com/';
const imageParams = '?auto=format&fit=crop&w=1000&q=85';

const productImages = {
  'prod-1': 'photo-1610030469983-98e550d6193c',
  'prod-2': 'photo-1490481651871-ab68de25d43d',
  'prod-3': 'photo-1591047139829-d91aecb6caea',
  'prod-4': 'photo-1539109136881-3be0616acf4b',
  'prod-5': 'photo-1490481651871-ab68de25d43d',
  'prod-6': 'photo-1617137968427-85924c800a22',
  'prod-7': 'photo-1617137968427-85924c800a22',
  'prod-8': 'photo-1519238263530-99bdd11df2ea',
  'prod-9': 'photo-1616486338812-3dadae4b4ace',
   'prod-10': 'photo-1594035910387-fea47794261f',
   'prod-11': 'photo-1610030469983-98e550d6193c',
   'prod-12': 'photo-1490481651871-ab68de25d43d',
   'prod-13': 'photo-1539109136881-3be0616acf4b',
   'prod-14': 'photo-1483985988355-763728e1935b',
   'prod-15': 'photo-1617137968427-85924c800a22',
   'prod-16': 'photo-1519238263530-99bdd11df2ea',
   'prod-17': 'photo-1616486338812-3dadae4b4ace',
   'prod-18': 'photo-1594035910387-fea47794261f'
};

const categoryImages = {
  unstitched: 'photo-1610030469983-98e550d6193c',
  pret: 'photo-1539109136881-3be0616acf4b',
  men: 'photo-1617137968427-85924c800a22',
  home: 'photo-1616486338812-3dadae4b4ace'
};

const colorSwatches = {
  'Crimson Red': '#8D3738',
  'Antique Gold': '#B7965C',
  Gold: '#B7965C',
  Rosewood: '#9B5C5B',
  'Sage Green': '#87947B',
  Indigo: '#475B82',
  Terracotta: '#B86A52',
  Sand: '#C8B79B',
  Navy: '#34465F',
  Stone: '#A69D8E',
  Olive: '#777B58',
  'Sapphire Blue': '#354E73',
  Ivory: '#EEE8DC',
  'Obsidian Black': '#252725',
  'Emerald Green': '#5F755E',
  'Charcoal': '#454744',
  'Deep Steel': '#64717A',
  'Signal Orange': '#C87546',
  'Amber Gold': '#BD8B4C',
  Silver: '#C4C5C1',
  'Bleached Alabaster': '#F0E9DC',
  Marigold: '#BF9851',
  Obsidian: '#292B28',
  'Midnight Obsidian': '#282A27'
};

function toImageUrl(image, width = 1000) {
  if (!image) return '';
  if (/^(https?:\/\/|data:image\/|blob:|\/)/i.test(image)) return image;
  return `${imageBase}${image}${imageParams.replace('w=1000', `w=${width}`)}`;
}

export function getProductImage(product, width = 1000) {
  const suppliedImage = product?.images?.find(
    (image) => typeof image === 'string' && /^(https?:\/\/|data:image\/|blob:|\/)/i.test(image)
  );
  const image = suppliedImage || productImages[product?.id];
  return toImageUrl(image, width);
}

export function getCategoryImage(category, width = 1200) {
  return toImageUrl(categoryImages[category], width);
}

export function getColorSwatch(color) {
  return colorSwatches[color] || '#A89C8E';
}
