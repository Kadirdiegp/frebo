import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import prisma from '@/lib/prisma';
import ClientEventSelector from './components/ClientEventSelector';

// This makes the page dynamic
export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    include: {
      locations: {
        include: {
          images: true
        }
      }
    },
    orderBy: {
      year: 'desc'
    }
  });

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <h1 className="text-xl font-medium text-center text-white mb-8">
            Veranstaltungen
          </h1>

          {/* Client Component for Event Selection */}
          <ClientEventSelector initialEvents={events} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
