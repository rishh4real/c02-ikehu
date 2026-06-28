import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const WORDS = ["purpose.", "people.", "potential.", "precision."];
const ease = [0.25, 0.1, 0.25, 1];

export default function WordMorph({ start = false }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!start) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % WORDS.length);
    }, 2500);

    return () => window.clearInterval(timer);
  }, [start]);

  return (
    <span className="word-morph-shell">
      <AnimatePresence mode="wait">
        <motion.span
          key={WORDS[index]}
          className="word-morph-word"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
