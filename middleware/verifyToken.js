const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.header("Token");
  if (!token) {
    res
      .status(401)
      .json({ message: "please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, secretKey);
    req.user = data.user;

    next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate using a valid token" });
  }
};
module.exports = verifyToken;
