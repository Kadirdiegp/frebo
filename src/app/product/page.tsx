'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/Footer';

interface ProductImage {
  id: string;
  src: string;
  alt: string | null;
}

export default function ProductPage() {
  const [images, setImages] = useState<ProductImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/images/product');
        
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }

        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
        setError(error instanceof Error ? error.message : 'Failed to load images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  if (error) {
    return (
      <div className="min-h-screen bg-black">
        <Navigation />
        <div className="container mx-auto px-4 pt-24">
          <div className="text-center py-12">
            <p className="text-red-500">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 rounded-lg bg-[#1E293B] text-white hover:bg-[#334155] transition-colors"
            >
              Neu laden
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          FREBO MEDIA
        </h1>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="aspect-[3/4] animate-pulse rounded-lg bg-[#1E293B]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {images.map((image) => (
              <div key={image.id} className="aspect-[3/4] relative cursor-pointer" onClick={() => openLightbox(image)}>
                <div className="relative w-full h-full overflow-hidden rounded-lg bg-[#1E293B] group">
                  <Image
                    src={image.src}
                    alt={image.alt || 'Product photo'}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && images.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p>Keine Bilder gefunden.</p>
          </div>
        )}
      </main>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-[#60A5FA] text-4xl"
            onClick={closeLightbox}
          >
            ×
          </button>
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] m-4">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt || 'Enlarged view'}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
