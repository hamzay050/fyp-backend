import express from "express";
const router = express.Router();
import {
  getClientProfile,
  updateClientProfile,
  deleteClientProfile,
  updateDoctorProfile,
} from "../controller/clientProfile.mjs";
import verifyAccessToken from "../middleware/verifyAccessToken .mjs";

router.get("/:clientId", verifyAccessToken, getClientProfile);
router.put("/:clientId", verifyAccessToken, updateClientProfile);
router.put("/update-doctor-profile", verifyAccessToken, updateDoctorProfile);

router.delete("/:clientId", verifyAccessToken, deleteClientProfile);

export default router;
