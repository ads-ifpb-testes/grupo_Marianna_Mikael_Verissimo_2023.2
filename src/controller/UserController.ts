import { userServices } from "../services/userServices";
import { Request, Response } from "express";

const addUser = async (req: Request, res: Response) => {
    const { nome, username, senha, telefone, email } = req.body;

    await userServices.create(nome, username, senha, telefone, email);
    return res.status(201).json({ mensagem: 'Usuario cadastrado com sucesso!' });
}

const listUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await userServices.findAll();

    return res.status(200).json(users);
}

export const UserController = {
    addUser,
    listUsers,   
    //create,
    //read
}