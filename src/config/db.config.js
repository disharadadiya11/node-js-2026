const mongoose = require("mongoose");

module.exports.dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("datababase connection successfully...");
  } catch (error) {
    console.log("datababase connection failed...", error);
  }
};
