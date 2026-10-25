import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '../lib/store';
import { Button, Reveal, SectionTitle } from '../components/ui';
import Scene3D from '../three/Scene3D';
import ProductCard from '../components/ProductCard';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';
import { getCategoryImage } from '../lib/productImages';
import CollectionFeature from '../components/CollectionFeature';

gsap.registerPlugin(ScrollTrigger);

const heroSlides = [
  { image: 'unstitched', eyebrow: 'New season · 2026', title: <>Modern<br />Essentials<span className="text-brand">.</span></>, description: 'Premium fabrics. Timeless style. Discover thoughtful design and modern Pakistani craftsmanship, made for the everyday.', link: '/collections/unstitched', action: 'Shop the collection' },
  { image: 'pret', eyebrow: 'The everyday edit', title: <>Ready for<br />your rhythm<span className="text-brand">.</span></>, description: 'Easy silhouettes and considered details, designed to feel as good as they look from morning plans to late evenings.', link: '/collections/ready-to-wear', action: 'Explore ready to wear' },
  { image: 'men', eyebrow: 'Made for the occasion', title: <>Tradition,<br />made modern<span className="text-brand">.</span></>, description: 'Refined layers and thoughtful tailoring for the celebrations, gatherings and everyday moments that matter.', link: '/collections/men-and-kids', action: 'Shop men & kids' },
  { image: 'home', eyebrow: 'A softer kind of luxury', title: <>Make room<br />for rituals<span className="text-brand">.</span></>, description: 'Tactile textures and warm fragrance notes bring a little more calm to the spaces you call home.', link: '/collections/home-and-fragrances', action: 'Shop home & fragrance' }
];

