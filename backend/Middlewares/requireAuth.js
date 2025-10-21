const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers["authorization"]; 

  if (!auth) {
    return res.status(403).json({ message: "Authorization header missing. JWT is missing!" });
  }

  const token = auth.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Token format invalid!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next(); 
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token!" });
  }
};

module.exports = ensureAuthenticated;