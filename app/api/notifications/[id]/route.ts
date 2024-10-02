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

    const updatedNotification = await prisma.notification.update({
      where: { id: Number(id) },
      data: { isRead: true },
    });


    return NextResponse.json(updatedNotification, { status: 200 });
  } catch (error) {
    console.error('Error updating notification status:', error);
    return NextResponse.json({ error: 'Error updating notification status' }, { status: 500 });
  }
}
