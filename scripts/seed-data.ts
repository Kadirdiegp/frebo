const { PrismaClient } = require('@prisma/client');
const { events } = require('./events-data.js');

interface Image {
  src: string;
  alt: string;
  raceNumber: string;
  location: string;
  event: string;
}

interface Location {
  name: string;
  images: Image[];
}

interface Event {
  name: string;
  year: string;
  locations: Location[];
}

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Clear existing data
  await prisma.image.deleteMany();
  await prisma.location.deleteMany();
  await prisma.event.deleteMany();

  // Create events from the static data
  for (const eventData of events as Event[]) {
    const event = await prisma.event.create({
      data: {
        name: eventData.name,
        year: eventData.year,
        locations: {
          create: eventData.locations.map((locationData: Location) => ({
            name: locationData.name,
            images: {
              create: locationData.images.map((imageData: Image) => ({
                src: imageData.src,
                alt: imageData.alt,
                raceNumber: imageData.raceNumber,
              }))
            }
          }))
        }
      }
    });
    console.log(`Created event: ${event.name}`);
  }

  console.log('Seeding finished');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
