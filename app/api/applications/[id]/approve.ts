import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await verifyToken(req);
  if (!user || user.role !== 'ADMIN') return res.status(401).json({ error: 'Unauthorized' });

  const { id } = req.query;

  if (req.method === 'PATCH') {
    try {
      const application = await prisma.application.update({
        where: { id: Number(id) },
        data: { status: 'APPROVED' },
      });
      res.status(200).json(application);
    } catch (error) {
      res.status(500).json({ error: 'Error approving application' });
    }
  } else {
    res.setHeader('Allow', ['PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
