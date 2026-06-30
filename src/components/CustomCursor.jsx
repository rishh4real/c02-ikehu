import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const springX = useSpring(0, { stiffness: 200, damping: 20 });
  const springY = useSpring(0, { stiffness: 200, damping: 20 });
  const [enabled, setEnabled] = useState(false);
  const [theme, setTheme] = useState("light");
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)");
    const updateEnabled = () => setEnabled(mediaQuery.matches);

    updateEnabled();
    mediaQuery.addEventListener("change", updateEnabled);

    return () => mediaQuery.removeEventListener("change", updateEnabled);
  }, []);

  useEffect(() => {
    if (!enabled) {
      setVisible(false);
      setActive(false);
      return undefined;
    }

    const handleMove = (event) => {
      springX.set(event.clientX);
      springY.set(event.clientY);
      setVisible(true);

      const hovered = document.elementFromPoint(event.clientX, event.clientY);
      const hiddenSection = hovered?.closest("[data-cursor-hidden]");
      const themedSection = hovered?.closest("[data-cursor-theme]");
      const hoverable = hovered?.closest("[data-cursor-hover]");

      if (hiddenSection) {
        setVisible(false);
        setActive(false);
        return;
      }

      setTheme(themedSection?.getAttribute("data-cursor-theme") || "light");
      setActive(Boolean(hoverable));
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseout", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseout", handleLeave);
    };
  }, [enabled, springX, springY]);

  if (!enabled) {
    return null;
  }

  return (
    <motion.div
      className={`custom-cursor ${theme === "dark" ? "cursor-dark" : "cursor-light"} ${active ? "is-active" : ""}`}
      animate={{
        width: active ? 48 : 8,
        height: active ? 48 : 8,
      }}
      style={{
        left: 0,
        top: 0,
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    />
  );
}
