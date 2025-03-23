"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeams = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getTeams = async (req, res) => {
    try {
        const teams = await prisma.team.findMany();
        const teamsWithUserNames = await Promise.all(teams.map(async (team) => {
            const productOwner = await prisma.user.findUnique({
                where: { userId: team.productOwnerUserId },
                select: { username: true }
            });
            const productManager = await prisma.user.findUnique({
                where: { userId: team.projectManagerUserId },
                select: { username: true }
            });
            return {
                ...team,
                productOwnerUsername: productOwner === null || productOwner === void 0 ? void 0 : productOwner.username,
                productManagerUsername: productManager === null || productManager === void 0 ? void 0 : productManager.username
            };
        }));
        res.json(teamsWithUserNames);
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ error: error.message || "Error getting teams" });
    }
};
exports.getTeams = getTeams;
