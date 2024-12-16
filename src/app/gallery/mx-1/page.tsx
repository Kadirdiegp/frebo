'use client';

import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import ImageGrid from '@/components/gallery/ImageGrid';

export default function MXGallery() {
  const images = [
    '/images/motocross/1P8A5089.jpg',
    '/images/motocross/1P8A5090.jpg',
    '/images/motocross/1P8A5091.jpg',
    '/images/motocross/1P8A5092.jpg',
    '/images/motocross/1P8A5093.jpg',
    '/images/motocross/1P8A5094.jpg',
    '/images/motocross/1P8A5095.jpg',
    '/images/motocross/1P8A5096.jpg',
    '/images/motocross/1P8A5097.jpg'
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main className="container mx-auto pt-24 md:pt-32 pb-16 md:pb-24">
        <ImageGrid images={images} type="mx" />
      </main>
      <Footer />
    </div>
  );
}
