'use client';

import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Location, Image } from '@prisma/client';

interface LocationColumnProps {
  location: Location & {
    images: Image[];
  };
  isActive?: boolean;
  onImageRemove: (imageId: string) => Promise<void>;
  onImageAdd: (file: File, raceNumber: string) => Promise<void>;
}

export default function LocationColumn({
  location,
  isActive,
  onImageRemove,
  onImageAdd,
}: LocationColumnProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [raceNumber, setRaceNumber] = useState('');

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: location.id,
  });

  const style = transform ? {
    transform: CSS.Transform.toString(transform),
    transition
  } : undefined;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !raceNumber) return;

    setIsUploading(true);
    try {
      await onImageAdd(file, raceNumber);
      setRaceNumber('');
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden ${
        isActive ? 'ring-2 ring-blue-500' : ''
      }`}
    >
      <div className="p-4 bg-gray-700">
        <h3 className="text-xl font-semibold text-white">{location.name}</h3>
        <p className="text-gray-400 text-sm mt-1">{location.images.length} images</p>
      </div>
      
      <div className="p-4 space-y-4">
        {location.images.map((image) => (
          <div
            key={image.id}
            className="relative group bg-gray-700 rounded-lg overflow-hidden transition-all duration-200 hover:transform hover:scale-[1.02]"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-40 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/70">
              <button
                onClick={() => onImageRemove(image.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 transform hover:scale-105"
              >
                Remove
              </button>
            </div>
            <div className="p-3 bg-gray-800">
              <span className="text-white/90 font-medium">Race #{image.raceNumber}</span>
            </div>
          </div>
        ))}

        <div className="mt-6 space-y-3">
          <input
            type="text"
            value={raceNumber}
            onChange={(e) => setRaceNumber(e.target.value)}
            placeholder="Enter Race Number"
            className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="relative flex items-center justify-center w-full p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
              disabled={isUploading || !raceNumber}
            />
            <span className={`text-center ${isUploading ? 'text-gray-400' : 'text-white'}`}>
              {isUploading ? 'Uploading...' : 'Click to upload image'}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
