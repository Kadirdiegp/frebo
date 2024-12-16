'use client';

import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          FREBO MEDIA
        </h1>

        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2 rounded-lg bg-[#1E293B] text-white 
                          placeholder:text-gray-400 border-[#0F172A] outline-none
                          focus:ring-2 focus:ring-[#60A5FA] transition-all"
              />
            </div>
            
            <div>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-2 rounded-lg bg-[#1E293B] text-white 
                          placeholder:text-gray-400 border-[#0F172A] outline-none
                          focus:ring-2 focus:ring-[#60A5FA] transition-all"
              />
            </div>
            
            <div>
              <textarea
                placeholder="Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="w-full px-4 py-2 rounded-lg bg-[#1E293B] text-white 
                          placeholder:text-gray-400 border-[#0F172A] outline-none
                          focus:ring-2 focus:ring-[#60A5FA] transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-[#60A5FA] text-white 
                       hover:bg-[#3B82F6] transition-colors font-semibold"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
