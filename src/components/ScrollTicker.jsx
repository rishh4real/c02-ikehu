import { motion, useScroll, useTransform } from "framer-motion";

const tickerText =
  "WHERE TALENT MEETS PURPOSE · IKEHU · THE TALENT EDIT · FOUNDER-LED · DELIBERATE · HUMAN · ";

export default function ScrollTicker() {
  const { scrollYProgress } = useScroll();
  const xLeft = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const xRight = useTransform(scrollYProgress, [0, 1], [-300, 0]);

  return (
    <section className="ticker-strip" data-cursor-theme="dark" aria-hidden="true">
      <motion.div className="ticker-row ticker-row-primary" style={{ x: xLeft }}>
        {Array.from({ length: 4 }).map((_, index) => (
          <span key={`primary-${index}`}>{tickerText}</span>
        ))}
      </motion.div>
      <motion.div className="ticker-row ticker-row-secondary" style={{ x: xRight }}>
        {Array.from({ length: 4 }).map((_, index) => (
          <span key={`secondary-${index}`}>{tickerText}</span>
        ))}
      </motion.div>
    </section>
  );
}
