// Import the FileDocument model
import FileDocument from "./FileDocument.mjs";

// Controller functions

// Function to upload a file
async function uploadFile(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { originalname, filename, size, mimetype } = req.file;

    const fileDocument = new FileDocument({
      fileName: originalname,
      filePath: filename,
      fileSize: size,
      fileType: mimetype,
    });

    await fileDocument.save();
    res.status(201).json({ message: "File uploaded successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Function to get all uploaded files
async function getAllFiles(req, res) {
  try {
    const files = await FileDocument.find();
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Export the controller functions
export { uploadFile, getAllFiles };
