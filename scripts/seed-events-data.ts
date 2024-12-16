const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const eventData = [
  {
    name: 'ADAC MX 2025',
    location: 'Tensfeld',
    date: new Date('2025-04-15'),
    description: 'ADAC MX Masters Championship Round',
    drivers: [
      {
        name: 'Max Mueller',
        number: 111,
        category: 'ADAC MX Masters',
        images: [
          {
            url: '/images/tensfeld/111_1.jpg',
            title: 'Jump Section',
            description: 'Max Mueller (#111) clearing the big jump',
            alt: 'Rider #111 performing jump',
          }
        ]
      },
      {
        name: 'Tom Schmidt',
        number: 222,
        category: 'ADAC MX Masters',
        images: [
          {
            url: '/images/tensfeld/222_1.jpg',
            title: 'Corner Entry',
            description: 'Tom Schmidt (#222) attacking the corner',
            alt: 'Rider #222 in corner',
          }
        ]
      }
    ]
  },
  {
    name: 'ADAC MX 2025',
    location: 'Holzgerlingen',
    date: new Date('2025-05-20'),
    description: 'ADAC MX Masters Championship Round',
    drivers: [
      {
        name: 'Felix Weber',
        number: 333,
        category: 'ADAC MX Masters',
        images: [
          {
            url: '/images/holzgerlingen/333_1.jpg',
            title: 'Whoop Section',
            description: 'Felix Weber (#333) mastering the whoops',
            alt: 'Rider #333 in whoops section',
          }
        ]
      }
    ]
  }
];

async function main() {
  console.log('Start seeding events data...');

  // Clear existing data
  await prisma.image.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.event.deleteMany();

  for (const event of eventData) {
    const { drivers, ...eventDetails } = event;
    
    // Create the event
    const createdEvent = await prisma.event.create({
      data: eventDetails
    });
    
    console.log(`Created event: ${createdEvent.name} at ${createdEvent.location}`);

    // Create drivers and their images
    for (const driverData of drivers) {
      const { images, ...driverDetails } = driverData;
      
      // Create the driver
      const driver = await prisma.driver.create({
        data: {
          ...driverDetails,
          events: {
            connect: { id: createdEvent.id }
          }
        }
      });
      
      console.log(`Created driver: ${driver.name} (#${driver.number})`);

      // Create images for the driver
      for (const imageData of images) {
        await prisma.image.create({
          data: {
            ...imageData,
            driverId: driver.id,
            eventId: createdEvent.id
          }
        });
        console.log(`Created image for driver #${driver.number}`);
      }
    }
  }

  const stats = await prisma.$transaction([
    prisma.event.count(),
    prisma.driver.count(),
    prisma.image.count()
  ]);

  console.log('Seeding finished.');
  console.log(`Created ${stats[0]} events`);
  console.log(`Created ${stats[1]} drivers`);
  console.log(`Created ${stats[2]} images`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
