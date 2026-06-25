import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { authenticate, authorize, AuthRequest } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';

const router = Router();

const serviceSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().positive(),
  duration: z.number().positive()
});

router.get('/', async (req, res) => {
  try {
    const services = await prisma.service.findMany();
    res.json(services);
  } catch (error) {
    throw new AppError(500, 'Failed to fetch services');
  }
});

router.post(
  '/',
  authenticate,
  authorize(['admin']),
  async (req: AuthRequest, res) => {
    try {
      const data = serviceSchema.parse(req.body);
      const service = await prisma.service.create({ data });
      res.status(201).json(service);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new AppError(400, error.errors[0].message);
      }
      throw error;
    }
  }
);

export default router;