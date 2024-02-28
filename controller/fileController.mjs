// Import the FileDocument model
import pkg from "../models/mongooseModels/file.mjs";

// Controller functions

// Function to upload a file
async function uploadFile(req, res) {
  const { id, appointmentId } = req.body;
  console.log("🚀 ~ uploadProfilePic ~ clientId:", appointmentId);
  const filePath = req.file.path;
  const fileName = req.file.originalname;

  if (filePath) {
    const filePathModified = filePath.replace("public", "").replace(/\\/g, "/");

    const clientProfile = await pkg.FileDocument.create({
      filePath: filePathModified,
      appointmentId,
      fileName,
    });
    return res.status(200).json(clientProfile);
  }

  return res.status(500).json({ error });
}

// Function to get all uploaded files
async function getAllFiles(req, res) {
  const { appointmentId } = req.query;
  try {
    const files = await pkg.FileDocument.find({ appointmentId });
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Export the controller functions
export { uploadFile, getAllFiles };
