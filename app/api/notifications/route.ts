import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { verifyToken } from '@/app/lib/auth';

export async function GET(req: NextRequest) {
  const user = await verifyToken(req);
  console.log(user)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(notifications, { status: 200 });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: 'Error fetching notifications' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await verifyToken(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId, message } = await req.json(); // Next.js 14では`req.json()`でパース
    const notification = await prisma.notification.create({
      data: {
        userId: userId,
        message: message,
        isRead: false,
      },
    });

    return NextResponse.json(notification, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating application' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await verifyToken(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;


    const notification = await prisma.notification.update({
      where: { id: Number(id) },
      data: { isRead: true },
    });

    return NextResponse.json(notification, { status: 200 });
  } catch (error: any) {
    if (error.code === 'P2025') { // Application not found error
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }
    console.error('Error approving application:', error);
    return NextResponse.json({ error: 'Error approving application' }, { status: 500 });
  }
}
// OPTIONS メソッドに対応
export async function OPTIONS() {
  return NextResponse.json({}, { status: 204, headers: { Allow: 'GET, OPTIONS' } });
}
