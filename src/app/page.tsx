'use client';

import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/Footer';
import ImageGrid from '@/components/gallery/ImageGrid';
import { useEffect, useState } from 'react';
import { getEvents } from './actions/getEvents';
import { getPortraitImages } from './actions/getPortraitImages';
import { getProductImages } from './actions/getProductImages';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [motocrossImages, setMotocrossImages] = useState([]);
  const [portraitImages, setPortraitImages] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [isLoadingMotocross, setIsLoadingMotocross] = useState(true);
  const [isLoadingPortrait, setIsLoadingPortrait] = useState(true);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadImages() {
      try {
        setIsLoadingMotocross(true);
        setIsLoadingPortrait(true);
        setIsLoadingProduct(true);
        const [events, portraits, products] = await Promise.all([
          getEvents(),
          getPortraitImages(6),
          getProductImages(6)
        ]);

        // Extrahiere alle Motocross-Bilder aus den Events
        const mxImages = events.flatMap(event => 
          event.locations.flatMap(location => 
            location.images.map(image => ({
              id: image.id,
              src: image.src,
              alt: image.alt || 'Motocross event photo',
              category: 'motocross',
              event: event.name,
              location: location.name
            }))
          )
        );

        // Nimm die ersten 6 Bilder für jede Kategorie
        setMotocrossImages(mxImages.slice(0, 6));
        setPortraitImages(portraits);
        setProductImages(products);
      } catch (err) {
        console.error('Error loading images:', err);
        setError(err.message);
      } finally {
        setIsLoadingMotocross(false);
        setIsLoadingPortrait(false);
        setIsLoadingProduct(false);
      }
    }
    
    loadImages();
  }, []);

  if (error) {
    return <div className="text-red-500">Error loading images: {error}</div>;
  }

  return (
    <div>
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          {/* Motocross Column */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold">Motocross</h2>
            <div className="space-y-2 md:space-y-4">
              {isLoadingMotocross ? (
                [...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-gray-200 animate-pulse rounded-lg" />
                ))
              ) : motocrossImages && motocrossImages.length > 0 ? (
                motocrossImages.map((image) => (
                  <Link 
                    key={image.id}
                    href="/motocross"
                    className="block aspect-[3/4] relative"
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-lg bg-gray-800 group">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 33vw, 33vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
                    </div>
                  </Link>
                ))
              ) : (
                <p>No motocross images available</p>
              )}
            </div>
          </div>

          {/* Portrait Column */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold">Portrait</h2>
            <div className="space-y-2 md:space-y-4">
              {isLoadingPortrait ? (
                [...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-gray-200 animate-pulse rounded-lg" />
                ))
              ) : portraitImages && portraitImages.length > 0 ? (
                portraitImages.map((image) => (
                  <Link 
                    key={image.id}
                    href="/portrait"
                    className="block aspect-[3/4] relative"
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-lg bg-gray-800 group">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 33vw, 33vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
                    </div>
                  </Link>
                ))
              ) : (
                <p>No portrait images available</p>
              )}
            </div>
          </div>

          {/* Product Column */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold">Product</h2>
            <div className="space-y-2 md:space-y-4">
              {isLoadingProduct ? (
                [...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-gray-200 animate-pulse rounded-lg" />
                ))
              ) : productImages && productImages.length > 0 ? (
                productImages.map((image) => (
                  <Link 
                    key={image.id}
                    href="/product"
                    className="block aspect-[3/4] relative"
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-lg bg-gray-800 group">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 33vw, 33vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
                    </div>
                  </Link>
                ))
              ) : (
                <p>No product images available</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
