"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const headline = "Find what fits your life.";
const words = headline.split(" ");
const wordOffsets = words.map((_, wordIndex) =>
  words.slice(0, wordIndex).reduce((total, word) => total + word.length + 1, 0)
);

export function FooterImageCopy() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mb-10 max-w-3xl pb-6 text-left">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B66F52]">
        GOOD FINDS. BETTER CHOICES.
      </p>
      <h2
        aria-label={headline}
        className="font-display text-balance text-4xl font-medium leading-[1.08] tracking-[-0.04em] text-[#22231F] sm:text-5xl md:text-6xl"
      >
        <span aria-hidden="true" className="inline-flex flex-wrap justify-start gap-x-[0.25em]">
          {words.map((word, wordIndex) => (
            <span key={`${word}-${wordIndex}`} className="whitespace-nowrap">
              {Array.from(word).map((character, index) => (
                <motion.span
                  key={`${character}-${index}`}
                  className="inline-block"
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={
                    reduceMotion
                      ? undefined
                      : { duration: 0.25, delay: (wordOffsets[wordIndex] + index) * 0.03 }
                  }
                >
                  {character}
                </motion.span>
              ))}
            </span>
          ))}
        </span>
      </h2>
      <p className="mt-3.5 max-w-xl text-sm leading-relaxed text-[#6B6B66] sm:text-base">
        Thoughtfully curated products and useful discoveries for everyday life.
      </p>
    </div>
  );
}
