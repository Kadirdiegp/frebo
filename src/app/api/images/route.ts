import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  try {
    // Remove authentication check for GET requests
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    console.log('API: Fetching images for category:', category);

    const images = await prisma.image.findMany({
      where: {
        ...(category ? { category: category } : {})
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log('API: Found images:', images.length);
    return NextResponse.json(images);
  } catch (error) {
    console.error('API Error fetching images:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;
    const metadata = formData.get('metadata') as string;

    if (!file || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const parsedMetadata = metadata ? JSON.parse(metadata) : {};
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const publicDir = path.join(process.cwd(), 'public');
    const uploadDir = path.join(publicDir, 'images', category);
    await writeFile(path.join(uploadDir, filename), buffer);
    
    const image = await prisma.image.create({
      data: {
        src: `/images/${category}/${filename}`,
        alt: parsedMetadata.alt || filename,
        title: parsedMetadata.title,
        description: parsedMetadata.description,
        raceNumber: parsedMetadata.raceNumber,
        category
      }
    });
    
    return NextResponse.json(image);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Error processing request' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Missing image ID' },
        { status: 400 }
      );
    }

    const image = await prisma.image.findUnique({
      where: { id }
    });

    if (!image) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    await prisma.image.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Error deleting image' },
      { status: 500 }
    );
  }
}
