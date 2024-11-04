import { Request, Response } from 'express';
import Task from '../models/Task';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;

    let filter = {};
    if (status === 'completed') {
      filter = { where: { isCompleted: true } };
    } else if (status === 'pending') {
      filter = { where: { isCompleted: false } };
    }

    const tasks = await Task.findAll(filter);

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};
