'use client';

import { Event, Location } from '@prisma/client';

interface EventsListProps {
  events: (Event & { locations: Location[] })[];
  onEdit: (event: Event & { locations: Location[] }) => void;
  onDelete: (eventId: string) => void;
}

export default function EventsList({ events, onEdit, onDelete }: EventsListProps) {
  if (!events || events.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        Keine Events vorhanden
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Jahr</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Locations</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Aktionen</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {events.map((event) => (
            <tr key={event.id} className="hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap text-gray-300">{event.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-300">{event.year}</td>
              <td className="px-6 py-4 text-gray-300">
                {event.locations?.map(loc => loc.name).join(', ') || 'Keine Locations'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(event)}
                  className="text-blue-400 hover:text-blue-300 mr-4"
                >
                  Bearbeiten
                </button>
                <button
                  onClick={() => onDelete(event.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  Löschen
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
