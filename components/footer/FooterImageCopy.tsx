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
    <div className="mb-8 max-w-3xl pb-8 text-left sm:mb-10 sm:pb-10">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6b5845] sm:text-xs">Good finds. Better choices.</p>
      <h2 aria-label={headline} className="font-display text-balance text-4xl font-medium leading-[1.08] tracking-[-0.05em] sm:text-5xl md:text-6xl">
        <span aria-hidden="true" className="inline-flex flex-wrap justify-start gap-x-[0.25em]">
          {words.map((word, wordIndex) => (
            <span key={`${word}-${wordIndex}`} className="whitespace-nowrap">
              {Array.from(word).map((character, index) => (
                <motion.span
                  key={`${character}-${index}`}
                  className="inline-block"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={reduceMotion ? undefined : { duration: 0.01, delay: (wordOffsets[wordIndex] + index) * 0.055 }}
                >
                  {character}
                </motion.span>
              ))}
            </span>
          ))}
        </span>
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-6 text-[#49443d] sm:text-base">Thoughtfully curated products and useful discoveries for everyday life.</p>
    </div>
  );
}
