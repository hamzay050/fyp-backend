import express from "express"
import { createMedicine, getMedicine, deleteMedicine, updateAppointmentStatus } from "../controller/prescribeMedicine.mjs";

const router= express.Router();

router.post('/',createMedicine)
router.get('/:id',getMedicine)
router.delete('/:id',deleteMedicine)
router.put('/',updateAppointmentStatus)

export default router;