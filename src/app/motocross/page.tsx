'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/Footer';

interface Image {
  id: string;
  src: string;
  alt: string | null;
  raceNumber: string | null;
}

interface Location {
  id: string;
  name: string;
  images: Image[];
}

interface Event {
  id: string;
  name: string;
  year: number;
  locations: Location[];
}

export default function MotocrossPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [searchNumber, setSearchNumber] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/motocross', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        setEvents(data);
        
        if (data.length > 0) {
          setSelectedEvent(data[0].name);
          if (data[0].locations.length > 0) {
            setSelectedLocation(data[0].locations[0].name);
          }
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setError(error instanceof Error ? error.message : 'Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const currentEvent = events.find(e => e.name === selectedEvent);
  const locations = currentEvent?.locations || [];
  const currentLocation = locations.find(l => l.name === selectedLocation);
  const filteredImages = currentLocation?.images.filter(img => 
    !searchNumber || (img.raceNumber && img.raceNumber.includes(searchNumber))
  ) || [];

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

        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-white mb-2">
              Veranstaltungen:
            </label>
            <div className="flex flex-wrap gap-4">
              {events.map((event) => (
                <button
                  key={event.id}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    selectedEvent === event.name
                      ? 'bg-[#334155] text-white'
                      : 'bg-[#1E293B] text-gray-300 hover:bg-[#334155]'
                  }`}
                  onClick={() => {
                    setSelectedEvent(event.name);
                    if (event.locations.length > 0) {
                      setSelectedLocation(event.locations[0].name);
                    } else {
                      setSelectedLocation('');
                    }
                  }}
                >
                  {event.name} {event.year}
                </button>
              ))}
            </div>
          </div>

          {locations.length > 0 && (
            <div>
              <label className="block text-white mb-2">
                Orte:
              </label>
              <div className="flex flex-wrap gap-4">
                {locations.map((location) => (
                  <button
                    key={location.id}
                    className={`px-6 py-2 rounded-lg transition-colors ${
                      selectedLocation === location.name
                        ? 'bg-[#334155] text-white'
                        : 'bg-[#1E293B] text-gray-300 hover:bg-[#334155]'
                    }`}
                    onClick={() => setSelectedLocation(location.name)}
                  >
                    {location.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-white mb-2">
              Startnummer:
            </label>
            <input
              type="text"
              placeholder="Suche nach Startnummer..."
              className="w-full md:w-96 p-2 rounded-lg bg-[#1E293B] text-white placeholder-gray-400 border-[#0F172A]"
              value={searchNumber}
              onChange={(e) => setSearchNumber(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="aspect-[3/4] animate-pulse rounded-lg bg-[#1E293B]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {filteredImages.map((image) => (
              <div key={image.id} className="aspect-[3/4] relative">
                <div className="relative w-full h-full overflow-hidden rounded-lg bg-[#1E293B] group">
                  <Image
                    src={image.src}
                    alt={image.alt || 'Motocross photo'}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                  {image.raceNumber && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#1E293B] text-white">
                      #{image.raceNumber}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredImages.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p>Keine Bilder gefunden.</p>
            <p className="mt-2">Bitte andere Filter wählen.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
