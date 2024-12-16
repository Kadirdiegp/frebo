'use client';

import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import ImageGrid from '@/components/gallery/ImageGrid';

export default function PortraitGallery() {
  const images = [
    '/images/portrait/1P8A5089a.jpg',
    '/images/portrait/1P8A5090a.jpg',
    '/images/portrait/1P8A5091a.jpg',
    '/images/portrait/1P8A5092a.jpg',
    '/images/portrait/1P8A5093a.jpg',
    '/images/portrait/1P8A5094a.jpg',
    '/images/portrait/1P8A5095a.jpg',
    '/images/portrait/1P8A5096a.jpg',
    '/images/portrait/1P8A5097a.jpg'
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main className="container mx-auto pt-24 md:pt-32 pb-16 md:pb-24">
        <ImageGrid images={images} type="portrait" />
      </main>
      <Footer />
    </div>
  );
}
