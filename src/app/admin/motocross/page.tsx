'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import AdminLayout from '../components/AdminLayout';
import ImageUpload from '../components/ImageUpload';

interface Image {
  id: string;
  src: string;
  alt: string | null;
  raceNumber: string | null;
  locationId: string | null;
  location?: {
    id: string;
    name: string;
    event: {
      id: string;
      name: string;
      year: string;
    };
  };
}

interface Event {
  id: string;
  name: string;
  year: string;
  locations: {
    id: string;
    name: string;
  }[];
}

export default function MotocrossAdminPage() {
  const [images, setImages] = useState<Image[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [editMode, setEditMode] = useState(false);

  // Fetch all motocross images and events
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [imagesResponse, eventsResponse] = await Promise.all([
          fetch('/api/admin/images/motocross'),
          fetch('/api/admin/events')
        ]);

        if (!imagesResponse.ok || !eventsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [imagesData, eventsData] = await Promise.all([
          imagesResponse.json(),
          eventsResponse.json()
        ]);

        setImages(imagesData);
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleImageUpdate = async (imageId: string, updates: Partial<Image>) => {
    try {
      const response = await fetch(`/api/admin/images/${imageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update image');
      }

      // Update local state
      setImages(prevImages => 
        prevImages.map(img => 
          img.id === imageId ? { ...img, ...updates } : img
        )
      );

      setSelectedImage(null);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating image:', error);
      alert('Failed to update image');
    }
  };

  const handleImageDelete = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch(`/api/admin/images/${imageId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      // Update local state
      setImages(prevImages => prevImages.filter(img => img.id !== imageId));
      setSelectedImage(null);
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image');
    }
  };

  const handleUploadSuccess = (newImage: any) => {
    setImages(prev => [newImage, ...prev]);
  };

  if (error) {
    return (
      <AdminLayout>
        <div className="container mx-auto px-4 pt-24">
          <div className="text-center py-12">
            <p className="text-red-500">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 rounded-lg bg-[#1E293B] text-white hover:bg-[#334155] transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Motocross Admin Panel
          </h1>
          <ImageUpload 
            onUploadSuccess={handleUploadSuccess}
            events={events}
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[3/4] animate-pulse rounded-lg bg-[#1E293B]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-[3/4] relative overflow-hidden rounded-lg bg-[#1E293B]">
                  <Image
                    src={image.src}
                    alt={image.alt || 'Motocross photo'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-sm">
                        Race #: {image.raceNumber || 'N/A'}
                      </p>
                      <p className="text-white text-sm">
                        Event: {image.location?.event?.name || 'N/A'}
                      </p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedImage(image);
                            setEditMode(true);
                          }}
                          className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleImageDelete(image.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {selectedImage && editMode && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-[#1E293B] rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold text-white mb-4">Edit Image</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleImageUpdate(selectedImage.id, {
                    raceNumber: formData.get('raceNumber') as string,
                    locationId: formData.get('locationId') as string,
                  });
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-white mb-2">Race Number</label>
                  <input
                    type="text"
                    name="raceNumber"
                    defaultValue={selectedImage.raceNumber || ''}
                    className="w-full px-3 py-2 bg-[#0F172A] text-white rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Event & Location</label>
                  <select
                    name="locationId"
                    defaultValue={selectedImage.locationId || ''}
                    className="w-full px-3 py-2 bg-[#0F172A] text-white rounded-md"
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
                      setSelectedImage(null);
                      setEditMode(false);
                    }}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
