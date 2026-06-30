import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import MobileNav from "../components/MobileNav.jsx";
import { useTextScramble } from "../hooks/useTextScramble.js";

const ease = [0.25, 0.1, 0.25, 1];

const companyServices = [
  {
    number: "01",
    title: "Talent Search",
    summary: "Finding the right people for roles that really matter.",
    bullets: [
      "CXO / Leadership Hiring",
      "Team Build-Up & Scaling",
      "Precision-driven, high-touch execution",
      "Business-critical mandates",
    ],
    quote: "We don't flood you with CVs.\nWe bring you the right person,\nwith context.",
    cta: "Enquire about Talent Search",
    email: "svetleena@ikehu.in",
    subject: "Talent Search Enquiry",
  },
  {
    number: "02",
    title: "Talent Partnering",
    summary: "Helping you think through what to hire, when, and why.",
    bullets: ["Org Design", "Hiring Strategy", "Leadership Assessment", "Scaling Teams"],
    quote: "Sometimes that means running\na search. Sometimes it means\nstepping back first.",
    cta: "Enquire about Talent Partnering",
    email: "svetleena@ikehu.in",
    subject: "Talent Partnering Enquiry",
  },
  {
    number: "03",
    title: "Talent Intelligence",
    summary: "Giving you a clear view of the market before you decide.",
    bullets: ["Market Mapping", "Compensation Benchmarking", "Talent Landscape Insights"],
    quote: "Understand the market\nbefore you make decisions,\nnot after.",
    cta: "Enquire about Talent Intelligence",
    email: "svetleena@ikehu.in",
    subject: "Talent Intelligence Enquiry",
  },
];

const talentServices = [
  {
    number: "01",
    title: "Personal Brand",
    summary: "Before anything else, we spend time understanding you.",
    bullets: [
      "Brand Discovery - who you are, what you want",
      "Crafting your narrative across LinkedIn & collaterals",
      "Articulating what you've really done",
      "Unified messaging strategy",
    ],
    quote:
      "Most people have done far\nmore than what shows on\ntheir CV. It just hasn't been\narticulated well.",
    cta: "Talk to us about Personal Brand",
    email: "abhigyan@ikehu.in",
    subject: "Personal Brand Enquiry",
  },
  {
    number: "02",
    title: "Search Support",
    summary: "Identifying contexts where you will do your best work.",
    bullets: [
      "Identifying the right company, stage, mandate",
      "Calibrating opportunities against your strengths",
      "Connecting you selectively to teams we know deeply",
      "Only where there's genuine fit",
    ],
    quote: "Not the next title.\nThe right context.",
    cta: "Talk to us about Search Support",
    email: "abhigyan@ikehu.in",
    subject: "Search Support Enquiry",
  },
  {
    number: "03",
    title: "Coaching",
    summary: "Working through inflection points - growth, change, reinvention.",
    bullets: [
      "Navigating trade-offs across role, scope, compensation",
      "Acting as a sounding board for complex decisions",
      "Growth, change, and reinvention support",
      "When decisions are not straightforward",
    ],
    quote: "So the right people don't\nhave to work hard to see\nyour value or potential.",
    cta: "Talk to us about Coaching",
    email: "abhigyan@ikehu.in",
    subject: "Coaching Enquiry",
  },
];

function NavLink({ href, children }) {
  return (
    <motion.a
      href={href}
      className="nav-link"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.a>
  );
}

