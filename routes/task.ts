import express from "express";
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from "../controllers/taskController";
import { verifyToken } from "../middlewares/authMiddleware";
import { validateTask } from "../middlewares/validationMiddleware";

const router = express.Router();

router.post("/create", verifyToken, validateTask, createTask);

router.get("/", verifyToken, getAllTasks);

router.get("/:id", verifyToken, getTaskById);

router.put("/:id", verifyToken, validateTask, updateTask);

router.delete("/:id", verifyToken, deleteTask);

export default router;