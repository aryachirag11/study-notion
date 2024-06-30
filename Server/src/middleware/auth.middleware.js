const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.authenticateUser = async (req, res, next) => {
  try {
    //extract token
    const incomingToken =
      req.body?.accessToken ||
      req.cookies?.accessToken ||
      req.header("Authorization").replace("Bearer ", "");

    //check if token present
    if (!incomingToken) {
      return res.status(401).json({
        success: false,
        message: "missing token",
      });
    }
    //verify token
    const decodedToken = jwt.verify(incomingToken, process.env.JWT_SECRET_KEY);
    if (!decodedToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }

    // check if token is realted to some user
    const user = await User.findById(decodedToken?.tokenPayload?.id).select(
      "-password -accessToken"
    );
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not found,  invalid token for the user",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Not able to authenticate",
      message: error?.message,
    });
  }
};

exports.verifyStudent = (req, res, next) => {
  try {
    if (req.user?.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "Secured route for students only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Student verification failed",
    });
  }
};

exports.verifyInstructor = (req, res, next) => {
  try {
    if (req.user?.role !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "Secured route for Instructor only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Instructor verification failed",
    });
  }
};

exports.verifyAdmin = (req, res, next) => {
  try {
    if (req.user?.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "Secured route for admins only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Admin verification failed",
    });
  }
};

export { authenticateUser, verifyStudent, verifyAdmin };
