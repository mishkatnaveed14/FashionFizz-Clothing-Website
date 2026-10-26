import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, RefreshCw, ShieldCheck, Truck } from 'lucide-react';
import { useStore } from '../lib/store';
import { Reveal, SectionTitle } from '../components/ui';
import ProductCard from '../components/ProductCard';
import ImageWithFallback from '../components/ImageWithFallback';
import CinematicFashionHero from '../components/CinematicFashionHero';
import FabricStory from '../components/FabricStory';
import FashionLookbook from '../components/FashionLookbook';
import { getCategoryImage } from '../lib/productImages';

const categories = [
  { title: 'Unstitched fabrics', subtitle: 'Prints, textures and festive details', image: 'unstitched', path: '/collections/unstitched' },
  { title: 'Ready to wear', subtitle: 'Considered looks for every day', image: 'pret', path: '/collections/ready-to-wear' },
  { title: 'Men & kids', subtitle: 'Modern classics for the whole family', image: 'men', path: '/collections/men-and-kids' },
  { title: 'Home & fragrances', subtitle: 'Little rituals for softer spaces', image: 'home', path: '/collections/home-and-fragrances' }
];

const shoppingBenefits = [
  { title: 'Complimentary delivery', detail: 'On orders over Rs. 10,000', icon: Truck },
  { title: 'Made with care', detail: 'Thoughtful fabrics and details', icon: Award },
  { title: 'Easy exchanges', detail: 'A simple 14-day policy', icon: RefreshCw },
  { title: 'Secure checkout', detail: 'Shop with confidence', icon: ShieldCheck }
];

export default function Home() {
  const { products } = useStore();
  const selectedArrivals = products.filter((product) =>
    ['prod-11', 'prod-12', 'prod-13', 'prod-14', 'prod-15', 'prod-16'].includes(product.id)
  );
  const newArrivals = (selectedArrivals.length ? selectedArrivals : products).slice(0, 4);

  return (
    <div className="bg-[#F8F5EF]">
      <CinematicFashionHero />

      <section aria-label="Shopping benefits" className="border-b border-[#E7DED3] bg-[#FFFEFC]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-5 px-5 py-7 sm:px-8 md:grid-cols-4 md:gap-0 md:py-8">
          {shoppingBenefits.map(({ title, detail, icon: Icon }, index) => (
            <div key={title} className={`flex items-center gap-3 md:px-5 ${index > 0 ? 'md:border-l md:border-[#E7DED3]' : ''}`}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F2E7E4] text-[#641E32]">
                <Icon size={18} strokeWidth={1.7} />
              </span>
              <div>
                <h2 className="font-body text-[11px] font-semibold text-[#272421] sm:text-xs">{title}</h2>
                <p className="mt-1 font-body text-[10px] leading-relaxed text-[#716A63]">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="collections" className="editorial-section mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionTitle subtitle="Find your feel" title="Shop the collections" alignment="left" className="mb-0" />
            <p className="max-w-sm font-body text-sm leading-relaxed text-[#716A63] sm:text-right">
              Thoughtful pieces for your wardrobe, your home, and everyone you love.
            </p>
          </div>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {categories.map((category, index) => (
            <Reveal key={category.title} delay={index * 0.06}>
              <Link to={category.path} className="group relative block aspect-[4/5] overflow-hidden rounded-[20px] bg-[#D9C7AE]">
                <ImageWithFallback
                  src={getCategoryImage(category.image, 1000, 1200)}
                  alt={category.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  fallbackClassName="bg-[#F2E7E4]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#272421]/80 via-[#272421]/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <span className="font-body text-[9px] font-semibold uppercase tracking-[0.2em] text-white/75">Explore FashionFizz</span>
                  <h3 className="mt-2 font-display text-[25px] leading-tight">{category.title}</h3>
                  <p className="mt-2 max-w-[240px] font-body text-xs leading-relaxed text-white/80">{category.subtitle}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-body text-[11px] font-semibold text-white transition-transform group-hover:translate-x-1">
                    Shop collection <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <FabricStory />

      <section id="new-arrivals" className="editorial-section border-y border-[#E7DED3] bg-[#FFFEFC]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal>
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <SectionTitle subtitle="Just landed" title="New season favourites" alignment="left" className="mb-0" />
              <Link to="/collections/unstitched" className="inline-flex items-center gap-2 font-body text-xs font-semibold text-[#272421] hover:text-[#641E32]">
                Discover all arrivals <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {newArrivals.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.05}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FashionLookbook />
    </div>
  );
}
