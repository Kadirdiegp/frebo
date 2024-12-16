'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Event, Location, Image } from '@prisma/client';

interface ClientEventSelectorProps {
  initialEvents: (Event & {
    locations: (Location & {
      images: Image[];
    })[];
  })[];
}

export default function ClientEventSelector({ initialEvents }: ClientEventSelectorProps) {
  const [selectedEvent, setSelectedEvent] = useState(initialEvents[0]);
  const [selectedLocation, setSelectedLocation] = useState(
    selectedEvent?.locations[0] || null
  );
  const [searchQuery, setSearchQuery] = useState('');

  const filteredImages = selectedLocation?.images.filter(image => {
    if (!searchQuery) return true;
    return image.raceNumber?.toLowerCase().includes(searchQuery.toLowerCase());
  }) || [];

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Event Selection */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-white text-center sm:text-left">
          Wähle eine Veranstaltung:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {initialEvents.map((event) => (
            <button
              key={event.id}
              onClick={() => {
                setSelectedEvent(event);
                setSelectedLocation(event.locations[0]);
                setSearchQuery('');
              }}
              className={`p-4 rounded-lg transition-all transform active:scale-95 ${
                selectedEvent?.id === event.id
                  ? 'bg-[#89cff0] text-white shadow-lg'
                  : 'bg-black/40 hover:bg-black/60 text-white'
              }`}
            >
              <h3 className="font-medium">{event.name}</h3>
              <p className="text-sm opacity-70">{event.year}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Location Selection */}
      <AnimatePresence mode="wait">
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-medium text-white text-center sm:text-left">
              Wähle einen Ort:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {selectedEvent.locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => {
                    setSelectedLocation(location);
                    setSearchQuery('');
                  }}
                  className={`p-4 rounded-lg transition-all transform active:scale-95 ${
                    selectedLocation?.id === location.id
                      ? 'bg-[#89cff0] text-white shadow-lg'
                      : 'bg-black/40 hover:bg-black/60 text-white'
                  }`}
                >
                  {location.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Input */}
      {selectedLocation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full max-w-md mx-auto"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Suche nach Startnummer..."
            className="w-full px-4 py-3 bg-white rounded-lg text-black
                     placeholder:text-gray-500 focus:outline-none focus:ring-2 
                     focus:ring-[#89cff0] transition-all"
          />
        </motion.div>
      )}

      {/* Image Grid */}
      <AnimatePresence mode="wait">
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          >
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="relative aspect-[3/2] rounded-lg overflow-hidden bg-black/40 group"
              >
                <img
                  src={image.src}
                  alt={image.alt || `Motocross rider ${image.raceNumber}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-[#89cff0] backdrop-blur-sm px-3 py-1.5 rounded-md text-white font-medium shadow-lg">
                  #{image.raceNumber || 'N/A'}
                </div>
              </div>
            ))}
            {filteredImages.length === 0 && (
              <div className="col-span-full text-center text-white/60 py-8">
                {searchQuery 
                  ? `Keine Bilder gefunden für die Startnummer "${searchQuery}"`
                  : 'Keine Bilder verfügbar'
                }
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
