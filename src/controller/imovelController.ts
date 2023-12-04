import { Request, Response } from "express";
import { ImovelHandle } from "../services/imovelServices";

export class ImovelController {
  static async add(req: Request, res: Response){
    const resp = await ImovelHandle.create(req.body);

    return res.status(resp.status).json(resp.message);
  }

  static async list(req: Request, res: Response){
    const resp = await ImovelHandle.list();

    return res.status(200).json(resp);
  }

  static async delete(req: Request, res: Response){
    const { id } = req.params;

    const resp = await ImovelHandle.delete(id);

    return res.status(resp.status).json(resp.message);
  }
}