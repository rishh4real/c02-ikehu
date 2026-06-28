import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import MobileNav from "../components/MobileNav.jsx";
import SocialLinks from "../components/SocialLinks.jsx";
import { useTextScramble } from "../hooks/useTextScramble.js";

const ease = [0.25, 0.1, 0.25, 1];

const whyItems = [
  {
    title: "Bandwidth Gap",
    description:
      "Startups and growth-stage businesses often struggle with strategic hiring bandwidth.",
  },
  {
    title: "Accessible Search",
    description: "Traditional search models are often inaccessible in terms of cost.",
  },
  {
    title: "People First",
    description:
      "Hiring is capability building and culture shaping. It is not transactional.",
  },
  {
    title: "Founder-Led",
    description: "Small is beautiful for us. A founder-led search firm, product first.",
  },
];

const workSteps = [
  {
    title: "Understand Deeply",
    description: "Business context, ambition, leadership style",
  },
  {
    title: "Build Thoughtfully",
    description: "Calibrated, high-touch search execution",
  },
  {
    title: "Partner Honestly",
    description: "Transparent conversations on what works",
  },
  {
    title: "Stay Human",
    description: "Candidates are people, not profiles",
  },
];

const whoWeWorkWith = [
  "Founder-led Businesses",
  "Growth Stage Start-Ups",
  "Investors & Portfolio Companies",
  "Teams Building Leadership Capability",
  "Businesses in Transition / Scale-Up Mode",
  "Mature Companies that need Fresh Talent",
];

const featuredExperience = [
  { name: "BharatPe", logo: "/assets/company-logos/bharatpe.png" },
  { name: "Razorpay", logo: "/assets/company-logos/razorpay.png" },
  { name: "Jubilant FoodWorks", logo: "/assets/company-logos/jubilant-foodworks.png" },
  { name: "Pidilite", logo: "/assets/company-logos/pidilite.png" },
  { name: "HT Media Group", logo: "/assets/company-logos/ht-media-group.png" },
  { name: "Dr. Reddy's", logo: "/assets/company-logos/dr-reddys.png" },
  { name: "Hotstar", logo: "/assets/company-logos/hotstar.png" },
  { name: "Schneider Electric", logo: "/assets/company-logos/schneider-electric.png" },
  { name: "Disney", logo: "/assets/company-logos/disney.png" },
  { name: "Star", logo: "/assets/company-logos/star.png" },
];

const additionalExperience = [
  "Fireside Ventures",
  "ChrysCapital",
  "Peak XV",
  "Philips",
  "Colgate",
  "Livguard",
  "Flipkart",
  "Kellanova",
  "Nicobar",
  "Kapiva",
  "Zomato",
  "Eureka Forbes",
  "Avery Dennison",
  "GeneClinix",
  "Pocket FM",
  "Baidyanath Vansaar",
  "Nexus Venture Partners",
  "Paytm",
  "AkzoNobel",
  "Kedaara",
  "Oliva",
  "Cargill",
  "Kohler",
  "Luxor",
  "Royal Enfield",
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

function FadeUpSection({ className = "", children }) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease }}
    >
      {children}
    </motion.section>
  );
}

function SectionLabel({ label, dark = false }) {
  return (
    <div className={`about-v2-section-label ${dark ? "is-dark" : ""}`}>
      <span>{label}</span>
      <div className="about-v2-section-line" />
    </div>
  );
}

function WhyItem({ title, description, delay }) {
  return (
    <motion.article
      className="about-v2-why-item"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease, delay }}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.article>
  );
}

function WorkStep({ index, title, description }) {
  return (
    <motion.article
      className="about-v2-step"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.55, ease, delay: index * 0.15 }}
    >
      <div className="about-v2-step-rail">
        <div className="about-v2-step-number">{index + 1}</div>
        {index < workSteps.length - 1 && <div className="about-v2-step-line" />}
      </div>
      <div className="about-v2-step-copy">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </motion.article>
  );
}

function LogoTile({ item, index }) {
  return (
    <motion.article
      className="about-v2-logo-card"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.4, ease, delay: index * 0.03 }}
    >
      <div className="about-v2-logo-box">
        <img src={item.logo} alt={`${item.name} logo`} className="about-v2-logo-image" />
      </div>
      <p>{item.name}</p>
    </motion.article>
  );
}

