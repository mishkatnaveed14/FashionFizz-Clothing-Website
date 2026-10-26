const imageBase = 'https://images.unsplash.com/photo-';

const photo = (id, alt, sourcePage = null, photographer = 'Unsplash contributor') => ({
  id,
  alt,
  sourcePage,
  photographer
});

// Editorial references only. Product photography here is demo imagery, not FashionFizz inventory.
// Replace each product photo with an approved catalog image when real product photography is ready.
export const editorialPhotos = {
  hero: photo(
    '1773439878258-3c5fa24afa75',
    'Model in a black and grey embroidered outfit, photographed in Lahore',
    'https://unsplash.com/photos/a-woman-in-a-black-and-grey-embroidered-outfit-poses-khf_mFjsOEM',
    'Muneeb Malhotra'
  ),
  heroPink: photo(
    '1773439878533-77383b20577c',
    'Model in a pink embroidered outfit, photographed in Lahore',
    'https://unsplash.com/photos/a-woman-in-a-pink-embroidered-outfit-stands-outdoors-FLZ0cvn41mA',
    'Muneeb Malhotra'
  ),
  heroStudio: photo(
    '1768818653161-0ad28dede131',
    'Fashion model seated for a studio editorial portrait',
    'https://unsplash.com/photos/woman-sitting-on-a-stool-in-a-studio-BmeQwXXz4RU',
    'Vadim Yefremov'
  ),
  embroidery: photo(
    '1776164908649-8123a08a53bc',
    'Close-up of colorful embroidered textile and woven fabric',
    'https://unsplash.com/photos/close-up-of-colorful-embroidered-fabric-with-frayed-edges-WD3h2f8pdEA',
    'Hans-Peter Traunig'
  ),
  craft: photo(
    '1785835945703-cd0c72375743',
    'Hands stitching red embroidery into fabric',
    'https://unsplash.com/photos/hands-stitching-red-embroidery-on-fabric-_heRDCmh3Lo',
    'Michael Shtern'
  ),
  runway: photo(
    '1747171053296-84c4e8015b24',
    'Fashion model walking a runway during a show',
    'https://unsplash.com/photos/fashion-model-walks-a-runway-during-a-show-Bkaaf9AqNvg',
    'Sergio Martins'
  ),
  lookbookTraditional: photo(
    '1759720883040-af9be070929e',
    'Model wearing ornate yellow and blue traditional dress',
    'https://unsplash.com/photos/woman-in-ornate-yellow-and-blue-traditional-dress-ten0FJ1sDBc',
    'Asif Gulzar'
  ),
  lookbookSari: photo(
    '1756483482418-3f3e4c13f9b0',
    'Two women wearing traditional Indian saris beneath an archway',
    'https://unsplash.com/photos/two-women-in-traditional-indian-saris-stand-under-an-archway-9gyGWfEV_Xk',
    'iKshana Productions'
  ),
  tailoringStudio: photo(
    '1753162659461-38d8ea5b15ab',
    'Fashion designers working on a dress in a studio',
    'https://unsplash.com/photos/fashion-designers-work-on-a-dress-in-a-studio-n7Lo43OFc4Q',
    'Vitaly Gariev'
  )
};

const categoryPhotos = {
  unstitched: photo(
    '1777027517918-e123ad70ab0e',
    'White fabric with delicate floral embroidery',
    'https://unsplash.com/photos/white-fabric-with-delicate-floral-embroidery-detail-outdoors-A_KIYPySl-g',
    'Liana S'
  ),
  pret: photo(
    '1758613654311-a9138846d52f',
    'Fashion model posing in a studio portrait',
    'https://unsplash.com/photos/a-woman-poses-in-a-studio-with-lighting-equipment-RkDD7bj7zaU',
    'Vitaly Gariev'
  ),
  men: photo(
    '1467493330285-2fe6a9f97483',
    'Two men wearing tailored coats in an outdoor fashion portrait',
    'https://unsplash.com/photos/man-in-black-trench-coat-CdcSrW0IxwE',
    'Caleb Betts'
  ),
  home: photo(
    '1766245456897-5c86726d084d',
    'A softly lit bedroom with neutral bedding and pillows',
    'https://unsplash.com/photos/modern-bedroom-with-neutral-toned-pillows-and-bedding-VotK70bRo0U',
    'Aleksandra Dementeva'
  )
};

