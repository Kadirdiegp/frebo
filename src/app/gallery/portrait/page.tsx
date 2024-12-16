'use client';

import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import ImageGrid from '@/components/gallery/ImageGrid';

const images = [
  '/images/por/IMG_3046.JPG',
  '/images/por/IMG_3047.JPG',
  '/images/por/IMG_3048.JPG',
  '/images/por/IMG_5339.JPG',
  '/images/por/IMG_7863.JPG',
  '/images/por/IMG_7870.JPG',
  '/images/por/IMG_7871.JPG',
  '/images/por/IMG_9932.JPG',
  '/images/por/IMG_9934.JPG'
].map(path => ({
  src: path,
  alt: 'Portrait photography',
  category: 'portrait'
}));

export default function PortraitGallery() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 md:pt-32 pb-16 md:pb-24">
        <ImageGrid images={images} type="portrait" />
      </main>
      <Footer />
    </div>
  );
}
