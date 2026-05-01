const express = require("express");
const router = express.Router();

router.use("/user", require("./user.routes"));

router.use("/task", require("./task.routes"));

module.exports = router;
