import { Request, Response } from "express";
import { v4 as uuid} from "uuid";
import { prisma } from "../database/repositoryUser";
const jwt = require('jsonwebtoken');


const create = async (nome:string, username: string, senha: string, telefone: string, email: string) => {
    const user = await prisma.usuario.findUnique({
        where:{
            username
        }
    })
    if(user){
        return {message: "usuario já existe"};
    }
    const userNew = await prisma.usuario.create({
        data:{
            id: uuid(),
            nome,
            username,
            senha,
            telefone,
            email,
            imoveis:{}
        }
    })

    const token = jwt.sign(userNew, userNew.senha, { expiresIn: '1d' });
    console.log('Token criado:', token);
}

export const userServices = {
    create,
    // findAll,
    // findByUsername,
    // findById
}