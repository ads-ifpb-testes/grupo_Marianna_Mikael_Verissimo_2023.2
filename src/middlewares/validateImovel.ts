import validImovelSchema from "../utils/imovelValidateSchema";
import { NextFunction, Request, Response } from "express";
import { ImovelBody } from '../model/Imovel';
import { ValidationError } from "yup";
import { Coordinates } from "../model/Imovel";

export default {
    new: async (req: Request, res: Response, next: NextFunction) => {
        const schema = validImovelSchema.index()
        const data = <ImovelBody>req.body
        try {
            await schema.validate(data, { abortEarly: false, })
            return next()
        } catch (error) {
            if (error instanceof ValidationError) {
                return res.status(400).json({ error })
            }
        }
    },
    nome: async (req: Request, res: Response, next: NextFunction) => {
        const schema = validImovelSchema.nome()
        const { nome } = req.body
        try {
            await schema.validate(nome, { abortEarly: false, })
            next()
        } catch (error) {
            if (error instanceof ValidationError) {
                return res.status(400).json({ error })
            }
        }
    },
    local: async (req: Request, res: Response, next: NextFunction) => {
        const schema = validImovelSchema.coordinates()
        const coords = <Coordinates>req.body
        try {
            await schema.validate(coords, { abortEarly: false, })
            next()
        } catch (error) {
            if (error instanceof ValidationError) {
                return res.status(400).json({ error })
            }
        }
    },
    disponivel: async (req: Request, res: Response, next: NextFunction) => {
        const schema = validImovelSchema.disponivel()
        const { disponivel } = req.body as { disponivel: boolean }
        try {
            await schema.validate(disponivel, { abortEarly: false, })
            next()
        } catch (error) {
            if (error instanceof ValidationError) {
                return res.status(400).json({ error })
            }
        }
    }
}