import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { getCategoryImage, getCategoryPhoto } from '../lib/productImages';
import ImageWithFallback from './ImageWithFallback';

export default function CollectionFeature({
  image,
  eyebrow,
  title,
  description,
  points,
  link,
  action
}) {
  return (
    <section className="mx-auto mb-10 grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:mb-14 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8">
      <div className="editorial-image relative aspect-[4/3] overflow-hidden rounded-2xl bg-soft lg:aspect-[5/4]">
        <ImageWithFallback
          src={getCategoryImage(image, 1400)}
          alt={getCategoryPhoto(image)?.alt || title}
          loading="lazy"
          className="h-full w-full object-cover"
          fallbackClassName="bg-[#F2E7E4]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
      </div>
      <div className="py-2 lg:py-8">
        <span className="font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-brand">{eyebrow}</span>
        <h2 className="mt-3 max-w-xl text-3xl leading-tight text-ink sm:text-4xl">{title}</h2>
        <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-ink-muted sm:text-base">{description}</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {points.map((point) => (
            <li key={point} className="flex items-center gap-2 font-body text-xs text-ink">
              <Check size={15} className="shrink-0 text-brand" /> {point}
            </li>
          ))}
        </ul>
        <Link
          to={link}
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-paper-surface px-5 py-3 font-body text-xs font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
        >
          {action}<ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
