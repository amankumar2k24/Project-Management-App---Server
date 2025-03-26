"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const search = async (req, res) => {
    const { query } = req.query;
    try {
        const searchQuery = query ? query.toLowerCase() : "";
        const tasks = await prisma.task.findMany({
            where: {
                OR: [
                    { title: { contains: searchQuery, mode: "insensitive" } },
                    { description: { contains: searchQuery, mode: "insensitive" } }
                ],
            },
        });
        const projects = await prisma.project.findMany({
            where: {
                OR: [
                    { name: { contains: searchQuery, mode: "insensitive" } },
                    { description: { contains: searchQuery, mode: "insensitive" } }
                ],
            },
        });
        const users = await prisma.user.findMany({
            where: {
                OR: [{ username: { contains: searchQuery, mode: "insensitive" } }],
            },
        });
        res.status(200).json({ tasks, projects, users });
    }
    catch (err) {
        res.status(500).json({ error: err.message || "Error occurred in searching" });
    }
};
exports.search = search;
