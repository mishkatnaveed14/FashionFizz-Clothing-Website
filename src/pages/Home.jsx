import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, RefreshCw, ShieldCheck, Truck } from 'lucide-react';
import { useStore } from '../lib/store';
import { Reveal, SectionTitle } from '../components/ui';
import ProductCard from '../components/ProductCard';
import CollectionFeature from '../components/CollectionFeature';
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
    <div className="bg-paper">
      <section className="px-3 pt-3 sm:px-5 sm:pt-5 lg:px-8 lg:pt-7">
        <div className="relative mx-auto flex min-h-[610px] max-w-[1600px] items-end overflow-hidden rounded-[24px] bg-[#434b3e] sm:min-h-[680px] lg:min-h-[min(76svh,820px)] lg:items-center lg:rounded-[30px]">
          <img
            src={getCategoryImage('pret', 2000)}
            alt="A look from the latest FashionFizz collection"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-[62%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17211b]/80 via-[#17211b]/25 to-[#17211b]/5 lg:bg-gradient-to-r lg:from-[#17211b]/80 lg:via-[#17211b]/35 lg:to-transparent" />

          <div className="relative z-10 w-full px-6 pb-16 pt-28 text-white sm:px-10 sm:pb-20 lg:max-w-7xl lg:mx-auto lg:px-14 lg:py-24">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-4 py-2 font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                The new season, thoughtfully made
              </span>
              <h1 className="mt-6 max-w-[650px] font-display text-[clamp(3.4rem,8vw,7rem)] leading-[0.92] tracking-[-0.045em] text-white">
                Tradition,<br />in a new light<span className="text-[#c5a77d]">.</span>
              </h1>
              <p className="mt-6 max-w-lg font-body text-sm leading-7 text-white/80 sm:text-base">
                Discover modern Pakistani style, made for everyday rituals and the moments worth remembering.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/collections/unstitched"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-6 font-body text-xs font-semibold text-ink transition-colors hover:bg-[#e9e1d4]"
                >
                  Explore the collection <ArrowRight size={16} />
                </Link>
                <Link
                  to="/collections/ready-to-wear"
                  className="inline-flex min-h-12 items-center gap-2 px-2 font-body text-xs font-semibold text-white transition-colors hover:text-[#e4cba8]"
                >
                  Shop ready to wear <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-6 right-6 flex items-center justify-between border-t border-white/25 py-4 text-white/75 sm:left-10 sm:right-10 lg:left-14 lg:right-14">
            <span className="font-body text-[9px] font-medium uppercase tracking-[0.16em]">FashionFizz, thoughtfully made</span>
            <span className="hidden font-body text-[10px] uppercase tracking-[0.15em] sm:inline">Fashion for every part of life</span>
          </div>
        </div>
      </section>

      <section aria-label="Shopping benefits" className="border-b border-line bg-paper-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-5 px-5 py-7 sm:px-8 md:grid-cols-4 md:gap-0 md:py-8">
          {shoppingBenefits.map(({ title, detail, icon: Icon }, index) => (
            <div key={title} className={`flex items-center gap-3 md:px-5 ${index > 0 ? 'md:border-l md:border-line' : ''}`}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eff1eb] text-brand">
                <Icon size={18} strokeWidth={1.7} />
              </span>
              <div>
                <h2 className="font-body text-[11px] font-semibold text-ink sm:text-xs">{title}</h2>
                <p className="mt-1 font-body text-[10px] leading-relaxed text-ink-muted">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="editorial-section mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionTitle subtitle="Find your feel" title="Shop the collections" alignment="left" className="mb-0" />
            <p className="max-w-sm font-body text-sm leading-relaxed text-ink-muted sm:text-right">
              Thoughtful pieces for your wardrobe, your home, and everyone you love.
            </p>
          </div>
        </Reveal>

        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {categories.map((category, index) => (
            <Reveal key={category.title} delay={index * 0.06}>
              <Link to={category.path} className="group relative block aspect-[4/5] overflow-hidden rounded-[20px] bg-soft">
                <img
                  src={getCategoryImage(category.image, 1000)}
                  alt={category.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17211b]/80 via-[#17211b]/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <span className="font-body text-[9px] font-semibold uppercase tracking-[0.2em] text-white/70">Explore FashionFizz</span>
                  <h3 className="mt-2 font-display text-[25px] leading-tight">{category.title}</h3>
                  <p className="mt-2 max-w-[240px] font-body text-xs leading-relaxed text-white/75">{category.subtitle}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-body text-[11px] font-semibold text-white transition-transform group-hover:translate-x-1">
                    Shop collection <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="editorial-section border-y border-line bg-[#f4f1eb]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal>
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <SectionTitle subtitle="Just landed" title="New season favourites" alignment="left" className="mb-0" />
              <Link to="/collections/unstitched" className="inline-flex items-center gap-2 font-body text-xs font-semibold text-ink hover:text-brand">
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

      <div className="py-14 sm:py-20">
        <CollectionFeature
          image="unstitched"
          eyebrow="Made with a little more thought"
          title="Good fabric. Better feeling."
          description="Expressive prints, considered textures and easy silhouettes come together in pieces that feel just as good as they look."
          points={['Seasonal fabrics selected with care', 'Details designed for real wear', 'Versatile pieces for the family', 'Easy delivery and exchanges']}
          link="/collections/unstitched"
          action="Explore the collection"
        />
      </div>
    </div>
  );
}
