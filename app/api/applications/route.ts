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
// ** POST リクエストのハンドラー **
// 新しいアプリケーションを作成
export async function POST(req: NextRequest) {
  try {
    const user = await verifyToken(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { purpose, amount } = await req.json(); // Next.js 14では`req.json()`でパース
    const application = await prisma.application.create({
      data: {
        userId: user.userId,
        purpose,
        amount,
        status: 'PENDING',
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating application' }, { status: 500 });
  }
}

// ** OPTIONS メソッドに対応 **
export async function OPTIONS() {
  return NextResponse.json({}, { status: 204, headers: { Allow: 'GET, POST, OPTIONS' } });
}
