const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true },
    password: { type: String },
    mobile: { type: String },
    role: { type: String },
    file: { type: String },
    meta: {
      createdAt: { type: Date, default: Date.now() },
      updatedAt: { type: Date },
      deletedAt: { type: Date },
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model("User", userSchema);
