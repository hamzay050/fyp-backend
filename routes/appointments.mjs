import express from "express";
const router = express.Router();
import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentById,
  deleteAppointmentById,
  getAppointmentByPatientId,
  getAppointmentByDoctorId,
} from "../controller/appointments.mjs";
import verifyAccessToken from "../middleware/verifyAccessToken .mjs";

router.post(
  "/",

  verifyAccessToken,
  createAppointment
);
router.get("/", verifyAccessToken, getAllAppointments);
router.get(
  "/by-patient-id",

  verifyAccessToken,
  getAppointmentByPatientId
);
router.get(
  "/by-doctor-id",

  verifyAccessToken,
  getAppointmentByDoctorId
);

router.get("/:id", verifyAccessToken, getAppointmentById);

router.put("/:id", verifyAccessToken, updateAppointmentById);

router.delete("/:id", verifyAccessToken, deleteAppointmentById);

export default router;
