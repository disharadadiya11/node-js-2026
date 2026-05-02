const express = require("express");
const userController = require("../controllers/user.controller");
const { validate } = require("../middlewares/validation.middleware");
const {
  registerSchema,
  loginSchema,
  updateUserSchema,
} = require("../validation/user.validation");
const router = express.Router();

router.post("/register", validate(registerSchema), userController.register);

router.post("/login", validate(loginSchema), userController.login);

router.put("/update/:id", userController.update);

router.delete("/delete/:id", userController.delete);

router.get("/get/:id", userController.get);

router.get("/get-all", userController.getAll);

module.exports = router;
