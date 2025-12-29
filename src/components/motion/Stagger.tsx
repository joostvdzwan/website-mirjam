'use client';
import { motion, Variants } from 'framer-motion';

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

export const StaggerContainer = ({ children, className }: StaggerProps) => (
  <motion.div
    variants={containerVars}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.1 }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div variants={itemVars} className={className}>
    {children}
  </motion.div>
);
