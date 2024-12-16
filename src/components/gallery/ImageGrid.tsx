'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ImageType {
  id: string;
  src: string;
  alt: string;
  category?: string;
  event?: string;
  location?: string;
}

interface ImageGridProps {
  images: ImageType[];
  type: 'portrait' | 'motocross' | 'product';
  isHomePage?: boolean;
}

export default function ImageGrid({ images, type, isHomePage = false }: ImageGridProps) {
  const getCategoryLink = (category: string) => {
    switch (category) {
      case 'portrait':
        return '/portrait';
      case 'motocross':
        return '/motocross';
      case 'product':
        return '/product';
      default:
        return '/';
    }
  };

  // Ensure we only show 6 images
  const displayImages = images.slice(0, 6);

  return (
    <div className="flex flex-wrap gap-2 md:gap-4">
      {displayImages.map((image, index) => (
        <Link 
          key={image.id}
          href={isHomePage ? getCategoryLink(type) : `#${image.id}`}
          className="relative aspect-[3/4] block w-full md:w-1/3"
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
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300">
              {isHomePage && (
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-white text-center bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-sm md:text-lg font-semibold capitalize">{type}</h3>
                  <p className="text-xs md:text-sm hidden md:block">View Gallery</p>
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