function CompanyChip({ name, index }) {
  return (
    <motion.span
      className="about-v2-company-chip"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.35, ease, delay: index * 0.025 }}
    >
      {name}
    </motion.span>
  );
}

function ScrambleLine({ chars }) {
  return (
    <span className="about-v2-scramble-line" aria-label={chars.join("")}>
      {chars.map((char, index) => (
        <span key={`${char}-${index}`} className="scramble-char">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function About() {
  const [solidHeader, setSolidHeader] = useState(false);
  const [ambitionEnabled, setAmbitionEnabled] = useState(false);
  const ambitionRef = useRef(null);
  const ambitionInView = useInView(ambitionRef, { once: true, amount: 0.45 });

  const ambitionLineOne = useTextScramble("To Become", {
    duration: 900,
    startDelay: 0,
    interval: 35,
    enabled: ambitionEnabled,
  });
  const ambitionLineTwo = useTextScramble("a Verb.", {
    duration: 900,
    startDelay: 150,
    interval: 35,
    enabled: ambitionEnabled,
  });

  useEffect(() => {
    const handleScroll = () => {
      setSolidHeader(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (ambitionInView) {
      setAmbitionEnabled(true);
    }
  }, [ambitionInView]);

  return (
    <motion.div
      className="about-v2-page"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease }}
    >
      <header className={`home-header about-header ${solidHeader ? "scrolled" : ""}`}>
        <a href="/" className="brand-mark">
          <span className="brand-text">Ikehu</span>
        </a>
        <nav className="main-nav">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <NavLink href="/faq">FAQ</NavLink>
        </nav>
        <MobileNav />
      </header>

      <main>
        <section className="about-v2-hero">
          <div className="about-v2-hero-inner">
            <p className="about-v2-hero-label">About</p>
            <div className="about-v2-hero-copy">
              <h1>
                We are Ikehu.
                <br />
                The Talent Edit.
              </h1>
              <p>
                A founder-led talent search and advisory firm. Built on relationships, run with
                intention.
              </p>
            </div>
          </div>
        </section>

        <FadeUpSection className="about-v2-person about-v2-person-svety">
          <div className="about-v2-person-grid">
            <motion.div
              className="about-v2-photo-wrap"
              initial={{ opacity: 0, x: -48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease }}
            >
              <img
                src="/assets/svety.jpg"
                alt="Svetleena portrait"
                className="about-v2-person-photo"
              />
            </motion.div>

            <motion.div
              className="about-v2-person-copy"
              initial={{ opacity: 0, x: 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease }}
            >
              <p className="about-v2-person-name is-yellow">I'm Svety.</p>
              <p className="about-v2-person-role">Founder, Ikehu</p>
              <a
                className="about-v2-profile-link"
                href="https://www.linkedin.com/in/svetleena-choudhary-4b25b94/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn Profile &rarr;
              </a>
              <div className="about-v2-stat-row">
                <span>25+ Years of Experience</span>
                <span>17+ Years in Talent &amp; Search</span>
              </div>
              <div className="about-v2-person-text">
                <p>
                  I proudly call myself a Search Value Alum — 17 years building leadership teams,
                  relationships, and talent strategy across industries and growth stages.
                </p>
                <p>
                  I&apos;ve placed talent across Business, Sales, Marketing, Operations, SCM, HR
                  and more — in India and internationally.
                </p>
                <p>
                  Before search, I worked in Advertising at Lintas and Marketing at adidas, where
                  I led Media &amp; CRM. That background shapes how I think about people, brands,
                  and fit.
                </p>
              </div>
            </motion.div>
          </div>
        </FadeUpSection>

        <FadeUpSection className="about-v2-person about-v2-person-abhigyan">
          <div className="about-v2-person-grid reverse">
            <motion.div
              className="about-v2-person-copy"
              initial={{ opacity: 0, x: -48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease }}
            >
              <p className="about-v2-person-name is-dark">I'm Abhigyan.</p>
              <p className="about-v2-person-role is-dark">Partner, Ikehu</p>
              <a
                className="about-v2-profile-link is-dark"
                href="https://www.linkedin.com/in/abhigyanshekhar/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn Profile &rarr;
              </a>
              <div className="about-v2-stat-row is-dark">
                <span>25+ Years of Experience</span>
                <span>10+ Years Entrepreneurial &amp; Operating</span>
              </div>
              <div className="about-v2-person-text is-dark">
                <p>
                  Abhigyan brings deep operator experience across Media, Digital, and Sports — with
                  stints at Google, Hotstar, Viacom18, Disney, World Sport Group, and GroupM (WPP
                  Media).
                </p>
                <p>
                  His expertise spans business leadership, revenue monetisation, digital
                  transformation, and starting up new ventures.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="about-v2-photo-wrap"
              initial={{ opacity: 0, x: 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease }}
            >
              <img
                src="/assets/abhigyan.jpg"
                alt="Abhigyan portrait"
                className="about-v2-person-photo about-v2-person-photo-abhigyan"
              />
            </motion.div>
          </div>
        </FadeUpSection>

        <FadeUpSection className="about-v2-why">
          <div className="about-v2-shell">
            <SectionLabel label="Why We Exist" />
            <div className="about-v2-why-grid">
              {whyItems.map((item, index) => (
                <WhyItem
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  delay={index * 0.15}
                />
              ))}
            </div>
          </div>
        </FadeUpSection>

        <FadeUpSection className="about-v2-work">
          <div className="about-v2-work-grid">
            <div className="about-v2-work-left">
              <h2>
                How
                <br />
                We
                <br />
                Work
              </h2>
            </div>
            <div className="about-v2-work-right">
              {workSteps.map((step, index) => (
                <WorkStep
                  key={step.title}
                  index={index}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </div>
        </FadeUpSection>

        <FadeUpSection className="about-v2-who">
          <div className="about-v2-shell">
            <SectionLabel label="Who We Work With" />
            <div className="about-v2-who-grid">
              {whoWeWorkWith.map((item) => (
                <div key={item} className="about-v2-who-item">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </FadeUpSection>

        <FadeUpSection className="about-v2-logos">
          <div className="about-v2-logos-inner">
            <p className="about-v2-logos-label">Over 17 Years, Svety Has Personally Hired For</p>
            <p className="about-v2-logos-note">
              These are Svety&apos;s personal past placements from previous role, not Ikehu clients.
            </p>
            <div className="about-v2-logo-grid">
              {featuredExperience.map((item, index) => (
                <LogoTile key={item.name} item={item} index={index} />
              ))}
            </div>
            <div className="about-v2-company-list">
              {additionalExperience.map((company, index) => (
                <CompanyChip key={company} name={company} index={index} />
              ))}
            </div>
          </div>
        </FadeUpSection>

        <section className="about-v2-ambition" ref={ambitionRef}>
          <motion.div
            className="about-v2-ambition-inner"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="about-v2-ambition-label">Ikehu&apos;s Ambition</p>
            <h2 className="about-v2-ambition-title">
              <ScrambleLine chars={ambitionLineOne.output} />
              <ScrambleLine chars={ambitionLineTwo.output} />
            </h2>
            <p className="about-v2-ambition-subline">Have you been Ikehu-ed?</p>
          </motion.div>
        </section>

        <section className="about-v2-contact-strip">
          <p className="about-v2-contact-heading">Would love to start the conversation</p>
          <div className="about-v2-contact-grid">
            <div className="about-v2-contact-person">
              <a href="mailto:svetleena@ikehu.in">svetleena@ikehu.in</a>
              <span>·</span>
              <a href="tel:+919971134096">+91 99711 34096</a>
              <span>·</span>
              <a
                href="https://www.linkedin.com/in/svetleena-choudhary-4b25b94/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
            <div className="about-v2-contact-person">
              <a href="mailto:abhigyan@ikehu.in">abhigyan@ikehu.in</a>
              <span>·</span>
              <a href="tel:+919811322327">+91 98113 22327</a>
              <span>·</span>
              <a
                href="https://www.linkedin.com/in/abhigyanshekhar/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        <div className="about-v2-bottom-strip">
          <a href="/" className="about-v2-bottom-link">
            &larr; Home
          </a>
          <a href="/services" className="about-v2-bottom-link">
            Services &rarr;
          </a>
        </div>

        <footer className="site-footer-premium" data-cursor-theme="dark">
          <p>Ikehu</p>
          <SocialLinks className="footer-socials" />
          <div className="footer-mails">
            <a href="mailto:svetleena@ikehu.in">Svetleena@ikehu.in</a>
            <a href="mailto:abhigyan@ikehu.in">abhigyan@ikehu.in</a>
          </div>
          <p>&copy; 2026 Ikehu</p>
        </footer>
      </main>
    </motion.div>
  );
}
