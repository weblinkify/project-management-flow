import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { authenticate, authorize, AuthRequest } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';
import { logger } from '../utils/logger.js';

const router = Router();

const appointmentSchema = z.object({
  customerId: z.string(),
  serviceId: z.string(),
  employeeId: z.string(),
  date: z.string().datetime(),
  notes: z.string().optional()
});

router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        customer: { select: { id: true, name: true, email: true } },
        service: { select: { id: true, name: true, duration: true } },
        employee: { select: { id: true, name: true } }
      },
      orderBy: { date: 'asc' }
    });

    res.json(appointments);
  } catch (error) {
    logger.error('Error fetching appointments:', error);
    throw new AppError(500, 'Failed to fetch appointments');
  }
});

router.post(
  '/',
  authenticate,
  authorize(['admin', 'employee']),
  async (req: AuthRequest, res) => {
    try {
      const { customerId, serviceId, employeeId, date, notes } = appointmentSchema.parse(req.body);

      const service = await prisma.service.findUnique({ where: { id: serviceId } });
      if (!service) throw new AppError(404, 'Service not found');

      const startTime = new Date(date);
      const endTime = new Date(startTime.getTime() + service.duration * 60000);

      const conflict = await prisma.appointment.findFirst({
        where: {
          employeeId,
          date: { gte: startTime, lt: endTime }
        }
      });

      if (conflict) {
        throw new AppError(400, 'Time slot not available');
      }

      const appointment = await prisma.appointment.create({
        data: {
          customerId,
          serviceId,
          employeeId,
          date: startTime,
          notes
        },
        include: {
          customer: true,
          service: true,
          employee: true
        }
      });

      logger.info(`Appointment created: ${appointment.id}`);

      res.status(201).json(appointment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new AppError(400, error.errors[0].message);
      }
      throw error;
    }
  }
);

export default router;