import jwt from "jsonwebtoken";

const verifyAccessToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({ message: "Access token not provided" });
  }

  jwt.verify(accessToken, process.env.SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Invalid access token" });
    }

    req.user = decodedToken;

    next();
  });
};

export default verifyAccessToken;
