'use client';

import { useState, useEffect } from 'react';
import { Event, Location } from '@prisma/client';

interface EventFormProps {
  event?: Event & { locations: Location[] };
  onSubmit: (data: { name: string; year: string; locations: string[] }) => void;
  onCancel: () => void;
}

export default function EventForm({ event, onSubmit, onCancel }: EventFormProps) {
  const [name, setName] = useState(event?.name || '');
  const [year, setYear] = useState(event?.year || new Date().getFullYear().toString());
  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    event?.locations?.map(loc => loc.id) || []
  );
  const [locations, setLocations] = useState<Location[]>([]);
  const [newLocation, setNewLocation] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('/api/locations');
        if (!response.ok) throw new Error('Failed to fetch locations');
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleAddLocation = async () => {
    if (!newLocation.trim()) return;

    try {
      const response = await fetch('/api/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newLocation.trim() }),
      });

      if (!response.ok) throw new Error('Failed to create location');

      const location = await response.json();
      setLocations(prev => [...prev, location]);
      setNewLocation('');
    } catch (error) {
      console.error('Error creating location:', error);
      alert('Failed to create location. Please try again.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      year,
      locations: selectedLocations,
    });
  };

  if (isLoading) {
    return <div className="text-white">Loading locations...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
          Event Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="year" className="block text-sm font-medium text-gray-300">
          Jahr
        </label>
        <input
          type="number"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
          min="2000"
          max="2100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Neue Location hinzufügen
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            className="flex-1 rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Name der neuen Location"
          />
          <button
            type="button"
            onClick={handleAddLocation}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Hinzufügen
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Locations
        </label>
        <div className="space-y-2">
          {locations.map((location) => (
            <label key={location.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedLocations.includes(location.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedLocations([...selectedLocations, location.id]);
                  } else {
                    setSelectedLocations(selectedLocations.filter(id => id !== location.id));
                  }
                }}
                className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-300">{location.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Abbrechen
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {event ? 'Aktualisieren' : 'Erstellen'}
        </button>
      </div>
    </form>
  );
} 