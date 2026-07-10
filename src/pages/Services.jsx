import { motion } from "framer-motion";
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
      "CXO / Leadership / Business Critical Hiring",
      "Team Build-Up & Scaling",
      "Precision-driven, high-touch execution",
      "Guided Coaching Support during Onboarding",
    ],
    email: "svetleena@ikehu.in",
    subject: "Talent Search Enquiry",
  },
  {
    number: "02",
    title: "Talent Intelligence",
    summary: "Giving you a clear view of the market before you decide.",
    bullets: ["Market Mapping", "Compensation Benchmarking", "Talent Landscape Insights"],
    email: "svetleena@ikehu.in",
    subject: "Talent Intelligence Enquiry",
  },
  {
    number: "03",
    title: "Talent Partnering",
    summary: "Helping you think through what to hire, when, and why.",
    bullets: ["Org Design", "Hiring Strategy", "Leadership Assessment", "Scaling Teams"],
    email: "svetleena@ikehu.in",
    subject: "Talent Partnering Enquiry",
  },
];

const talentServices = [
  {
    number: "01",
    title: "Create Your Personal Brand",
    summary: "Helping your value and story become easier to see.",
    bullets: [
      "Brand Discovery: understanding who you are and what you want",
      "Identifying unique strengths, values, and skills that set you apart",
      "Crafting a compelling unified narrative across LinkedIn, social, and professional collaterals",
      "Helping articulate the work you have done beyond what shows on your CV",
    ],
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

const pageContent = {
  companies: {
    label: "For Companies",
    headlineOne: "For companies.",
    headlineTwo: "Build with care.",
    copy:
      "For Founders, Investors, CEOs, and Leadership Teams making critical hiring and organisational decisions.",
    items: companyServices,
    groupLabel: "How we help companies",
    previous: { href: "/about", label: "The Team" },
    next: { href: "/for-talent", label: "For Talent" },
    startLinks: [{ href: "/contact", label: "Get in touch" }],
  },
  talent: {
    label: "For Talent",
    headlineOne: "For talent.",
    headlineTwo: "Move with context.",
    copy:
      "For professionals navigating growth, change, reinvention, and the work they want to be known for.",
    items: talentServices,
    groupLabel: "How we help talent",
    previous: { href: "/for-companies", label: "For Companies" },
    next: { href: "/contact", label: "Contact" },
    startLinks: [{ href: "/contact", label: "Get in touch" }],
  },
};

function ServiceRow({ item, index }) {
  return (
    <motion.article
      className="services-row is-open is-static"
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease, delay: index * 0.1 }}
    >
      <div className="services-row-button">
        <span className="services-row-number">{item.number}</span>
        <span className="services-row-main">
          <span>{item.title}</span>
          <small>{item.summary}</small>
        </span>
      </div>

      <div className="services-row-panel">
        <div className={`services-row-panel-inner ${item.quote ? "" : "no-quote"}`}>
          <ul>
            {item.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          {item.quote && <blockquote>{item.quote}</blockquote>}
        </div>
      </div>
    </motion.article>
  );
}

function ServicesGroup({ label, items }) {
  return (
    <section className="services-list-section" data-cursor-theme="dark">
      <div className="services-shell">
        <SectionLabel>{label}</SectionLabel>
        <div className="services-accordion">
          {items.map((item, index) => (
            <ServiceRow key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Services({ audience = "companies" }) {
  const [solidHeader, setSolidHeader] = useState(false);
  const [scrambleEnabled, setScrambleEnabled] = useState(false);
  const page = pageContent[audience] || pageContent.companies;
  const headlineOne = useTextScramble(page.headlineOne, {
    duration: 900,
    interval: 35,
    enabled: scrambleEnabled,
  });
  const headlineTwo = useTextScramble(page.headlineTwo, {
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
          <NavLink href="/for-companies">For Companies</NavLink>
          <NavLink href="/for-talent">For Talent</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <NavLink href="/faq">FAQ</NavLink>
        </nav>
        <MobileNav />
      </header>

      <main>
        <section className="services-hero" data-cursor-theme="light">
          <div className="services-hero-inner">
            <p className="services-hero-label">{page.label}</p>
            <div>
              <h1>
                <ScrambleLine chars={headlineOne.output} />
                <ScrambleLine chars={headlineTwo.output} />
              </h1>
              <p>{page.copy}</p>
            </div>
          </div>
        </section>

        <ServicesGroup label={page.groupLabel} items={page.items} />

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
              {page.startLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label} &rarr;
                </a>
              ))}
            </div>
          </div>
        </motion.section>

        <div className="services-bottom-strip" data-cursor-theme="dark">
          <a href={page.previous.href}>&larr; {page.previous.label}</a>
          <a href={page.next.href}>{page.next.label} &rarr;</a>
        </div>
      </main>
    </motion.div>
  );
}
