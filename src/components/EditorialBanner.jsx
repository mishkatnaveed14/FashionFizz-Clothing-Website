import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getCategoryImage } from '../lib/productImages';

export default function EditorialBanner({
  image = 'pret',
  eyebrow = 'Made for the everyday',
  title = 'Style meets comfort.',
  description = 'Thoughtfully chosen pieces, beautiful fabrics and timeless details for the way you live.',
  link = '/collections/ready-to-wear',
  action = 'Discover the collection',
  className = ''
}) {
  return (
    <section className={`editorial-section mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 ${className}`}>
      <div className="editorial-image group relative flex min-h-[300px] items-end overflow-hidden rounded-2xl sm:min-h-[360px]">
        <img
          src={getCategoryImage(image, 1800)}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
        <div className="relative z-10 max-w-xl px-7 py-9 text-white sm:px-12 sm:py-12">
          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.24em] text-white/80">{eyebrow}</span>
          <h2 className="mt-3 text-3xl leading-tight sm:text-5xl">{title}</h2>
          <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-white/85 sm:text-base">{description}</p>
          <Link
            to={link}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-body text-xs font-semibold text-ink hover:bg-brand hover:text-white"
          >
            {action}<ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
