import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';


export async function GET() {
  try {
    const contact = await prisma.contact.findFirst();
    return NextResponse.json(contact || {});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contact info' }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await req.json();
    const existingContact = await prisma.contact.findFirst();
    
    let contact;
    if (existingContact) {
      contact = await prisma.contact.update({
        where: { id: existingContact.id },
        data: {
          motto: data.motto,
          address: data.address,
          location: data.location,
          phoneNumber: data.phoneNumber,
          title: data.title,
          description: data.description,
          buttonText: data.buttonText,
          buttonLink: data.buttonLink,
        }
      });
    } else {
      contact = await prisma.contact.create({
        data: {
          motto: data.motto,
          address: data.address,
          location: data.location,
          phoneNumber: data.phoneNumber,
          title: data.title,
          description: data.description,
          buttonText: data.buttonText,
          buttonLink: data.buttonLink,
        }
      });
    }
    return NextResponse.json(contact);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update contact info' }, { status: 500 });
  }
}
