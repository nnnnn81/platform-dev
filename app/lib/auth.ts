import { NextApiRequest } from 'next';
import jwt from 'jsonwebtoken';

export const verifyToken = async (req: NextApiRequest) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded as {
      role: string; userId: number
    };
  } catch (error) {
    return null;
  }
};
