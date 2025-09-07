import ProductModel from "../models/productsModel.js";

export default class ProductController {

    static async create(req, res) {
        try {
            const { idprod, type, family, image, name, player, state, collection } = req.body;

            if (!idprod || !type || !family || !image || !name || !player || !state || !collection) {
                return res.status(400).json({ error: "Todos los campos son obligatorios" });
            }

            const product = new ProductModel(idprod, type, family, image, name, player, state, collection);
            const createdId = await product.createProduct();

            return res.status(201).json({ message: "Producto creado", idprod: createdId });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { idprod, collection } = req.params;

            if (!idprod || !collection) {
                return res.status(400).json({ error: "idprod y collection son obligatorios" });
            }

            const product = await ProductModel.getProductByIdprod(idprod, collection);

            if (!product) return res.status(404).json({ error: "Producto no encontrado" });

            return res.json(product);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { idprod, collection } = req.params;
            const updateData = req.body;

            if (!idprod || !collection) {
                return res.status(400).json({ error: "idprod y collection son obligatorios" });
            }

            if (!updateData || Object.keys(updateData).length === 0) {
                return res.status(400).json({ error: "No hay datos para actualizar" });
            }

            const updated = await ProductModel.updateProductByIdprod(idprod, collection, updateData);

            if (!updated) return res.status(404).json({ error: "Producto no encontrado" });

            return res.json({ message: "Producto actualizado" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { idprod, collection } = req.params;

            if (!idprod || !collection) {
                return res.status(400).json({ error: "idprod y collection son obligatorios" });
            }

            const deleted = await ProductModel.deleteProductByIdprod(idprod, collection);

            if (!deleted) return res.status(404).json({ error: "Producto no encontrado" });

            return res.json({ message: "Producto eliminado" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const { collection } = req.params;

            if (!collection) return res.status(400).json({ error: "collection es obligatorio" });

            const products = await ProductModel.getProducts(collection);

            return res.json(products);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}