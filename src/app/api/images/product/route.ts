import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export async function GET() {
  try {
    const images = await prisma.image.findMany({
      where: {
        category: 'product'
      },
      select: {
        id: true,
        src: true,
        alt: true
      }
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching product images:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
