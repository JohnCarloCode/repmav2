import { useEffect, useState } from "react";
import { getProducts, addProduct } from "../services/productsService";

const initialForm = {
  idprod: "",
  name: "",
  state: "",
  type: "",
  player: "",
  collection: "",
  family: "",
  image: "",
};

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(form)
      .then(() => {
        return getProducts();
      })
      .then((newProduct) => {
        setProducts([...products, newProduct]);
        setForm(initialForm);
      })
      .catch(console.error);
  };

  return (
    <div>
      <h2>Agregar producto</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          name="idprod"
          placeholder="idprod"
          value={form.idprod}
          onChange={handleChange}
          required
        />
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="state"
          placeholder="Estado"
          value={form.state}
          onChange={handleChange}
        />
        <input
          name="type"
          placeholder="Type"
          value={form.type}
          onChange={handleChange}
          required
        />
        <input
          name="player"
          placeholder="Player"
          value={form.player}
          onChange={handleChange}
          required
        />
        <input
          name="collection"
          placeholder="Collection"
          value={form.collection}
          onChange={handleChange}
          required
        />
        <input
          name="family"
          placeholder="Family"
          value={form.family}
          onChange={handleChange}
          required
        />
        <input
          name="image"
          placeholder="URL Imagen"
          value={form.image}
          onChange={handleChange}
        />
        <button type="submit">Agregar</button>
      </form>

      <h2>Productos existentes</h2>
    </div>
  );
}

export default AdminPanel;
