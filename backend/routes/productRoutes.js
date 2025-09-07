import { Router } from "express";
import ProductController from "../controllers/productsController.js";

const router = Router();

router.post("/", ProductController.create);
router.get("/:collection", ProductController.getAll);
router.get("/:collection/:idprod", ProductController.getById);
router.put("/:collection/:idprod", ProductController.update);
router.delete("/:collection/:idprod", ProductController.delete);

export default router;
