'use server'

import prisma from '@/lib/prisma'

export async function getPortraitImages(limit: number = 6) {
  try {
    const images = await prisma.image.findMany({
      where: { category: 'portrait' },
      orderBy: { createdAt: 'desc' },
      take: limit
    })

    return images
  } catch (error) {
    console.error('Error fetching portrait images:', error)
    return []
  }
}
