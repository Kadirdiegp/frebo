'use client';

import { useState } from 'react';

interface Event {
  id: string;
  name: string;
  year: string;
  locations: {
    id: string;
    name: string;
  }[];
}

interface ImageUploadProps {
  onUploadSuccess: (newImage: any) => void;
  events: Event[];
}

export default function ImageUpload({ onUploadSuccess, events }: ImageUploadProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [locationId, setLocationId] = useState('');
  const [raceNumber, setRaceNumber] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0) return;

    setIsUploading(true);
    setError(null);

    const uploadPromises = Array.from(selectedFiles).map(async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('raceNumber', raceNumber);
      formData.append('locationId', locationId);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Upload failed');
        }

        const newImage = await response.json();
        onUploadSuccess(newImage);
        return newImage;
      } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
      }
    });

    try {
      await Promise.all(uploadPromises);
      setIsModalOpen(false);
      setSelectedFiles(null);
      setLocationId('');
      setRaceNumber('');
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to upload images');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setIsModalOpen(true);
          setError(null);
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Upload Images
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1E293B] rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-white mb-4">Upload Images</h2>
            {error && (
              <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded text-red-500">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white mb-2">
                  Select Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setSelectedFiles(e.target.files)}
                  className="w-full text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">
                  Race Number
                </label>
                <input
                  type="text"
                  value={raceNumber}
                  onChange={(e) => setRaceNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F172A] text-white rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">
                  Event & Location
                </label>
                <select
                  value={locationId}
                  onChange={(e) => setLocationId(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F172A] text-white rounded-md"
                  required
                >
                  <option value="">Select Event & Location</option>
                  {events.map(event => (
                    <optgroup key={event.id} label={`${event.name} ${event.year}`}>
                      {event.locations.map(location => (
                        <option key={location.id} value={location.id}>
                          {location.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setError(null);
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                  disabled={isUploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-400"
                  disabled={isUploading}
                >
                  {isUploading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}