'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNavigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.startsWith(path) ? 'bg-blue-600' : 'hover:bg-[#1E293B]';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/admin" 
            className="text-white text-xl font-bold"
          >
            Admin Panel
          </Link>
          
          <div className="flex space-x-4">
            <Link
              href="/admin/motocross"
              className={`px-4 py-2 text-white rounded-lg transition-colors ${isActive('/admin/motocross')}`}
            >
              Motocross
            </Link>
            <Link
              href="/admin/portrait"
              className={`px-4 py-2 text-white rounded-lg transition-colors ${isActive('/admin/portrait')}`}
            >
              Portrait
            </Link>
            <Link
              href="/admin/product"
              className={`px-4 py-2 text-white rounded-lg transition-colors ${isActive('/admin/product')}`}
            >
              Product
            </Link>
            <Link
              href="/admin/events"
              className={`px-4 py-2 text-white rounded-lg transition-colors ${isActive('/admin/events')}`}
            >
              Events
            </Link>
          </div>

          <Link 
            href="/" 
            className="text-white hover:text-blue-500 transition-colors"
          >
            Back to Site
          </Link>
        </div>
      </div>
    </nav>
  );
}
