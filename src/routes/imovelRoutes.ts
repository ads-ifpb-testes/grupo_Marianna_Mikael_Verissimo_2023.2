import { Router } from "express";
import checkEdificeExists from "../middlewares/checkEdificeExists";
import { ImovelController } from "../controller/imovelController";

const imovelRouter = Router();

imovelRouter.post('/imoveis', checkEdificeExists, ImovelController.add);

imovelRouter.get('/imoveis', ImovelController.list);
imovelRouter.get('/imoveis/:tipo', ImovelController.findByType);
imovelRouter.get('/imoveis/:nome', ImovelController.findByName);
imovelRouter.get('/imoveis', ImovelController.findByLocale);

imovelRouter.delete("/imoveis/:id", checkEdificeExists, ImovelController.delete);

imovelRouter.patch("/imoveis/:id/nome",ImovelController.updateName);
imovelRouter.patch('/imoveis/:id/local', ImovelController.updateLocale);
imovelRouter.patch('/imoveis/:id/disponivel', ImovelController.updateAvailability);


export default imovelRouter;