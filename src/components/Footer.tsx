'use client';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-[#60A5FA] mb-2">FREBO MEDIA</h2>
            <p className="text-gray-400 mb-2">Based in Bremerhaven</p>
            <p className="text-gray-400">Professional Photography Services</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/motocross" className="text-gray-400 hover:text-[#60A5FA] transition-colors">
                  Motocross
                </a>
              </li>
              <li>
                <a href="/portrait" className="text-gray-400 hover:text-[#60A5FA] transition-colors">
                  Portrait
                </a>
              </li>
              <li>
                <a href="/product" className="text-gray-400 hover:text-[#60A5FA] transition-colors">
                  Product
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-[#60A5FA] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#60A5FA] transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a 
                  href="mailto:contact@frebomedia.com"
                  className="text-gray-400 hover:text-[#60A5FA] transition-colors"
                >
                  Email: contact@frebomedia.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p> {new Date().getFullYear()} FREBO MEDIA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
