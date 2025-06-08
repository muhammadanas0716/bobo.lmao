import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatCurrency } from "../utils";

interface AnimatedNumberProps {
  value: number;
  className?: string;
}

const Digit: React.FC<{ char: string }> = ({ char }) => {
  const isDigit = /\d/.test(char);

  if (!isDigit) {
    return (
      <span className="inline-block w-[0.6em]">{char}</span>
    );
  }

  return (
    <span className="relative inline-block overflow-hidden w-[0.6em] h-[1em]">
      <AnimatePresence initial={false}>
        <motion.span
          key={char}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, className = "" }) => {
  const formatted = formatCurrency(value);

  return (
    <div className={`flex ${className}`.trim()}>
      {formatted.split("").map((char, idx) => (
        <Digit key={`${char}-${idx}`} char={char} />
      ))}
    </div>
  );
};

export default AnimatedNumber;
