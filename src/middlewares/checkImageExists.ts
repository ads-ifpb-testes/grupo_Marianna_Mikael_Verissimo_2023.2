import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma.client";

const erroImageNotFound = {
    message: 'Edificio não existe'
}

async function checkImageExists(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { nomeImagem } = req.body
    const exists = await prisma.imagem.findFirst({
        where: {
            imovelId: id,
            nomeImagem
        }
    });

    if (!exists) {
        return res.status(404).json(erroImageNotFound);
    }

    next();
}

export default checkImageExists;