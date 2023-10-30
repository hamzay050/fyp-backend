import jwt from "jsonwebtoken";
import pkg from "../models/mongooseModels/clients.mjs";
import { jwtDecode } from "jwt-decode";
import { httpError } from "./httpError.mjs";

function getAuthToken(email) {
  const token = jwt.sign({ email: email }, process.env.SECRET, {
    expiresIn: "950s",
  });
  return token;
}
function getToken(email) {
  const token = jwt.sign({ email: email }, process.env.SECRET);
  return token;
}
function verifyToken(req, res, next) {
  const { token } = req.body;
  if (!token) return res.fail({ error });
  try {
    jwt.verify(token, process.env.SECRET);
    next();
  } catch (err) {
    httpError(err);
  }
}

async function accessToken(data) {
  const token = jwt.sign(data, process.env.SECRET, {
    expiresIn: "86400s",
  });
  return token;
}

async function authorizeAdmin(req, res, next) {
  const { accessToken } = req.cookies;
  if (!accessToken) return httpError("No access Token is provided");
  try {
    jwt.verify(accessToken, process.env.SECRET);
    const decode = jwtDecode(accessToken);
    const record = await pkg.Clients.findOne({
      where: { email: decode.email },
    });

    if (record.isAdmin) {
      req.session = record;
      next();
    } else res.fail({ code: 401, error: { message: "UnAuthorize" } });
  } catch (err) {
    res.fail({ code: 401, error: { message: err.message } });
  }
}

async function authorizeUser(req, res, next) {
  const { accessToken } = req.cookies;
  console.log(accessToken);
  if (!accessToken) return httpError("No access Token is provided");
  try {
    jwt.verify(accessToken, process.env.SECRET);
    const decode = jwtDecode(accessToken);
    const record = await pkg.Clients.findOne({
      where: { email: decode.email },
    });
    if (!record.isAdmin) {
      req.session = record;
      next();
    } else res.fail({ code: 401, error: { message: "UnAuthorize" } });
  } catch (err) {
    res.fail({ code: 401, error: { message: err.message } });
  }
}

export {
  getAuthToken,
  getToken,
  verifyToken,
  accessToken,
  authorizeUser,
  authorizeAdmin,
};
