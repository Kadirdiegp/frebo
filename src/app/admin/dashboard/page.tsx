import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Image from 'next/image';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/admin/login');
  }

  try {
    // Fetch events with their related data
    const events = await prisma.event.findMany({
      include: {
        locations: {
          include: {
            images: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate totals
    const totalLocations = events.reduce((acc, event) => acc + event.locations.length, 0);
    const totalImages = events.reduce((acc, event) => 
      acc + event.locations.reduce((locAcc, loc) => locAcc + loc.images.length, 0), 0
    );

    return (
      <div className="min-h-screen bg-primary text-text p-4 md:p-8">
        <h1 className="text-4xl font-bold mb-8 text-center md:text-left">Motocross Events Admin</h1>
        
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Stats Overview */}
          <div className="bg-secondary p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-secondary-light p-6 rounded-lg shadow-md transition-transform hover:scale-105">
                <p className="text-text/70 text-lg mb-2">Total Events</p>
                <p className="text-3xl font-bold">{events.length}</p>
              </div>
              <div className="bg-secondary-light p-6 rounded-lg shadow-md transition-transform hover:scale-105">
                <p className="text-text/70 text-lg mb-2">Total Locations</p>
                <p className="text-3xl font-bold">{totalLocations}</p>
              </div>
              <div className="bg-secondary-light p-6 rounded-lg shadow-md transition-transform hover:scale-105">
                <p className="text-text/70 text-lg mb-2">Total Photos</p>
                <p className="text-3xl font-bold">{totalImages}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-secondary p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span>Add New Event</span>
              </button>
              <button className="btn-primary flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                <span>Upload Photos</span>
              </button>
              <button className="btn-primary flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                </svg>
                <span>Add Location</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-secondary p-6 rounded-xl shadow-lg">
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by location or event name..."
                  className="form-input"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-text/50" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-6">
            {events.map((event) => (
              <div key={event.id} className="bg-secondary p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">{event.name}</h2>
                  <span className="bg-secondary-light px-4 py-1 rounded-full text-text/70 text-lg">
                    {event.year}
                  </span>
                </div>
                
                {/* Locations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {event.locations.map((location) => (
                    <div key={location.id} className="bg-secondary-light rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
                      <div className="p-4">
                        <h3 className="text-xl font-semibold">
                          {location.name}
                        </h3>
                        <p className="text-text/70 mt-1">{location.images.length} photos</p>
                      </div>
                      
                      {/* Location Images */}
                      <div className="grid grid-cols-2 gap-3 p-4">
                        {location.images.slice(0, 4).map((image) => (
                          <div key={image.id} className="image-card group">
                            <Image
                              src={image.src}
                              alt={image.alt || `Photo at ${location.name}`}
                              fill
                              className="object-cover transition-transform duration-200 group-hover:scale-110"
                            />
                            <div className="image-overlay">
                              <div className="image-content">
                                <p className="image-title text-sm font-medium text-white">
                                  {image.title || 'View Photo'}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Dashboard Error:', error);
    return (
      <div className="min-h-screen bg-primary text-text p-8">
        <h1 className="text-3xl font-bold mb-8">Error Loading Dashboard</h1>
        <p className="text-red-500">There was an error loading the dashboard. Please try again later.</p>
      </div>
    );
  }
}
