const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Testing Prisma connection...');
    
    // Try to count events
    const eventCount = await prisma.event.count();
    console.log('Event count:', eventCount);
    
    // Try to count drivers
    const driverCount = await prisma.driver.count();
    console.log('Driver count:', driverCount);
    
    // Try to count images
    const imageCount = await prisma.image.count();
    console.log('Image count:', imageCount);
    
    console.log('Prisma connection test successful!');
  } catch (error) {
    console.error('Error testing Prisma connection:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
