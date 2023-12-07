import { Request, Response } from "express";
import { ImovelHandle } from "../services/imovelServices";
import { Coordinates } from "../model/Imovel";
import { Imagem } from "../model/Imagem";
import { json } from "stream/consumers";

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
    if (resp.message.length === 0) {
      return res.status(200).json({ message: `nenhum imóvel encontrado num raio de ${radius}Km` })
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

  static async handleUpload(req: Request, res: Response) {
    const imagesRequest = req.files as Express.Multer.File[]
    const imagesPath = imagesRequest.map((img) => ({ nomeImagem: img.filename })) as Imagem[]
    const { id } = req.params
    const resp = await ImovelHandle.uploadImg(id, imagesPath)
    return res.status(resp.status).json(resp.message);
  }

  static async removeImage(req: Request, res: Response) {
    const { id } = req.params //id do imovel
    const { nomeImagem } = req.body //imagem a ser removida do bd e memória
    const resp = await ImovelHandle.deleteImage(id as string, nomeImagem)
    return res.status(resp.status).send(resp.message)
  }

  static async getImages(req: Request, res: Response) {
    const { id } = req.params //id do imovel
    const resp = await ImovelHandle.getImages(id)
    return res.status(resp.status).send(resp)
  }

  static async updateImage(req: Request, res: Response) {
    const { id } = req.params //id do imovel
    const { nomeImagem } = req.body //imagem a ser removida do bd e memória
    const imageRequest = req.file as Express.Multer.File
    
    const resp = await ImovelHandle.updateImage(id, nomeImagem, imageRequest.filename)
    return res.status(resp.status).send(resp)
  }
}