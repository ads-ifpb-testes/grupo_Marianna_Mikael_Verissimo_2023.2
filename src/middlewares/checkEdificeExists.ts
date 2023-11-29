import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma.client";

const erroEdificeExists = {
  message: 'Edificio já cadastrado'
}

async function checkEdificeExists(req: Request, res: Response, next: NextFunction) {
  const { longitude, latitude } = req.body;

  const exists = await prisma.imovel.findUnique({
    where: {
      longitude,
      latitude
    }
  });

  if (exists) {
    return res.status(400).json(erroEdificeExists);
  }
}