import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const journeys = await prisma.journey.findMany({ orderBy: { order: 'asc' } });
    return NextResponse.json(journeys);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch journeys' }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await req.json();
    const journey = await prisma.journey.create({
      data: {
        title: data.title,
        subtitle: data.subtitle,
        date: data.date,
        location: data.location,
        points: data.points || [],
        category: data.category,
        order: data.order || 0
      }
    });
    return NextResponse.json(journey);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create journey' }, { status: 500 });
  }
}

export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await req.json();
    const journey = await prisma.journey.update({
      where: { id: data.id },
      data: {
        title: data.title,
        subtitle: data.subtitle,
        date: data.date,
        location: data.location,
        points: data.points || [],
        category: data.category,
        order: data.order
      }
    });
    return NextResponse.json(journey);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update journey' }, { status: 500 });
  }
}

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await prisma.journey.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete journey' }, { status: 500 });
  }
}
