'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: '/motocross', label: 'Motocross' },
    { href: '/portrait', label: 'Portrait' },
    { href: '/product', label: 'Product' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className="fixed w-full z-50 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-16 px-6">
            <Link 
              href="/" 
              className="text-3xl font-bold text-white hover:text-[#89cff0] transition-colors"
            >
              FREBO MEDIA
            </Link>

            {/* Burger Menu Button */}
            <button
              className="p-2 text-[#89cff0] hover:text-white transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-8 h-6 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current transform transition-transform duration-300 ${
                  isOpen ? 'rotate-45 translate-y-2.5' : ''
                }`} />
                <span className={`w-full h-0.5 bg-current transition-opacity duration-300 ${
                  isOpen ? 'opacity-0' : ''
                }`} />
                <span className={`w-full h-0.5 bg-current transform transition-transform duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-2.5' : ''
                }`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black"
          >
            <div className="min-h-screen flex flex-col justify-center items-center p-6">
              <div className="space-y-8">
                {links.map((link) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      className={`block text-4xl font-bold text-center ${
                        pathname === link.href ? 'text-[#89cff0]' : 'text-gray-400'
                      } hover:text-[#89cff0] transition-colors`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
