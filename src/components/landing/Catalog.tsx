import { Link } from "@tanstack/react-router";
import { waLink } from "./constants";
import { type Product, formatPrice } from "./products";
import { useProducts } from "@/lib/useProducts";
import { useBusinessSettings } from "@/lib/SettingsContext";

interface CatalogProps {
  /** Productos precargados desde SSR — evitan el loading state y mejoran LCP */
  initialProducts?: Product[];
}

export function Catalog({ initialProducts }: CatalogProps) {
  // Solo hacer fetch del cliente si NO vienen productos del SSR (evita doble request)
  const hasSSRProducts = initialProducts && initialProducts.length > 0;
  const { products: clientProducts, loading } = useProducts(hasSSRProducts ? false : undefined);
  const products = hasSSRProducts ? initialProducts : clientProducts;
  const { show_prices } = useBusinessSettings();

  return (
    <section id="catalogo" className="w-full bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-14 md:mb-20">
          <p
            className="text-[11px] font-medium uppercase mb-4"
            style={{ color: "#C9A84C", letterSpacing: "0.3em" }}
          >
            Nuestros arreglos
          </p>
          <h2 className="font-display text-foreground text-[28px] md:text-[40px] leading-[1.15] font-normal">
            Honra su memoria con el arreglo que merece
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {loading && products.length === 0
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/5] bg-neutral-900 mb-4" />
                  <div className="h-4 bg-neutral-900 w-2/3 mb-2" />
                  <div className="h-4 bg-neutral-900 w-1/2" />
                </div>
              ))
            : products.map((p, i) => (
                <article key={p.slug} className="group">
                  <div
                    className="aspect-[4/5] w-full overflow-hidden mb-3 md:mb-5"
                    style={{ backgroundColor: "#0E0E0E" }}
                  >
                    <img
                      src={p.image}
                      alt={`Arreglo floral para velorio ${p.name} - Delivery en Lima`}
                      loading={i < 2 ? "eager" : "lazy"}
                      fetchPriority={i === 0 ? "high" : "auto"}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <p
                    className="text-[10px] uppercase mb-1"
                    style={{ color: "#9A9087", letterSpacing: "0.25em" }}
                  >
                    {p.category}
                  </p>
                  <h3 className="font-display text-foreground text-base md:text-xl font-normal leading-tight">
                    {p.name}
                  </h3>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    {show_prices && p.price > 0 ? (
                      <span className="text-sm font-semibold" style={{ color: "#C9A84C" }}>
                        {formatPrice(p.price)}
                      </span>
                    ) : (
                      <span />
                    )}
                    <a
                      href={waLink(`Hola, me interesa consultar sobre: ${p.name}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] md:text-xs uppercase tracking-[0.2em] transition-colors whitespace-nowrap pb-0.5"
                      style={{
                        color: "#C9A84C",
                        borderBottom: "1px solid #8B6914",
                      }}
                    >
                      Consultar
                    </a>
                  </div>
                </article>
              ))}
        </div>

        <div className="mt-16 md:mt-20 flex justify-center">
          <Link
            to="/catalogo"
            className="text-xs uppercase tracking-[0.3em] pb-2 transition-colors hover:text-primary"
            style={{ color: "#F0EBE3", borderBottom: "1px solid #8B6914" }}
          >
            Ver catálogo completo
          </Link>
        </div>
      </div>
    </section>
  );
}
