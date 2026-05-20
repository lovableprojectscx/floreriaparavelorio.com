import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { FloatingWhatsApp } from "@/components/landing/FloatingWhatsApp";
import { waLink } from "@/components/landing/constants";
import { useProducts, useCategories } from "@/lib/useProducts";
import { useBusinessSettings } from "@/lib/SettingsContext";
import { formatPrice } from "@/components/landing/products";

export const Route = createFileRoute("/catalogo")({
  component: CatalogPage,
  head: () => ({
    meta: [
      { title: "Catálogo de Arreglos Funerarios | Miguel Flores Lima 24h" },
      {
        name: "description",
        content:
          "Ve todos nuestros arreglos florales para velorio: coronas, cruces, ramos y lágrimas. Delivery mismo día en Lima Metropolitana, Callao, Ate, SJL. WhatsApp +51 994 068 553.",
      },
      { name: "keywords", content: "arreglos funerarios Lima, coronas florales velorio, flores para velorio Lima, delivery arreglos florales, florería 24 horas Lima" },
      { property: "og:title", content: "Catálogo | Miguel Flores – Arreglos Funerarios Lima" },
      {
        property: "og:description",
        content: "Coronas, cruces y ramos para velorio con delivery el mismo día en Lima y Callao. Atención 24 horas.",
      },
      { property: "og:url", content: "https://www.floreriaparavelorio.com/catalogo" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://www.floreriaparavelorio.com/catalogo" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Catálogo de Arreglos Funerarios | Miguel Flores",
          description: "Catálogo completo de coronas, cruces y arreglos para velorio con delivery en Lima.",
          url: "https://www.floreriaparavelorio.com/catalogo",
          publisher: {
            "@type": "LocalBusiness",
            name: "Florería Miguel Flores"
          }
        }),
      },
    ],
  }),
});

function CatalogPage() {
  const { products, loading: productsLoading } = useProducts();
  const { categories: dbCategories, loading: catsLoading } = useCategories();
  const { show_prices } = useBusinessSettings();
  const loading = productsLoading || catsLoading;
  const [filter, setFilter] = useState<string>("Todos");
  const [isOpen, setIsOpen] = useState(false);
  const filters = ["Todos", ...dbCategories.map((c) => c.name)];
  const visible = filter === "Todos" ? products : products.filter((p) => p.category === filter);

  return (
    <>
      <Header />
      <main className="pt-14 md:pt-16">
        <section className="w-full bg-background py-12 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
            >
              <ArrowLeft size={16} />
              <span>Volver al inicio</span>
            </Link>

            <div className="text-center mb-10 md:mb-14">
              <p
                className="text-[11px] font-medium uppercase mb-4"
                style={{ color: "#C9A84C", letterSpacing: "0.3em" }}
              >
                Catálogo
              </p>
              <h1 className="font-display text-foreground text-[28px] md:text-[44px] leading-[1.15] font-normal">
                Nuestros arreglos
              </h1>
              <p className="text-muted-foreground text-sm md:text-base mt-4 max-w-md mx-auto">
                Atención inmediata por WhatsApp. Delivery el mismo día.
              </p>
            </div>

            {/* Filtros para Escritorio (Desktop) */}
            <div className="hidden md:flex flex-wrap justify-center gap-3 mb-14">
              {filters.map((f) => {
                const active = f === filter;
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className="text-xs uppercase tracking-[0.25em] px-4 py-2 transition-colors min-h-[44px]"
                    style={{
                      color: active ? "#0A0A0A" : "#F0EBE3",
                      backgroundColor: active ? "#C9A84C" : "transparent",
                      border: `1px solid ${active ? "#C9A84C" : "#8B6914"}`,
                    }}
                  >
                    {f}
                  </button>
                );
              })}
            </div>

            {/* Filtro Desplegable para Móvil (Mobile Dropdown) */}
            <div className="relative md:hidden mb-10 w-full max-w-xs mx-auto">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-[0.2em] transition-colors bg-[#0E0E0E]"
                style={{
                  color: "#F0EBE3",
                  border: "1px solid #8B6914",
                }}
              >
                <span>Filtrar: {filter}</span>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
                  style={{ color: "#C9A84C" }}
                />
              </button>

              {isOpen && (
                <>
                  {/* Backdrop para cerrar al hacer clic fuera */}
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsOpen(false)} 
                  />
                  
                  <ul 
                    className="absolute left-0 right-0 mt-1.5 z-20 max-h-64 overflow-y-auto shadow-2xl transition-all border border-[#8B6914] no-scrollbar"
                    style={{ backgroundColor: "#0E0E0E" }}
                  >
                    {filters.map((f) => {
                      const active = f === filter;
                      return (
                        <li key={f}>
                          <button
                            onClick={() => {
                              setFilter(f);
                              setIsOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-xs uppercase tracking-[0.2em] transition-colors border-b border-neutral-900 last:border-0"
                            style={{
                              color: active ? "#0A0A0A" : "#9A9087",
                              backgroundColor: active ? "#C9A84C" : "transparent",
                            }}
                          >
                            {f}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[4/5] bg-neutral-900 mb-4" />
                    <div className="h-4 bg-neutral-900 w-2/3 mb-2" />
                    <div className="h-4 bg-neutral-900 w-1/2" />
                  </div>
                ))
              ) : visible.length > 0 ? (
                visible.map((p) => (
                <article key={p.slug} className="group">
                  <div
                    className="aspect-[4/5] w-full overflow-hidden mb-3 md:mb-5"
                    style={{ backgroundColor: "#0E0E0E" }}
                  >
                    <img
                      src={p.image}
                      alt={`Arreglo floral para velorio ${p.name} - Delivery urgente en Lima`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <p
                    className="text-[10px] uppercase mb-1"
                    style={{ color: "#9A9087", letterSpacing: "0.25em" }}
                  >
                    {p.category}
                  </p>
                  <h2 className="font-display text-foreground text-base md:text-xl font-normal leading-tight">
                    {p.name}
                  </h2>
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
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <p className="text-muted-foreground">No se encontraron productos en esta categoría.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
