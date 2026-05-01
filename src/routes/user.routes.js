const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.post("/register", userController.register);

router.post("/login", userController.login);

router.put("/update/:id", userController.update);

router.delete("/delete/:id", userController.delete);

router.get("/get/:id", userController.get);

router.get("/get-all", userController.getAll);

module.exports = router;
