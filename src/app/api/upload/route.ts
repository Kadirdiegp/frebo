import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const raceNumber = formData.get('raceNumber') as string;
    const locationId = formData.get('locationId') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure the upload directory exists
    const uploadDir = join(process.cwd(), 'public', 'images', 'motocross');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // Ignore error if directory already exists
    }

    // Create a unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const filename = `${uniqueSuffix}-${file.name}`;
    const filepath = join(uploadDir, filename);

    // Save the file
    await writeFile(filepath, buffer);

    // Create the image record in the database
    const image = await prisma.image.create({
      data: {
        src: `/images/motocross/${filename}`,
        alt: `Motocross rider ${raceNumber || 'unknown'}`,
        title: `Race Action ${raceNumber ? `#${raceNumber}` : ''}`,
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

    // Transform the response to match the expected format
    const transformedImage = image.location ? {
      ...image,
      location: {
        ...image.location,
        event: image.location.events[0] || null,
        events: undefined
      }
    } : image;

    return NextResponse.json(transformedImage);
  } catch (error) {
    console.error('Error handling upload:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
