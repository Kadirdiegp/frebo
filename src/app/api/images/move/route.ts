import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { imageId, newLocationId } = await request.json();

    if (!imageId || !newLocationId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const updatedImage = await prisma.image.update({
      where: { id: imageId },
      data: { locationId: newLocationId },
    });

    return NextResponse.json(updatedImage);
  } catch (error) {
    console.error('Error moving image:', error);
    return NextResponse.json(
      { error: 'Error moving image' },
      { status: 500 }
    );
  }
}
