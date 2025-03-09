import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.query;
  try {
    const tasks = await prisma.task.findMany({
      where: { projectId: Number(projectId), },
      include: { author: true, assignee: true, comments: true, attachments: true, },
    });
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Error in fetching tasks" });
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  const { title, description, status, priority, tags, startDate, dueDate, points, projectId, authorUserId, assignedUserId, } = req.body;
  try {
    const newTask = await prisma.task.create({
      data: { title, description, status, priority, tags, startDate, dueDate, points, projectId, authorUserId, assignedUserId, },
    });
    res.status(201).json(newTask);
  } catch (error: any) {
    console.log("error while creatingTask", error)
    res.status(500).json({ message: error.message || "Error while creating task" });
  }
};

export const updatedTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const { status } = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: { id: Number(taskId) },
      data: { status: status },
    });
    res.status(200).json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Error while updating task" });
  }
};

export const getUserTasks = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  console.log("userID", userId);
  try {

    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { assignedUserId: Number(userId) },
          { authorUserId: Number(userId) }
        ]
      },
      include: { author: true, assignee: true }
    })
    res.json(tasks)

  } catch (error: any) {
    res.status(500).json({ message: error.message || "Error while getting user tasks" })
  }
}