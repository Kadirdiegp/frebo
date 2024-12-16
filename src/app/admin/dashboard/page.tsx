import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
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
        drivers: {
          include: {
            images: true
          }
        },
        images: true
      },
      orderBy: {
        date: 'desc',
      },
    });

    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold mb-8">Motocross Events Admin</h1>
        
        <div className="grid gap-8">
          {/* Stats Overview */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-700 p-4 rounded">
                <p className="text-gray-400">Total Events</p>
                <p className="text-2xl font-bold">{events.length}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded">
                <p className="text-gray-400">Total Drivers</p>
                <p className="text-2xl font-bold">
                  {events.reduce((acc, event) => acc + event.drivers.length, 0)}
                </p>
              </div>
              <div className="bg-gray-700 p-4 rounded">
                <p className="text-gray-400">Total Photos</p>
                <p className="text-2xl font-bold">
                  {events.reduce((acc, event) => 
                    acc + event.drivers.reduce((dAcc, driver) => 
                      dAcc + driver.images.length, 0
                    ), 0
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="flex gap-4">
              <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
                Add New Event
              </button>
              <button className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">
                Upload Photos
              </button>
              <button className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700">
                Add Driver
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="max-w-xl">
              <input
                type="text"
                placeholder="Search by starter number..."
                className="w-full px-4 py-2 bg-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-6">
            {events.map((event) => (
              <div key={event.id} className="bg-gray-800 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">{event.name} - {event.location}</h2>
                  <span className="text-gray-400">
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                </div>
                
                {/* Drivers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {event.drivers.map((driver) => (
                    <div key={driver.id} className="bg-gray-700 rounded-lg overflow-hidden">
                      <div className="p-4">
                        <h3 className="font-semibold text-lg">
                          #{driver.number} - {driver.name}
                        </h3>
                        <p className="text-gray-400">{driver.category}</p>
                      </div>
                      
                      {/* Driver's Images */}
                      <div className="grid grid-cols-2 gap-2 p-4">
                        {driver.images.map((image) => (
                          <div key={image.id} className="relative aspect-w-16 aspect-h-9 bg-gray-800 rounded overflow-hidden">
                            <Image
                              src={image.url}
                              alt={image.alt || `Photo of ${driver.name}`}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                              <div className="text-white text-center p-2">
                                <p className="text-sm font-medium">{image.title}</p>
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
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold mb-8">Error Loading Dashboard</h1>
        <p className="text-red-500">There was an error loading the dashboard. Please try again later.</p>
      </div>
    );
  }
}
