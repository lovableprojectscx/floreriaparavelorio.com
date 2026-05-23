import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { TrustBar } from "@/components/landing/TrustBar";
import { Catalog } from "@/components/landing/Catalog";
import { Empathy } from "@/components/landing/Empathy";
import { Contact } from "@/components/landing/Contact";
import { SeoContent } from "@/components/landing/SeoContent";
import { Footer } from "@/components/landing/Footer";
import { FloatingWhatsApp } from "@/components/landing/FloatingWhatsApp";
import { X } from "lucide-react";
import type { Product } from "@/components/landing/products";

const TENANT_ID = "54a66b4a-6181-4b3f-b173-6398d0f33b2d";

// Server function: corre en servidor, no en cliente
const fetchProductsSSR = createServerFn({ method: "GET" }).handler(async () => {
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!);
  const { data } = await supabase
    .from("products")
    .select("id, title, price, image, category")
    .eq("tenant_id", TENANT_ID)
    .order("created_at", { ascending: false })
    .limit(8);

  if (!data) return [] as Product[];
  return data.map((p) => ({
    id: p.id,
    slug: p.id,
    name: p.title || "Producto sin nombre",
    price: Number(p.price) || 0,
    image: p.image || "",
    category: p.category?.[0] || "Arreglos",
  })) as Product[];
});

const fetchSettingsSSR = createServerFn({ method: "GET" }).handler(async () => {
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!);
  const { data } = await supabase
    .from("tenant_settings")
    .select("whatsapp, ad_image_url, ad_message, ad_link, ad_active, show_prices")
    .eq("tenant_id", TENANT_ID)
    .single();

  return data;
});

export const Route = createFileRoute("/")({
  // loader corre en servidor antes de renderizar — los productos llegan en el HTML inicial
  loader: async () => {
    const products = await fetchProductsSSR();
    const settings = await fetchSettingsSSR();
    return { products, settings };
  },
  component: Index,
  head: () => ({
    meta: [
      { title: "Florería para Velorio | Coronas de Condolencias y Arreglos Fúnebres" },
      {
        name: "description",
        content:
          "Florería para Velorio especializada en la preparación y delivery de coronas de flores para funeral, arreglos fúnebres de condolencias y lágrimas con envío urgente las 24 horas en todo Lima.",
      },
      {
        name: "keywords",
        content:
          "corona de flores para funeral, arreglos fúnebres delivery, flores de condolencias, corona funeraria urgente, arreglos para velorio, coronas funerarias Lima, flores para entierro, condolencias con flores, corona de rosas blancas, arreglo fúnebre, Corona de condolencias, Coronas fúnebres, Coronas para San Juan de Lurigancho, Arreglos florales fúnebres, Flores para velorio, Florería en San Borja, Corona estadio nacional, Mercado de flores para condolencias, Arreglos florales para velorio, Lágrimas y coronas fúnebres, Coronas en cafae, Coronas económicas",
      },
      { name: "robots", content: "index, follow" },
      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_PE" },
      { property: "og:url", content: "https://www.floreriaparavelorio.com" },
      {
        property: "og:title",
        content: "Florería para Velorio | Coronas de Condolencias y Arreglos Fúnebres",
      },
      {
        property: "og:description",
        content:
          "Envío urgente de coronas de flores para funeral, arreglos fúnebres delivery y flores de condolencias en Lima. Atención empática las 24 horas.",
      },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Florería para Velorio | Coronas de Condolencias y Arreglos Fúnebres",
      },
      {
        name: "twitter:description",
        content:
          "Envío urgente de coronas de flores para funeral, arreglos fúnebres delivery y flores de condolencias en Lima.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.floreriaparavelorio.com" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "Florist"],
          name: "Florería para Velorio",
          image: "https://www.floreriaparavelorio.com/og-image.png",
          description:
            "Florería especializada en la preparación y delivery de coronas de flores para funeral, arreglos fúnebres y flores de condolencias con envío urgente 24h.",
          telephone: "+51994068553",
          url: "https://www.floreriaparavelorio.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Lima Metropolitana",
            addressRegion: "LIM",
            addressCountry: "PE",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: -12.0464,
            longitude: -77.0428,
          },
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
          },
          priceRange: "$$",
        }),
      },
    ],
  }),
});

function Index() {
  const { products, settings } = Route.useLoaderData();
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    // Mostrar publicidad siempre que exista la imagen y esté activada
    if (settings?.ad_active !== false && settings?.ad_image_url) {
      setShowAd(true);
    }
  }, [settings?.ad_image_url, settings?.ad_active]);

  const handleCloseAd = () => {
    setShowAd(false);
  };

  const handleAdClick = () => {
    if (!settings) return;
    if (settings.ad_link) {
      // Validar que el enlace sea una URL absoluta segura (evitar javascript: y open redirect)
      try {
        const url = new URL(settings.ad_link);
        if (url.protocol === "https:" || url.protocol === "http:") {
          window.open(url.href, "_blank", "noopener,noreferrer");
        }
      } catch {
        // URL inválida — ignorar silenciosamente
      }
    } else {
      const phone = (settings.whatsapp || "51994068553").replace(/\D/g, "");
      const msg = encodeURIComponent(settings.ad_message || "Hola, me interesa este producto.");
      window.open(`https://wa.me/${phone}?text=${msg}`, "_blank", "noopener,noreferrer");
    }
    handleCloseAd();
  };

  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Catalog initialProducts={products} />
        <Empathy />
        <Contact />
        <SeoContent />
      </main>
      <Footer />
      <FloatingWhatsApp />

      {/* Popup Publicitario */}
      {showAd && settings?.ad_image_url && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity"
          onClick={handleCloseAd}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: "#0A0A0A", border: "1px solid #C9A84C" }}
          >
            <button
              onClick={handleCloseAd}
              className="absolute top-3 right-3 z-10 p-2 bg-black/60 hover:bg-black/90 rounded-full text-white transition-colors"
              aria-label="Cerrar publicidad"
            >
              <X size={20} />
            </button>
            <div className="w-full cursor-pointer group" onClick={handleAdClick}>
              <img
                src={settings.ad_image_url}
                alt="Publicidad Especial"
                className="w-full h-auto max-h-[80vh] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
