const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.sendStatus(403);
  }

  const jwtToken = authHeader.split(" ")[1];

  try {
    const verify = jwt.verify(jwtToken, JWT_SECRET);
    if (verify) {
      req.userId = verify.userId
      next();
    }
  } catch (error) {
    if (error) {
      return res.sendStatus(403);
    }
  }

}

module.exports = {
  authMiddleware
}