'use client';

import { Event, Location } from '@prisma/client';

interface EventWithLocations extends Event {
  locations: (Location & {
    images: {
      id: string;
      src: string;
      alt: string;
      raceNumber: string;
    }[];
  })[];
}

interface EventSelectorProps {
  events: EventWithLocations[];
  selectedEvent: EventWithLocations;
  selectedLocation: EventWithLocations['locations'][0];
  onEventChange: (event: EventWithLocations) => void;
  onLocationChange: (location: EventWithLocations['locations'][0]) => void;
}

export function EventSelector({
  events,
  selectedEvent,
  selectedLocation,
  onEventChange,
  onLocationChange,
}: EventSelectorProps) {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="space-y-2">
          <button
            onClick={() => {
              onEventChange(event);
              onLocationChange(event.locations[0]);
            }}
            className={`w-full text-left px-4 py-2 text-lg font-semibold 
                      transition-colors duration-200 flex items-center justify-between
                      ${selectedEvent.id === event.id ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            {event.name} {event.year}
            <span className="transform transition-transform duration-200">
              {selectedEvent.id === event.id ? '▼' : '▶'}
            </span>
          </button>
          
          {selectedEvent.id === event.id && (
            <div className="ml-4 space-y-2">
              {event.locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => onLocationChange(location)}
                  className={`block w-full text-left px-4 py-2 transition-colors duration-200
                            ${selectedLocation.id === location.id 
                              ? 'text-white bg-white/10 rounded-lg' 
                              : 'text-gray-400 hover:text-white'}`}
                >
                  {location.name}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