export default function Home() {
  const { products } = useStore();
  const featuredProducts = products.filter((p) => p.is_featured).slice(0, 8);
  const newArrivals = products.filter((p) => ['prod-11', 'prod-12', 'prod-13', 'prod-14', 'prod-15', 'prod-16'].includes(p.id));
  const heroRef = useRef(null);
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top+=72px',
      end: '+=180%',
      scrub: 0.5,
      onUpdate: ({ progress }) => {
        const nextSlide = Math.min(heroSlides.length - 1, Math.floor(progress * heroSlides.length));
        setHeroSlide((current) => current === nextSlide ? current : nextSlide);
      }
    });
    return () => trigger.kill();
  }, []);

  const goToSlide = (index) => {
    const section = heroRef.current;
    if (!section) return;
    const maxScroll = section.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: section.offsetTop + maxScroll * (index / heroSlides.length),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    });
  };

  const categories = [
    { title: "Unstitched Fabrics", subtitle: "Lawn, Winter & Festive", image: "unstitched", path: "/collections/unstitched", count: "35+ Designs" },
    { title: "Ready to Wear", subtitle: "Kurtis & 3-Piece Pret", image: "pret", path: "/collections/ready-to-wear", count: "24+ Styles" },
    { title: "Men & Kids", subtitle: "Kameez Shalwar & Waistcoats", image: "men", path: "/collections/men-and-kids", count: "18+ Outfits" },
    { title: "Home & Fragrances", subtitle: "Velvet Bedding & Oud", image: "home", path: "/collections/home-and-fragrances", count: "12+ Items" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      
      {/* Hero Section with 3D Background */}
      <section id="fashion-hero" ref={heroRef} className="relative h-[280svh] bg-[#F2EEE6]">
        <div className="sticky top-[72px] flex h-[calc(100svh-72px)] min-h-[560px] items-center overflow-hidden">
          {heroSlides.map((slide, index) => (
            <img
              key={slide.image}
              src={getCategoryImage(slide.image, 1800)}
              alt=""
              aria-hidden="true"
              fetchPriority={index === 0 ? 'high' : 'auto'}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${heroSlide === index ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F2EEE6]/85 via-[#F2EEE6]/50 to-[#F2EEE6]/8" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F2EEE6]/15 via-transparent to-[#F2EEE6]/5" />
          <div className="pointer-events-none absolute inset-0 z-[1] opacity-70">
            <Scene3D variant="hero" className="h-full w-full" />
          </div>
          <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <motion.div
              key={heroSlide}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex max-w-xl flex-col items-start gap-5"
            >
              <span className="font-body text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-muted">{heroSlides[heroSlide].eyebrow}</span>
              <h1 className="text-5xl leading-[0.96] tracking-[-0.045em] text-ink sm:text-7xl lg:text-[clamp(4rem,7vw,6.8rem)]">
                {heroSlides[heroSlide].title}
              </h1>
              <p className="max-w-md font-body text-sm leading-relaxed text-ink-muted sm:text-base">
                {heroSlides[heroSlide].description}
              </p>
              <Link to={heroSlides[heroSlide].link}>
                <Button variant="primary" className="rounded-full px-6 py-3.5 normal-case tracking-normal">
                  {heroSlides[heroSlide].action} <ArrowRight size={16} className="ml-2 inline" />
                </Button>
              </Link>
            </motion.div>
            <div className="absolute bottom-7 left-4 right-4 flex items-center justify-between sm:left-6 sm:right-6 lg:bottom-10 lg:left-auto lg:right-10">
              <div className="flex items-center gap-2" aria-label="Hero slide progress">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.image}
                    type="button"
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}: ${slide.eyebrow}`}
                    aria-current={heroSlide === index ? 'step' : undefined}
                    className={`h-1.5 rounded-full transition-all ${heroSlide === index ? 'w-9 bg-brand' : 'w-4 bg-ink/25 hover:bg-ink/50'}`}
                  />
                ))}
              </div>
              <span className="font-body text-[10px] font-medium uppercase tracking-[0.18em] text-ink-muted">
                {String(heroSlide + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')} · Scroll to explore
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Badges Bar */}
      <section className="border-b border-line bg-paper-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-6 sm:px-6 md:grid-cols-4 lg:px-8">
          <div className="flex items-center gap-3 rounded-xl bg-[#F7F5F0] p-4">
            <Truck className="shrink-0 text-brand" size={22} />
            <div>
              <h4 className="font-body text-xs font-semibold text-ink">Free shipping</h4>
              <p className="font-body text-[10px] text-ink-muted">On orders over Rs. 10,000</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-[#F7F5F0] p-4">
            <Award className="shrink-0 text-brand" size={22} />
            <div>
              <h4 className="font-body text-xs font-semibold text-ink">Premium quality</h4>
              <p className="font-body text-[10px] text-ink-muted">Thoughtful fabrics & details</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-[#F7F5F0] p-4">
            <RefreshCw className="shrink-0 text-brand" size={22} />
            <div>
              <h4 className="font-body text-xs font-semibold text-ink">Easy exchanges</h4>
              <p className="font-body text-[10px] text-ink-muted">A simple 14-day policy</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-[#F7F5F0] p-4">
            <ShieldCheck className="shrink-0 text-brand" size={22} />
            <div>
              <h4 className="font-body text-xs font-semibold text-ink">Secure checkout</h4>
              <p className="font-body text-[10px] text-ink-muted">Shop with confidence</p>
            </div>
          </div>
        </div>
      </section>

      <section className="editorial-section mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <Reveal>
            <SectionTitle subtitle="Just landed" title="New this season" alignment="left" className="mb-0" />
          </Reveal>
          <Link to="/collections/unstitched" className="inline-flex items-center gap-2 font-body text-xs font-semibold text-ink hover:text-brand">
            Discover all new arrivals <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {newArrivals.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.06}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="editorial-section mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <SectionTitle subtitle="Curated Collections" title="Explore By Category" alignment="left" />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {categories.map((cat, index) => (
            <Reveal key={cat.title} delay={index * 0.1}>
              <Link to={cat.path} className="editorial-image group block relative h-[360px] overflow-hidden rounded-2xl bg-paper-surface sm:h-[420px]">
                <img
                  src={getCategoryImage(cat.image)}
                  alt={cat.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute inset-0 bg-brand/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                <div className="absolute bottom-0 inset-x-0 p-8 z-20 flex flex-col gap-2">
                  <span className="font-mono text-[10px] text-brand uppercase tracking-widest">{cat.count}</span>
                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-brand transition-colors">{cat.title}</h3>
                  <p className="font-body text-sm text-white/75">{cat.subtitle}</p>
                  <div className="flex items-center gap-2 font-mono text-xs text-chrome mt-2 group-hover:translate-x-2 transition-transform">
                    <span>Shop Collection</span> <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[#F0EDE6] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle subtitle="Dress for the moment" title="A collection for every plan" alignment="left" />
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { title: 'Everyday ease', sub: 'Breathable prints and comfortable cuts', image: 'unstitched', link: '/collections/unstitched', action: 'Find your fabric' },
              { title: 'The occasion edit', sub: 'Polished looks for days worth celebrating', image: 'pret', link: '/collections/ready-to-wear', action: 'Shop occasionwear' },
              { title: 'Thoughtful gifting', sub: 'Small rituals and considered home details', image: 'home', link: '/collections/home-and-fragrances', action: 'Explore home' }
            ].map((item) => (
              <Link key={item.title} to={item.link} className="group overflow-hidden rounded-2xl bg-paper-surface">
                <div className="editorial-image aspect-[4/3] overflow-hidden">
                  <img src={getCategoryImage(item.image, 900)} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-display text-2xl text-ink">{item.title}</h3>
                  <p className="mt-2 font-body text-sm text-ink-muted">{item.sub}</p>
                  <span className="mt-4 inline-flex items-center gap-2 font-body text-xs font-semibold text-brand">{item.action}<ArrowRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Trending Collection */}
      <section className="py-24 bg-paper-surface border-t border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
            <Reveal>
              <SectionTitle subtitle="Trending Now" title="The Edit for the Season" alignment="left" className="mb-0" />
            </Reveal>
            <Link to="/collections/unstitched" className="mt-4 md:mt-0">
              <Button variant="secondary">View All Products</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, idx) => (
              <Reveal key={product.id} delay={idx * 0.1}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CollectionFeature
        image="unstitched"
        eyebrow="Made with a little more thought"
        title="Good fabric. Better feeling."
        description="We bring together expressive prints, considered textures and practical silhouettes so getting dressed can feel effortless."
        points={['Selected seasonal fabrics', 'Details designed for real wear', 'Versatile pieces across the family', 'Easy delivery and exchanges']}
        link="/collections/unstitched"
        action="Explore the collection"
      />

      {/* Editorial Banner */}
      <section className="editorial-section px-4 py-12 sm:px-6 lg:px-8">
        <div className="editorial-image group relative mx-auto flex min-h-[360px] max-w-7xl items-center overflow-hidden rounded-2xl bg-[#D7C9B3] sm:min-h-[440px]">
          <img src={getCategoryImage('men', 1800)} alt="Modern tailoring from the latest collection" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
          <div className="relative z-10 max-w-xl px-7 py-12 text-white sm:px-14">
            <span className="font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75">More than fashion</span>
            <h2 className="mt-3 text-4xl leading-tight sm:text-6xl">It’s a way<br />of feeling.</h2>
            <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-white/80">
              From the first sketch to the final stitch, discover modern pieces rooted in craft and made to be lived in.
            </p>
            <Link to="/collections/ready-to-wear" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-body text-xs font-semibold text-ink hover:bg-brand hover:text-white">
              Discover our story <ArrowRight size={15} />
            </Link>
          </div>
          <Link to="/track-order" className="absolute bottom-7 right-7 flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-ink hover:scale-105 hover:bg-brand hover:text-white" aria-label="Track your order">
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <section className="border-y border-line bg-paper-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionTitle subtitle="The FashionFizz difference" title="Thoughtful from first pick to final stitch" />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { title: 'Fabric worth feeling', description: 'From breathable everyday cottons to plush winter textures, find materials selected for comfort and character.', detail: 'Thoughtful fabrics' },
              { title: 'Details make the look', description: 'Embroidery, considered finishing and wearable silhouettes bring extra care to the pieces you reach for.', detail: 'Considered design' },
              { title: 'Here for the whole order', description: 'Find clear product details, convenient delivery options and helpful support whenever you need it.', detail: 'Easy shopping' }
            ].map((promise) => (
              <article key={promise.title} className="rounded-2xl border border-line bg-paper p-6 sm:p-7">
                <span className="font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">{promise.detail}</span>
                <h3 className="mt-4 font-display text-2xl text-ink">{promise.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted">{promise.description}</p>
                <div className="mt-5 border-t border-line pt-4">
                  <Link to="/collections/unstitched" className="inline-flex items-center gap-2 font-body text-xs font-semibold text-ink hover:text-brand">
                    Explore the edit <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
