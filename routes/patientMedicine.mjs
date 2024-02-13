import express from "express";
const router = express.Router();
import {
  getMedicine,
  updateMedicine,
  deleteMedicine,
  createMedicine,
} from "../controller/patientMedicine.mjs";
import verifyAccessToken from "../middleware/verifyAccessToken .mjs";

router.get("/:userId", verifyAccessToken, getMedicine);
router.put("/:userId", verifyAccessToken, updateMedicine);
router.delete("/:userId", verifyAccessToken, deleteMedicine);
router.post("/", verifyAccessToken, createMedicine);

export default router;
