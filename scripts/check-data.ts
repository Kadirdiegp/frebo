import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const images = await prisma.image.findMany();
  const collections = await prisma.collection.findMany();
  
  console.log('Images:', images.length);
  console.log(JSON.stringify(images, null, 2));
  
  console.log('\nCollections:', collections.length);
  console.log(JSON.stringify(collections, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
