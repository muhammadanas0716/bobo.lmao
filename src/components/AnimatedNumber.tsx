import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { formatCurrency } from "../utils";

interface AnimatedNumberProps {
  value: number;
  className?: string;
}

const digits = Array.from({ length: 10 }, (_, i) => String(i));

const Digit: React.FC<{ char: string }> = ({ char }) => {
  const prevChar = useRef(char);
  useEffect(() => {
    prevChar.current = char;
  }, [char]);

  const isDigit = /\d/.test(char);

  if (!isDigit) {
    return <span className="inline-block w-[0.6em]">{char}</span>;
  }

  const currentIndex = parseInt(char, 10);
  const prevIndex = parseInt(prevChar.current, 10);

  return (
    <span className="relative inline-block overflow-hidden w-[0.6em] h-[1em] align-bottom">
      <motion.span
        initial={{ y: `-${prevIndex * 100}%` }}
        animate={{ y: `-${currentIndex * 100}%` }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex flex-col"
      >
        {digits.map((d) => (
          <span key={d} className="h-[1em] leading-none">
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
};

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, className = "" }) => {
  const formatted = formatCurrency(value);

  return (
    <div className={`flex ${className}`.trim()}>
      {formatted.split("").map((char, idx) => (
        <Digit key={idx} char={char} />
      ))}
    </div>
  );
};

export default AnimatedNumber;
