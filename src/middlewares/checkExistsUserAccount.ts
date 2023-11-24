import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/repositoryUser";

//*middleware*//

export async function checkExistsUserAccount(req: Request, res: Response, next: NextFunction) {
    const { username } = req.headers as {username:string};

    const userFound = await prisma.usuario.findUnique({
        where: {
            username
        }
    })

    if (!userFound){
        return res.status(400).json({error: "user not found"});
    }

    req.user = userFound;
    next();
}