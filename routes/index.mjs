import auth from "./auth.mjs";

function setRoutes(app) {
  app.use("/auth", auth);
}

export default setRoutes;
