import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export async function GET() {
  try {
    const images = await prisma.image.findMany({
      where: {
        category: 'portrait'
      },
      select: {
        id: true,
        src: true,
        alt: true
      }
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching portrait images:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
