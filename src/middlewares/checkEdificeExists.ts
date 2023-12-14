import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma.client";
import { Imovel } from "../model/Imovel";

const erroEdificeExists = {
  message: 'Edificio já cadastrado'
}

async function checkEdificeExists(req: Request, res: Response, next: NextFunction) {
  const { nome, tipo, longitude, latitude } = req.body;

  const exists = await prisma.imovel.findMany({
    where: {
      nome,
      tipo,
      longitude,
      latitude
    }
  }) as Imovel[];

  if (exists && exists.length > 0) {
    return res.status(400).json(erroEdificeExists);
  }

  next();
}

export default checkEdificeExists;