import { Request, Response } from "express";
import { ImovelHandle } from "../services/imovelServices";
import { Coordinates } from "../model/Imovel";

export class ImovelController {
  static async add(req: Request, res: Response) {
    const resp = await ImovelHandle.create(req.body);

    return res.status(resp.status).json(resp.message);
  }

  static async list(req: Request, res: Response) {
    const resp = await ImovelHandle.list();

    return res.status(200).json(resp);
  }

  static async findByType(req: Request, res: Response) {
    const { tipo } = req.params as { tipo: string };

    const resp = await ImovelHandle.findByType(tipo);

    res.status(200).json(resp);
  }

  static async findByName(req: Request, res: Response) {
    const { nome } = req.params as { nome: string };

    const resp = await ImovelHandle.findByName(nome);

    res.status(200).json(resp);
  }

  static async findByLocale(req: Request, res: Response) {
    const coords = req.body as Coordinates;
    const radius = Number(req.params.radius)
    if (isNaN(radius)) {
      res.status(400).send({ error: 'Radius must be a number' });
      return;
    }
    const resp = await ImovelHandle.findByLocale(coords, radius);
    if(resp.message.length === 0) {
      return res.status(200).json({message: `nenhum imóvel encontrado num raio de ${radius}Km` })
    }
    res.status(resp.status).json(resp.message);
  }

  static async updateName(req: Request, res: Response) {
    const { nome } = req.body;
    const { id } = req.params;

    const resp = await ImovelHandle.updateName(nome, id);

    res.status(resp.status).json(resp.message);
  }

  static async updateLocale(req: Request, res: Response) {
    const { id } = req.params;

    const resp = await ImovelHandle.updateLocale(req.body, id);

    res.status(resp.status).json(resp.message);
  }

  static async updateAvailability(req: Request, res: Response) {
    const { disponivel } = req.body as { disponivel: boolean };
    const { id } = req.params;

    const resp = await ImovelHandle.updateAvailability(disponivel, id);

    res.status(resp.status).json(resp.message);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const resp = await ImovelHandle.delete(id);

    return res.status(resp.status).json(resp.message);
  }
}