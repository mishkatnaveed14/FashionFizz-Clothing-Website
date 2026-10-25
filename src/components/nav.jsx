import {
  FiMenu as Menu,
  FiSearch as Search,
  FiUser as UserRound,
  FiX as X,
  FiHome as Home,
  FiChevronDown as ChevronDownIcon,
  FiChevronUp as ChevronUpIcon,

  FiPlay,
} from 'react-icons/fi';
import { BiArrowFromRight, BiShoppingBag } from 'react-icons/bi';
import { FaCircleH } from 'react-icons/fa6';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

const menuSections = [
  {
    label: 'Winter Sale',
    tone: 'sale',
    groups: [
      { title: 'Sale Women', links: ['Pret Signature', 'Pret Essentials', 'Everyday Edit', 'Co-ord Sets'] },
      { title: 'Sale Men', links: ['Unstitched', 'Ready To Wear', 'Accessories', 'Salt'] },
      { title: 'Sale Ideas Home', links: ['Bedding', 'Home Accessories', 'Bedding Basics', 'Bath Linen'] },
      { title: 'Sale Fragrances', links: ['Women', 'Men', 'Gift Sets'] },
    ],
  },
  { label: 'New Arrivals', groups: [{ title: 'Freshly In', links: ['Women', 'Men', 'Home', 'Accessories'] }] },
  { label: 'Unstitched', groups: [{ title: 'Unstitched Edit', links: ['Lawn', 'Cotton', 'Winter Fabrics', 'Luxury Collection'] }] },
  { label: 'Ready To Wear', groups: [{ title: 'Ready To Wear', links: ['Pret Signature', 'Pret Essentials', 'Everyday Edit', 'Co-ord Sets'] }] },
  { label: 'Men', groups: [{ title: 'Menswear', links: ['Kurtas', 'Shalwar Kameez', 'Waistcoats', 'Accessories'] }] },
  { label: 'Fragrances', groups: [{ title: 'The Fragrance Edit', links: ['For Her', 'For Him', 'Mists', 'Gift Sets'] }] },
  { label: 'Ideas Home', groups: [{ title: 'Make It Home', links: ['Bedding', 'Bath Linen', 'Tableware', 'Home Accessories'] }] },
  { label: 'Salt', groups: [{ title: 'Salt by Fashion Fizz', links: ['Casual Edit', 'Essentials', 'Denim', 'Accessories'] }] },
  { label: 'Shoes & Bags', groups: [{ title: 'Complete The Look', links: ['Shoes', 'Handbags', 'Clutches', 'Jewellery'] }] },
];

const utilityLinks = ['Lookbook', 'Track Order', 'Store Locator', 'Wishlist', 'Returns & Exchanges'];

function BrandMark() {
  return (
    <a href="#top" className="flex items-center gap-2" aria-label="Fashion Fizz home">
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-[#111111] text-xl font-black tracking-[-0.1em] text-white">
        <span className="absolute -left-0.5 top-0.5 text-[#ff2d78]">F</span>
        <span className="absolute bottom-[-4px] right-0.5 text-white">F</span>
      </span>
      <span className="font-serif text-[22px] font-bold leading-none tracking-[-0.04em] text-[#111111] sm:text-[25px]">
        Fashion <span className="text-[#ff2d78]">Fizz</span>
      </span>
    </a>
  );
}

function IconButton({ label, children, onClick, className = '' }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`grid h-10 w-10 place-items-center rounded-full text-[#111111] transition hover:bg-[#fff0f5] hover:text-[#ff2d78] focus:outline-none focus:ring-2 focus:ring-[#ff2d78]/40 ${className}`}
    >
      {children}
    </button>
  );
}

function CollectionCard({ title, caption, accent }) {
  return (
    <a href="#collection" className="group relative min-h-40 overflow-hidden rounded-2xl p-5 text-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ background: accent }}>
      <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full border-[18px] border-white/15 transition duration-500 group-hover:scale-125" />
      <div className="absolute bottom-3 right-4 text-6xl font-black italic text-white/10">FF</div>
      <span className="relative text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">Featured collection</span>
      <h3 className="relative mt-10 max-w-[140px] font-serif text-xl leading-tight">{title}</h3>
      <p className="relative mt-1 text-xs text-white/75">{caption}</p>
    </a>
  );
}

