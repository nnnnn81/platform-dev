import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await verifyToken(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const application = await prisma.application.findUnique({
        where: { id: Number(id) },
      });
      if (!application || application.userId !== user.userId) {
        return res.status(404).json({ error: 'Application not found' });
      }
      res.status(200).json(application);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching application' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
