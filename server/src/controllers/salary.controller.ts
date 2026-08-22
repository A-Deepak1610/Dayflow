import { Request, Response } from 'express';
import prisma from '../lib/prisma';

// Get My Salary Payslips
export const getMySalary = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId || req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const salaries = await prisma.salary.findMany({
      where: { userId },
      orderBy: [
        { year: 'desc' },
        { month: 'desc' },
      ],
    });

    res.status(200).json({ salaries });
  } catch (error: any) {
    console.error('Error fetching salaries:', error);
    res.status(500).json({ message: 'Server error fetching salaries' });
  }
};