export default function FashionFizzNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeMenu = menuSections[activeSection];

  return (
    <>
      <header id="top" className="sticky top-0 z-40 border-b border-black/10 bg-[#fffdfa]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-8 lg:px-10">
          <IconButton label="Open menu" onClick={() => setIsMenuOpen(true)} className="shrink-0">
            <Menu size={22} strokeWidth={1.8} />
          </IconButton>

          <BrandMark />

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <button type="button" className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition hover:bg-black/5 sm:flex">
              <span className="grid h-5 w-5 place-items-center rounded-sm bg-[#159447] text-[9px] font-bold text-white">₨</span>
              PKR <ChevronDownIcon size={14} className="rotate-90" />
            </button>
            <IconButton label="Help and support"><FaCircleH size={21} strokeWidth={1.7} /></IconButton>
            <IconButton label="Search" onClick={() => setIsSearchOpen((open) => !open)}><Search size={21} strokeWidth={1.7} /></IconButton>
            <IconButton label="Account" className="hidden sm:grid"><UserRound size={21} strokeWidth={1.7} /></IconButton>
            <IconButton label="Shopping bag" className="relative">
              <BiShoppingBag size={21} strokeWidth={1.7} />
              <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-[#ff2d78] px-1 text-[9px] font-bold text-white">2</span>
            </IconButton>
          </div>
        </div>
        <div className={`${isSearchOpen ? 'max-h-20 border-t opacity-100' : 'max-h-0 opacity-0'} overflow-hidden border-black/10 transition-all duration-300`}>
          <label className="mx-auto flex max-w-[1440px] items-center gap-3 px-5 py-4 sm:px-10">
            <Search size={20} className="text-black/45" />
            <input autoFocus={isSearchOpen} type="search" placeholder="Search the Fashion Fizz edit" className="w-full bg-transparent text-sm outline-none placeholder:text-black/40" />
            <button type="button" onClick={() => setIsSearchOpen(false)} className="text-xs font-bold uppercase tracking-widest text-black/50">Close</button>
          </label>
        </div>
      </header>

      <div className={`fixed inset-0 z-50 ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!isMenuOpen}>
        <button type="button" aria-label="Close menu overlay" onClick={() => setIsMenuOpen(false)} className={`absolute inset-0 bg-[#111111]/45 backdrop-blur-[2px] transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} />
        <aside ref={drawerRef} className={`absolute left-0 top-0 flex h-full w-full max-w-[1180px] -translate-x-full flex-col bg-[#fffdfa] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${isMenuOpen ? 'translate-x-0' : ''}`}>
          <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-black/10 px-5 sm:px-8">
            <BrandMark />
            <IconButton label="Close menu" onClick={() => setIsMenuOpen(false)}><X size={23} strokeWidth={1.7} /></IconButton>
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
            <div className="w-full shrink-0 overflow-y-auto border-b border-black/10 p-4 lg:w-[250px] lg:border-b-0 lg:border-r lg:p-5">
              <div className="mb-5 flex items-center gap-3 border-b border-black/10 pb-3 text-black/45 lg:hidden">
                <Search size={18} /><input placeholder="Search" className="w-full bg-transparent text-sm outline-none placeholder:text-black/45" />
              </div>
              <nav className="grid grid-cols-2 gap-2 lg:block lg:space-y-1.5">
                {menuSections.map((section, index) => (
                  <button key={section.label} type="button" onClick={() => setActiveSection(index)} className={`group flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm transition lg:px-4 lg:py-3.5 lg:text-[15px] ${activeSection === index ? 'bg-[#f4f1ef] font-semibold text-[#111111] before:absolute' : 'text-black/70 hover:bg-black/5'} ${section.tone === 'sale' ? 'text-[#e31947]' : ''}`}>
                    <span>{section.label}</span>
                    {(section.groups.length > 0 && (index === 0 || index > 1)) && <ChevronUpIcon size={16} className="text-black/40 transition group-hover:translate-x-0.5" />}
                  </button>
                ))}
              </nav>
              <div className="mt-7 hidden border-t border-black/10 pt-6 lg:block">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-black/45">Install our app</p>
                <button type="button" className="flex w-full items-center gap-2 rounded-lg bg-[#111111] px-3 py-2 text-left text-white transition hover:bg-[#ff2d78]">
                  <span className="text-lg"><FiPlay size={16} /></span><span><span className="block text-[8px] uppercase tracking-wider text-white/70">Get it on</span><span className="block text-sm font-semibold leading-none">Google Play</span></span>
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-8 lg:p-10">
              <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                  <p className={`mb-2 text-[10px] font-bold uppercase tracking-[0.24em] ${activeMenu.tone === 'sale' ? 'text-[#e31947]' : 'text-[#ff2d78]'}`}>Explore the edit</p>
                  <h2 className="font-serif text-3xl font-bold tracking-[-0.04em] text-[#111111] sm:text-4xl">{activeMenu.label}</h2>
                </div>
                <a href="#shop-all" className="hidden items-center gap-2 border-b border-[#111111] pb-1 text-xs font-bold uppercase tracking-widest sm:flex">Shop all <BiArrowFromRight size={15} /></a>
              </div>
              <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
                {activeMenu.groups.map((group) => (
                  <div key={group.title}>
                    <h3 className="mb-4 border-b border-black/15 pb-3 text-sm font-bold">{group.title}</h3>
                    <ul className="space-y-3">
                      {group.links.map((link) => <li key={link}><a href="#category" className="text-sm text-black/60 transition hover:pl-1 hover:text-[#ff2d78]">{link}</a></li>)}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <CollectionCard title="The Signature Edit" caption="Pieces made to stand out" accent="linear-gradient(135deg, #111111, #4b2834)" />
                <CollectionCard title="Softly In Season" caption="New textures, new mood" accent="linear-gradient(135deg, #c45f73, #ff2d78)" />
                <CollectionCard title="Styled For You" caption="Complete your look" accent="linear-gradient(135deg, #d69d7c, #7a433a)" />
              </div>
            </div>
          </div>

          <div className="hidden shrink-0 items-center justify-between border-t border-black/10 px-8 py-4 lg:flex">
            <nav className="flex flex-wrap gap-x-7 gap-y-2">{utilityLinks.map((link) => <a key={link} href="#utility" className="text-xs font-semibold transition hover:text-[#ff2d78]">{link}</a>)}</nav>
            <button type="button" className="flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-xs font-semibold"><span>PKR</span><ChevronDownIcon size={14} className="rotate-90" /></button>
          </div>
        </aside>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-[76px] items-center justify-around rounded-t-3xl border-t border-black/5 bg-[#fffdfa]/95 px-3 shadow-[0_-8px_30px_rgba(17,17,17,0.08)] backdrop-blur-xl lg:hidden">
        <button type="button" onClick={() => setIsMenuOpen(true)} className="flex flex-col items-center gap-1 text-[10px] font-medium text-black/60"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#111111] text-white"><Menu size={20} /></span>Menu</button>
        <button type="button" onClick={() => setIsSearchOpen(true)} className="flex flex-col items-center gap-1 text-[10px] font-medium text-black/60"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#f0eeec]"><Search size={20} /></span>Search</button>
        <a href="#top" className="flex flex-col items-center gap-1 text-[10px] font-semibold text-[#ff2d78]"><span className="grid h-12 w-12 place-items-center rounded-full bg-[#ff2d78] text-white shadow-lg shadow-[#ff2d78]/25"><Home size={21} fill="currentColor" /></span>Home</a>
        <button type="button" className="relative flex flex-col items-center gap-1 text-[10px] font-medium text-black/60"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#f0eeec]"><BiShoppingBag size={20} /><span className="absolute right-1 top-[-2px] grid h-5 min-w-5 place-items-center rounded-full bg-[#111111] px-1 text-[10px] font-bold text-white">2</span></span>Cart</button>
        <button type="button" className="flex flex-col items-center gap-1 text-[10px] font-medium text-black/60"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#f0eeec]"><UserRound size={20} /></span>Account</button>
      </nav>
    </>
  );
}
