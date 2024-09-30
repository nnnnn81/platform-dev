'use client'
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function verifyToken(req: NextRequest) {
  const token = req.headers.get('Authorization')?.split(' ')[1];
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded as {
      role: string; userId: number
    };
  } catch (err) {
    return null;
  }
}
