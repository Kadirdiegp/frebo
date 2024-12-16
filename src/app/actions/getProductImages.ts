'use server'

import prisma from '@/lib/prisma'

export async function getProductImages(limit: number = 6) {
  try {
    const images = await prisma.image.findMany({
      where: { category: 'product' },
      orderBy: { createdAt: 'desc' },
      take: limit
    })

    return images
  } catch (error) {
    console.error('Error fetching product images:', error)
    return []
  }
}
