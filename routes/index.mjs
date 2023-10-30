import auth from "./auth.mjs";
import profile from "./profile.mjs";

function setRoutes(app) {
  app.use("/auth", auth);
  app.use("/profile", profile);
}

export default setRoutes;
