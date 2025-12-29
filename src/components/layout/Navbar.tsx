'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Werkwijze', path: '/werkwijze' },
  { label: 'Voor wie', path: '/voor-wie' },
  { label: 'Aanbod', path: '/aanbod' },
  { label: 'Tarieven', path: '/tarieven' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' }
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed w-full z-50 bg-[#F9F7F2]/90 backdrop-blur-md border-b border-[#A5A58D]/30 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="cursor-pointer group relative z-10">
          <h1 className="text-xl font-serif tracking-tight">Praktijk <span className="italic font-light text-[#6B705C]">Inzicht & Ordening</span></h1>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex space-x-1 text-sm font-medium tracking-wide">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.path} href={item.path} className={`relative px-4 py-2 rounded-full transition-colors ${isActive ? 'text-[#6B705C]' : 'text-[#333D3B]/70 hover:text-[#333D3B]'}`}>
                {item.label}
                {isActive && (
                  <motion.span 
                    layoutId="nav-pill" 
                    className="absolute inset-0 bg-[#6B705C]/10 rounded-full -z-10" 
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} 
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden z-50" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <motion.div animate={{ rotate: mobileMenuOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
             {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#F9F7F2] border-b border-[#A5A58D]/30 overflow-hidden"
          >
            <div className="p-6 flex flex-col space-y-4">
              {navItems.map((item, i) => (
                <motion.div 
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link 
                    href={item.path} 
                    onClick={() => setMobileMenuOpen(false)} 
                    className={`block text-lg font-serif border-b border-[#A5A58D]/10 pb-2 ${pathname === item.path ? 'text-[#6B705C]' : ''}`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
