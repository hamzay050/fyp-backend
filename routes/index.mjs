import auth from "./auth.mjs";
import profile from "./profile.mjs";
import education from "./education.mjs";
import certificate from "./certificates.mjs";
import jobs from "./jobs.mjs";
import patientMedicine from "./patientMedicine.mjs";
import timeSlot from "./timeSlot.mjs";
import doctor from "./doctors.mjs";
import appointments from "./appointments.mjs";
import prescribeMedicine from "./prescribeMedicine.mjs";

import chat from "./chat.mjs";
function setRoutes(app) {
  app.use("/auth", auth);
  app.use("/profile", profile);
  app.use("/education", education);
  app.use("/certificate", certificate);
  app.use("/jobs", jobs);
  app.use("/medicine", patientMedicine);
  app.use("/timeSlot", timeSlot);
  app.use("/doctor", doctor);
  app.use("/appointment", appointments);
  app.use("/prescribe-medicine", prescribeMedicine);
  app.use("/messages", chat);
}

export default setRoutes;
