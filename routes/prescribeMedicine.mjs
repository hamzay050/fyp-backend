import express from "express"
import { createMedicine, getMedicine, deleteMedicine, updateAppointmentStatus,getPatientData,getAppointmentStatus } from "../controller/prescribeMedicine.mjs";

const router= express.Router();

router.post('/',createMedicine)
router.get('/:id',getMedicine)
router.delete('/:id',deleteMedicine)
router.put('/',updateAppointmentStatus)
router.get('/patient/:id',getPatientData)
router.get('/appointment-status/:id',getAppointmentStatus)

export default router;