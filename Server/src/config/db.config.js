const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`
      \nMongoDB CONNECTION SUCCESSFUL :: DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDB CONNECTION FAILED");
    console.error(error);
    process.exit(1);
  }
};
