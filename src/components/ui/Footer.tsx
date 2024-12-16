'use client';

import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { 
  gridAnimation,
  gridItemAnimation,
  staggerContainer,
  fadeInScale,
  scaleOnHover,
  glowingText 
} from '@/utils/animations';

export default function Footer() {
  return (
    <motion.footer 
      className="bg-background py-8 mt-12 border-t border-gray-800"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={gridAnimation}
        >
          {/* Company Info */}
          <motion.div 
            className="text-text/80"
            variants={gridItemAnimation}
          >
            <motion.h3 
              className="font-semibold mb-2"
              variants={glowingText}
            >
              FREBO MEDIA
            </motion.h3>
            <motion.div variants={fadeInScale}>
              <p>Based in Bremerhaven</p>
              <p>Professional Photography Services</p>
            </motion.div>
          </motion.div>

          {/* Links */}
          <motion.div 
            className="text-text/80"
            variants={gridItemAnimation}
          >
            <motion.h3 
              className="font-semibold mb-2"
              variants={glowingText}
            >
              Quick Links
            </motion.h3>
            <motion.div 
              className="space-y-2"
              variants={fadeInScale}
            >
              <Link href="/motocross" className="block hover:text-primary transition-colors">
                Motocross
              </Link>
              <Link href="/portrait" className="block hover:text-primary transition-colors">
                Portrait
              </Link>
              <Link href="/product" className="block hover:text-primary transition-colors">
                Product
              </Link>
              <Link href="/contact" className="block hover:text-primary transition-colors">
                Contact
              </Link>
            </motion.div>
          </motion.div>

          {/* Social & Contact */}
          <motion.div 
            className="text-text/80"
            variants={gridItemAnimation}
          >
            <motion.h3 
              className="font-semibold mb-2"
              variants={glowingText}
            >
              Connect
            </motion.h3>
            <motion.div 
              className="space-y-2"
              variants={fadeInScale}
            >
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-primary transition-colors"
              >
                <FaInstagram />
                <span>Instagram</span>
              </a>
              <p>Email: contact@frebomedia.com</p>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="text-center mt-8 text-text/60 text-sm"
          variants={fadeInScale}
        >
          <p>&copy; {new Date().getFullYear()} FREBO MEDIA. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
