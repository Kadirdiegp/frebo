'use client';

import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import ImageGrid from '@/components/gallery/ImageGrid';

export default function ProductGallery() {
  const images = [
    'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e',
    'https://images.unsplash.com/photo-1523170335258-f5ed11844a49',
    'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a',
    'https://images.unsplash.com/photo-1524592094714-0f0654e20314',
    'https://images.unsplash.com/photo-1547996160-81dfa63595aa',
    'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5',
    'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3',
    'https://images.unsplash.com/photo-1619134778706-7015533a6150',
    'https://images.unsplash.com/photo-1639037687665-37ff6c49494c'
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main className="container mx-auto pt-24 md:pt-32 pb-16 md:pb-24">
        <ImageGrid images={images} type="product" />
      </main>
      <Footer />
    </div>
  );
}
