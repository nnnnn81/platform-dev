import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { verifyToken } from '@/app/lib/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await verifyToken(req);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = params;


    const application = await prisma.application.findUnique({
      where: { id: Number(id) },
      include: {
        user: true,
      },
    });

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json(application, { status: 200 });
  } catch (error) {
    console.error('Error fetching application details:', error);
    return NextResponse.json({ error: 'Error fetching application details' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await verifyToken(req);
  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  const { status } = await req.json();

  if (!status) {
    return NextResponse.json({ error: 'Status is required' }, { status: 400 });
  }

  try {

    const application = await prisma.application.update({
      where: { id: Number(id) },
      data: { status },
    });

    await prisma.notification.create({
      data: {
        userId: application.userId,
        applicationId: application.id,
        message: `Your application has been ${status.toLowerCase()}.`,
      },
    });

    return NextResponse.json(application, { status: 200 });
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json({ error: 'Error updating application' }, { status: 500 });
  }
}

// OPTIONS メソッドに対応
export async function OPTIONS() {
  return NextResponse.json({}, { status: 204, headers: { Allow: 'GET, PATCH, OPTIONS' } });
}
