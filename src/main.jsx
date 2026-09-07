import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownRight, ArrowRight, ArrowUpRight, CalendarDays, Check, ExternalLink, MapPin, Menu, Phone, Plus, X } from 'lucide-react';
import './styles.css';

const gallery = [
  { title: 'Buddha', style: 'Realism', year: '2024', image: '/images/tattoo-1.jpg', tall: true },
  { title: 'Hannya', style: 'Blackwork', year: '2024', image: '/images/tattoo-2.jpg' },
  { title: 'Sagittarius', style: 'Fine line', year: '2024', image: '/images/tattoo-3.jpg', tall: true },
  { title: 'Narasimha', style: 'Portrait', year: '2024', image: '/images/tattoo-4.jpg' },
  { title: 'Koi Balance', style: 'Minimal', year: '2024', image: '/images/tattoo-5.jpg' },
  { title: 'The Watcher', style: 'Realism', year: '2024', image: '/images/tattoo-6.jpg', tall: true },
  { title: 'Divine Lineage', style: 'Portrait', year: '2024', image: '/images/tattoo-7.jpg' },
  { title: 'Ganesha', style: 'Realism', year: '2024', image: '/images/tattoo-8.jpg', tall: true },
  { title: 'Golden Hour', style: 'Blackwork', year: '2024', image: '/images/tattoo-9.jpg' }
];

const styles = ['Realism', 'Blackwork', 'Minimal', 'Cover-up', 'Portrait', 'Lettering'];
const process = [
  ['01', 'Consultation', 'A quiet conversation about the idea, the placement, and the story underneath it.'],
  ['02', 'The design', 'Your thought becomes a considered composition, drawn around your body, not dropped onto it.'],
  ['03', 'The stencil', 'We refine the final placement together. Nothing starts until it feels exactly right.'],
  ['04', 'The tattoo', 'A focused, unhurried session with premium hygiene and an obsessive eye for detail.'],
  ['05', 'The healing', 'Aftercare that keeps the work crisp, calm, and yours for the long run.']
];

