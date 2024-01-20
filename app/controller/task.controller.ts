import { Request, Response } from "express";
import Task, { ITaskDocument } from "../models/task.model";

export const create_task = async (req: Request, res: Response) => {
  try {
    const { userId, url, request_body, headers, token, scheduled_time } =
      req.body;

    const newTask: ITaskDocument = new Task({
      userId,
      url,
      requestBody: request_body,
      headers,
      token,
      scheduledTime: scheduled_time,
    });
    await newTask.save();

    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const get_tasks = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;

    const tasks = await Task.find({ userId });

    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const update_task = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;
    const { retries, max_retries } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.retries = retries;
    task.maxRetries = max_retries;

    await task.save();

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const delete_task = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
