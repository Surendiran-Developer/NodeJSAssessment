import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Task } from "../models/task";

export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, status } = req.body;

        const task = getRepository(Task).create({ title, description, status });
        
        await getRepository(Task).save(task);

        res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }
};

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const status = req.query.status as string;

        const filterCondition = status
            ? { where: { status: status.toLowerCase() } }
            : {};

        const tasks = await getRepository(Task).find(filterCondition);

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving tasks", error });
    }
};

export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const taskRepository = getRepository(Task);
        const task = await taskRepository.findOne(id);

        if (!task) {
            res.status(404).json({ message: "Task not found" });
            return;
        }

        task.status = status;
        await taskRepository.save(task);

        res.status(200).json({ message: "Task status updated successfully", task });
    } catch (error) {
        res.status(500).json({ message: "Error updating task status", error });
    }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const taskRepository = getRepository(Task);
        const task = await taskRepository.findOne(id);

        if (!task) {
            res.status(404).json({ message: "Task not found" });
            return;
        }

        await taskRepository.remove(task);

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
};