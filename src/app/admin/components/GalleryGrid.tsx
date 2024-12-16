'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

interface ImageType {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  raceNumber?: string;
  category: string;
}

interface GalleryGridProps {
  category: 'motocross' | 'portrait' | 'product';
}

export default function GalleryGrid({ category }: GalleryGridProps) {
  const [images, setImages] = useState<ImageType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadImages() {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Client: Fetching images for category:', category);
        
        const response = await fetch(`/api/images?category=${category}`);
        console.log('Client: Response status:', response.status);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Client: Received data:', data);
        
        setImages(data);
      } catch (error) {
        console.error('Client Error loading images:', error);
        setError(error instanceof Error ? error.message : 'Failed to load images');
      } finally {
        setIsLoading(false);
      }
    }

    loadImages();
  }, [category]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p className="text-white">Loading images...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 mb-4">No {category} images found</p>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Add New Image
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <div key={image.id} className="relative group bg-gray-900 rounded-lg overflow-hidden">
          <div className="aspect-[3/4] relative">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300">
              <div className="absolute bottom-4 left-4 right-4 flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this image?')) {
                      // Implement delete functionality
                    }
                  }}
                  className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
                >
                  <TrashIcon className="h-5 w-5 text-white" />
                </button>
                <button
                  className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                >
                  <PencilIcon className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white">{image.title || 'Untitled'}</h3>
            {image.description && (
              <p className="text-gray-400 mt-1">{image.description}</p>
            )}
            {image.raceNumber && (
              <p className="text-gray-400 mt-1">Race Number: {image.raceNumber}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
