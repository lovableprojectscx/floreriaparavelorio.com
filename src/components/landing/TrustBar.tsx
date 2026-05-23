import { Phone, Clock, MapPin } from "lucide-react";
import { useBusinessSettings } from "@/lib/SettingsContext";

export function TrustBar() {
  const { whatsapp, schedule, zones } = useBusinessSettings();

  const items = [
    { icon: Clock, label: "Entrega el mismo día" },
    { icon: MapPin, label: zones.split(",")[0].trim() + " y más" },
    { icon: Phone, label: schedule },
  ];

  return (
    <div
      className="w-full"
      style={{
        backgroundColor: "#111111",
        borderTop: "1px solid #2A2A2A",
        borderBottom: "1px solid #2A2A2A",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 py-5">
        <ul className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-0">
          {items.map((it, i) => (
            <li
              key={it.label}
              className={`flex items-center gap-2 text-sm text-foreground md:px-8 ${
                i > 0 ? "md:border-l md:border-[#2A2A2A]" : ""
              }`}
            >
              <it.icon size={16} className="text-primary" />
              <span>{it.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
