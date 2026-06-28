import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const logo = "/assets/ikehu-logo-transparent.png";

export default function Preloader({ onComplete }) {
  const curtainEase = [0.76, 0, 0.24, 1];
  const completedRef = useRef(false);

  useEffect(() => {
    const fallbackTimer = window.setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    }, 1050);

    return () => {
      window.clearTimeout(fallbackTimer);
    };
  }, [onComplete]);

  const handleComplete = () => {
    if (completedRef.current) {
      return;
    }

    completedRef.current = true;
    onComplete();
  };

  return (
    <div className="preloader-shell">
      <motion.div
        className="preloader-panel preloader-panel-top"
        initial={{ y: 0 }}
        animate={{ y: "-50vh" }}
        transition={{ delay: 0.45, duration: 0.45, ease: curtainEase }}
        onAnimationComplete={handleComplete}
      />
      <motion.div
        className="preloader-panel preloader-panel-bottom"
        initial={{ y: 0 }}
        animate={{ y: "50vh" }}
        transition={{ delay: 0.45, duration: 0.45, ease: curtainEase }}
      />
      <motion.div
        className="preloader-content"
        initial={{ opacity: 0, scale: 1 }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [1, 1, 1.05, 1],
        }}
        transition={{
          duration: 1.0,
          times: [0, 0.2, 0.62, 0.88],
          ease: "easeInOut",
        }}
      >
        <img src={logo} alt="Ikehu logo" className="preloader-logo" />
      </motion.div>
    </div>
  );
}
