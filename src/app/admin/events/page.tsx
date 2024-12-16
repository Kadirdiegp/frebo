'use client';

import { useState, useEffect } from 'react';
import { Event, Location } from '@prisma/client';
import AdminLayout from '../components/AdminLayout';
import EventsList from '../components/events/EventsList';
import EventForm from '../components/events/EventForm';

export default function EventsPage() {
  const [events, setEvents] = useState<(Event & { locations: Location[] })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingEvent, setEditingEvent] = useState<(Event & { locations: Location[] }) | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSubmit = async (data: { name: string; year: string; locations: string[] }) => {
    try {
      if (editingEvent) {
        // Update existing event
        const response = await fetch(`/api/events/${editingEvent.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Failed to update event');

        const updatedEvent = await response.json();
        setEvents(prev => prev.map(event => 
          event.id === editingEvent.id ? updatedEvent : event
        ));
      } else {
        // Create new event
        const response = await fetch('/api/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Failed to create event');

        const newEvent = await response.json();
        setEvents(prev => [newEvent, ...prev]);
      }

      setIsCreating(false);
      setEditingEvent(null);
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event. Please try again.');
    }
  };

  const handleEdit = (event: Event & { locations: Location[] }) => {
    setEditingEvent(event);
    setIsCreating(true);
  };

  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete event');

      setEvents(prev => prev.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Events Management</h1>
              <p className="text-gray-400">Manage your events and their locations</p>
            </div>
            <button
              onClick={() => {
                setIsCreating(true);
                setEditingEvent(null);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Neues Event hinzufügen
            </button>
          </div>
        </header>
        
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          {isCreating ? (
            <EventForm
              event={editingEvent || undefined}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsCreating(false);
                setEditingEvent(null);
              }}
            />
          ) : (
            <EventsList 
              events={events}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
} 