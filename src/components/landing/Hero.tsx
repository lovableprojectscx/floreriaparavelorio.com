import { ChevronDown } from "lucide-react";
import heroDesktop from "@/assets/hero-desktop.webp";
import heroMobile from "@/assets/hero-mobile.webp";

export function Hero() {
  return (
    <section
      id="top"
      className="relative w-full bg-background overflow-hidden"
      aria-label="El último adiós merece flores que hablen por ti"
    >
      {/* Invisible H1 for SEO (Screen Readers & Search Engines only) */}
      <h1 className="sr-only">Florería Miguel Flores - Arreglos Funerarios en Lima y Callao con Delivery 24 Horas</h1>

      {/* Mobile: show full image without cropping text */}
      <img
        src={heroMobile}
        alt="Corona funeraria premium para velorio con envío a domicilio en Lima - Florería Miguel Flores"
        className="block md:hidden w-full h-auto"
        width={1536}
        height={2752}
        fetchPriority="high"
      />

      {/* Desktop: contain full image within viewport height */}
      <div className="hidden md:flex w-full items-center justify-center" style={{ height: "calc(100vh - 64px)", minHeight: 520 }}>
        <img
          src={heroDesktop}
          alt="Arreglos florales funerarios en Lima, coronas y lágrimas para condolencias - Florería Miguel Flores"
          className="max-h-full max-w-full w-auto h-auto object-contain"
          width={2752}
          height={1536}
          fetchPriority="high"
        />
      </div>

      {/* Invisible click area over the baked-in "Ver arreglos" CTA (desktop) */}
      <a
        href="#catalogo"
        aria-label="Ver arreglos"
        className="hidden md:block absolute left-1/2 -translate-x-1/2 cursor-pointer"
        style={{ bottom: "8%", width: "12%", height: "7%", minHeight: 48 }}
      />
      {/* Mobile: button sits near bottom of the image */}
      <a
        href="#catalogo"
        aria-label="Ver arreglos"
        className="md:hidden absolute left-1/2 -translate-x-1/2 cursor-pointer"
        style={{ bottom: "6%", width: "44%", height: "5%", minHeight: 44 }}
      />

      <a
        href="#catalogo"
        aria-label="Desplazarse al catálogo"
        className="absolute bottom-3 left-1/2 -translate-x-1/2 chevron-bounce"
        style={{ color: "#C9A84C" }}
      >
        <ChevronDown size={26} />
      </a>
    </section>
  );
}
