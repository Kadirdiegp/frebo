import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = params;
    const updates = await request.json();

    const image = await prisma.image.update({
      where: { id },
      data: updates,
      include: {
        location: {
          include: {
            events: {
              select: {
                id: true,
                name: true,
                year: true
              }
            }
          }
        }
      }
    });

    const transformedImage = image.location ? {
      ...image,
      location: {
        ...image.location,
        event: image.location.events[0] || null,
        events: undefined // Remove the events array
      }
    } : image;

    return NextResponse.json(transformedImage);
  } catch (error) {
    console.error('Error updating image:', error);
    return NextResponse.json(
      { error: 'Failed to update image' },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const { id } = params;

    await prisma.image.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
