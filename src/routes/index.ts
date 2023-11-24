import { Router } from "express";
import { routesUsers } from "./userRoutes";

const routes = Router();

routes.use(routesUsers);

export {routes};