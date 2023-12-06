import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma.client";

const erroEdificeExists = {
  message: 'Edificio não existe'
}

async function checkEdificeIdExists(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  const exists = await prisma.imovel.findFirst({
    where: {
        id
    }
  });

  if (!exists) {
    return res.status(400).json(erroEdificeExists);
  }

  next();
}

export default checkEdificeIdExists;