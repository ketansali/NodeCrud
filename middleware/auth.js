const jwt = require("jsonwebtoken");

const ensureAuthorized = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (
    !(typeof bearerHeader !== "undefined" && process.env.secret) ||
    !bearerHeader
  ) {
    return res.status(400).json({
      isSuccess: false,
      message: "Auth token not found",
    });
  }
  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];
  jwt.verify(bearerToken, process.env.secret, (error, user) => {
    if (error) {
      return res.status(400).json({
        isSuccess: false,
        message: "Invalid token!",
        error,
      });
    } else {
      req.user = user;
      next();
    }
  });
};
module.exports = {
  ensureAuthorized,
};
