'use client';

import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 flex-grow">
        <div className="max-w-3xl mx-auto text-text">
          <h1 className="text-2xl font-bold mb-8">Datenschutzerklärung</h1>

          <section className="mb-8">
            <p className="mb-4">
              Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. 
              Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) 
              erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne 
              Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
            </p>
            
            <p className="mb-4">
              Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) 
              Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist 
              nicht möglich.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Google Analytics</h2>
            <p className="mb-4">
              Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. ('Google'). 
              Google Analytics verwendet sog. 'Cookies', Textdateien, die auf Ihrem Computer gespeichert 
              werden und die eine Analyse der Benutzung der Website durch Sie ermöglicht...
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Google AdSense</h2>
            <p className="mb-4">
              Diese Website benutzt Google Adsense, einen Webanzeigendienst der Google Inc., USA ('Google'). 
              Google Adsense verwendet sog. 'Cookies' (Textdateien), die auf Ihrem Computer gespeichert werden 
              und die eine Analyse der Benutzung der Website durch Sie ermöglicht...
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
