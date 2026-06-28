import { AnimatePresence, motion, useInView, useMotionValue, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Preloader from "./components/Preloader.jsx";
import ScrollTicker from "./components/ScrollTicker.jsx";
import SocialLinks from "./components/SocialLinks.jsx";
import WordMorph from "./components/WordMorph.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import FAQ from "./pages/FAQ.jsx";
import Services from "./pages/Services.jsx";
import { useTextScramble } from "./hooks/useTextScramble.js";

const ease = [0.25, 0.1, 0.25, 1];

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
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease }}
    >
      {children}
    </motion.section>
  );
}

function LetterPolishHeading({ text }) {
  return <h2 className="story-polish-heading">{text}</h2>;
}

function WhyRow({ title, description, delay }) {
  return (
    <motion.article
      className="why-row"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, ease, delay }}
    >
      <h3>{title}</h3>
      <p>{description}</p>
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
  const lineOne = useTextScramble("where talent", {
    duration: 900,
    startDelay: 0,
    interval: 35,
    enabled: scrambleEnabled,
  });
  const lineTwo = useTextScramble("meets purpose.", {
    duration: 900,
    startDelay: 0,
    interval: 35,
    enabled: scrambleEnabled,
  });
  const heroRef = useRef(null);
  const footerRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.45 });
  const footerInView = useInView(footerRef, { amount: 0.25 });

  const normalizePath = (path) => {
    const normalized = path.replace(/\/+$|\/index\.html$/i, "") || "/";
    if (normalized === "/contact.html") return "/contact";
    if (normalized === "/faq.html") return "/faq";
    if (normalized === "/company.html") return "/about";
    if (normalized === "/offerings.html") return "/services";
    return normalized;
  };
  const [route, setRoute] = useState(normalizePath(window.location.pathname));
  const isAbout = route === "/about";
  const isFaq = route === "/faq";
  const isContact = route === "/contact";
  const isServices = route === "/services";

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
      const internalRoutes = new Set(["/", "/about", "/services", "/contact", "/faq"]);
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
    (isAbout || isFaq || isContact || isServices || (label.done && lineOne.done && lineTwo.done));

  return (
    <>
      <ScrollProgress />
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <AnimatePresence mode="wait">
        {isContact ? (
          <Contact key="contact" />
        ) : isServices ? (
          <Services key="services" />
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
              About
            </MagneticLink>
            <MagneticLink href="/services" onClick={navigate("/services")} className="nav-link">
              Services
            </MagneticLink>
            <MagneticLink href="/contact" onClick={navigate("/contact")} className="nav-link">
              Contact
            </MagneticLink>
            <MagneticLink href="/faq" onClick={navigate("/faq")} className="nav-link">
              FAQ
            </MagneticLink>
          </nav>
        </header>

        <main>
          <section className="hero-section" ref={heroRef} data-cursor-hidden>
            <div className="hero-inner">
              <div className="hero-copy-wrap">
                <AnimatedText chars={label.output} className="hero-label" />
                <div className="hero-copy">
                  <motion.p
                    className="hero-line"
                    initial={{ opacity: 0, y: 60 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2, ease }}
                  >
                    <AnimatedText chars={lineOne.output} />
                  </motion.p>
                  <motion.p
                    className="hero-line"
                    initial={{ opacity: 0, y: 60 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.55, ease }}
                  >
                    {startMorph ? (
                      <>
                        <span>meets </span>
                        <WordMorph start={startMorph} />
                      </>
                    ) : (
                      <AnimatedText chars={lineTwo.output} />
                    )}
                  </motion.p>
                </div>
              </div>
            </div>
          </section>

          <ScrollTicker />

          <FadeUpSection className="story-block story-what" data-cursor-theme="dark">
            <div className="story-grid">
              <div className="story-statement">
                <LetterPolishHeading text="Ikehu is a founder-led talent advisory firm built for founders, investors, and ambitious professionals who want hiring and career decisions to feel more deliberate, more human, and better informed." />
              </div>
              <div className="story-detail">
                <p>
                  We are not a large agency. We don't work with everyone. We work with the people
                  and companies where we can make a real difference.
                </p>
                <p>
                  For companies in build-up or transition mode. For talent navigating growth,
                  change, and reinvention.
                </p>
              </div>
            </div>
          </FadeUpSection>

          <FadeUpSection className="story-block story-why" data-cursor-theme="light">
            <div className="story-container">
              <p className="section-label">Why Ikehu</p>
              <h2 className="section-headline">
                Not a vendor.
                <br />
                A partner.
              </h2>
              <div className="why-list">
                <WhyRow
                  delay={0}
                  title="Relationships over process."
                  description="We build on deep relationships across industries, teams, and moments of change."
                />
                <WhyRow
                  delay={0.15}
                  title="Precision over volume."
                  description="We don't flood you with CVs. We bring you the right person, with context."
                />
                <WhyRow
                  delay={0.3}
                  title="Intelligence, not just search."
                  description="We help you understand the market before you decide, not after."
                />
              </div>
            </div>
          </FadeUpSection>

          <section className="story-block story-founder" data-cursor-theme="dark">
            <div className="story-founder-grid">
              <motion.div
                className="founder-copy"
                initial={{ opacity: 0, x: -56 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, ease }}
              >
                <p className="section-label founder-label">The Founder</p>
                <p className="founder-name">Svetleena</p>
                <p className="founder-title">Founder, Ikehu — The Talent Edit</p>
                <blockquote className="founder-quote">
                  I built Ikehu because I believe hiring and career decisions deserve more care,
                  more intelligence, and more honesty than the industry typically offers.
                </blockquote>
                <p className="founder-note">
                  Svetleena brings decades of executive search experience across startups,
                  investors, and leadership teams.
                </p>
                <MagneticLink href="/contact" onClick={navigate("/contact")} className="founder-cta" inline>
                  Get in Touch &rarr;
                </MagneticLink>
              </motion.div>

              <motion.div
                className="founder-visual"
                initial={{ opacity: 0, x: 56 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease }}
              >
                <img
                  src="/assets/svety.jpg"
                  alt="Svetleena portrait"
                  className="founder-photo"
                />
              </motion.div>
            </div>
          </section>
        </main>

        <footer ref={footerRef} className="site-footer-premium" data-cursor-theme="dark">
          <p>Ikehu</p>
          <SocialLinks className="footer-socials" />
          <div className="footer-mails">
            <a href="mailto:svetleena@ikehu.in">Svetleena@ikehu.in</a>
            <a href="mailto:abhigyan@ikehu.in">abhigyan@ikehu.in</a>
          </div>
          <p>&copy; 2026 Ikehu</p>
        </footer>
        <MagneticLink
          href="/contact"
          onClick={navigate("/contact")}
          className={`floating-cta ${footerInView ? "is-hidden" : ""}`}
          inline
        >
          Book a Meet
        </MagneticLink>
      </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
