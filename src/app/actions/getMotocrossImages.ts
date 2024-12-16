'use server'

import prisma from '@/lib/prisma'

export async function getMotocrossImages(limit: number = 6) {
  try {
    const images = await prisma.image.findMany({
      where: { category: 'motocross' },
      orderBy: { createdAt: 'desc' },
      take: limit
    })

    return images
  } catch (error) {
    console.error('Error fetching motocross images:', error)
    return []
  }
}
