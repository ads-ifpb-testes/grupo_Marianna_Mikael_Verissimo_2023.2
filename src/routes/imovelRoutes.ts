import { Router } from "express";
import checkEdificeExists from "../middlewares/checkEdificeExists";
import checkEdificeIdExists from "../middlewares/checkEdificeExistsById";
import { ImovelController } from "../controller/imovelController";
import validateImovel from "../middlewares/validateImovel";
import { verifyAuthorization } from "../middlewares/verifyAuthorization";

const imovelRouter = Router();

imovelRouter.post('/imoveis', validateImovel.new, checkEdificeExists, ImovelController.add);

imovelRouter.get('/imoveis', verifyAuthorization, ImovelController.list);
imovelRouter.get('/imoveis/tipo/:tipo', verifyAuthorization, ImovelController.findByType);
imovelRouter.get('/imoveis/nome/:nome', verifyAuthorization, ImovelController.findByName);
imovelRouter.get('/imoveis/local/:radius', verifyAuthorization, ImovelController.findByLocale);

imovelRouter.delete("/imoveis/:id", verifyAuthorization, checkEdificeIdExists, ImovelController.delete);

imovelRouter.patch("/imoveis/:id/nome", verifyAuthorization, checkEdificeIdExists, validateImovel.nome, ImovelController.updateName);
imovelRouter.patch('/imoveis/:id/local', verifyAuthorization, checkEdificeIdExists, validateImovel.local, ImovelController.updateLocale);
imovelRouter.patch('/imoveis/:id/disponivel', verifyAuthorization, checkEdificeIdExists, validateImovel.disponivel, ImovelController.updateAvailability);

export default imovelRouter;