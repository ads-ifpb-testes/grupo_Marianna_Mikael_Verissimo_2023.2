import { userServices } from "../services/userServices";
import { Request, Response } from "express";

const addUser = async (req: Request, res: Response) => {
    const { nome, username, senha, telefone, email } = req.body;

    await userServices.create(nome, username, senha, telefone, email);
    return res.status(201).json({ mensagem: 'Usuario cadastrado com sucesso!' });
}

export const UserController = {
    addUser,    //create
    // listUsers,  //read
}