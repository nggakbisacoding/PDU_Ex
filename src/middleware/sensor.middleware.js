export const sensorMiddleware = (req, res, next) => {
  const sensorHeader = req.headers["x-well-secret-token"];
  const token = sensorHeader;
  // console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.sensor = token;
  next();
};
