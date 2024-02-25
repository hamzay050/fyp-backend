// Import mongoose
import mongoose from "mongoose";

// Define the schema for file documents
const fileDocumentSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

// Create a model from the schema
const FileDocument = mongoose.model("FileDocument", fileDocumentSchema);

// Export the model
export default FileDocument;
