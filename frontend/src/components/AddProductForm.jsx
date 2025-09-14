import { useState } from "react";
import { addProduct, getProducts } from "../services/productsService";

const initialForm = {
  idprod: "",
  name: "",
  state: "",
  type: "",
  player: "",
  collection: "",
  family: "",
  image: "",
  season: "",
  quality: "",
};

const fields = [
  { name: "idprod", label: "ID Producto", required: true },
  { name: "name", label: "Nombre", required: true },
  { name: "state", label: "Estado" },
  { name: "type", label: "Tipo", required: true },
  { name: "player", label: "Player", required: true },
  { name: "collection", label: "Collection", required: true },
  { name: "family", label: "Family", required: true },
  { name: "image", label: "URL Imagen" },
  { name: "season", label: "Season" },
  { name: "quality", label: "Quality" },
];

function AddProductForm() {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addProduct(form);
      await getProducts();
      setForm(initialForm);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(({ name, label, required }) => (
        <input
          key={name}
          name={name}
          placeholder={label}
          value={form[name]}
          onChange={handleChange}
          required={required}
        />
      ))}
      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Agregar"}
      </button>
    </form>
  );
}

export default AddProductForm;
