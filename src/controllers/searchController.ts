import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const search = async (req : Request, res : Response)=>{
    const {query} = req.query;
    try{ 
       const tasks = await prisma.task.findMany({
        where : {
            OR : [
                {title : {contains: query as string}},
                {description : {contains : query as string}}
            ],
        },
       })
       const projects = await prisma.project.findMany({
        where : {
            OR : [
                {name : {contains: query as string}},
                {description : {contains : query as string}}
            ],
        },
       })
       const users = await prisma.user.findMany({
        where : {
            OR : [{username : {contains : query as string}}],
        },
       })

        res.status(200).json({tasks, projects, users})
    }catch(err : any){
        res.status(500).json({error : err.message || "Error occurred in searching"}) 
    }
}