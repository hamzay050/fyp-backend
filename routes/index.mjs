import auth from "./auth.mjs";
import profile from "./profile.mjs";
import education from "./education.mjs";
import certificate from "./certificates.mjs"
import jobs from "./jobs.mjs"

function setRoutes(app) {
  app.use("/auth", auth);
  app.use("/profile", profile);
  app.use("/education", education);
  app.use("/certificate", certificate);
  app.use("/jobs",jobs);
}

export default setRoutes;
