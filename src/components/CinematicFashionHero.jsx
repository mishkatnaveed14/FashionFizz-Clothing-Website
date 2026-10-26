import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ImageWithFallback from './ImageWithFallback';
import Scene3D from '../three/Scene3D';
import useDevice from '../hooks/useDevice';
import { editorialPhotos, getUnsplashUrl } from '../lib/productImages';

gsap.registerPlugin(ScrollTrigger);

const campaignSlides = [
  {
    image: editorialPhotos.hero,
    eyebrow: 'Fashion editorial · New season',
    title: <>Tradition,<br />in a new light<span className="text-[#D9C7AE]">.</span></>,
    description: 'Modern Pakistani style, shaped by thoughtful fabrics and the details that make a look your own.'
  },
  {
    image: editorialPhotos.heroPink,
    eyebrow: 'Made for the moments that matter',
    title: <>A little more<br />occasion<span className="text-[#D9C7AE]">.</span></>,
    description: 'Find expressive prints, graceful silhouettes and considered details for the days you will remember.'
  },
  {
    image: editorialPhotos.heroStudio,
    eyebrow: 'The everyday edit',
    title: <>Wear your<br />own story<span className="text-[#D9C7AE]">.</span></>,
    description: 'Explore easy layers and enduring pieces for the way you live, gather and celebrate.'
  }
];

export default function CinematicFashionHero() {
  const sectionRef = useRef(null);
  const imageRefs = useRef([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const { reduceMotion } = useDevice();

  useLayoutEffect(() => {
    if (reduceMotion) return undefined;

    const context = gsap.context(() => {
      const imageElements = imageRefs.current.filter(Boolean);
      if (imageElements.length !== campaignSlides.length) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top+=96px',
          end: () => `+=${Math.round(window.innerHeight * (window.innerWidth >= 1024 ? 1.36 : 0.56))}`,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => {
            const nextSlide = Math.min(campaignSlides.length - 1, Math.floor(progress * campaignSlides.length));
            setActiveSlide((current) => current === nextSlide ? current : nextSlide);
          },
          onLeaveBack: () => setActiveSlide(0)
        }
      });

      timeline.to(imageElements[0], { scale: 1.12, xPercent: -3, ease: 'none' }, 0);
      timeline.to(imageElements[1], { autoAlpha: 1, scale: 1.08, xPercent: 2, ease: 'none' }, 0.38);
      timeline.to(imageElements[0], { autoAlpha: 0, ease: 'none' }, 0.38);
      timeline.to(imageElements[2], { autoAlpha: 1, scale: 1.08, xPercent: -2, ease: 'none' }, 0.72);
      timeline.to(imageElements[1], { autoAlpha: 0, ease: 'none' }, 0.72);
    }, sectionRef);

    return () => context.revert();
  }, [reduceMotion]);

  const moveToSlide = (index) => {
    if (!sectionRef.current) return;
    const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
    const scrollDistance = window.innerHeight * (window.innerWidth >= 1024 ? 1.36 : 0.56);
    window.scrollTo({
      top: sectionTop + scrollDistance * (index / (campaignSlides.length - 1)),
      behavior: reduceMotion ? 'auto' : 'smooth'
    });
  };

  return (
    <section id="fashion-hero" ref={sectionRef} className={reduceMotion ? 'relative' : 'relative h-[175svh] lg:h-[260svh]'}>
      <div className={`${reduceMotion ? 'relative' : 'sticky top-[96px]'} flex h-[calc(100svh-96px)] min-h-[480px] items-end overflow-hidden bg-[#272421] lg:items-center`}>
        {campaignSlides.map((slide, index) => (
          <ImageWithFallback
            key={slide.image.id}
            src={getUnsplashUrl(slide.image, 2000, 1400)}
            alt={slide.image.alt}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            loading={index === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 h-full w-full object-cover object-[58%_center] ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
            fallbackClassName="bg-gradient-to-br from-[#641E32] via-[#7E3146] to-[#272421]"
            fallbackLabel={null}
            fallbackStyle={{ background: 'linear-gradient(135deg, #641E32 0%, #7E3146 45%, #272421 100%)' }}
            imageRef={(element) => { imageRefs.current[index] = element; }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#272421]/90 via-[#272421]/40 to-[#272421]/10 lg:bg-gradient-to-r lg:from-[#272421]/85 lg:via-[#272421]/45 lg:to-transparent" />
        <div className="pointer-events-none absolute inset-0 z-[1] opacity-90">
          <Scene3D variant="hero" className="h-full w-full" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-24 pt-20 text-white sm:px-10 lg:px-16 lg:py-24">
          <div className="max-w-[620px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <span className="inline-flex items-center rounded-full border border-white/35 bg-white/10 px-4 py-2 font-body text-[9px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm sm:text-[10px]">
                  {campaignSlides[activeSlide].eyebrow}
                </span>
                <h1 className="mt-6 font-display text-[clamp(3rem,8vw,7.2rem)] leading-[0.91] tracking-[-0.045em] text-white">
                  {campaignSlides[activeSlide].title}
                </h1>
                <p className="mt-6 max-w-lg font-body text-sm leading-7 text-white/80 sm:text-base">
                  {campaignSlides[activeSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/collections/unstitched"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#FFFEFC] px-6 font-body text-xs font-semibold text-[#272421] transition-colors hover:bg-[#D9C7AE]"
              >
                Shop the collection <ArrowRight size={16} />
              </Link>
              <Link
                to="/collections/ready-to-wear"
                className="inline-flex min-h-12 items-center gap-2 px-2 font-body text-xs font-semibold text-white transition-colors hover:text-[#D9C7AE]"
              >
                Discover ready to wear <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-6 right-6 z-20 flex items-center justify-between border-t border-white/25 py-4 text-white/80 sm:left-10 sm:right-10 lg:left-16 lg:right-16">
          {!reduceMotion ? (
            <div className="flex items-center gap-2" aria-label="Campaign story progress">
              {campaignSlides.map((slide, index) => (
                <button
                  key={slide.eyebrow}
                  type="button"
                  onClick={() => moveToSlide(index)}
                  aria-label={`Go to campaign scene ${index + 1}: ${slide.eyebrow}`}
                  aria-current={activeSlide === index ? 'step' : undefined}
                  className={`h-1.5 rounded-full transition-all ${activeSlide === index ? 'w-9 bg-[#D9C7AE]' : 'w-4 bg-white/45 hover:bg-white/75'}`}
                />
              ))}
            </div>
          ) : (
            <span className="font-body text-[9px] font-medium uppercase tracking-[0.18em]">The new season</span>
          )}
          <span className="hidden items-center gap-2 font-body text-[9px] font-medium uppercase tracking-[0.18em] sm:inline-flex">
            Scroll to explore <ArrowDown size={13} />
          </span>
          <span className="font-body text-[10px] uppercase tracking-[0.16em] sm:hidden">
            {String(activeSlide + 1).padStart(2, '0')} / {String(campaignSlides.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
}
