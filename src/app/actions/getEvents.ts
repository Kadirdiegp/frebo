'use server';

import prisma from '@/lib/prisma';

export async function getEvents() {
  try {
    const events = await prisma.event.findMany({
      include: {
        locations: {
          include: {
            images: {
              where: {
                category: 'motocross'
              },
              orderBy: {
                createdAt: 'desc'
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}
