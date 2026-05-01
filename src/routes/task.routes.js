const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");

router.post("/add", taskController.add);

router.put("/update/:id", taskController.update);

router.delete("/delete/:id", taskController.delete);

router.get("/get/:id", taskController.get);

router.get("/get-all", taskController.getAll);

module.exports = router;
