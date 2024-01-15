// Import the Certificate model
import Education from "../models/certificateModel.mjs";
export const createCertificate = async (req, res) => {
  const certificateData = req.body;

  try {
    const newCertificate = await Education.create(certificateData);
    res.status(201).json(newCertificate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Controller function to get a certificate by ID
export const getCertificate = async (req, res) => {
  const certificateId = req.params.certificateId;

  try {
    const certificate = await Education.findById(certificateId);
    res.status(200).json(certificate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to update a certificate by ID
export const updateCertificate = async (req, res) => {
  const certificateId = req.params.certificateId;
  const updatedData = req.body;

  try {
    const updatedCertificate = await Education.findByIdAndUpdate(
      certificateId,
      updatedData,
      { new: true }
    );
    res.status(200).json(updatedCertificate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to delete a certificate by ID
export const deleteCertificate = async (req, res) => {
  const certificateId = req.params.certificateId;

  try {
    const deletedCertificate = await Education.findByIdAndDelete(certificateId);
    res.status(200).json(deletedCertificate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
