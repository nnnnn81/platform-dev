import { verifyToken } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
export async function GET(req: NextRequest) {
  try {
    const user = await verifyToken(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const applications = await prisma.application.findMany();

    return NextResponse.json(applications, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching applications' }, { status: 500 });
  }
}