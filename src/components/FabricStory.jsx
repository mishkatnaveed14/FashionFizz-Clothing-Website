import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ImageWithFallback from './ImageWithFallback';
import Scene3D from '../three/Scene3D';
import { editorialPhotos, getUnsplashUrl } from '../lib/productImages';

gsap.registerPlugin(ScrollTrigger);

const fabricChapters = [
  {
    title: 'Start with the cloth.',
    description: 'The right texture catches the light, moves with you and gives an everyday silhouette its own character.',
    note: 'Texture, chosen with care'
  },
  {
    title: 'Made memorable in the detail.',
    description: 'Embroidery and thoughtful finishing turn a simple piece into something you will want to reach for again.',
    note: 'Craft, felt in every stitch'
  },
  {
    title: 'A collection to make your own.',
    description: 'Explore expressive prints and wearable shapes across unstitched, ready-to-wear and occasion edits.',
    note: 'Style, ready for your story'
  }
];

const storyPhotos = [editorialPhotos.embroidery, editorialPhotos.craft, editorialPhotos.tailoringStudio];

export default function FabricStory() {
  const sectionRef = useRef(null);
  const photoRefs = useRef([]);
  const [activeChapter, setActiveChapter] = useState(0);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const photos = photoRefs.current.filter(Boolean);
      if (photos.length !== storyPhotos.length) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top+=96px',
          end: 'bottom bottom',
          scrub: 0.9,
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => {
            const nextChapter = Math.min(fabricChapters.length - 1, Math.floor(progress * fabricChapters.length));
            setActiveChapter((current) => current === nextChapter ? current : nextChapter);
          },
          onLeaveBack: () => setActiveChapter(0)
        }
      });

      timeline.to(photos[1], { autoAlpha: 1, duration: 0.24 }, 0.36);
      timeline.to(photos[0], { autoAlpha: 0, duration: 0.24 }, 0.36);
      timeline.to(photos[2], { autoAlpha: 1, duration: 0.24 }, 0.72);
      timeline.to(photos[1], { autoAlpha: 0, duration: 0.24 }, 0.72);
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section id="fabric-story" ref={sectionRef} className="relative bg-[#272421] text-[#F8F5EF] lg:h-[260svh]">
      <div className="mx-auto grid max-w-[1600px] gap-8 px-4 py-14 sm:px-6 lg:sticky lg:top-[96px] lg:h-[calc(100svh-96px)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:px-12 lg:py-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-[#641E32] sm:aspect-[5/4] lg:h-[min(76vh,760px)] lg:aspect-auto">
          {storyPhotos.map((storyPhoto, index) => (
            <ImageWithFallback
              key={storyPhoto.id}
              src={getUnsplashUrl(storyPhoto, 1400, 1200)}
              alt={storyPhoto.alt}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover object-center ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
              fallbackClassName="bg-[#641E32]"
              imageRef={(element) => { photoRefs.current[index] = element; }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#272421]/55 via-transparent to-[#272421]/10" />
          <div className="pointer-events-none absolute inset-0 z-[1] opacity-90">
            <Scene3D variant="fabricStory" className="h-full w-full" />
          </div>
          <span className="absolute bottom-5 left-5 z-10 rounded-full border border-white/40 bg-[#272421]/50 px-3 py-2 font-body text-[9px] font-medium uppercase tracking-[0.17em] text-white backdrop-blur-sm">
            Sculpted 3D fabric study
          </span>
        </div>

        <div className="flex flex-col justify-center lg:min-h-[520px] lg:py-10">
          <div className="hidden lg:block">
            <span className="font-body text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D8B7B3]">A story in every thread</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChapter}
                aria-live="polite"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.32, ease: [0.2, 0.7, 0.2, 1] }}
                className="mt-5 min-h-[250px]"
              >
                <span className="font-body text-[10px] uppercase tracking-[0.2em] text-white/55">
                  0{activeChapter + 1} / 0{fabricChapters.length} · {fabricChapters[activeChapter].note}
                </span>
                <h2 className="mt-5 max-w-xl font-display text-4xl leading-[1.05] tracking-[-0.025em] sm:text-5xl xl:text-6xl">
                  {fabricChapters[activeChapter].title}
                </h2>
                <p className="mt-5 max-w-lg font-body text-sm leading-7 text-white/70 sm:text-base">
                  {fabricChapters[activeChapter].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:hidden">
            <span className="font-body text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D8B7B3]">A story in every thread</span>
            <h2 className="mt-3 max-w-xl font-display text-3xl leading-tight sm:text-4xl">Texture, craft and style.</h2>
            <div className="mt-6 grid gap-5">
              {fabricChapters.map((chapter, index) => (
                <article key={chapter.title} className="border-t border-white/20 pt-4">
                  <span className="font-body text-[9px] font-semibold uppercase tracking-[0.18em] text-[#D8B7B3]">0{index + 1} · {chapter.note}</span>
                  <h3 className="mt-2 font-display text-xl">{chapter.title}</h3>
                  <p className="mt-2 font-body text-sm leading-6 text-white/70">{chapter.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link to="/collections/unstitched" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#FFFEFC] px-6 font-body text-xs font-semibold text-[#272421] transition-colors hover:bg-[#D9C7AE]">
              Shop the collection <ArrowRight size={16} />
            </Link>
            <span className="inline-flex items-center gap-2 font-body text-[10px] text-white/65">
              <Check size={14} className="text-[#D8B7B3]" /> Made for real life, and your own style
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
