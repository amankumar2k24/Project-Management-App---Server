"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeams = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getTeams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teams = yield prisma.team.findMany();
        const teamsWithUserNames = yield Promise.all(teams.map((team) => __awaiter(void 0, void 0, void 0, function* () {
            const productOwner = yield prisma.user.findUnique({
                where: { userId: team.productOwnerUserId },
                select: { username: true }
            });
            const productManager = yield prisma.user.findUnique({
                where: { userId: team.projectManagerUserId },
                select: { username: true }
            });
            return Object.assign(Object.assign({}, team), { productOwnerUsername: productOwner === null || productOwner === void 0 ? void 0 : productOwner.username, productManagerUsername: productManager === null || productManager === void 0 ? void 0 : productManager.username });
        })));
        res.json(teamsWithUserNames);
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ error: error.message || "Error getting teams" });
    }
});
exports.getTeams = getTeams;
