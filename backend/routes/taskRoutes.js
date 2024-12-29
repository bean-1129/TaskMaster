const express = require("express");
const { createTask, getTasks, updateTask, deleteTask, getTaskStats, getTask } = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTask); 
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/stats", getTaskStats);

module.exports = router;
