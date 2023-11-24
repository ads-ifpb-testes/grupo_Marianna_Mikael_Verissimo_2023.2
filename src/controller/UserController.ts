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

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    
    await userServices.userDelete(id);

    return res.status(201).json({message: "Usuário deletado com sucesso!"});
}

const update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { nome, username, senha, telefone, email } = req.body;

    const usuario = await userServices.update(id, nome, username, senha, telefone, email);
    return res.status(200).json(usuario);
}

const passwordUpdate = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { senha } = req.body;

    await userServices.passwordUpdate(id, senha);
    return res.status(200).json({message: "Senha atualizada com sucesso!"})
}

export const UserController = {
    addUser,
    listUsers,   
    deleteUser,
    update,
    passwordUpdate,
}