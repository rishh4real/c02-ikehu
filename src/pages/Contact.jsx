import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import MobileNav from "../components/MobileNav.jsx";
import SocialLinks from "../components/SocialLinks.jsx";
import { useTextScramble } from "../hooks/useTextScramble.js";

const ease = [0.25, 0.1, 0.25, 1];

const emptyHiring = {
  name: "",
  company: "",
  role: "",
  message: "",
};

const emptyTalent = {
  name: "",
  background: "",
  message: "",
};

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
    <span className="contact-scramble-line" aria-label={chars.join("")}>
      {chars.map((char, index) => (
        <span key={`${char}-${index}`} className="scramble-char">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

function ContactForm({ type }) {
  const isHiring = type === "hiring";
  const [formData, setFormData] = useState(isHiring ? emptyHiring : emptyTalent);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: false }));
  };

  const flashErrors = (nextErrors) => {
    setErrors(nextErrors);
    window.setTimeout(() => setErrors({}), 900);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        nextErrors[key] = true;
      }
    });

    if (Object.keys(nextErrors).length) {
      flashErrors(nextErrors);
      return;
    }

    const email = isHiring ? "svetleena@ikehu.in" : "abhigyan@ikehu.in";
    const subject = isHiring
      ? `Hiring Enquiry from ${formData.name} - ${formData.company}`
      : `Talent Enquiry from ${formData.name}`;
    const body = isHiring
      ? `Name: ${formData.name}\nCompany: ${formData.company}\nRole: ${formData.role}\n\nDetails: ${formData.message}`
      : `Name: ${formData.name}\nBackground: ${formData.background}\n\nLooking for: ${formData.message}`;

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormData(isHiring ? emptyHiring : emptyTalent);
    setErrors({});
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        className={`contact-input ${errors.name ? "has-error" : ""}`}
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
      />

      {isHiring ? (
        <>
          <input
            className={`contact-input ${errors.company ? "has-error" : ""}`}
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
          />
          <input
            className={`contact-input ${errors.role ? "has-error" : ""}`}
            type="text"
            name="role"
            placeholder="Role you're hiring for"
            value={formData.role}
            onChange={handleChange}
          />
        </>
      ) : (
        <input
          className={`contact-input ${errors.background ? "has-error" : ""}`}
          type="text"
          name="background"
          placeholder="Current Role / Background"
          value={formData.background}
          onChange={handleChange}
        />
      )}

      <textarea
        className={`contact-input contact-textarea ${errors.message ? "has-error" : ""}`}
        name="message"
        placeholder={isHiring ? "Tell us more" : "What you're looking for"}
        value={formData.message}
        onChange={handleChange}
      />

      <button className="contact-submit" type="submit">
        Send Enquiry &rarr;
      </button>
    </form>
  );
}

export default function Contact() {
  const [solidHeader, setSolidHeader] = useState(false);
  const [scrambleEnabled, setScrambleEnabled] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const headlineOne = useTextScramble("Let's start a", {
    duration: 900,
    interval: 35,
    enabled: scrambleEnabled,
  });
  const headlineTwo = useTextScramble("conversation.", {
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
      className="contact-page"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease }}
    >
      <header className={`home-header contact-header ${solidHeader ? "scrolled" : ""}`}>
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
        <section className="contact-hero" data-cursor-theme="light">
          <div className="contact-hero-inner">
            <p className="contact-hero-label">Contact</p>
            <div className="contact-hero-copy-wrap">
              <h1 className="contact-hero-headline">
                <ScrambleLine chars={headlineOne.output} />
                <ScrambleLine chars={headlineTwo.output} />
              </h1>
              <p className="contact-hero-copy">
                No forms that go nowhere. No automated responses.
                <br />
                Just a real conversation.
              </p>
            </div>
          </div>
        </section>

        <section className="contact-paths" data-cursor-theme="dark">
          <motion.div
            className="contact-path"
            initial={{ opacity: isMobile ? 1 : 0, x: isMobile ? -20 : -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="contact-path-label">For Companies</p>
            <h2>
              Looking to build
              <br />
              your team?
            </h2>
            <p className="contact-path-copy">
              Tell us about your company, the role, and what you&apos;re trying to build.
              We&apos;ll take it from there.
            </p>
            <ContactForm type="hiring" />
          </motion.div>

          <div className="contact-path-divider" />

          <motion.div
            className="contact-path"
            initial={{ opacity: isMobile ? 1 : 0, x: isMobile ? 20 : 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="contact-path-label">For Talent</p>
            <h2>
              Looking for your
              <br />
              next move?
            </h2>
            <p className="contact-path-copy">
              Tell us where you are and where you want to go. We&apos;ll help you figure out the
              rest.
            </p>
            <ContactForm type="talent" />
          </motion.div>
        </section>

        <section className="contact-direct" data-cursor-theme="light">
          <p className="contact-direct-label">Or Reach Us Directly</p>
          <div className="contact-direct-grid">
            <motion.div
              className="contact-person"
              initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 16 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease }}
            >
              <h3>Svetleena</h3>
              <p className="contact-role">Founder</p>
              <a href="mailto:svetleena@ikehu.in">svetleena@ikehu.in</a>
              <a href="tel:+919971134096">+91 99711 34096</a>
              <a
                href="https://www.linkedin.com/in/svetleena-choudhary-4b25b94/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn Profile &rarr;
              </a>
            </motion.div>

            <div className="contact-direct-divider" />

            <motion.div
              className="contact-person"
              initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 16 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease, delay: 0.2 }}
            >
              <h3>Abhigyan</h3>
              <p className="contact-role">Partner</p>
              <a href="mailto:abhigyan@ikehu.in">abhigyan@ikehu.in</a>
              <a href="tel:+919811322327">+91 98113 22327</a>
              <a
                href="https://www.linkedin.com/in/abhigyanshekhar/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn Profile &rarr;
              </a>
            </motion.div>
          </div>
        </section>

        <motion.section
          className="contact-find"
          data-cursor-theme="dark"
          initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 20 : 42 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="contact-find-col">
            <p className="contact-find-label">Follow Us</p>
            <h2>Stay in the loop.</h2>
            <p>
              We share thoughts on talent, hiring, and leadership across our social channels.
            </p>
            <SocialLinks className="contact-socials" showLabels />
          </div>

          <div className="contact-find-col">
            <p className="contact-find-label">Ikehu&apos;s Ambition</p>
            <h2>
              To become
              <br />
              a verb.
            </h2>
            <p>Have you been Ikehu-ed?</p>
          </div>
        </motion.section>

        <div className="contact-bottom-strip" data-cursor-theme="dark">
          <a href="/for-talent">&larr; For Talent</a>
          <a href="/faq">FAQ &rarr;</a>
        </div>
      </main>
    </motion.div>
  );
}
