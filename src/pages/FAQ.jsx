import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import MobileNav from "../components/MobileNav.jsx";
import { useTextScramble } from "../hooks/useTextScramble.js";

const ease = [0.25, 0.1, 0.25, 1];

const faqData = {
  general: [
    {
      q: "What is Ikehu?",
      a: "Ikehu is a Founder-led talent advisory firm built for Founders, Investors, and Professionals. We operate at the intersection of search, strategic advisory, and talent intelligence.",
    },
    {
      q: "Who are the people behind Ikehu?",
      a: "Ikehu is led by Svetleena and Abhigyan, supported by a team. The work is high-touch and deeply involved.",
    },
    {
      q: "Is Ikehu a large agency?",
      a: "No — and intentionally so. We work with a select number of clients at any given time. Small is beautiful for us. Founder-led, high-touch, product first.",
    },
    {
      q: "Where is Ikehu based?",
      a: "We are based in Gurugram, India, and are open to working with people and companies worldwide.",
    },
  ],
  companies: [
    {
      q: "What kind of roles does Ikehu help hire for?",
      a: "We focus on CXO / Leadership / Business Critical Hiring, team build-up, scaling, and guided coaching support during onboarding. Precision-driven and high-touch, not high-volume.",
    },
    {
      q: "What makes Ikehu different from a traditional search firm?",
      a: "We work closely with you as partners — sometimes running a search, sometimes helping you define what's actually needed first.",
    },
    {
      q: "Do you also work with early-stage startups?",
      a: "Yes. We love to work with Founder-led businesses, Growth-stage Startups, and Companies in transition or scale-up mode.",
    },
    {
      q: "How do we get started?",
      a: "Reach out via our contact page or email svetleena@ikehu.in / abhigyan@ikehu.in. We start with a conversation — no forms, no pitches.",
    },
  ],
  talent: [
    {
      q: "I'm a professional looking for my next role. Can Ikehu help?",
      a: "Yes. We work with professionals navigating growth, change, and reinvention — helping identify the right context, not just the next title.",
    },
    {
      q: "Can you help me in building my personal brand?",
      a: "Yes, we can. Connect with us to know more.",
    },
    {
      q: "How do I get in touch?",
      a: "Email svetleena@ikehu.in / abhigyan@ikehu.in or reach out via our contact page.",
    },
  ],
};

const categories = ["general", "companies", "talent"];
const categoryLabels = {
  general: "General",
  companies: "For Companies",
  talent: "For Talent",
};

function ScrambleLine({ chars }) {
  return (
    <span className="faq-scramble-line" aria-label={chars.join("")}>
      {chars.map((char, index) => (
        <span key={`${char}-${index}`} className="scramble-char">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

function AccordionItem({ question, answer, index, isOpen, onToggle }) {
  return (
    <div className="faq-item">
      <button
        className="faq-question"
        onClick={onToggle}
        style={{ color: isOpen ? "var(--yellow)" : "var(--off-white)" }}
      >
        <span>{question}</span>
        <span className="faq-toggle" style={{ color: "var(--yellow)" }}>
          {isOpen ? "×" : "+"}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [activeTab, setActiveTab] = useState("general");
  const [openIdx, setOpenIdx] = useState(null);
  const [scrollHeader, setScrollHeader] = useState(false);
  const [scrambleEnabled, setScrambleEnabled] = useState(false);
  const headline = useTextScramble("Questions we get asked.", {
    duration: 850,
    interval: 32,
    enabled: scrambleEnabled,
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setScrambleEnabled(true), 120);
    const handleScroll = () => setScrollHeader(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const currentFaqs = faqData[activeTab] || [];

  return (
    <div className="faq-page">
      <header className={`home-header faq-header ${scrollHeader ? "scrolled" : ""}`}>
        <a href="/" className="brand-mark">
          <span className="brand-text">Ikehu</span>
        </a>
        <nav className="main-nav">
          <a className="nav-link" href="/">Home</a>
          <a className="nav-link" href="/about">The Team</a>
          <a className="nav-link" href="/for-companies">For Companies</a>
          <a className="nav-link" href="/for-talent">For Talent</a>
          <a className="nav-link" href="/contact">Contact</a>
          <a className="nav-link" href="/faq">FAQ</a>
        </nav>
        <MobileNav />
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="faq-hero" style={{ background: "var(--yellow)" }}>
          <div className="faq-hero-inner">
            <p className="faq-hero-label">FAQ</p>
            <h1 className="faq-hero-headline">
              <ScrambleLine chars={headline.output} />
            </h1>
            <p className="faq-hero-copy">
              If you don't find what you're looking for, just reach out.
            </p>
          </div>
        </section>

        {/* FAQ CONTENT SECTION */}
        <section className="faq-content" style={{ background: "var(--black)" }}>
          {/* CATEGORY TABS */}
          <div className="faq-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`faq-tab ${activeTab === cat ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(cat);
                  setOpenIdx(null);
                }}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>

          {/* ACCORDION */}
          <motion.div
            className="faq-accordion"
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {currentFaqs.map((item, idx) => (
              <AccordionItem
                key={idx}
                question={item.q}
                answer={item.a}
                index={idx}
                isOpen={openIdx === idx}
                onToggle={() => setOpenIdx(openIdx === idx ? null : idx)}
              />
            ))}
          </motion.div>
        </section>

        {/* BOTTOM CTA STRIP */}
        <section className="faq-cta" style={{ background: "var(--yellow)" }}>
          <h2 className="faq-cta-headline">Still have questions?</h2>
          <p className="faq-cta-subline">
            We'd love to talk. No pitch, just a conversation.
          </p>
          <div className="faq-cta-links">
            <a
              href="mailto:svetleena@ikehu.in,abhigyan@ikehu.in"
              className="faq-cta-link"
            >
              Email us: Svetleena / Abhigyan →
            </a>
            <a href="/contact" className="faq-cta-link">
              Go to Contact →
            </a>
          </div>
        </section>

        {/* PAGE NAVIGATION STRIP */}
        <div className="faq-nav-strip" style={{ background: "var(--black)" }}>
          <a href="/contact" className="faq-nav-link">← Contact</a>
          <a href="/" className="faq-nav-link">Home →</a>
        </div>
      </main>
    </div>
  );
}
