'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Image as ImageType, Collection } from '@prisma/client';

interface ImageGridProps {
  images: (ImageType & {
    collection: Collection | null;
  })[];
}

export default function ImageGrid({ images }: ImageGridProps) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="relative group cursor-pointer"
          onClick={() => router.push(`/admin/images/${image.id}`)}
        >
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <Image
              src={image.url}
              alt={image.title || 'Untitled'}
              fill
              className="object-cover transition-transform group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="text-white text-center p-4">
              <h3 className="font-medium truncate">{image.title || 'Untitled'}</h3>
              {image.collection && (
                <p className="text-sm text-gray-300">{image.collection.name}</p>
              )}
            </div>
          </div>
        </div>
      ))}
      {images.length === 0 && (
        <div className="col-span-full text-center py-8 text-gray-400">
          No images found. Click "Upload New Image" to add some.
        </div>
      )}
    </div>
  );
}
