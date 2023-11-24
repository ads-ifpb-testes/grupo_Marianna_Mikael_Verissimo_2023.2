import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/repositoryUser";

//*middleware*//

export async function checkExistsUserAccount(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params as {id:string};

    const userFound = await prisma.usuario.findUnique({
        where: {
            id
        }
    })

    if (!userFound){
        return res.status(400).json({error: "Usuário não existe"});
    }
    
    next();
}