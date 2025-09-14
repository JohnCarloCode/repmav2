import express from "express";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/products", productRoutes);

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
