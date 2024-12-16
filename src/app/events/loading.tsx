import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-8 flex-grow">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Title */}
          <h1 className="text-xl font-medium text-center">
            Veranstaltungen
          </h1>

          <div className="animate-pulse space-y-8">
            {/* Event Selection Skeleton */}
            <div className="space-y-4">
              <div className="h-6 w-48 bg-white/10 rounded" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div key={i} className="h-20 bg-white/5 rounded-lg" />
                ))}
              </div>
            </div>

            {/* Location Selection Skeleton */}
            <div className="space-y-4">
              <div className="h-6 w-36 bg-white/10 rounded" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-14 bg-white/5 rounded-lg" />
                ))}
              </div>
            </div>

            {/* Images Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[3/2] bg-white/5 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
