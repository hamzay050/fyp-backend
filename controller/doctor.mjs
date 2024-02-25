import pkg from "../models/mongooseModels/clients.mjs";

async function getDoctorProfile(req, res) {
  const { doctorId } = req.query;

  try {
    const doctorProfile = await pkg.Clients.findOne({ _id: doctorId });

    if (!doctorProfile) {
      return res.status(404).json({ error: "Client profile not found" });
    }

    return res.status(200).json(doctorProfile);
  } catch (error) {
    return res.status(500).json({ error });
  }
}
async function getAllDoctors(req, res) {
  try {
    const doctors = await pkg.Clients.find({ role: "doctor" });

    if (!doctors) {
      return res.status(404).json({ error: "Client profile not found" });
    }

    return res.status(200).json(doctors);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export { getDoctorProfile, getAllDoctors };
