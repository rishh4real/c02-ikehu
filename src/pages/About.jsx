import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import MobileNav from "../components/MobileNav.jsx";
import SocialLinks from "../components/SocialLinks.jsx";
import { useTextScramble } from "../hooks/useTextScramble.js";

const ease = [0.25, 0.1, 0.25, 1];

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
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <motion.section
      className={className}
      initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 20 : 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease }}
    >
      {children}
    </motion.section>
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
  const [heroEnabled, setHeroEnabled] = useState(false);
  const [ambitionEnabled, setAmbitionEnabled] = useState(false);
  const ambitionRef = useRef(null);
  const ambitionInView = useInView(ambitionRef, { once: true, amount: 0.45 });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const heroLineOne = useTextScramble("We are Ikehu.", {
    duration: 900,
    startDelay: 0,
    interval: 35,
    enabled: heroEnabled,
  });
  const heroLineTwo = useTextScramble("The Talent Edit.", {
    duration: 900,
    startDelay: 140,
    interval: 35,
    enabled: heroEnabled,
  });
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
    const timer = window.setTimeout(() => setHeroEnabled(true), 150);
    const handleScroll = () => {
      setSolidHeader(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
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
          <NavLink href="/about">The Team</NavLink>
          <NavLink href="/for-companies">For Companies</NavLink>
          <NavLink href="/for-talent">For Talent</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <NavLink href="/faq">FAQ</NavLink>
        </nav>
        <MobileNav />
      </header>

      <main>
        <section className="about-v2-hero">
          <div className="about-v2-hero-inner">
            <p className="about-v2-hero-label">The Team</p>
            <div className="about-v2-hero-copy">
              <h1>
                <ScrambleLine chars={heroLineOne.output} />
                <ScrambleLine chars={heroLineTwo.output} />
              </h1>
              <p>
                Building teams is personal. We treat it that way. Ikehu is a boutique talent
                advisory firm partnering with companies to build thought, leadership and teams.
              </p>
            </div>
          </div>
        </section>

        <FadeUpSection className="about-v2-person about-v2-person-svety">
          <div className="about-v2-person-grid">
            <motion.div
              className="about-v2-photo-wrap"
              initial={{ opacity: isMobile ? 1 : 0, x: isMobile ? -20 : -48 }}
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
              initial={{ opacity: isMobile ? 1 : 0, x: isMobile ? 20 : 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease }}
            >
              <p className="about-v2-person-name is-yellow">
                I&apos;m{" "}
                <a
                  href="https://www.linkedin.com/in/svetleena-choudhary-4b25b94/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Svetleena
                </a>
                . Call me Svety.
              </p>
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
              </div>
              <div className="about-v2-person-text">
                <p>
                  Building leadership teams and critical hires across Business, Sales, Marketing,
                  Operations, SCM, HR and more — in India and internationally.
                </p>
                <p>
                  I am a certified coach and believe getting to know yourself is the most
                  fascinating experience.
                </p>
                <p>
                  Love writing, run an entrepreneurial food business on the side. Love cooking
                  &amp; feeding. Have more than one story for my name.
                </p>
              </div>
            </motion.div>
          </div>
        </FadeUpSection>

        <FadeUpSection className="about-v2-person about-v2-person-abhigyan">
          <div className="about-v2-person-grid reverse">
            <motion.div
              className="about-v2-person-copy"
              initial={{ opacity: isMobile ? 1 : 0, x: isMobile ? -20 : -48 }}
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
                <span>Operating &amp; Entrepreneurial, Digital Evangelist</span>
              </div>
              <div className="about-v2-person-text is-dark">
                <p>
                  Deep operator experience across Media, Digital, and Sports. With stints at
                  Google, Jio Hotstar, World Sport Group, and GroupM (WPP Media).
                </p>
                <p>
                  Am a magic realist. Exploring food, culture and technology in this world. I
                  also run a sports business called Zupotsu. Can play and watch sports anytime,
                  sometimes together.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="about-v2-photo-wrap"
              initial={{ opacity: isMobile ? 1 : 0, x: isMobile ? 20 : 48 }}
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

        <FadeUpSection className="about-v2-person about-v2-person-lucky">
          <div className="about-v2-person-grid">
            <motion.div
              className="about-v2-photo-wrap"
              initial={{ opacity: isMobile ? 1 : 0, x: isMobile ? -20 : -48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease }}
            >
              <img
                src="/assets/lucky-pandey.png"
                alt="Lucky Pandey portrait"
                className="about-v2-person-photo about-v2-person-photo-lucky"
              />
            </motion.div>

            <motion.div
              className="about-v2-person-copy"
              initial={{ opacity: isMobile ? 1 : 0, x: isMobile ? 20 : 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease }}
            >
              <p className="about-v2-person-name is-yellow">I&apos;m Lucky.</p>
              <p className="about-v2-person-role">Research Associate</p>
              <a
                className="about-v2-profile-link"
                href="https://www.linkedin.com/in/lucky-pandey-55a6a747/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn Profile &rarr;
              </a>
              <div className="about-v2-person-text">
                <p>
                  Ikehu is my second coming. I have returned to work after some years of a break I
                  took for my child.
                </p>
                <p>I believe in second chances, opportunity and research.</p>
                <p>Love baking, dancing and travelling.</p>
              </div>
            </motion.div>
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

        <div className="about-v2-bottom-strip">
          <a href="/" className="about-v2-bottom-link">
            &larr; Home
          </a>
          <a href="/for-companies" className="about-v2-bottom-link">
            For Companies &rarr;
          </a>
        </div>

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
          <p>&copy; 2026 Ikehu Consult LLP</p>
        </footer>
      </main>
    </motion.div>
  );
}
