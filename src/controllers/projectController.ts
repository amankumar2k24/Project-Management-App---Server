import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const getProjects = async (req: Request, res: Response): Promise<void> => {
    try {
        const projects = await prisma.project.findMany();
        res.json(projects)
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error while getting projects" })
    }
}

export const createProject =  async (req: Request, res: Response): Promise<void> => {
    const { name, description, startDate, endDate } = req.body;
    try {
        const newProject = await prisma.project.create({
            data: { name, description, startDate, endDate }
        })
        res.status(201).json(newProject);
    } catch (error: any) {
        console.log("error", error)
        res.status(500).json({ message: error.message || "Error while creating project" })
    }
}