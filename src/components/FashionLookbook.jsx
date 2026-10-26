import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ImageWithFallback from './ImageWithFallback';
import useDevice from '../hooks/useDevice';
import { editorialPhotos, getUnsplashUrl } from '../lib/productImages';

gsap.registerPlugin(ScrollTrigger);

const looks = [
  {
    image: editorialPhotos.runway,
    title: 'A little drama, beautifully done',
    detail: 'Occasion dressing',
    link: '/collections/ready-to-wear',
    imagePosition: 'object-[50%_35%]'
  },
  {
    image: editorialPhotos.lookbookTraditional,
    title: 'Colour with a point of view',
    detail: 'South Asian formalwear inspiration',
    link: '/collections/unstitched',
    imagePosition: 'object-center'
  },
  {
    image: editorialPhotos.lookbookSari,
    title: 'Heritage, carried forward',
    detail: 'Traditional South Asian style',
    link: '/collections/unstitched',
    imagePosition: 'object-center'
  }
];

export default function FashionLookbook() {
  const sectionRef = useRef(null);
  const { reduceMotion } = useDevice();

  useLayoutEffect(() => {
    if (reduceMotion) return undefined;

    const context = gsap.context(() => {
      const images = gsap.utils.toArray('[data-lookbook-image]');
      images.forEach((image) => {
        gsap.to(image, {
          yPercent: -7,
          ease: 'none',
          scrollTrigger: {
            trigger: image.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
            invalidateOnRefresh: true
          }
        });
      });
    }, sectionRef);

    return () => context.revert();
  }, [reduceMotion]);

  return (
    <section id="lookbook" ref={sectionRef} className="editorial-section bg-[#F8F5EF] py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12">
        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end lg:mb-14">
          <div>
            <span className="font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-[#641E32]">The FashionFizz lookbook</span>
            <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight tracking-[-0.025em] text-[#272421] sm:text-5xl lg:text-6xl">
              A world of style,<br className="hidden sm:block" /> seen your way.
            </h2>
          </div>
          <p className="max-w-sm font-body text-sm leading-6 text-[#6f6962] sm:text-right">
            Editorial inspiration from fashion, craft and the moments that bring us together.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
          {looks.map((look, index) => (
            <Link
              key={look.title}
              to={look.link}
              className={`group relative isolate block overflow-hidden rounded-[22px] bg-[#D9C7AE] ${index === 0 ? 'aspect-[4/5] lg:col-span-7 lg:row-span-2 lg:aspect-[0.88]' : 'aspect-[4/3] lg:col-span-5'}`}
            >
              <ImageWithFallback
                src={getUnsplashUrl(look.image, 1500, 1200)}
                alt={look.image.alt}
                loading="lazy"
                data-lookbook-image
                className={`absolute -inset-y-[5%] inset-x-0 h-[110%] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025] ${look.imagePosition}`}
                fallbackClassName="bg-[#641E32]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#272421]/75 via-transparent to-[#272421]/5" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-7 lg:p-8">
                <div>
                  <span className="font-body text-[9px] font-semibold uppercase tracking-[0.2em] text-white/75">{look.detail}</span>
                  <h3 className="mt-2 max-w-lg font-display text-2xl leading-tight sm:text-3xl">{look.title}</h3>
                </div>
                <span aria-hidden="true" className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/60 transition-colors group-hover:border-[#D9C7AE] group-hover:bg-[#D9C7AE] group-hover:text-[#272421]">
                  <ArrowUpRight size={17} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
