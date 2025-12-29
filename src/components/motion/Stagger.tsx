import React from 'react';
import { motion, Variants, useInView } from 'framer-motion';

interface StaggerProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const containerVars: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVars: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const StaggerContainer = ({ children, className }: StaggerProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0, margin: "0px 0px -50px 0px" });

  return (
    <motion.div
      ref={ref}
      variants={containerVars}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div variants={itemVars} className={className}>
    {children}
  </motion.div>
);
