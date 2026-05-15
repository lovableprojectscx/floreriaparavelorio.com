import empathyDesktop from "@/assets/empathy-desktop.webp";
import empathyMobile from "@/assets/empathy-mobile.webp";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { useBusinessSettings } from "@/lib/SettingsContext";

export function Empathy() {
  const { whatsapp } = useBusinessSettings();
  const num = whatsapp.replace(/\D/g, "");
  const href = `https://wa.me/${num}?text=${encodeURIComponent("Hola, necesito ayuda con un arreglo para velorio.")}`;
  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label="En los momentos más difíciles, estamos aquí"
    >
      <h2 className="sr-only">Envío urgente de flores para difuntos, condolencias y velatorios en Lima. Atención empática las 24 horas.</h2>
      <picture>
        <source media="(min-width: 768px)" srcSet={empathyDesktop} width={1920} height={1080} />
        <img
          src={empathyMobile}
          alt="Servicio de delivery de arreglos florales funerarios y coronas de condolencias en Lima Metropolitana y Callao"
          className="block w-full h-[600px] md:h-[500px] object-cover object-top"
          width={800}
          height={1433}
        />
      </picture>
      <div className="absolute inset-x-0 bottom-8 md:bottom-10 flex justify-center px-4">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-medium text-white transition-transform hover:scale-105"
          style={{ backgroundColor: "#1A9E4A", minHeight: 48 }}
        >
          <WhatsAppIcon size={20} />
          <span>Escribirnos por WhatsApp</span>
        </a>
      </div>
    </section>
  );
}
