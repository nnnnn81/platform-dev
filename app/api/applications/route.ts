import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { verifyToken } from '@/app/lib/auth';

// ** GET リクエストのハンドラー **
// 特定のアプリケーションを取得
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
