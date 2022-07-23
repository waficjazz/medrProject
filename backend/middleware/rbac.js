const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  const header = req.headers.authorization;
  const Token = header && header.split(" ")[1];
  if (Token === undefined) {
    return res.status(401).json({ message: "Not authorized" });
  }
  if (Token !== undefined) {
    jwt.verify(Token, "JazzPriavteKey", (err, decodedToken) => {
      if (err) {
        return next(new Error("You are not authorized to perform this action"));
      }
      if (decodedToken.type === "doctor" || decodedToken.type === "hospital") {
        next();
      }
    });
  }
};

exports.auth = auth;
