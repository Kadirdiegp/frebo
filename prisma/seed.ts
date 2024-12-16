import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  // Add portrait images from the portrait directory
  const portraitDir = path.join(process.cwd(), 'public', 'images', 'portrait');
  const portraitFiles = fs.readdirSync(portraitDir)
    .filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i));

  for (const file of portraitFiles) {
    await prisma.image.create({
      data: {
        src: `/images/portrait/${file}`,
        alt: `Portrait photo ${file}`,
        title: `Portrait ${file.split('.')[0]}`,
        category: 'portrait'
      }
    });
  }

  // Add product images
  const productImages = [
    {
      src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      alt: 'Premium watch on black background',
      title: 'Premium Watch',
      category: 'product'
    },
    {
      src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      alt: 'Wireless headphones on colored background',
      title: 'Wireless Headphones',
      category: 'product'
    },
    {
      src: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
      alt: 'Stylish sunglasses',
      title: 'Stylish Sunglasses',
      category: 'product'
    },
    {
      src: 'https://images.unsplash.com/photo-1503602642458-232111445657',
      alt: 'Minimal white chair',
      title: 'Minimal Chair',
      category: 'product'
    },
    {
      src: 'https://images.unsplash.com/photo-1560343090-f0409e92791a',
      alt: 'Premium watch collection',
      title: 'Watch Collection',
      category: 'product'
    },
    {
      src: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6',
      alt: 'Classic watch closeup',
      title: 'Classic Watch',
      category: 'product'
    }
  ];

  // Add product images
  for (const image of productImages) {
    await prisma.image.create({
      data: image
    });
  }

  // First, create the locations
  const dreetz = await prisma.location.create({
    data: {
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
          },
          {
            src: '/images/motocross/IMG_8752.jpg',
            alt: 'Motocross rider #45 cornering',
            title: 'Corner Action Dreetz',
            raceNumber: '45',
            category: 'motocross'
          }
        ]
      }
    }
  });

  const schwerin = await prisma.location.create({
    data: {
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
          },
          {
            src: '/images/motocross/_P8A1394.JPG',
            alt: 'Motocross rider #55 in action',
            title: 'Race Action Schwerin',
            raceNumber: '55',
            category: 'motocross'
          }
        ]
      }
    }
  });

  const tensfeld = await prisma.location.create({
    data: {
      name: 'Tensfeld',
      images: {
        create: [
          {
            src: '/images/motocross/IMG_8742.jpg',
            alt: 'Young rider #28 jumping',
            title: 'Jump Section Tensfeld',
            raceNumber: '28',
            category: 'motocross'
          },
          {
            src: '/images/motocross/_P8A1613a.jpg',
            alt: 'Young rider #14 cornering',
            title: 'Corner Action Tensfeld',
            raceNumber: '14',
            category: 'motocross'
          },
          {
            src: '/images/motocross/IMG_3823.jpg',
            alt: 'Young rider #72 in action',
            title: 'Race Action Tensfeld',
            raceNumber: '72',
            category: 'motocross'
          }
        ]
      }
    }
  });

  // Then create the events with their locations
  const adacEvent = await prisma.event.create({
    data: {
      name: 'ADAC MX Masters',
      year: '2023',
      locations: {
        connect: [{ id: dreetz.id }]
      }
    }
  });

  const gccEvent = await prisma.event.create({
    data: {
      name: 'German Cross Country',
      year: '2023',
      locations: {
        connect: [{ id: schwerin.id }]
      }
    }
  });

  const youngsterEvent = await prisma.event.create({
    data: {
      name: 'MX Youngster Cup',
      year: '2023',
      locations: {
        connect: [{ id: tensfeld.id }]
      }
    }
  });

  console.log('Database has been seeded with locations, events, and all images');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
