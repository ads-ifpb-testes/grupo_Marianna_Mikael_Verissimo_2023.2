//middleware
import { checkExistsUserAccount } from "../middlewares/checkExistsUserAccount";
import validateUsuario from "../middlewares/validateUsuario";

//controller
import { UserController } from "../controller/UserController";

//rotas relacionadas ao usuario
import { Router } from "express";

const routesUsers = Router();

//usuario realiza login no sistema
routesUsers.post('/users/login', UserController.login);

//cria novo usuario
routesUsers.post('/users', validateUsuario.new, UserController.addUser);

//retorna todos os usuarios
routesUsers.get('/users', UserController.listUsers);

//deleta usuario
routesUsers.delete('/users/:id', checkExistsUserAccount, UserController.deleteUser);

//atualiza usuario
routesUsers.put('/users/:id', validateUsuario.new, checkExistsUserAccount, UserController.update);

//atualiza senha de usuário
routesUsers.patch('/users/:id/password', validateUsuario.password, checkExistsUserAccount, UserController.passwordUpdate);

//busca usuario por username
routesUsers.get('/users/:username', UserController.findUser);





export { routesUsers }