import { supabase } from "../config/supabase.js";

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
        const payload = {
            idprod: this.idprod,
            type: this.type,
            family: this.family,
            name: this.name,
            player: this.player,
            image: this.image,
            state: this.state,
            season: this.season,
            quality: this.quality,
            collection: this.collection,
            created_at: this.createdAt
        };

        const { data, error } = await supabase
            .from("products")
            .insert([payload])
            .select("id")
            .single();

        if (error) throw error;
        // Mantengo la interfaz: devolver un "id" interno como hacía Firestore (docRef.id)
        return data.id;
    }

    static async getProductByIdprod(idprod, collectionName) {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("idprod", idprod)
            .eq("collection", collectionName)
            .maybeSingle();

        if (error) throw error;
        // Para emular el _docId de Firestore, exponemos id como _docId
        return data ? { _docId: data.id, ...data } : null;
    }

    static async updateProductByIdprod(idprod, collectionName, updateData = {}) {
        const { data, error } = await supabase
            .from("products")
            .update(updateData)
            .eq("idprod", idprod)
            .eq("collection", collectionName)
            .select("id"); // devuelve filas afectadas

        if (error) throw error;
        return (data && data.length > 0);
    }

    static async deleteProductByIdprod(idprod, collectionName) {
        const { data, error } = await supabase
            .from("products")
            .delete()
            .eq("idprod", idprod)
            .eq("collection", collectionName)
            .select("id");

        if (error) throw error;
        return (data && data.length > 0);
    }

    static async getProducts(collectionName) {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("collection", collectionName)
            .order("created_at", { ascending: true });

        if (error) throw error;
        // También exponemos id como _docId para mantener compatibilidad
        return (data || []).map(row => ({ _docId: row.id, ...row }));
    }
}
