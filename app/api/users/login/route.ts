import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    // リクエストボディを JSON としてパース
    const { email, password } = await req.json();

    // ユーザーをメールアドレスで検索
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // ユーザーが存在しないか、パスワードが一致しない場合は 401 エラーを返す
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // JWT トークンを生成
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    // 成功レスポンスを返す
    return NextResponse.json({ token, user }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}

// 他の HTTP メソッドへの対応
export async function OPTIONS() {
  return NextResponse.json({}, { status: 204, headers: { 'Allow': 'POST, OPTIONS' } });
}
