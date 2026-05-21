const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  //First check do we have header or not for this thing
  const authToken = req.headers.authorization;

  //console.log(authToken);

  if (!authToken) {
    return res
      .status(401)
      .json({ error: "You don't have an authorization token" });
  }

  //Extract Jwt from the authentication header
  const token = authToken.split(" ")[1];

  //Do the authentication
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    //Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Invalid Token" });
  }
};

// Generating the JWT token
const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 30000 });
};

module.exports = { jwtAuthMiddleware, generateToken };
