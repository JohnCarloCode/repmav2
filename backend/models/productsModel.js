import { doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase.js";

export default class ProductModel {
    constructor(idprod, type, family, image, name, player, state, collection) {
        this.idprod = idprod;
        this.type = type;
        this.family = family;
        this.name = name;
        this.player = player || "";
        this.image = image;
        this.state = state;
        this.createdAt = new Date();
        this.collection = collection;
    }

    async createProduct() {
        try {
            const docRef = doc(db, this.collection, this.idprod);
            await setDoc(docRef, {
                type: this.type,
                family: this.family,
                name: this.name,
                player: this.player,
                image: this.image,
                state: this.state,
                createdAt: this.createdAt
            });
            console.log(`Producto con idprod = ${this.idprod} creado`);
            return this.idprod;
        } catch (error) {
            console.error("Error al crear el producto:", error);
            throw error;
        }
    }

    static async getProductByIdprod(idprod, collectionName) {
        try {
            const docRef = doc(db, collectionName, idprod);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                console.log(`Producto con idprod = ${idprod} no se encontró en ${collectionName}`);
                return null;
            }

            return { _docId: docSnap.id, ...docSnap.data() };
        } catch (error) {
            console.error(`Error al obtener producto con idprod = ${idprod}:`, error);
            throw error;
        }
    }

    static async updateProductByIdprod(idprod, collectionName, updateData = {}) {
        try {
            const docRef = doc(db, collectionName, idprod);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                console.log(`Producto con idprod = ${idprod} no se encontró en ${collectionName}`);
                return false;
            }

            if (Object.keys(updateData).length === 0) {
                console.log("No hay datos para actualizar");
                return false;
            }

            await updateDoc(docRef, updateData);
            console.log(`Producto con idprod = ${idprod} actualizado en ${collectionName}`);
            return true;
        } catch (error) {
            console.error(`Error al actualizar producto con idprod = ${idprod}:`, error);
            throw error;
        }
    }

    static async deleteProductByIdprod(idprod, collectionName) {
        try {
            const docRef = doc(db, collectionName, idprod);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                console.log(`Producto con idprod = ${idprod} no se encontró en ${collectionName}`);
                return false;
            }

            await deleteDoc(docRef);
            console.log(`Producto con idprod = ${idprod} eliminado de ${collectionName}`);
            return true;
        } catch (error) {
            console.error(`Error al eliminar producto con idprod = ${idprod}:`, error);
            throw error;
        }
    }

    static async getProducts(collectionName) {
        try {
            const colRef = collection(db, collectionName);
            const snapshot = await getDocs(colRef);

            return snapshot.docs.map(docSnap => ({ _docId: docSnap.id, ...docSnap.data() }));
        } catch (error) {
            console.error(`Error al obtener productos de ${collectionName}:`, error);
            throw error;
        }
    }
}