function ScrambleLine({ chars }) {
  return (
    <span className="services-scramble-line" aria-label={chars.join("")}>
      {chars.map((char, index) => (
        <span key={`${char}-${index}`} className="scramble-char">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="services-section-label">
      <span>{children}</span>
      <div />
    </div>
  );
}

function ServiceRow({ item, index, isOpen, onToggle }) {
  return (
    <motion.article
      className={`services-row ${isOpen ? "is-open" : ""}`}
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease, delay: index * 0.1 }}
    >
      <button className="services-row-button" type="button" onClick={onToggle}>
        <span className="services-row-number">{item.number}</span>
        <span className="services-row-main">
          <span>{item.title}</span>
          <small>{item.summary}</small>
        </span>
        <motion.span
          className="services-row-icon"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="services-row-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <div className="services-row-panel-inner">
              <ul>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <blockquote>{item.quote}</blockquote>
            </div>
            <a
              className="services-row-cta"
              href={`mailto:${item.email}?subject=${encodeURIComponent(item.subject)}`}
            >
              {item.cta} &rarr;
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function ServicesGroup({ label, items, openId, setOpenId, prefix }) {
  return (
    <section className="services-list-section" data-cursor-theme="dark">
      <div className="services-shell">
        <SectionLabel>{label}</SectionLabel>
        <div className="services-accordion">
          {items.map((item, index) => {
            const id = `${prefix}-${index}`;
            return (
              <ServiceRow
                key={item.title}
                item={item}
                index={index}
                isOpen={openId === id}
                onToggle={() => setOpenId(openId === id ? null : id)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  const [solidHeader, setSolidHeader] = useState(false);
  const [scrambleEnabled, setScrambleEnabled] = useState(false);
  const [openId, setOpenId] = useState("company-0");
  const headlineOne = useTextScramble("What we do.", {
    duration: 900,
    interval: 35,
    enabled: scrambleEnabled,
  });
  const headlineTwo = useTextScramble("How we help.", {
    duration: 900,
    startDelay: 140,
    interval: 35,
    enabled: scrambleEnabled,
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setScrambleEnabled(true), 150);
    const handleScroll = () => setSolidHeader(window.scrollY > 24);

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      className="services-page"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease }}
    >
      <header className={`home-header services-header ${solidHeader ? "scrolled" : ""}`}>
        <a href="/" className="brand-mark">
          <span className="brand-text">Ikehu</span>
        </a>
        <nav className="main-nav">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">The Team</NavLink>
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <NavLink href="/faq">FAQ</NavLink>
        </nav>
        <MobileNav />
      </header>

      <main>
        <section className="services-hero" data-cursor-theme="light">
          <div className="services-hero-inner">
            <p className="services-hero-label">Services</p>
            <div>
              <h1>
                <ScrambleLine chars={headlineOne.output} />
                <ScrambleLine chars={headlineTwo.output} />
              </h1>
              <p>
                We work across three areas for companies, and three areas for talent. High-touch,
                founder-friendly, and built around your specific context.
              </p>
            </div>
          </div>
        </section>

        <ServicesGroup
          label="For Companies"
          items={companyServices}
          openId={openId}
          setOpenId={setOpenId}
          prefix="company"
        />

        <section className="services-ticker" data-cursor-theme="light">
          <div className="services-ticker-track">
            {Array.from({ length: 4 }).map((_, index) => (
              <span key={index}>
                FOR COMPANIES · TALENT SEARCH · TALENT PARTNERING · TALENT INTELLIGENCE · FOR
                TALENT · PERSONAL BRAND · SEARCH SUPPORT · COACHING ·
              </span>
            ))}
          </div>
        </section>

        <ServicesGroup
          label="For Talent"
          items={talentServices}
          openId={openId}
          setOpenId={setOpenId}
          prefix="talent"
        />

        <motion.section
          className="services-start"
          data-cursor-theme="light"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="services-start-inner">
            <h2>
              Not sure where
              <br />
              to start?
            </h2>
            <p>
              Most people aren&apos;t. That&apos;s fine. Just reach out and tell us where you are.
              We&apos;ll figure out the rest together.
            </p>
            <div className="services-start-actions">
              <a href="mailto:svetleena@ikehu.in?subject=Getting%20Started%20-%20Company">
                I&apos;m a Company &rarr;
              </a>
              <a href="mailto:abhigyan@ikehu.in?subject=Getting%20Started%20-%20Talent">
                I&apos;m Talent &rarr;
              </a>
            </div>
          </div>
        </motion.section>

        <div className="services-bottom-strip" data-cursor-theme="dark">
          <a href="/about">&larr; The Team</a>
          <a href="/contact">Contact &rarr;</a>
        </div>
      </main>
    </motion.div>
  );
}
