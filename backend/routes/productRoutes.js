import { Router } from "express";
import ProductController from "../controllers/productsController.js";

const router = Router();

// Crear un producto
router.post("/", ProductController.create);

// Obtener todos los productos de una colección
router.get("/:collection", ProductController.getAll);

// Obtener un producto por idprod
router.get("/:collection/:idprod", ProductController.getById);

// Actualizar un producto por idprod
router.put("/:collection/:idprod", ProductController.update);

// Eliminar un producto por idprod
router.delete("/:collection/:idprod", ProductController.delete);

export default router;
