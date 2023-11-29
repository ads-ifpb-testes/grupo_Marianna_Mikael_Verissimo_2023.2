import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma.client";

//*middleware*//

export async function checkExistsUserAccount(req: Request, res: Response, next: NextFunction) {
    const { id, username } = req.params as { id?: string; username?: string };

    const userFound = await prisma.usuario.findUnique({
        where: {
            id,
            username
        },

    })

    if (!userFound){
        return res.status(400).json({error: "Usuário não existe"});
    }
    
    next();
}