import express from "express";
import {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
    updateTaskStatus
} from "../controllers/taskController.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/", verifyToken, createTask);
router.get("/", verifyToken, getTasks);
router.get("/:id", verifyToken, getTask);
router.put("/:id", verifyToken, updateTask);
router.patch("/:id/status", verifyToken, updateTaskStatus);
router.delete("/:id", verifyToken, deleteTask);

export default router;