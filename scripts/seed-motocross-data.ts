import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const collections = [
  {
    name: 'Race Events 2023',
    description: 'Highlights from motocross races in 2023',
    images: [
      {
        url: '/images/motocross/race2023_1.jpg',
        title: 'ADAC MX Masters 2023',
        description: 'Action shots from ADAC MX Masters championship',
        category: 'race',
        alt: 'Motocross rider jumping during ADAC MX Masters',
      },
      {
        url: '/images/motocross/race2023_2.jpg',
        title: 'Regional Championship 2023',
        description: 'Key moments from the regional championship',
        category: 'race',
        alt: 'Motocross riders at the starting gate',
      },
    ],
  },
  {
    name: 'Training Sessions',
    description: 'Practice and training photography',
    images: [
      {
        url: '/images/motocross/training_1.jpg',
        title: 'Winter Training',
        description: 'Winter training session highlights',
        category: 'training',
        alt: 'Rider practicing jumps in winter conditions',
      },
      {
        url: '/images/motocross/training_2.jpg',
        title: 'Technical Training',
        description: 'Technical skills practice session',
        category: 'training',
        alt: 'Rider practicing cornering techniques',
      },
    ],
  },
];

async function main() {
  console.log('Start seeding motocross data...');

  // Clear existing data
  await prisma.image.deleteMany();
  await prisma.collection.deleteMany();

  for (const collection of collections) {
    const { images, ...collectionData } = collection;
    const createdCollection = await prisma.collection.create({
      data: {
        ...collectionData,
        images: {
          create: images,
        },
      },
    });
    console.log(`Created collection: ${createdCollection.name}`);
  }

  // Add some individual highlight images
  const highlightImages = [
    {
      url: '/images/motocross/highlight_1.jpg',
      title: 'Championship Victory',
      description: 'Victory celebration at the national championship',
      category: 'highlights',
      alt: 'Championship celebration podium',
    },
    {
      url: '/images/motocross/highlight_2.jpg',
      title: 'Perfect Jump',
      description: 'Spectacular jump capture during competition',
      category: 'highlights',
      alt: 'Rider performing spectacular jump',
    },
  ];

  for (const image of highlightImages) {
    await prisma.image.create({
      data: image,
    });
    console.log(`Created image: ${image.title}`);
  }

  const finalImages = await prisma.image.count();
  const finalCollections = await prisma.collection.count();

  console.log('Seeding finished.');
  console.log(`Created ${finalImages} motocross images`);
  console.log(`Created ${finalCollections} collections`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
