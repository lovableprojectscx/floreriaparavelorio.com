import { WhatsAppIcon } from "./WhatsAppIcon";
import { useBusinessSettings } from "@/lib/SettingsContext";

export function FloatingWhatsApp() {
  const { whatsapp } = useBusinessSettings();
  const num = whatsapp.replace(/\D/g, "");
  const href = `https://wa.me/${num}?text=${encodeURIComponent("Hola, necesito ayuda con un arreglo para velorio.")}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full text-white wa-pulse hover:scale-110 transition-transform"
      style={{ backgroundColor: "#0E7A3D", width: 56, height: 56 }}
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
