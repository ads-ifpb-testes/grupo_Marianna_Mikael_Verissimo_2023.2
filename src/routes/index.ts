import { Router } from "express";
import { routesUsers } from "./userRoutes";
import imovelRouter from "./imovelRoutes";

const routes = Router();

routes.use(routesUsers);
routes.use(imovelRouter)

export {routes};