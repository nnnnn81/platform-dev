import { verifyToken } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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