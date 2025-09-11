import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel";
// import ProductList from "./pages/ProductList";
// import SelectedProducts from "./pages/SelectedProducts";
// import Instructions from "./pages/Instructions";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/admin" element={<AdminPanel />} />
        {/* <Route path="/productos" element={<ProductList />} />
        <Route path="/seleccionados" element={<SelectedProducts />} />
        <Route path="/instrucciones" element={<Instructions />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
