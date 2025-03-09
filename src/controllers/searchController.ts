import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const search = async (req: Request, res: Response) => {
    const { query } = req.query;

    try {
        const searchQuery = query ? (query as string).toLowerCase() : "";
        const tasks = await prisma.task.findMany({
            where: {
                OR: [
                    { title: { contains: searchQuery, mode: "insensitive" } },
                    { description: { contains: searchQuery, mode: "insensitive" } }
                ],
            },
        })
        const projects = await prisma.project.findMany({
            where: {
                OR: [
                    { name: { contains: searchQuery, mode: "insensitive" } },
                    { description: { contains: searchQuery, mode: "insensitive" } }
                ],
            },
        })
        const users = await prisma.user.findMany({
            where: {
                OR: [{ username: { contains: searchQuery, mode: "insensitive" } }],
            },
        })

        res.status(200).json({ tasks, projects, users })
    } catch (err: any) {
        res.status(500).json({ error: err.message || "Error occurred in searching" })
    }
}