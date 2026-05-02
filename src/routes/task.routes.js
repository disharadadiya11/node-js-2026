const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const { validate } = require("../middlewares/validation.middleware");
const {
  createTaskSchema,
  updateTaskSchema,
} = require("../validation/task.validation");

router.post("/add", validate(createTaskSchema), taskController.add);

router.put("/update/:id", validate(updateTaskSchema), taskController.update);

router.delete("/delete/:id", taskController.delete);

router.get("/get/:id", taskController.get);

router.get("/get-all", taskController.getAll);

module.exports = router;
