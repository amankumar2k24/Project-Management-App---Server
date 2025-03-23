"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTasks = exports.updatedTask = exports.createTask = exports.getTasks = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getTasks = async (req, res) => {
    const { projectId } = req.query;
    try {
        const tasks = await prisma.task.findMany({
            where: { projectId: Number(projectId), },
            include: { author: true, assignee: true, comments: true, attachments: true, },
        });
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: error.message || "Error in fetching tasks" });
    }
};
exports.getTasks = getTasks;
const createTask = async (req, res) => {
    const { title, description, status, priority, tags, startDate, dueDate, points, projectId, authorUserId, assignedUserId, } = req.body;
    try {
        const newTask = await prisma.task.create({
            data: { title, description, status, priority, tags, startDate, dueDate, points, projectId, authorUserId, assignedUserId, },
        });
        res.status(201).json(newTask);
    }
    catch (error) {
        console.log("error while creatingTask", error);
        res.status(500).json({ message: error.message || "Error while creating task" });
    }
};
exports.createTask = createTask;
const updatedTask = async (req, res) => {
    const { taskId } = req.params;
    const { status } = req.body;
    try {
        const updatedTask = await prisma.task.update({
            where: { id: Number(taskId) },
            data: { status: status },
        });
        res.status(200).json(updatedTask);
    }
    catch (error) {
        res.status(500).json({ message: error.message || "Error while updating task" });
    }
};
exports.updatedTask = updatedTask;
const getUserTasks = async (req, res) => {
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
        });
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: error.message || "Error while getting user tasks" });
    }
};
exports.getUserTasks = getUserTasks;
