import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

// GET all
router.get("/", async (_, res) => {
  const data = await prisma.appointment.findMany();
  res.json(data);
});

// CREATE booking
router.post("/", async (req, res) => {
  const { date, time, customerId, serviceId, employeeId } = req.body;

  const appointment = await prisma.appointment.create({
    data: { date, time, customerId, serviceId, employeeId }
  });

  res.json(appointment);
});

export default router;
