// Import the Specialization model
import pkg from "../models/mongooseModels/specialization.mjs";

// Controller function to get Specialization by ID
export const getSpecialization = async (req, res) => {
  const clientId = req.params.clientId;
  console.log("🚀 ~ getSpecialization ~ clientId:", clientId);

  try {
    const specialization = await pkg.Specialization.find({ clientId });
    res.status(200).json(specialization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to create a new Specialization
export const createSpecialization = async (req, res) => {
  const specializationData = req.body;

  try {
    const newSpecialization = await pkg.Specialization.create(specializationData);
    res.status(201).json(newSpecialization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to update Specialization by ID
export const updateSpecialization = async (req, res) => {
  const specializationId = req.params.specializationId;
  const updatedData = req.body;

  try {
    const updatedSpecialization = await pkg.Specialization.findOneAndUpdate(
      specializationId,
      updatedData,
      { new: true }
    );
    res.status(200).json(updatedSpecialization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to delete Specialization by ID
export const deleteSpecialization = async (req, res) => {
  const specializationId = req.params.specializationId;

  try {
    const deletedSpecialization = await pkg.Specialization.findByIdAndDelete(specializationId);
    res.status(200).json(deletedSpecialization);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
