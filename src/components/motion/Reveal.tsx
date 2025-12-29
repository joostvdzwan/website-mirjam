'use client';
import React, { useRef, useState } from 'react';
import { motion, useInView, Variant } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export const Reveal = ({ children, width = "fit-content", delay = 0, direction = 'up', className }: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: "some" });
  const [allowOverflow, setAllowOverflow] = useState(false);

  const getHiddenVariant = (): Variant => {
    switch (direction) {
      case 'up': return { opacity: 0, y: 30 };
      case 'down': return { opacity: 0, y: -30 };
      case 'left': return { opacity: 0, x: 75 };
      case 'right': return { opacity: 0, x: -75 };
      case 'none': return { opacity: 0 };
    }
  };

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: allowOverflow ? "visible" : "hidden" }} className={className}>
      <motion.div
        variants={{
          hidden: getHiddenVariant(),
          visible: { opacity: 1, y: 0, x: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.8, delay, ease: [0.17, 0.55, 0.55, 1] }}
        onAnimationComplete={() => setAllowOverflow(true)}
      >
        {children}
      </motion.div>
    </div>
  );
};
