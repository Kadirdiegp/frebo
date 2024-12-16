'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Collection, Image as ImageType } from '@prisma/client';

interface CollectionListProps {
  collections: (Collection & {
    images: ImageType[];
  })[];
}

export default function CollectionList({ collections }: CollectionListProps) {
  const router = useRouter();

  if (collections.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No collections found. Click "Create New Collection" to add one.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {collections.map((collection) => (
        <div
          key={collection.id}
          className="bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-600 transition-colors"
          onClick={() => router.push(`/admin/collections/${collection.id}`)}
        >
          <div className="aspect-video relative">
            {collection.images[0] ? (
              <Image
                src={collection.images[0].url}
                alt={collection.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-600 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-medium text-lg">{collection.name}</h3>
            <p className="text-gray-400 text-sm mt-1">
              {collection.images.length} {collection.images.length === 1 ? 'image' : 'images'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
