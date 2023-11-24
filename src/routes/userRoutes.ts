//middleware
import { checkExistsUserAccount } from "../middlewares/checkExistsUserAccount";

//controller
import { UserController } from "../controller/UserController";

//rotas relacionadas ao usuario
import { Router } from "express";

const routesUsers = Router();

//cria novo usuario
routesUsers.post('/users', UserController.addUser);

//retorna todos os usuarios
routesUsers.get('/users', UserController.listUsers);

//deleta usuario
routesUsers.delete('/users/:id', checkExistsUserAccount, UserController.deleteUser);

//atualiza campo especifico
routesUsers.put('/users/:id');

//atualiza usuario
routesUsers.patch('/users/:id');



export {routesUsers}