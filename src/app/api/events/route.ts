import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        locations: true
      },
      orderBy: [
        { year: 'desc' },
        { name: 'asc' }
      ]
    });
    
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, year, locations } = await request.json();

    const event = await prisma.event.create({
      data: {
        name,
        year,
        locations: {
          connect: locations.map((id: string) => ({ id }))
        }
      },
      include: {
        locations: true
      }
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
