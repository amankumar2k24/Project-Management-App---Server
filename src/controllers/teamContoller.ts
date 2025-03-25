import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const teams = await prisma.team.findMany();

    const teamsWithUserNames =  await Promise.all(
      teams.map(async (team: any) => {
        const productOwner = await prisma.user.findUnique({
          where: { userId: team.productOwnerUserId! },
          select: { username: true }
        })
        const productManager = await prisma.user.findUnique({
          where: { userId: team.projectManagerUserId! },
          select: { username: true }
        })

        return {
          ...team,
          productOwnerUsername: productOwner?.username,
          productManagerUsername: productManager?.username
        }
      })
    )
    res.json(teamsWithUserNames)
  } catch (error: any) {
    console.log("error", error)
    res.status(500).json({ error: error.message || "Error getting teams" })
  }
}