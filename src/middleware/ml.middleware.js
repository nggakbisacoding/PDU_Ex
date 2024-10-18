export const mlMiddleware = (req, res, next) => {
  const mlHeader = req.headers["x-ml-secret-token"];
  const token = mlHeader;
  // console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (token !== process.env.ML_TOKEN_SECRET) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
