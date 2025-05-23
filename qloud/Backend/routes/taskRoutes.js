const express = require("express");
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask }
    = require("../controllers/taskControllers");

router.route("/")
    .post(createTask)
    .get(getTasks);
router.put("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

module.exports = router;