const productPhotos = {
  'prod-1': photo('1610030469983-98e550d6193c', 'Editorial placeholder for a festive unstitched outfit'),
  'prod-2': photo('1490481651871-ab68de25d43d', 'Editorial placeholder for a printed lawn outfit'),
  'prod-3': photo('1591047139829-d91aecb6caea', 'Editorial placeholder for a winter fabric ensemble'),
  'prod-4': photo('1539109136881-3be0616acf4b', 'Editorial placeholder for a ready-to-wear kurti'),
  'prod-5': photo('1483985988355-763728e1935b', 'Editorial placeholder for a ready-to-wear outfit'),
  'prod-6': photo('1617137968427-85924c800a22', 'Editorial placeholder for mens traditional wear'),
  'prod-7': photo('1768754538069-784adc560bd5', 'Editorial placeholder for a mens waistcoat'),
  'prod-8': photo('1519238263530-99bdd11df2ea', 'Editorial placeholder for childrens festive wear'),
  'prod-9': photo('1616486338812-3dadae4b4ace', 'Editorial placeholder for a cotton bedspread'),
  'prod-10': photo('1594035910387-fea47794261f', 'Editorial placeholder for a home fragrance'),
  'prod-11': photo('1664891408817-bb950dfd0bfd', 'Editorial placeholder for an embroidered lawn suit'),
  'prod-12': photo('1773439878193-e123ad70ab0e', 'Editorial placeholder for a printed cambric suit'),
  'prod-13': photo('1768825136230-34fb80291f19', 'Editorial placeholder for a cotton kurta'),
  'prod-14': photo('1655026289609-258225f94a94', 'Editorial placeholder for a three-piece pret set'),
  'prod-15': photo('1748594313161-cd7374729434', 'Editorial placeholder for mens kameez shalwar'),
  'prod-16': photo('1716655359683-791d415c3f4c', 'Editorial placeholder for childrens festive wear'),
  'prod-17': photo('1778145792155-708f364bd772', 'Editorial placeholder for a quilted bedspread'),
  'prod-18': photo('1654524437221-2903a6cdb371', 'Editorial placeholder for an amber fragrance set')
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
  Charcoal: '#454744',
  'Deep Steel': '#64717A',
  'Signal Orange': '#C87546',
  'Amber Gold': '#BD8B4C',
  Silver: '#C4C5C1',
  'Bleached Alabaster': '#F0E9DC',
  Marigold: '#BF9851',
  Obsidian: '#292B28',
  'Midnight Obsidian': '#282A27'
};

const demoPhotoIds = new Set(Object.values(productPhotos).map(({ id }) => id));

export function getUnsplashUrl(image, width = 1200, height = null) {
  if (!image?.id) return '';
  const dimensions = height ? `&h=${height}` : '';
  return `${imageBase}${image.id}?auto=format&fit=crop&w=${width}${dimensions}&q=82`;
}

export function getEditorialImage(name, width = 1600, height = null) {
  return getUnsplashUrl(editorialPhotos[name], width, height);
}

export function getCategoryImage(category, width = 1200, height = null) {
  return getUnsplashUrl(categoryPhotos[category], width, height);
}

export function getCategoryPhoto(category) {
  return categoryPhotos[category] || null;
}

function isRemoteImage(image) {
  return typeof image === 'string' && /^(https?:\/\/|data:image\/|blob:|\/)/i.test(image);
}

function isDemoImageUrl(image) {
  return typeof image === 'string' && [...demoPhotoIds].some((id) => image.includes(id));
}

export function isDemoProductImage(product) {
  const hasRealProvidedImage = product?.images?.some((image) => isRemoteImage(image) && !isDemoImageUrl(image));
  return Boolean(productPhotos[product?.id] && !hasRealProvidedImage);
}

export function getProductImage(product, width = 1000) {
  const suppliedImage = product?.images?.find((image) => isRemoteImage(image) && !isDemoImageUrl(image));
  if (suppliedImage) return suppliedImage;

  const demoImage = productPhotos[product?.id]
    || product?.images?.find((image) => typeof image === 'string' && image.startsWith('photo-'));
  if (!demoImage) return '';
  if (typeof demoImage === 'string') {
    return `${imageBase}${demoImage}?auto=format&fit=crop&w=${width}&q=82`;
  }
  return getUnsplashUrl(demoImage, width);
}

export function getColorSwatch(color) {
  return colorSwatches[color] || '#A89C8E';
}
