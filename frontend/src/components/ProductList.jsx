import { useEffect, useState } from "react";
import {
  getProducts,
  updateProduct,
  deleteProduct,
} from "../services/productsService";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleEdit = (product) => {
    setEditingId(product.idprod);
    setFormData(product);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await updateProduct(editingId, formData);
    await loadProducts();
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    await loadProducts();
  };

  return (
    <div>
      <div>
        <span>Image</span> | <span>ID Prod</span> | <span>Season</span> |{" "}
        <span>Type</span> | <span>Family</span> | <span>Quality</span> |{" "}
        <span>Player</span> | <span>Name</span> | <span>State</span>
      </div>

      {products.map((product) => (
        <div key={product.idprod}>
          <img src={product.image} alt={product.name} width="40" height="40" />

          {[
            "idprod",
            "season",
            "type",
            "family",
            "quality",
            "player",
            "name",
            "state",
          ].map((field) => (
            <span key={field}>
              {editingId === product.idprod ? (
                <input
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                />
              ) : (
                product[field]
              )}{" "}
              |
            </span>
          ))}
          {editingId === product.idprod ? (
            <>
              <button onClick={handleSave}>Guardar</button>
              <button onClick={handleCancel}>Cancelar</button>
            </>
          ) : (
            <button onClick={() => handleEdit(product)}>Editar</button>
          )}
          <button onClick={() => handleDelete(product.idprod)}>Borrar</button>
        </div>
      ))}
    </div>
  );
}
