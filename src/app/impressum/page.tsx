'use client';

import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 flex-grow">
        <div className="max-w-3xl mx-auto text-text">
          <h1 className="text-2xl font-bold mb-8">Impressum</h1>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Angaben gemäß § 5 TMG</h2>
            <p className="mb-4">
              Frederik Bosch<br />
              Bremerhavener Str. 11<br />
              27576 Bremerhaven
            </p>
            
            <h3 className="font-semibold mb-2">Kontakt:</h3>
            <p className="mb-4">
              Telefon: 0162-2998971<br />
              E-Mail: info@frebo-media.de
            </p>
            
            <h3 className="font-semibold mb-2">Umsatzsteuer-ID:</h3>
            <p className="mb-4">
              Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz: 7520800683
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Haftungsausschluss:</h2>
            
            <h3 className="font-semibold mb-2">Haftung für Inhalte</h3>
            <p className="mb-4">
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, 
              Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. 
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
              nach den allgemeinen Gesetzen verantwortlich...
            </p>
            
            <h3 className="font-semibold mb-2">Haftung für Links</h3>
            <p className="mb-4">
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir 
              keinen Einfluss haben...
            </p>
            
            <h3 className="font-semibold mb-2">Urheberrecht</h3>
            <p className="mb-4">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten 
              unterliegen dem deutschen Urheberrecht...
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
