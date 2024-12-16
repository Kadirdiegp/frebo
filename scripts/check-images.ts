const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const images = await prisma.image.findMany();
  console.log('All images in database:');
  console.log(JSON.stringify(images, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
