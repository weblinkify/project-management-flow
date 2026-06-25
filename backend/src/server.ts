import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth";
import appointmentRoutes from "./routes/appointments";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => res.json({ status: "BookFlow API running" }));

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
