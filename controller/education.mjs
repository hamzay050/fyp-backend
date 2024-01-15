// Import the Education model
import Education from "../models/educationModel.mjs";

// Controller function to get education by ID
export const getEducation = async (req, res) => {
  const educationId = req.params.educationId;

  try {
    const education = await Education.findById(educationId);
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
    const newEducation = await Education.create(educationData);
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
    const updatedEducation = await Education.findByIdAndUpdate(
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
    const deletedEducation = await Education.findByIdAndDelete(educationId);
    res.status(200).json(deletedEducation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
