// Import the Certificate model
import pkg from "../models/mongooseModels/patientMedicine.mjs";
export const createMedicine = async (req, res) => {
  const certificateData = req.body;
  console.log(req.body)

  try {
    const newCertificate = await pkg.Medicine.create(certificateData);
    res.status(201).json(newCertificate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Controller function to get a certificate by ID
export const getMedicine = async (req, res) => {
  const userId = req.params.userId;
  console.log(userId)

  try {
    const medicine = await pkg.Medicine.find({clientId:userId});
    res.status(200).json(medicine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to update a certificate by ID
export const updateMedicine = async (req, res) => {
  const userId = req.params.userId;
  const updatedData = req.body;

  try {
    const updatedMedicine = await pkg.Medicine.findByIdAndUpdate(
      userId,
      updatedData,
      { new: true }
    );
    res.status(200).json(updatedMedicine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to delete a certificate by ID
export const deleteMedicine = async (req, res) => {
  const userId = req.params.userId;

  try {
    const deletedMedicine = await pkg.Medicine.findByIdAndDelete(userId);
    res.status(200).json(deletedMedicine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
