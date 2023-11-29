import { Request, Response } from "express";
import { v4 as uuid} from "uuid";
import { prisma } from "../database/prisma.client";
import { Usuario } from "../model/Usuario";
const jwt = require('jsonwebtoken');

const generateToken = (user: Usuario) => {
    const token = jwt.sign( user, user.senha , { expiresIn: '1d' });
    return token;
  };

const create = async (nome:string, username: string, senha: string, telefone: string, email: string) => {
    const user = await prisma.usuario.findUnique({
        where:{
            username
        }
    })
    if(user){
        return {message: "Usuario já existe"};
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

    const token = generateToken(userNew);
    console.log('Token criado:', token);
    return {message: "Usuário cadastrado com sucesso!"}
}

const findAll = async (): Promise<Usuario[]> => {
    const users = await prisma.usuario.findMany({
        include:{
            imoveis:{
                select:{
                    id: true,
                    nome: true,
                    latitude: true,
                    longitude: true,
                    tipo: true,
                    descricao: true,
                    preco: true,
                    disponivel: true,
                    avaliacao: true,
                    numInquilinos: true,
                    imagens:{
                        select:{
                            nomeImagem: true,
                        }
                    }
                }
            }
        }
    })
    console.log(users);
    return users;
}

const userDelete = async (id: string):Promise<void> => {
    const user = await prisma.usuario.delete({
        where:{
            id
        }
    })
}

const update = async (id: string, nome:string, username: string, senha: string, telefone: string, email: string) => {
    const oldUser = await prisma.usuario.findUnique({
        where:{
            username
        }
    })
    if(oldUser){
        return {message: "Usuario já existe"};
    }
    const userNew = await prisma.usuario.update({
        where:{
            id
        },
        data:{
            id: uuid(),
            nome,
            username,
            senha,
            telefone,
            email
        }
    })

    const token = generateToken(userNew)
    console.log('Token atualizado:', token);
    return userNew;
}

const passwordUpdate =  async (id: string, senha: string) => {
    const user = await prisma.usuario.update({
        where:{
            id
        },
        data:{
            senha
        }
    })
    const token = jwt.sign(user, user.senha, { expiresIn: '1d' });
    console.log('Token atualizado:', token);
}

const findByUsername = async (username: string) => {
    const user = await prisma.usuario.findUnique({
        where:{
            username
        },
        include:{
            imoveis:{
                select:{
                    id: true,
                    nome: true,
                    latitude: true,
                    longitude: true,
                    tipo: true,
                    descricao: true,
                    preco: true,
                    disponivel: true,
                    avaliacao: true,
                    numInquilinos: true,
                    imagens:{
                        select:{
                            nomeImagem: true,
                        }
                    }
                }
            }
        }
    })
    return user;
}


export const userServices = {
    create,
    findAll,
    userDelete,
    update,
    passwordUpdate,
    findByUsername,
}