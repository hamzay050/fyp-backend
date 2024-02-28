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
async function uploadProfilePic(req, res) {
  const { id, clientId } = req.body;
  console.log("🚀 ~ uploadProfilePic ~ clientId:", clientId);
  const filePath = req.file.path;
  console.log("🚀 ~ uploadProfilePic ~ filePath:", filePath);
  if (filePath) {
    const filePathModified = filePath.replace("public", "").replace(/\\/g, "/");

    const clientProfile = await pkg.Clients.findOneAndUpdate(
      { _id: clientId },
      { profilePicture: filePathModified }
    );
    return res.status(200).json(clientProfile);
  }

  return res.status(500).json({ error });
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

async function getAllPatients(req, res) {
  try {
    const patients = await pkg.Clients.find({ role: "patient" });
    return res.status(200).json(patients);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function getMonthlyRegisteration(req,res){
  try {
    const data = await Client.aggregate([
      {
        $project: {
          userType: { $cond: { if: { $eq: ["$role", "doctor"] }, then: "doctor", else: "patient" } },
          yearMonth: { $dateToString: { format: "%Y-%m", date: "$registration_date" } }
        }
      },
      {
        $group: {
          _id: { userType: "$userType", yearMonth: "$yearMonth" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.yearMonth": 1 }
      }
    ]);
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({error})
  }
}

export {
  getClientProfile,
  updateClientProfile,
  deleteClientProfile,
  updateDoctorProfile,
  getAllPatients,
  uploadProfilePic,
  getMonthlyRegisteration
};
