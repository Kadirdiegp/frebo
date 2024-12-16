'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { 
  CameraIcon, 
  UserIcon, 
  ShoppingBagIcon, 
  CalendarIcon 
} from '@heroicons/react/24/outline';
import AdminLayout from './components/AdminLayout';

const cards = [
  {
    title: 'Events',
    description: 'Manage motocross events and schedules',
    icon: CalendarIcon,
    href: '/admin/events',
    color: 'bg-blue-500',
  },
  {
    title: 'Motocross',
    description: 'Manage motocross race photos',
    icon: CameraIcon,
    href: '/admin/motocross',
    color: 'bg-green-500',
  },
  {
    title: 'Portrait',
    description: 'Manage rider portraits',
    icon: UserIcon,
    href: '/admin/portrait',
    color: 'bg-purple-500',
  },
  {
    title: 'Product',
    description: 'Manage product photography',
    icon: ShoppingBagIcon,
    href: '/admin/product',
    color: 'bg-orange-500',
  },
];

export default function AdminPanel() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here's an overview of your photography sections.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="block p-6 bg-gray-800 rounded-lg shadow-lg hover:transform hover:scale-[1.02] transition-all duration-200"
            >
              <div className={`inline-flex p-3 rounded-lg ${card.color} mb-4`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">{card.title}</h2>
              <p className="text-gray-400">{card.description}</p>
            </a>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
