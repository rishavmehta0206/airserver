import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log(req.headers.authorization);
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData;
    if (token && token.length < 500) {
      decodedData = jwt.verify(token, "secret");
      req.user = decodedData;
    }
    next();
  } catch (error) {
    res.status(404).json({ message: "not authorized" });
  }
};
