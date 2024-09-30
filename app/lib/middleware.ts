// middleware.ts
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  const token = req.headers.get('Authorization')?.split(' ')[1];
  let user;

  // トークンが存在する場合はデコード
  if (token) {
    try {
      user = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number; role: string };
    } catch (err) {
      console.error('Invalid token:', err);
    }
  }

  // '/dashboard/user' パスへのアクセス制御
  if (req.nextUrl.pathname.startsWith('/dashboard/user')) {
    if (!user || user.role !== 'USER') {
      localStorage.removeItem('token');
      return NextResponse.redirect(new URL('/', req.url)); // ログインページにリダイレクト
    }
  }

  // '/dashboard/admin' パスへのアクセス制御
  if (req.nextUrl.pathname.startsWith('/dashboard/admin')) {
    if (!user || user.role !== 'ADMIN') {
      localStorage.removeItem('token');
      return NextResponse.redirect(new URL('/', req.url)); // ログインページにリダイレクト
    }
  }

  return NextResponse.next();
}

// Middlewareを適用するパスを指定
export const config = {
  matcher: ['/dashboard/:path*'], // '/dashboard/' 以下のすべてのパスに適用
};
