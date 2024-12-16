import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const images = await prisma.image.findMany({
      where: {
        category: 'motocross'
      },
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const transformedImages = images.map(image => {
      if (!image.location) return image;
      
      return {
        ...image,
        location: {
          ...image.location,
          event: image.location.events[0] || null,
          events: undefined // Remove the events array
        }
      };
    });

    return NextResponse.json(transformedImages);
  } catch (error) {
    console.error('Error fetching motocross images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { src, alt, title, raceNumber, locationId } = await request.json();

    const image = await prisma.image.create({
      data: {
        src,
        alt,
        title,
        raceNumber,
        category: 'motocross',
        locationId
      },
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
    console.error('Error creating image:', error);
    return NextResponse.json(
      { error: 'Failed to create image' },
      { status: 500 }
    );
  }
}
