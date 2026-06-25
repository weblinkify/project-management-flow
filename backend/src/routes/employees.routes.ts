import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { authenticate, authorize, AuthRequest } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';

const router = Router();

const employeeSchema = z.object({
  userId: z.string(),
  specialization: z.string().optional()
});

router.get('/', async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      include: { user: { select: { id: true, name: true, email: true } } }
    });
    res.json(employees);
  } catch (error) {
    throw new AppError(500, 'Failed to fetch employees');
  }
});

router.post(
  '/',
  authenticate,
  authorize(['admin']),
  async (req: AuthRequest, res) => {
    try {
      const data = employeeSchema.parse(req.body);
      const employee = await prisma.employee.create({
        data,
        include: { user: true }
      });
      res.status(201).json(employee);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new AppError(400, error.errors[0].message);
      }
      throw error;
    }
  }
);

export default router;