import auth from "./auth.mjs";
import profile from "./profile.mjs";
import education from "./education.mjs";
function setRoutes(app) {
  app.use("/auth", auth);
  app.use("/profile", profile);
  app.use("/education", education);
}

export default setRoutes;
