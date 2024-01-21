// Import the Education model
import pkg from "../models/mongooseModels/education.mjs";

// Controller function to get education by ID
export const getEducation = async (req, res) => {
  const clientId = req.params.clientId;
  console.log("🚀 ~ getEducation ~ clientId:", clientId);

  try {
    const education = await pkg.Education.find({ clientId });
    res.status(200).json(education);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to create a new education
export const createEducation = async (req, res) => {
  const educationData = req.body;

  try {
    const newEducation = await pkg.Education.create(educationData);
    res.status(201).json(newEducation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to update education by ID
export const updateEducation = async (req, res) => {
  const educationId = req.params.educationId;
  const updatedData = req.body;

  try {
    const updatedEducation = await pkg.Education.findOneAndUpdate(
      educationId,
      updatedData,
      { new: true }
    );
    res.status(200).json(updatedEducation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to delete education by ID
export const deleteEducation = async (req, res) => {
  const educationId = req.params.educationId;

  try {
    const deletedEducation = await pkg.Education.findByIdAndDelete(educationId);
    res.status(200).json(deletedEducation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
