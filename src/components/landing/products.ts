import product1 from "@/assets/product-1.png";
import product2 from "@/assets/product-2.png";
import product3 from "@/assets/product-3.png";
import product4 from "@/assets/product-4.png";

export type ProductCategory = "Coronas" | "Arreglos";

export type Product = {
  slug: string;
  name: string;
  image: string;
  category: ProductCategory;
  price: number;
};

export const categories: ProductCategory[] = ["Coronas", "Arreglos"];

export const products: Product[] = [
  { slug: "corona-rosa-blanca", name: "Corona Rosa y Blanca", image: product1, category: "Coronas", price: 350 },
  { slug: "arreglo-recuerdo", name: "Arreglo Recuerdo", image: product2, category: "Arreglos", price: 220 },
  { slug: "arreglo-rosas-amarillas", name: "Arreglo Rosas Amarillas", image: product3, category: "Arreglos", price: 240 },
  { slug: "arreglo-azul-celeste", name: "Arreglo Azul Celeste", image: product4, category: "Arreglos", price: 260 },
];

export const formatPrice = (price: number) => `S/ ${price.toFixed(0)}`;
