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
  getPatientDetails,
  getPatientApprovedDetails,
  getPatientRejectedDetails,
  getDoctorDetails
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
router.get('/patient-details/:id',getPatientDetails)

router.get('/patient-approved-details/:id',getPatientApprovedDetails)

router.get('/patient-rejected-details/:id',getPatientRejectedDetails)

router.get('/doctor-details',getDoctorDetails)


router.get("/:id", verifyAccessToken, getAppointmentById);

router.put("/:id", verifyAccessToken, updateAppointmentById);

router.delete("/:id", verifyAccessToken, deleteAppointmentById);

export default router;
