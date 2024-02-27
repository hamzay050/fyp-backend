import pkg from "../models/mongooseModels/clients.mjs";

async function getClientProfile(req, res) {
  const clientId = req.params.clientId;

  try {
    const clientProfile = await pkg.Clients.findOne({ _id: clientId });

    if (!clientProfile) {
      return res.status(404).json({ error: "Client profile not found" });
    }

    return res.status(200).json(clientProfile);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function updateClientProfile(req, res) {
  const clientId = req.params.clientId;
  const updatedData = req.body;

  try {
    const clientProfile = await pkg.Clients.findOneAndUpdate(
      { _id: clientId },
      { $set: updatedData },
      { new: true }
    );

    if (!clientProfile) {
      return res.status(404).json({ error: "Client profile not found" });
    }

    return res.status(200).json(clientProfile);
  } catch (error) {
    return res.status(500).json({ error });
  }
}
async function updateDoctorProfile(req, res) {
  const clientId = req.params.clientId;
  const updatedData = req.body;

  try {
    const clientProfile = await pkg.Clients.findOneAndUpdate(
      { _id: clientId },
      { $set: updatedData },
      { new: true }
    );

    if (!clientProfile) {
      return res.status(404).json({ error: "Client profile not found" });
    }

    return res.status(200).json(clientProfile);
  } catch (error) {
    return res.status(500).json({ error });
  }
}
async function deleteClientProfile(req, res) {
  const clientId = req.params.clientId;

  try {
    const clientProfile = await pkg.Clients.findOne({ _id: clientId });

    if (!clientProfile) {
      return res.status(404).json({ error: "Client profile not found" });
    }

    await clientProfile.remove();

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function getAllPatients(req,res){
  try {
    const patients = await pkg.Clients.find({ role: "patient" });
    return res.status(200).json(patients);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export {
  getClientProfile,
  updateClientProfile,
  deleteClientProfile,
  updateDoctorProfile,
  getAllPatients
};
