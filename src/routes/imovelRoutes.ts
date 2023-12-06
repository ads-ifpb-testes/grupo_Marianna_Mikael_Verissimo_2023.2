import { Router } from "express";
import checkEdificeExists from "../middlewares/checkEdificeExists";
import checkEdificeIdExists from "../middlewares/checkEdificeExistsById";
import { ImovelController } from "../controller/imovelController";
import validateImovel from "../middlewares/validateImovel";
import multer from 'multer';
import uploadConfig from '../config/upload';

const uploadImage = multer(uploadConfig.upload("./tmp/imovelImage"))

const imovelRouter = Router();

imovelRouter.post('/imoveis', validateImovel.new, checkEdificeExists, ImovelController.add);

imovelRouter.get('/imoveis', ImovelController.list);
imovelRouter.get('/imoveis/tipo/:tipo', ImovelController.findByType);
imovelRouter.get('/imoveis/nome/:nome', ImovelController.findByName);
imovelRouter.get('/imoveis/local/:radius', ImovelController.findByLocale);

imovelRouter.delete("/imoveis/:id", checkEdificeIdExists, ImovelController.delete);

imovelRouter.patch("/imoveis/:id/nome", checkEdificeIdExists, validateImovel.nome, ImovelController.updateName);
imovelRouter.patch('/imoveis/:id/local', checkEdificeIdExists, validateImovel.local, ImovelController.updateLocale);
imovelRouter.patch('/imoveis/:id/disponivel', checkEdificeIdExists, validateImovel.disponivel, ImovelController.updateAvailability);

//rota relativa às imagens
imovelRouter.post("/imoveis/:id/images", checkEdificeIdExists, uploadImage.array("images"), ImovelController.handleUpload)
imovelRouter.delete("/imoveis/:id/images", checkEdificeIdExists, ImovelController.removeImage)

export default imovelRouter;