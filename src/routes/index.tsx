import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { TrustBar } from "@/components/landing/TrustBar";
import { Catalog } from "@/components/landing/Catalog";
import { Empathy } from "@/components/landing/Empathy";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/landing/Footer";
import { FloatingWhatsApp } from "@/components/landing/FloatingWhatsApp";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Miguel Flores | Arreglos Funerarios Lima · Delivery 24 Horas" },
      {
        name: "description",
        content:
          "Florería especialista en arreglos para velorio en Lima. Coronas, cruces, ramos y lágrimas con delivery el mismo día en Lima Metropolitana, Callao, Ate y SJL. Llámanos ahora: +51 994 068 553.",
      },
      { name: "keywords", content: "arreglos funerarios Lima, flores para velorio Lima, coronas florales velorio, florería delivery 24 horas Lima, arreglos florales velatorio" },
      { name: "robots", content: "index, follow" },
      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_PE" },
      { property: "og:url", content: "https://miguelflores.idenza.site" },
      { property: "og:title", content: "Miguel Flores | Arreglos Funerarios Lima – Delivery 24h" },
      {
        property: "og:description",
        content: "Coronas, cruces y ramos para velorio con delivery el mismo día. Atención 24 horas en Lima y Callao. WhatsApp: +51 994 068 553.",
      },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Miguel Flores – Arreglos Funerarios Lima 24h" },
      { name: "twitter:description", content: "Delivery de arreglos florales para velorio en Lima y Callao. Atención 24 horas." },
    ],
    links: [
      { rel: "canonical", href: "https://miguelflores.idenza.site" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "Florist"],
          name: "Florería Miguel Flores",
          image: "https://miguelflores.idenza.site/og-image.png",
          description: "Especialistas en arreglos florales para velorio. Coronas, cruces y lágrimas con delivery el mismo día en Lima y Callao.",
          telephone: "+51994068553",
          url: "https://miguelflores.idenza.site",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Lima Metropolitana",
            addressRegion: "LIM",
            addressCountry: "PE",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: -12.0464,
            longitude: -77.0428
          },
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "00:00",
            closes: "23:59"
          },
          priceRange: "$$"
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Catalog />
        <Empathy />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
