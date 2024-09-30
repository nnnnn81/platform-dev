import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { verifyToken } from '@/app/lib/auth';

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
