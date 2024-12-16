import { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Photography Portfolio
          </Link>

          {/* Burger Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <div className={`w-6 h-0.5 bg-black mb-1.5 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-black mb-1.5 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-black ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-8">
            <Link href="/motocross" className="hover:text-gray-600 transition-colors">
              Motocross
            </Link>
            <Link href="/portrait" className="hover:text-gray-600 transition-colors">
              Portrait
            </Link>
            <Link href="/product" className="hover:text-gray-600 transition-colors">
              Product
            </Link>
            <Link href="/contact" className="hover:text-gray-600 transition-colors">
              Contact
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`lg:hidden fixed inset-0 bg-white z-40 transform ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-300 ease-in-out`}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8 text-xl">
              <Link
                href="/motocross"
                className="hover:text-gray-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Motocross
              </Link>
              <Link
                href="/portrait"
                className="hover:text-gray-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Portrait
              </Link>
              <Link
                href="/product"
                className="hover:text-gray-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Product
              </Link>
              <Link
                href="/contact"
                className="hover:text-gray-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
