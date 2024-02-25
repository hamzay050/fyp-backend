import pkg from "../models/mongooseModels/prescribeMedicine.mjs";
import pkgAppointment from "../models/mongooseModels/appointment.mjs";

export async function createMedicine(req, res) {
    const {data} =req.body;
    console.log(data)
    try {
        const newMedicine = await pkg.MedicinePrescribed.create(data)
        res.status(200).json(newMedicine)
    } catch (error) {
        res.status(500).json({error})
    }

}

export async function getMedicine(req,res){
    const {id} = req.params;
    try {
        if(!id){
            res.status(400).json({error:"Invalid information"})
        }
        const getMedicines= await pkg.MedicinePrescribed.find({appointmentId:id})
        res.status(200).json(getMedicines)
    } catch (error) {
        res.status(500).json({error})
    }
}

export async function deleteMedicine(req,res){
    const {id}=req.params;
    try {
        const removeMedicine= await pkg.MedicinePrescribed.findByIdAndDelete(id)
        res.status(200).json(removeMedicine)
    } catch (error) {
        res.status(500).json({error})
    }
}

export async function updateAppointmentStatus(req,res){
  const {id,status} =req.body;
   try {
    const update= await pkgAppointment.Appointment.findByIdAndUpdate(id,{status:status},{new:true})
    res.status(200).json(update)
   } catch (error) {
    res.statue(500).json({error})
   }
}
