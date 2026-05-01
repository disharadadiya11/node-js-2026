const fs = require("fs");
const path = require("path");

module.exports.uploadFile = async (file, baseUrl) => {
  if (!file) return null;

  // validation
  const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
  if (!allowedTypes.includes(file.mimetype)) {
    throw new Error("Only PNG, JPG, PDF allowed");
  }

  if (file.size > 2 * 1024 * 1024) {
    throw new Error("File size must be less than 2MB");
  }

  // ensure folder exists
  const uploadDir = path.join(__dirname, "../uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  // unique name
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

  const uploadPath = path.join(uploadDir, fileName);

  // move file
  await file.mv(uploadPath);

  return `${baseUrl}/uploads/${fileName}`;
};
