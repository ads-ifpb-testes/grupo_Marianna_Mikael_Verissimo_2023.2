//middleware
import { checkExistsUserAccount } from "../middlewares/checkExistsUserAccount";

//controller
import { UserController } from "../controller/UserController";

//rotas relacionadas ao usuario
import { Router } from "express";

const routesUsers = Router();

//cria novo usuario
routesUsers.post('/users', UserController.addUser);

//deleta usuario
routesUsers.delete('/users/:id');

//retorna todos os usuarios
routesUsers.get('/users/all');

//atualiza usuario
routesUsers.patch('/users/:id');

//atualiza campo 
routesUsers.put('/users/:id');

export {routesUsers}