function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [customSlide, setCustomSlide] = useState(0);
  const [cursor, setCursor] = useState({ x: -100, y: -100, active: false });
  const heroRef = useRef(null);
  const galleryRows = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2100);
    const move = (event) => setCursor({ x: event.clientX, y: event.clientY, active: true });
    window.addEventListener('mousemove', move);
    return () => { clearTimeout(timer); window.removeEventListener('mousemove', move); };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCustomSlide((slide) => (slide + 1) % gallery.length), 5200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('.scroll-3d');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-3d--visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    sections.forEach((section) => {
      const bounds = section.getBoundingClientRect();
      if (bounds.top < window.innerHeight * 0.88 && bounds.bottom > window.innerHeight * 0.12) {
        section.classList.add('scroll-3d--visible');
      } else {
        observer.observe(section);
      }
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (event) => { if (event.key === 'Escape') { setActiveImage(null); setBookingOpen(false); setMenuOpen(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const tiltHero = (event) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -10;
    heroRef.current.style.setProperty('--hero-x', `${x}deg`);
    heroRef.current.style.setProperty('--hero-y', `${y}deg`);
  };

  const slideGalleryRow = (rowIndex, direction) => {
    const row = galleryRows.current[rowIndex];
    row?.scrollBy({ left: direction * (row.clientWidth / 2), behavior: 'smooth' });
  };

  const renderGalleryCard = (item, index) => (
    <button key={item.title} className={`gallery-card gallery-card--${(index % 3) + 1} ${item.tall ? 'gallery-card--tall' : ''}`} onClick={() => setActiveImage(item)}>
      <span className="gallery-card__halo" /><img src={item.image} alt={`${item.style} tattoo artwork`} loading="lazy" /><span className="gallery-card__shade" /><span className="gallery-card__open"><Plus /></span>
    </button>
  );

  const customizationSlides = gallery.map((item, index) => ({
    ...item,
    kicker: ['A mark that moves with you.', 'Built from instinct.', 'Your meaning, made visible.', 'Details that hold up close.'][index % 4],
    copy: ['Bring us the idea, the memory, or simply the feeling. We will shape it around you.', 'Choose the mood, placement, and energy. The final piece should feel like it was always yours.', 'From the first sketch to the final line, every decision is made with intention.', 'A custom tattoo is not picked from a wall. It is drawn in conversation with your story.'][index % 4]
  }));

  return (
    <>
      <div className={`preloader ${loading ? '' : 'preloader--done'}`} aria-hidden={!loading}>
        <div className="preloader__drop" />
        <div className="preloader__wordmark">INK KING<span>TATTOOZ</span></div>
        <div className="preloader__footer"><span>INK</span><span>ART</span><span>STORY</span><span>PERMANENT</span></div>
      </div>
      <div className={`cursor ${cursor.active ? 'cursor--visible' : ''}`} style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }} />
      <header className="site-header">
        <button className="brand" onClick={() => scrollTo('top')} aria-label="Back to top"><img src="/images/dcd58da4-2d62-4dc9-805f-fb2e9408f4b8.png" alt="Ink King Tattooz logo" /><b>INK KING<br />TATTOOZ</b></button>
        <nav className={menuOpen ? 'nav nav--open' : 'nav'}>
          <button onClick={() => scrollTo('work')}>Work</button><button onClick={() => scrollTo('studio')}>Studio</button><button onClick={() => scrollTo('journal')}>Process</button><button onClick={() => setBookingOpen(true)} className="nav__book">Book a session <ArrowUpRight size={15} /></button>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open navigation">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section id="top" className="hero" ref={heroRef} onMouseMove={tiltHero}>
          <div className="hero__grain" />
          <div className="hero__orb" />
          <div className="hero__rings"><i /><i /><i /></div>
          <div className="hero__content">
            <p className="eyebrow"><span /> Malkajgiri · Secunderabad</p>
            <h1>Wear your<br /><em>story.</em></h1>
            <div className="hero__bottom"><p>Custom tattoo artistry<br />for the beautifully unrepeatable.</p><button className="circle-link" onClick={() => scrollTo('work')} aria-label="Explore our work"><ArrowDownRight /></button></div>
          </div>
          <div className="hero__tool-scene" aria-hidden="true">
            <div className="hero__machine"><div className="machine__needle" /><div className="machine__body"><div className="machine__coil" /><div className="machine__coil" /><div className="machine__grip" /></div><div className="machine__shine" /></div>
            <div className="ink-bottle"><div className="ink-bottle__cap" /><div className="ink-bottle__label">INK<br /><small>BLACK</small></div><div className="ink-bottle__shine" /></div>
            <div className="needle-cartridge"><div className="needle-cartridge__tip" /><div className="needle-cartridge__body" /><div className="needle-cartridge__ring" /></div>
          </div>
          <div className="hero__side-note">EST. / CUSTOM / HYDERABAD <span>SCROLL TO EXPLORE</span></div>
        </section>

        <section className="manifesto section-pad scroll-3d"><p className="eyebrow">About Us</p><div className="manifesto__copy"><h2>Not just ink.<br /><span>A mark of who<br />you <em>are.</em></span></h2><div><p>Ink King Tattooz is a space for slow ideas and permanent decisions. We make custom work with a black-heavy point of view, obsessive precision, and respect for the skin it lives on.</p><button className="text-link" onClick={() => scrollTo('studio')}>Enter the studio <ArrowUpRight size={16} /></button></div></div></section>

        <section id="work" className="work section-pad scroll-3d"><div className="section-heading"><div><p className="eyebrow">Our Work</p><h2>Made to <em>stay.</em></h2></div><p className="section-heading__note">Real work. Considered framing.<br />Every piece gets its own atmosphere.</p></div><div className="aesthetic-note"><span>WORK / 2024</span><p>We strip away the noise around the image so the line, shadow, and composition can speak first. Explore custom realism, blackwork, fine-line pieces, and cover-ups from the studio.</p><ArrowDownRight size={18} /></div><div className="style-row">{styles.map((style, index) => <button key={style} className={index === 0 ? 'style-row__active' : ''}>{style} <span>0{index + 1}</span></button>)}</div><div className="gallery-lines">{[gallery.slice(0, 3), gallery.slice(3)].map((row, rowIndex) => <div className="gallery-line" key={rowIndex}><button className="gallery-line__arrow gallery-line__arrow--left" onClick={() => slideGalleryRow(rowIndex, -1)} aria-label={`Previous images in row ${rowIndex + 1}`}><ArrowRight /></button><div className="gallery-line__track" ref={(element) => { galleryRows.current[rowIndex] = element; }}>{row.map((item, itemIndex) => renderGalleryCard(item, rowIndex * 3 + itemIndex))}</div><button className="gallery-line__arrow gallery-line__arrow--right" onClick={() => slideGalleryRow(rowIndex, 1)} aria-label={`Next images in row ${rowIndex + 1}`}><ArrowRight /></button></div>)}</div></section>

        <section className="customize section-pad scroll-3d"><div className="customize__copy"><p className="eyebrow">Custom Tattoos</p><h2>Customize<br />your <em>tattoo.</em></h2><p className="customize__kicker">{customizationSlides[customSlide].kicker}</p><p>{customizationSlides[customSlide].copy}</p><button className="button button--light" onClick={() => setBookingOpen(true)}>Start your design <ArrowUpRight size={17} /></button></div><div className="customize__visual"><div className="customize__image-stack">{customizationSlides.map((slide, index) => <img key={slide.title} className={index === customSlide ? 'customize__image customize__image--active' : 'customize__image'} src={slide.image} alt={`${slide.style} tattoo inspiration`} />)}</div><div className="customize__dots">{customizationSlides.map((slide, index) => <button key={slide.title} className={index === customSlide ? 'customize__dot customize__dot--active' : 'customize__dot'} onClick={() => setCustomSlide(index)} aria-label={`Show ${slide.title}`} />)}</div></div></section>

        <section id="studio" className="studio section-pad scroll-3d"><div className="studio__visual"><img src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=1600&q=90" alt="Tattoo artist working on a client in a dark studio" loading="lazy" /><span className="studio__visual-label">IN THE CHAIR / MALKajGIRI</span><div className="studio__stamp"><img src="/images/dcd58da4-2d62-4dc9-805f-fb2e9408f4b8.png" alt="Ink King studio logo" /><span>STUDIO</span></div></div><div className="studio__copy"><p className="eyebrow">Our Studio</p><h2>Good work<br />needs <em>room.</em></h2><p>Come in, slow down, and make something that belongs to you. Our studio is a considered, hygienic space in Malkajgiri for custom tattoos, cover-ups, and precise piercings that become part of your personal language.</p><div className="studio__services"><span>Custom tattoos</span><span>Cover-ups</span><span>Helix piercing</span><span>Fine-line work</span></div><div className="studio__details"><span><MapPin size={17} /> Malkajgiri, Secunderabad</span><span><CalendarDays size={17} /> Daily · 10:30 — 21:00</span></div><button className="text-link" onClick={() => setBookingOpen(true)}>Book your consultation <ArrowUpRight size={16} /></button></div></section>

        <section id="journal" className="journey scroll-3d"><div className="journey__intro section-pad"><p className="eyebrow">Our Process</p><h2>From thought<br />to <em>skin.</em></h2><p>Every piece begins with listening. This is how the idea finds its final form.</p></div><div className="process-track">{process.map(([number, title, copy]) => <article key={number} className="process-card"><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><ArrowUpRight /></article>)}</div></section>

        <section className="ink-section scroll-3d"><div className="ink-section__surface"><div className="ink-section__ripples" /></div><div className="ink-section__copy"><p className="eyebrow">Our Philosophy</p><h2>Every drop<br />has <em>meaning.</em></h2><p>We don't chase trends. We make marks that become part of the way you move through the world.</p></div><span className="ink-section__coordinates">17°28' N / 78°33' E</span></section>

        <section className="contact section-pad scroll-3d"><div><p className="eyebrow">Contact Us</p><h2>Your story<br /><em>starts now.</em></h2></div><div className="contact__side"><p>Tell us what you've been carrying. We'll help you make it permanent.</p><button className="button button--light" onClick={() => setBookingOpen(true)}>Start a conversation <ArrowUpRight size={17} /></button><a href="tel:08885553460" className="contact__phone"><Phone size={15} /> 088855 53460</a></div></section>
      </main>

      <footer className="footer"><div className="footer__top"><div className="footer__logo"><img src="/images/dcd58da4-2d62-4dc9-805f-fb2e9408f4b8.png" alt="Ink King Tattooz logo" /><span>INK KING<small>TATTOOZ</small></span></div><p>Custom tattoo artistry<br />in Secunderabad.</p><a href="https://www.instagram.com/inkking_tattooz/" target="_blank" rel="noreferrer"><ExternalLink size={18} /> @inkking_tattooz</a></div><div className="footer__bottom"><span>© 2024 Ink King Tattooz</span><span>Wear your story.</span><button onClick={() => scrollTo('top')}>Back to top <ArrowUpRight size={14} /></button></div></footer>

      {activeImage && <div className="overlay" onClick={() => setActiveImage(null)}><button className="overlay__close" onClick={() => setActiveImage(null)} aria-label="Close image"><X /></button><div className="lightbox" onClick={(event) => event.stopPropagation()}><img src={activeImage.image} alt={`${activeImage.style} tattoo artwork`} /><div><p className="eyebrow">{activeImage.year} / {activeImage.style}</p><h2>{activeImage.title}</h2></div></div></div>}
      {bookingOpen && <div className="overlay overlay--booking" onClick={() => setBookingOpen(false)}><div className="booking" onClick={(event) => event.stopPropagation()}><button className="overlay__close" onClick={() => setBookingOpen(false)} aria-label="Close booking"><X /></button>{bookingStep < 3 ? <><p className="eyebrow">BOOK A SESSION · 0{bookingStep} / 02</p><h2>Tell us about<br /><em>the idea.</em></h2><div className="booking__form">{bookingStep === 1 ? <><label>Your name<input placeholder="How should we call you?" /></label><label>Phone number<input placeholder="+91" type="tel" /></label><label>What's on your mind?<textarea placeholder="A few words about the tattoo you are imagining..." /></label></> : <><label>Placement<select defaultValue=""><option value="" disabled>Choose a placement</option><option>Arm / hand</option><option>Back / chest</option><option>Leg / foot</option><option>Other</option></select></label><label>Preferred style<select defaultValue=""><option value="" disabled>Choose a style</option>{styles.map(style => <option key={style}>{style}</option>)}</select></label><label>Preferred date<input type="date" /></label></>}</div><button className="button button--light booking__next" onClick={() => setBookingStep(bookingStep + 1)}>{bookingStep === 1 ? 'Continue' : 'Send enquiry'} <ArrowRight size={17} /></button></> : <div className="booking__success"><span><Check /></span><p className="eyebrow">ENQUIRY RECEIVED</p><h2>Your story<br /><em>begins here.</em></h2><p>We'll be in touch shortly on 088855 53460.</p><button className="text-link" onClick={() => setBookingOpen(false)}>Close window <X size={16} /></button></div>}</div></div>}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);