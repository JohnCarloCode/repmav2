import AddProductForm from "../components/AddProductForm";
import ProductList from "../components/ProductList";

function AdminPanel() {
  return (
    <div>
      <h2>Agregar producto</h2>
      <AddProductForm />
      <h2>Productos existentes</h2>
      <ProductList />
    </div>
  );
}

export default AdminPanel;
