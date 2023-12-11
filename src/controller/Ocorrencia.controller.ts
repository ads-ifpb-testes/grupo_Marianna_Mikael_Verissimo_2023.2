import { Request, Response } from "express"
import Ocorrencia from "../model/Ocorrencia"
import { Types } from "mongoose"
import { geoSearchSetOrGetCache, getOrSetCache } from "../services/handleCache"

export async function create(req: Request, res: Response) {
    new Ocorrencia({
        _id: new Types.ObjectId(req.body._id),
        titulo: req.body.titulo,
        tipo: req.body.tipo,
        data: new Date(req.body.data),
        geom: {
            type: "Point",
            coordinates: req.body.geom,
        },
    })
        .save()
        .then(() => {
            console.log("Salvo com sucesso!")
            res.status(201).send("saved")
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json(err)
        })
}

export async function deleta(req: Request, res: Response) {
    const ocorrenciaId = req.params.id
    try {
        const query = Ocorrencia.findById(ocorrenciaId).lean()
        const deletedCount = (await Ocorrencia.deleteOne(query)).deletedCount
        if (deletedCount) {
            res.send({
                message: `Ocorrencia com Id: ${ocorrenciaId} deletado com sucesso`,
            })
        } else {
            res.status(400).send({
                message: `Ocorrencia com Id ${ocorrenciaId} nao encontrado`,
            })
        }
    } catch (error) {
        console.error(error)
        return res
            .status(500)
            .json({ error: "Erro ao tentar deletar ocorrencia" })
    }
}

export async function list(req: Request, res: Response) {
    const ocorrencias = await Ocorrencia.find({})
    res.send(ocorrencias)
}

export const findById = async (req: Request, res: Response) => {
    const occr_id = req.params.id
    const key = `ocorrencia:${occr_id}`
    try {
        const occr = await getOrSetCache(key, async () => {
            return await Ocorrencia.findById(occr_id)
        })
        res.send(occr)
    } catch (error) {
        res.status(400).json(error)
    }
}
export const geoFilter = async (req: Request, res: Response) => {
    const latitude = Number(req.query.latitude)
    const longitude = Number(req.query.longitude)
    const radius = Number(req.query.radius)
    try {
        const filtrado = await geoSearchSetOrGetCache(
            "ocorrencias",
            { longitude, latitude, radius },
            async () => {
                return await Ocorrencia.find({})
            }
        )
        // Hit ou miss: resp retorna array de _id que passam no filtro
        res.send(filtrado)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const update = async (req: Request, res: Response) => {
    const { id } = req.params
    const { titulo, tipo, data } = req.body

    const updatedDoc = {
        titulo,
        tipo,
        data,
        updatedAt: new Date(),
    }

    try {
        const docAntes = await Ocorrencia.findById(id)

        if (docAntes) {
            // se o campo a atualizar nao estiver preenchido,
            // mantem os valores antigos
            if (updatedDoc.titulo === "") {
                updatedDoc.titulo = docAntes.titulo
            }
            if (updatedDoc.tipo === "") {
                updatedDoc.tipo = docAntes.tipo
            }
            if (updatedDoc.data === "") {
                updatedDoc.data = docAntes.data
            }
            const docNovo = await Ocorrencia.findByIdAndUpdate(id, updatedDoc, {
                returnDocument: "after",
            })
            return res.status(200).json({ docNovo, docAntes })
        } else {
            return res.status(400).json({
                message: `Ocorrencia com Id ${id} nao encontrado`,
            })
        }
    } catch (error) {
        console.error(error)
        return res
            .status(500)
            .json({ error: "Erro ao tentar atualizar ocorrencia" })
    }
}
