import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const DEFAULT_WORDS = ["purpose.", "people.", "potential.", "precision."];
const ease = [0.25, 0.1, 0.25, 1];

export default function WordMorph({
  start = false,
  targetWords,
  triggerOnMount = false,
  live = false,
}) {
  const words = targetWords?.length ? targetWords : DEFAULT_WORDS;
  const shouldStart = start || triggerOnMount;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!shouldStart || words.length < 2) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, 2500);

    return () => window.clearInterval(timer);
  }, [shouldStart, words.length]);

  return (
    <span className={`word-morph-shell ${live ? "is-live" : ""}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className="word-morph-word"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: live ? 0.58 : 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
