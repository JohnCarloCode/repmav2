const API_URL = import.meta.env.VITE_API_URL;

export async function getProducts() {
    const res = await fetch(`${API_URL}/products`);
    return res.json();
}

export async function addProduct(product) {
    const res = await fetch(`${API_URL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });
    return res.json();
}

export async function deleteProduct(id) {
    await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
    });
}

export async function updateProduct(id, product) {
    const res = await fetch(`${API_URL}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });
    return res.json();
}