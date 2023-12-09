import { Router } from "express";
import checkEdificeIdExists from "../middlewares/checkEdificeExistsById";
import multer from 'multer';
import uploadConfig from '../config/upload';
import imagensController from "../controller/imagensController";
import { authorization } from "../middlewares/authorization";
import { checkImovelBelongs } from "../middlewares/checkImovelBelongs";

const uploadImage = multer(uploadConfig.upload("./tmp/imovelImage"))

const imagensRouter = Router();

imagensRouter.post("/:id/imagens", authorization, checkImovelBelongs, uploadImage.array("images"), imagensController.handleUpload)
imagensRouter.delete("/:id/imagens", authorization, checkImovelBelongs, imagensController.remove)
imagensRouter.get("/:id/imagens", checkEdificeIdExists, imagensController.getAll)
imagensRouter.patch("/:id/imagens", authorization, checkImovelBelongs, uploadImage.single("imagem"), imagensController.update)

export default imagensRouter;