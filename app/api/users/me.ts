import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await verifyToken(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const userInfo = await prisma.user.findUnique({
      where: { id: user.userId },
    });
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user information' });
  }
}
