import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { verifyToken } from '@/app/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await verifyToken(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const applications = await prisma.application.findMany({
      where: { userId: user.userId },
    });

    return NextResponse.json(applications, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching applications' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {

  const user = await verifyToken(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { purpose, amount } = await req.json();

  try {
    const application = await prisma.application.create({
      data: {
        userId: user.userId,
        purpose,
        amount,
        status: 'PENDING',
      },
    });
    const username = await prisma.user.findUnique({
      where: { id: user.userId },
    });

    await prisma.notification.create({
      data: {
        userId: 1,
        applicationId: application.id,
        message: `${username?.name}から承認申請が来ています`,
      },
    });

    return NextResponse.json(application, { status: 200 });
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json({ error: 'Error updating application' }, { status: 500 });
  }
}


export async function OPTIONS() {
  return NextResponse.json({}, { status: 204, headers: { Allow: 'GET, POST, OPTIONS' } });
}
