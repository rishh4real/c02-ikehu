import { useEffect, useMemo, useState } from "react";

const SCRAMBLE_SET = "abcdefghijklmnopqrstuvwxyz#@%&*!".split("");

function randomChar() {
  return SCRAMBLE_SET[Math.floor(Math.random() * SCRAMBLE_SET.length)];
}

export function useTextScramble(text, options = {}) {
  const { duration = 1800, startDelay = 0, interval = 40, enabled = true } = options;
  const characters = useMemo(() => text.split(""), [text]);
  const plan = useMemo(
    () =>
      characters.map((char, index) => ({
        char,
        start: index,
        cycles: char === " " ? 0 : 4 + (index % 3),
      })),
    [characters]
  );

  const [output, setOutput] = useState(characters);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setOutput(characters);
      setDone(false);
      return undefined;
    }

    let tick = 0;
    let intervalId;
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        tick += 1;
        let completed = true;

        setOutput(
          plan.map(({ char, start, cycles }) => {
            if (char === " ") {
              return " ";
            }

            if (tick < start) {
              completed = false;
              return randomChar();
            }

            if (tick >= start + cycles) {
              return char;
            }

            completed = false;
            return randomChar();
          })
        );

        const elapsed = tick * interval;
        if (completed || elapsed >= duration) {
          window.clearInterval(intervalId);
          setOutput(characters);
          setDone(true);
        }
      }, interval);
    }, startDelay);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [characters, duration, enabled, interval, plan, startDelay]);

  return { output, done };
}
