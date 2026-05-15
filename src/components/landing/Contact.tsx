import { Phone, Clock, MapPin } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { useBusinessSettings } from "@/lib/SettingsContext";
import contactImage from "@/assets/contact.webp";
import contactImage400 from "@/assets/contact-400.webp";

function waLink(phone: string, text?: string) {
  const num = phone.replace(/\D/g, "");
  return `https://wa.me/${num}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export function Contact() {
  const { whatsapp, schedule, zones } = useBusinessSettings();

  return (
    <section id="contacto" className="w-full py-16 md:py-24" style={{ backgroundColor: "#111111" }}>
      <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <p
            className="text-xs font-medium uppercase mb-3"
            style={{ color: "#C9A84C", letterSpacing: "0.2em" }}
          >
            Estamos aquí
          </p>
          <h2 className="font-display text-foreground text-[26px] md:text-[28px] mb-6 leading-tight">
            Te atendemos a cualquier hora
          </h2>

          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 text-foreground">
              <Phone size={18} className="text-primary shrink-0" />
              <a href={`tel:${whatsapp.replace(/\s/g, "")}`} className="hover:text-primary transition-colors">
                {whatsapp}
              </a>
            </li>
            <li className="flex items-center gap-3 text-foreground">
              <Clock size={18} className="text-primary shrink-0" />
              <span>{schedule}</span>
            </li>
            <li className="flex items-center gap-3 text-foreground">
              <MapPin size={18} className="text-primary shrink-0" />
              <span>Delivery a {zones}</span>
            </li>
          </ul>

          <a
            href={waLink(whatsapp, "Hola, necesito un arreglo floral para un ser querido. ¿Me pueden ayudar?.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-medium text-white transition-transform hover:scale-105 w-full md:w-auto"
            style={{ backgroundColor: "#0E7A3D", minHeight: 52 }}
          >
            <WhatsAppIcon size={20} />
            <span>Escríbenos por WhatsApp</span>
          </a>
        </div>
        <div className="relative flex justify-center items-center overflow-hidden rounded-sm bg-[#0a0a0a]">
          <img
            src={contactImage400}
            srcSet={`${contactImage400} 400w, ${contactImage} 800w`}
            sizes="(min-width: 768px) 50vw, 100vw"
            alt="Atención 24 horas - Florería Miguel Flores"
            className="w-full h-auto max-h-[500px] object-contain"
            width={400}
            height={400}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
