import React from "react";
import { Heart, Truck, MapPin } from "lucide-react";

export function SeoContent() {
  return (
    <section className="w-full py-16 md:py-20 bg-[#0F0F0F] border-t border-[#1F1F1F]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <p
            className="text-[11px] font-medium uppercase mb-3 tracking-[0.3em]"
            style={{ color: "#C9A84C" }}
          >
            Servicios y Cobertura
          </p>
          <h2 className="font-display text-foreground text-2xl md:text-3xl font-normal">
            Florería para Velorio: Especialistas en Arreglos Fúnebres
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Especialidades */}
          <div
            className="p-6 rounded-sm border transition-all duration-300 hover:border-[#C9A84C]/50"
            style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Heart size={20} style={{ color: "#C9A84C" }} className="shrink-0" />
              <h3 className="font-display text-lg text-foreground font-normal">
                Arreglos Florales Fúnebres
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              En nuestra florería nos especializamos en la confección de una{" "}
              <strong>Corona de condolencias</strong>, <strong>Coronas fúnebres</strong> y{" "}
              <strong>flores de condolencias</strong> para expresar sus más sinceros sentimientos.
              Elaboramos cada <strong>corona de flores para funeral</strong> y{" "}
              <strong>arreglo fúnebre</strong> con sumo cuidado, utilizando selectas flores como la
              clásica <strong>corona de rosas blancas</strong>. Ofrecemos una amplia variedad de{" "}
              <strong>Arreglos florales fúnebres</strong> y{" "}
              <strong>Arreglos florales para velorio</strong>, así como{" "}
              <strong>Lágrimas y coronas fúnebres</strong> para rendir el tributo que su ser querido
              merece.
            </p>
          </div>

          {/* Card 2: Envíos y Delivery */}
          <div
            className="p-6 rounded-sm border transition-all duration-300 hover:border-[#C9A84C]/50"
            style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Truck size={20} style={{ color: "#C9A84C" }} className="shrink-0" />
              <h3 className="font-display text-lg text-foreground font-normal">
                Envíos de Condolencia
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Entendemos que son momentos difíciles, por lo que contamos con un servicio de{" "}
              <strong>arreglos fúnebres delivery</strong> rápido y discreto. Si necesita una{" "}
              <strong>corona funeraria urgente</strong> o <strong>arreglos para velorio</strong>,
              nuestro equipo está listo para asistirlo con envío inmediato a velatorios y
              cementerios. Hacemos posible enviar <strong>condolencias con flores</strong>,{" "}
              <strong>Flores para velorio</strong> y <strong>flores para entierro</strong>{" "}
              directamente al lugar del servicio, garantizando la frescura y presentación impecable.
            </p>
          </div>

          {/* Card 3: Zonas y Atención */}
          <div
            className="p-6 rounded-sm border transition-all duration-300 hover:border-[#C9A84C]/50"
            style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <MapPin size={20} style={{ color: "#C9A84C" }} className="shrink-0" />
              <h3 className="font-display text-lg text-foreground font-normal">
                Zonas de Cobertura
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Brindamos cobertura completa de <strong>coronas funerarias Lima</strong> con delivery
              a múltiples distritos y salas velatorias. Ofrecemos entregas directas y personalizadas
              de <strong>Coronas para San Juan de Lurigancho</strong> y contamos con servicio de{" "}
              <strong>Florería en San Borja</strong>. Realizamos envíos de{" "}
              <strong>Coronas en cafae</strong> (Sala Velatoria CAFAE-SE),{" "}
              <strong>Corona estadio nacional</strong> (salones aledaños) y principales velatorios
              de la capital. Somos su alternativa al{" "}
              <strong>Mercado de flores para condolencias</strong>, ofreciendo arreglos de alta
              calidad y <strong>Coronas económicas</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
