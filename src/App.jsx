import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import MobileNav from "./components/MobileNav.jsx";
import Preloader from "./components/Preloader.jsx";
import SocialLinks from "./components/SocialLinks.jsx";
import WordMorph from "./components/WordMorph.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import FAQ from "./pages/FAQ.jsx";
import Services from "./pages/Services.jsx";
import { useTextScramble } from "./hooks/useTextScramble.js";

const ease = [0.25, 0.1, 0.25, 1];

const homeWhyItems = [
  {
    title: "We Build For You",
    description:
      "We stay close to the business, the context, and the people so every search is shaped around what you are building.",
  },
  {
    title: "Insights, not just Search.",
    description: "We help you understand the market before you decide, not after.",
  },
];

const homeWorkSteps = [
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

const homeWhoItems = [
  "Founder-led Businesses",
  "Growth Stage Start-Ups",
  "Investors & Portfolio Companies",
  "Teams Building Leadership Capability",
  "Businesses in Transition / Scale-Up Mode",
  "Mature Companies that need Fresh Talent",
];

function MagneticLink({ href, className, children, inline = false, onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)");
    if (!mediaQuery.matches) {
      x.set(0);
      y.set(0);
      return undefined;
    }

    const handleMove = (event) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance < 80) {
        x.set(Math.max(-10, Math.min(10, dx * 0.15)));
        y.set(Math.max(-10, Math.min(10, dy * 0.15)));
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const reset = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("mousemove", handleMove);
    element.addEventListener("mouseleave", reset);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      element.removeEventListener("mouseleave", reset);
    };
  }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      className={className}
      data-cursor-hover="true"
      style={{
        x: springX,
        y: springY,
        display: inline ? "inline-flex" : undefined,
      }}
    >
      {children}
    </motion.a>
  );
}

function AnimatedText({ chars, className = "" }) {
  return (
    <span className={className} aria-label={chars.join("")}>
      {chars.map((char, index) => (
        <span key={`${char}-${index}`} className="scramble-char">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

function FadeUpSection({ className = "", children }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <motion.section
      className={className}
      initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 20 : 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease }}
    >
      {children}
    </motion.section>
  );
}

function HomeSectionLabel({ label, dark = false }) {
  return (
    <div className={`about-v2-section-label ${dark ? "is-dark" : ""}`}>
      <span>{label}</span>
      <div className="about-v2-section-line" />
    </div>
  );
}

function HomeWhyItem({ title, description, delay }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <motion.article
      className="about-v2-why-item"
      initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 16 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease, delay }}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.article>
  );
}

