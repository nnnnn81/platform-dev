import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await verifyToken(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') {
    try {
      const applications = await prisma.application.findMany({
        where: { userId: user.userId },
      });
      res.status(200).json(applications);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching applications' });
    }
  } else if (req.method === 'POST') {
    const { purpose, amount } = req.body;
    try {
      const application = await prisma.application.create({
        data: {
          userId: user.userId,
          purpose,
          amount,
          status: 'PENDING',
        },
      });
      res.status(201).json(application);
    } catch (error) {
      res.status(500).json({ error: 'Error creating application' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
