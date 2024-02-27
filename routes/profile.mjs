import express from "express";
const router = express.Router();
import {
  getClientProfile,
  updateClientProfile,
  deleteClientProfile,
  updateDoctorProfile,
  getAllPatients
} from "../controller/clientProfile.mjs";
import verifyAccessToken from "../middleware/verifyAccessToken .mjs";

router.get("/:clientId", verifyAccessToken, getClientProfile);
router.put("/:clientId", verifyAccessToken, updateClientProfile);
router.put("/update-doctor-profile", verifyAccessToken, updateDoctorProfile);
router.delete("/:clientId", verifyAccessToken, deleteClientProfile);
router.get('/patient/profiles',getAllPatients)

export default router;
