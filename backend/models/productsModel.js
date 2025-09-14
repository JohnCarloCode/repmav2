import { doc, addDoc, getDoc, updateDoc, deleteDoc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../config/firebase.js";

export default class ProductModel {
    constructor(idprod, type, family, image, name, player, state, collection, season, quality) {
        this.idprod = idprod;
        this.type = type;
        this.family = family;
        this.name = name;
        this.player = player || "";
        this.image = image;
        this.state = state;
        this.createdAt = new Date();
        this.collection = collection;
        this.season = season;
        this.quality = quality;
    }

    async createProduct() {
        try {
            const colRef = collection(db, this.collection);
            const docData = {
                idprod: this.idprod,
                type: this.type,
                family: this.family,
                name: this.name,
                player: this.player,
                image: this.image,
                state: this.state,
                season: this.season,
                quality: this.quality,
                createdAt: this.createdAt
            };
            const docRef = await addDoc(colRef, docData);
            console.log(`Producto creado con Firestore ID = ${docRef.id} y idprod = ${this.idprod}`);
            return docRef.id;
        } catch (error) {
            console.error("Error al crear el producto:", error);
            throw error;
        }
    }

    static async getProductByIdprod(idprod, collectionName) {
        try {
            const colRef = collection(db, collectionName);
            const q = query(colRef, where("idprod", "==", idprod));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                console.log(`Producto con idprod = ${idprod} no se encontró en ${collectionName}`);
                return null;
            }

            const docSnap = snapshot.docs[0];
            return { _docId: docSnap.id, ...docSnap.data() };
        } catch (error) {
            console.error(`Error al obtener producto con idprod = ${idprod}:`, error);
            throw error;
        }
    }

    static async updateProductByIdprod(idprod, collectionName, updateData = {}) {
        try {
            const colRef = collection(db, collectionName);
            const q = query(colRef, where("idprod", "==", idprod));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                console.log(`Producto con idprod = ${idprod} no se encontró en ${collectionName}`);
                return false;
            }

            const docSnap = snapshot.docs[0];
            const docRef = doc(db, collectionName, docSnap.id);

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
            const colRef = collection(db, collectionName);
            const q = query(colRef, where("idprod", "==", idprod));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                console.log(`Producto con idprod = ${idprod} no se encontró en ${collectionName}`);
                return false;
            }

            const docSnap = snapshot.docs[0];
            const docRef = doc(db, collectionName, docSnap.id);

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
