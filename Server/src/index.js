const express = require("express");
const app = express();
const userRoutes = require("./routes/user.route");
const courseRoutes = require("./routes/course.route");
const paymentRoute = require("./routes/payment.route");
const userprofileRoute = require("./routes/profile.route");

const database = require("./config/db.config");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { cloudinaryConnect } = require("./config/cloudinary.config");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

//middlewares
app.use(express.json());
app.use(express.cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);
//cloudiniary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth/", userRoutes);
app.use("/api/v1/profile/", userprofileRoute);
app.use("/api/v1/payment/", paymentRoute);
app.use("/api/v1/course/", courseRoutes);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: `Your server is up and running...`,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
