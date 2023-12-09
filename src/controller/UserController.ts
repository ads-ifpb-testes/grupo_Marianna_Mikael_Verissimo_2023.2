import { userServices } from "../services/userServices";
import { Request, Response } from "express";

const login = async (req: Request, res: Response): Promise<Response> => {
    const { username, senha } = req.body;

    const token = await userServices.loginUser(username, senha);
    
    return res.status(200).json(token);
}

const addUser = async (req: Request, res: Response): Promise<Response> => {
    const { nome, username, senha, telefone, email } = req.body;

    const resp = await userServices.create(nome, username, senha, telefone, email);
    return res.status(201).json(resp);
}

const listUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await userServices.findAll();

    return res.status(200).json(users);
}

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const resp = await userServices.userDelete(id);

    return res.status(201).json(resp);
}

const update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { nome, username, telefone, email } = req.body;

    const usuario = await userServices.update(id, nome, username, telefone, email);
    return res.status(200).json(usuario);
}

const passwordUpdate = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { senha } = req.body;

    const resp = await userServices.passwordUpdate(id, senha);
    return res.status(200).json(resp)
}

const findUser = async (req: Request, res: Response) => {
    const { username } = req.params;

    const user = await userServices.findByUsername(username);
    return res.status(200).json(user);
}

export const UserController = {
    login,
    addUser,
    listUsers,
    deleteUser,
    update,
    passwordUpdate,
    findUser
}