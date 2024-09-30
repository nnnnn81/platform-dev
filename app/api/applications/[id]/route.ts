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
      where: { userId: Number(user.userId) },
    });

    if (applications.length === 0) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json(applications, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching application' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await verifyToken(req);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    const application = await prisma.application.update({
      where: { id: Number(id) },
      data: { status },
    });

    return NextResponse.json(application, { status: 200 });
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
  return NextResponse.json({}, { status: 204, headers: { Allow: 'GET, PATCH, OPTIONS' } });
}
