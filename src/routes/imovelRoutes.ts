import { Router } from "express";
import checkEdificeExists from "../middlewares/checkEdificeExists";
import { ImovelController } from "../controller/imovelController";

const imovelRouter = Router();

imovelRouter.post('/imoveis', checkEdificeExists, ImovelController.add);

imovelRouter.get('/imoveis', ImovelController.list);

imovelRouter.delete("/imoveis/:id", checkEdificeExists, ImovelController.delete);

// router.put("/:id", checkExistsUserAccount, checkTechIdExists, imovelController.updateTitleDeadline)
// router.patch("/:id/studied", checkExistsUserAccount, checkTechIdExists, imovelController.updateStudied)


export default imovelRouter;