'use client';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react';

export const SmoothHeight = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`overflow-hidden ${className}`}
    >
        {children}
    </motion.div>
  );
};
