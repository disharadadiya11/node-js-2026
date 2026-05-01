const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    userIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
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

module.exports = mongoose.model("Task", taskSchema);
