'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  CameraIcon, 
  UserIcon, 
  ShoppingBagIcon, 
  CalendarIcon,
  ArrowLeftOnRectangleIcon 
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Events', href: '/admin/events', icon: CalendarIcon },
  { name: 'Motocross', href: '/admin/motocross', icon: CameraIcon },
  { name: 'Portrait', href: '/admin/portrait', icon: UserIcon },
  { name: 'Product', href: '/admin/product', icon: ShoppingBagIcon },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 w-64 bg-gray-800">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center h-16 px-4 bg-gray-900">
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <item.icon className={`w-6 h-6 mr-3 ${
                    isActive(item.href)
                      ? 'text-white'
                      : 'text-gray-400 group-hover:text-gray-300'
                  }`} />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-gray-700">
              <button
                onClick={() => router.push('/api/auth/signout')}
                className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white group"
              >
                <ArrowLeftOnRectangleIcon className="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-300" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 ml-64">
          <main className="p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