function HomeWorkStep({ index, title, description }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <motion.article
      className="about-v2-step"
      initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 16 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.55, ease, delay: index * 0.15 }}
    >
      <div className="about-v2-step-rail">
        <div className="about-v2-step-number">{index + 1}</div>
        {index < homeWorkSteps.length - 1 && <div className="about-v2-step-line" />}
      </div>
      <div className="about-v2-step-copy">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </motion.article>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [startMorph, setStartMorph] = useState(false);
  const [scrambleEnabled, setScrambleEnabled] = useState(false);
  const label = useTextScramble("THE TALENT EDIT", {
    duration: 900,
    startDelay: 0,
    interval: 35,
    enabled: scrambleEnabled,
  });
  const lineOne = useTextScramble("We", {
    duration: 900,
    startDelay: 0,
    interval: 35,
    enabled: scrambleEnabled,
  });
  const lineTwo = useTextScramble("are listening", {
    duration: 900,
    startDelay: 0,
    interval: 35,
    enabled: scrambleEnabled,
  });
  const normalizePath = (path) => {
    const normalized = path.replace(/\/+$|\/index\.html$/i, "") || "/";
    if (normalized === "/contact.html") return "/contact";
    if (normalized === "/faq.html") return "/faq";
    if (normalized === "/company.html") return "/about";
    if (normalized === "/offerings.html" || normalized === "/services") return "/for-companies";
    return normalized;
  };
  const [route, setRoute] = useState(normalizePath(window.location.pathname));
  const isAbout = route === "/about";
  const isFaq = route === "/faq";
  const isContact = route === "/contact";
  const isForCompanies = route === "/for-companies";
  const isForTalent = route === "/for-talent";

  useEffect(() => {
    const handlePopstate = () => setRoute(normalizePath(window.location.pathname));
    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
  }, []);

  const performNavigate = (href) => {
    const next = normalizePath(href);
    if (next === route) return;
    window.history.pushState({}, "", next);
    setRoute(next);
    window.scrollTo(0, 0);
  };

  const navigate = (href) => (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    performNavigate(href);
  };

  useEffect(() => {
    const handleInternalClick = (event) => {
      const link = event.target.closest?.("a[href]");
      if (!link || link.target || link.hasAttribute("download")) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) {
        return;
      }

      const url = new URL(href, window.location.origin);
      if (url.origin !== window.location.origin) return;

      const next = normalizePath(url.pathname);
      const internalRoutes = new Set([
        "/",
        "/about",
        "/for-companies",
        "/for-talent",
        "/services",
        "/contact",
        "/faq",
      ]);
      if (!internalRoutes.has(next)) return;

      event.preventDefault();
      performNavigate(next);
    };

    document.addEventListener("click", handleInternalClick);
    return () => document.removeEventListener("click", handleInternalClick);
  }, [route]);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      setScrambleEnabled(true);
    }
    return undefined;
  }, [loading]);

  useEffect(() => {
    if (!loading && lineTwo.done && !startMorph) {
      setStartMorph(true);
    }
  }, [loading, lineTwo.done, startMorph]);

  const headerVisible =
    !loading &&
    (isAbout ||
      isFaq ||
      isContact ||
      isForCompanies ||
      isForTalent ||
      (label.done && lineOne.done && lineTwo.done));

  return (
    <>
      <ScrollProgress />
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <AnimatePresence mode="wait">
        {isContact ? (
          <Contact key="contact" />
        ) : isForCompanies ? (
          <Services key="for-companies" audience="companies" />
        ) : isForTalent ? (
          <Services key="for-talent" audience="talent" />
        ) : isFaq ? (
          <FAQ key="faq" />
        ) : isAbout ? (
          <About key="about" />
        ) : (
          <motion.div
            key="home"
            className="home-page"
            style={{ visibility: loading ? "hidden" : "visible" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: loading ? 0 : 1, y: loading ? 24 : 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.45, ease }}
          >
            <header
              className="home-header"
              data-cursor-theme="light"
              style={{
                opacity: headerVisible ? 1 : 0,
                pointerEvents: headerVisible ? "auto" : "none",
                transition: "opacity 0.35s ease",
              }}
            >
          <MagneticLink href="/" className="brand-mark" onClick={navigate("/")}>
            <span className="brand-text">Ikehu</span>
          </MagneticLink>
          <nav className="main-nav">
            <MagneticLink href="/" onClick={navigate("/")} className="nav-link">
              Home
            </MagneticLink>
            <MagneticLink href="/about" onClick={navigate("/about")} className="nav-link">
              The Team
            </MagneticLink>
            <MagneticLink
              href="/for-companies"
              onClick={navigate("/for-companies")}
              className="nav-link"
            >
              For Companies
            </MagneticLink>
            <MagneticLink
              href="/for-talent"
              onClick={navigate("/for-talent")}
              className="nav-link"
            >
              For Talent
            </MagneticLink>
            <MagneticLink href="/contact" onClick={navigate("/contact")} className="nav-link">
              Contact
            </MagneticLink>
            <MagneticLink href="/faq" onClick={navigate("/faq")} className="nav-link">
              FAQ
            </MagneticLink>
          </nav>
          <MobileNav />
        </header>

        <main>
          <section className="hero-section" data-cursor-hidden>
            <div className="hero-inner">
              <div className="hero-copy-wrap">
                <AnimatedText chars={label.output} className="hero-label" />
                <div className="hero-copy">
                  <motion.p
                    className="hero-line hero-line-single"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease }}
                  >
                    <AnimatedText chars={lineOne.output} />
                    <span className="hero-inline-space"> </span>
                    {startMorph ? (
                      <WordMorph
                        start={startMorph}
                        targetWords={["are listening", "are here", "understand"]}
                        live
                      />
                    ) : (
                      <AnimatedText chars={lineTwo.output} />
                    )}
                  </motion.p>
                </div>
              </div>
            </div>
          </section>

          <FadeUpSection className="story-block story-what" data-cursor-theme="dark">
            <div className="story-grid">
              <div className="story-statement">
                <h2>
                  At Ikehu, we&apos;re not building Search as a business. We are viewing it with a
                  strong Product lens.
                </h2>
              </div>
              <div className="story-detail">
                <p>
                  One that is founder-led, deeply involved, and genuinely invested in helping
                  businesses build capability, culture, and leadership.
                </p>
                <p>
                  We work with fewer clients but would love to work in depth with them.
                </p>
                <p>
                  We work at the intersection of executive search, talent advisory, and talent
                  intelligence, partnering with Business Owners, CEOs, and leadership teams on
                  critical hiring and organizational decisions.
                </p>
              </div>
            </div>
          </FadeUpSection>

          <FadeUpSection className="about-v2-why home-team-section home-team-section-yellow">
            <div className="about-v2-shell">
              <HomeSectionLabel label="Why We Work" dark />
              <div className="about-v2-why-grid">
                {homeWhyItems.map((item, index) => (
                  <HomeWhyItem
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    delay={index * 0.15}
                  />
                ))}
              </div>
            </div>
          </FadeUpSection>

          <FadeUpSection className="about-v2-work home-team-section home-team-section-black">
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
                {homeWorkSteps.map((step, index) => (
                  <HomeWorkStep
                    key={step.title}
                    index={index}
                    title={step.title}
                    description={step.description}
                  />
                ))}
              </div>
            </div>
          </FadeUpSection>

          <FadeUpSection className="about-v2-who home-team-section home-team-section-yellow">
            <div className="about-v2-shell">
              <HomeSectionLabel label="Who We Work With" dark />
              <div className="about-v2-who-grid">
                {homeWhoItems.map((item) => (
                  <div key={item} className="about-v2-who-item">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </FadeUpSection>

        </main>

        <footer className="site-footer-premium" data-cursor-theme="dark">
          <p>Ikehu</p>
          <SocialLinks className="footer-socials" />
          <div className="footer-contacts">
            <div>
              <strong>Svetleena</strong>
              <a href="mailto:svetleena@ikehu.in">svetleena@ikehu.in</a>
              <a href="tel:+919971134096">+91 99711 34096</a>
              <a
                href="https://www.linkedin.com/in/svetleena-choudhary-4b25b94/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
            <div>
              <strong>Abhigyan</strong>
              <a href="mailto:abhigyan@ikehu.in">abhigyan@ikehu.in</a>
              <a href="tel:+919811322327">+91 98113 22327</a>
              <a
                href="https://www.linkedin.com/in/abhigyanshekhar/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <p>&copy; 2026 Ikehu</p>
        </footer>
      </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
