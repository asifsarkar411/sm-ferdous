import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';


export async function GET() {
  try {
    const about = await prisma.about.findFirst();
    const education = await prisma.education.findMany({ orderBy: { year: 'desc' } });
    return NextResponse.json({ about: about || {}, education });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch about data' }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await req.json();
    const existingAbout = await prisma.about.findFirst();
    
    let about;
    if (existingAbout) {
      about = await prisma.about.update({
        where: { id: existingAbout.id },
        data: {
          description: data.description,
          yearsCoding: data.yearsCoding,
          projectsBuilt: data.projectsBuilt,
          frameworks: data.frameworks,
          imageUrl: data.imageUrl,
        }
      });
    } else {
      about = await prisma.about.create({
        data: {
          description: data.description,
          yearsCoding: data.yearsCoding,
          projectsBuilt: data.projectsBuilt,
          frameworks: data.frameworks,
          imageUrl: data.imageUrl,
        }
      });
    }
    return NextResponse.json(about);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update about data' }, { status: 500 });
  }
}
