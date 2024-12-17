import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Admin User erstellen
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      password: hashedPassword,
      isAdmin: true,
    },
  });

  // Locations mit Bildern erstellen
  const dreetz = await prisma.location.upsert({
    where: { name: 'Dreetz' },
    update: {},
    create: {
      name: 'Dreetz',
      images: {
        create: [
          {
            src: '/images/motocross/_67A7406.jpg',
            alt: 'Motocross rider #94 in action',
            title: 'Race Action Dreetz',
            raceNumber: '94',
            category: 'motocross'
          },
          {
            src: '/images/motocross/_67A7381.jpg',
            alt: 'Motocross rider #23 jumping',
            title: 'Jump Section Dreetz',
            raceNumber: '23',
            category: 'motocross'
          }
        ]
      }
    }
  });

  const schwerin = await prisma.location.upsert({
    where: { name: 'Schwerin' },
    update: {},
    create: {
      name: 'Schwerin',
      images: {
        create: [
          {
            src: '/images/motocross/_67A9518.jpg',
            alt: 'Motocross rider #17 in woods',
            title: 'Woods Section Schwerin',
            raceNumber: '17',
            category: 'motocross'
          },
          {
            src: '/images/motocross/IMG_8703.jpg',
            alt: 'Motocross rider #31 crossing stream',
            title: 'Stream Crossing Schwerin',
            raceNumber: '31',
            category: 'motocross'
          }
        ]
      }
    }
  });

  // Events mit Locations verknüpfen
  await prisma.event.upsert({
    where: { 
      id: 'mx-masters-2024' // Eindeutige ID verwenden
    },
    update: {
      locations: {
        connect: [{ id: dreetz.id }]
      }
    },
    create: {
      id: 'mx-masters-2024',
      name: 'ADAC MX Masters',
      year: '2024',
      locations: {
        connect: [{ id: dreetz.id }]
      }
    }
  });

  await prisma.event.upsert({
    where: { 
      id: 'gcc-2024' // Eindeutige ID verwenden
    },
    update: {
      locations: {
        connect: [{ id: schwerin.id }]
      }
    },
    create: {
      id: 'gcc-2024',
      name: 'German Cross Country',
      year: '2024',
      locations: {
        connect: [{ id: schwerin.id }]
      }
    }
  });

  console.log('Database has been seeded with real motocross data!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
