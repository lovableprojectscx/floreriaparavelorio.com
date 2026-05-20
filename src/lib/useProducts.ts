import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import type { Product } from "@/components/landing/products";

const TENANT_ID = import.meta.env.VITE_TENANT_ID || "54a66b4a-6181-4b3f-b173-6398d0f33b2d";

export interface Category {
  id: string;
  name: string;
  slug: string;
  tenant_id: string;
  created_at: string;
}

/**
 * @param skip - Pasar `false` para no hacer fetch al montar (ej. cuando SSR ya cargó los productos)
 */
export function useProducts(skip?: boolean) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(skip === false ? false : true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("tenant_id", TENANT_ID)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setProducts(data.map((p) => ({
          id: p.id,
          slug: p.id,
          name: p.title || "Producto sin nombre",
          price: Number(p.price) || 0,
          image: p.image || "/placeholder.svg",
          category: p.category && p.category.length > 0 ? p.category[0] : "Arreglos",
          description: p.description || "",
        })));
      } else if (error) {
        console.error("Error fetching products:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // No hacer fetch si se indica explícitamente que se salte (productos vienen del SSR)
    if (skip === false) return;
    fetchProducts();
  }, []);

  const addProduct = async (product: Partial<Product>) => {
    const { error } = await supabase.from("products").insert({
      tenant_id: TENANT_ID,
      title: product.name,
      price: product.price,
      image: product.image,
      category: [product.category],
    });
    if (!error) fetchProducts();
  };

  const updateProduct = async (id: string, product: Partial<Product>) => {
    const { error } = await supabase.from("products").update({
      title: product.name,
      price: product.price,
      image: product.image,
      category: [product.category],
    }).eq("id", id);
    if (!error) fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) fetchProducts();
  };

  return { products, loading, addProduct, updateProduct, deleteProduct, refresh: fetchProducts };
}


export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchErr } = await supabase
      .from("categories")
      .select("*")
      .eq("tenant_id", TENANT_ID)
      .order("created_at", { ascending: true });

    if (fetchErr) {
      console.error("fetchCategories error:", fetchErr);
      setError(fetchErr.message);
    } else {
      setCategories(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async (name: string): Promise<string | null> => {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    const { error: insertErr } = await supabase.from("categories").insert({
      tenant_id: TENANT_ID,
      name: name.trim(),
      slug,
    });
    if (insertErr) {
      console.error("addCategory error:", insertErr);
      return insertErr.message;
    }
    await fetchCategories();
    return null;
  };

  const deleteCategory = async (id: string): Promise<string | null> => {
    const { error: deleteErr } = await supabase.from("categories").delete().eq("id", id);
    if (deleteErr) {
      console.error("deleteCategory error:", deleteErr);
      return deleteErr.message;
    }
    await fetchCategories();
    return null;
  };

  return { categories, loading, error, addCategory, deleteCategory, refresh: fetchCategories };
}

export function useSettings() {
  const [settings, setSettings] = useState({
    whatsapp: "+51 994 068 553",
    schedule: "Lun a Dom · 24 horas",
    zones: "Lima Metropolitana, Callao, Ate, San Juan de Lurigancho, Comas, Los Olivos",
    ad_image_url: "",
    ad_message: "Hola, me interesa este producto.",
    ad_link: "",
    ad_active: true,
    show_prices: true,
  });
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("tenant_settings")
      .select("*")
      .eq("tenant_id", TENANT_ID)
      .single();
    
    if (!error && data) {
      setSettings({
        whatsapp: data.whatsapp || "",
        schedule: data.schedule || "",
        zones: data.zones || "",
        ad_image_url: data.ad_image_url || "",
        ad_message: data.ad_message || "",
        ad_link: data.ad_link || "",
        ad_active: data.ad_active !== false,
        show_prices: data.show_prices !== false,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const saveSettings = async (newSettings: typeof settings) => {
    const { error } = await supabase.from("tenant_settings").upsert({
      tenant_id: TENANT_ID,
      whatsapp: newSettings.whatsapp,
      schedule: newSettings.schedule,
      zones: newSettings.zones,
      ad_image_url: newSettings.ad_image_url,
      ad_message: newSettings.ad_message,
      ad_link: newSettings.ad_link,
      ad_active: newSettings.ad_active,
      show_prices: newSettings.show_prices,
      updated_at: new Date().toISOString()
    });
    if (!error) setSettings(newSettings);
  };

  return { settings, loading, saveSettings };
}
