import { Router } from "express";
import checkEdificeIdExists from "../middlewares/checkEdificeExistsById";
import multer from 'multer';
import uploadConfig from '../config/upload';
import imagensController from "../controller/imagensController";
const uploadImage = multer(uploadConfig.upload("./tmp/imovelImage"))

const imagensRouter = Router();

imagensRouter.post("/:id/imagens", checkEdificeIdExists, uploadImage.array("images"), imagensController.handleUpload)
imagensRouter.delete("/:id/imagens", checkEdificeIdExists, imagensController.remove)
imagensRouter.get("/:id/imagens", checkEdificeIdExists, imagensController.getAll)
imagensRouter.patch("/:id/imagens", checkEdificeIdExists, uploadImage.single("imagem"), imagensController.update)

export default imagensRouter;