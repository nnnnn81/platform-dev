import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { verifyToken } from '@/app/lib/auth';


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await verifyToken(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const application = await prisma.application.findUnique({
      where: { id: Number(params.id) },
    });

    if (!application || application.userId !== user.userId) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json(application, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching application' }, { status: 500 });
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
    return NextResponse.json(application, { status: 200 });
  } catch (error) {
    console.error('Error approving application:', error);
    return NextResponse.json({ error: 'Error approving application' }, { status: 500 });
  }
}

// OPTIONS メソッドに対応
export async function OPTIONS() {
  return NextResponse.json({}, { status: 204, headers: { Allow: 'PATCH, OPTIONS' } });
}
