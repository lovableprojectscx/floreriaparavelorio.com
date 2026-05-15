/**
 * SettingsContext — carga los datos del negocio desde Supabase una vez
 * y los comparte con todos los componentes de la landing (Header, Contact, etc.)
 */
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";

const TENANT_ID = import.meta.env.VITE_TENANT_ID as string;

interface BusinessSettings {
  whatsapp: string;
  schedule: string;
  zones: string;
}

const defaults: BusinessSettings = {
  whatsapp: "+51 994 068 553",
  schedule: "Lun a Dom · 24 horas",
  zones: "Lima Metropolitana, Callao, Ate, San Juan de Lurigancho, Comas, Los Olivos",
};

const SettingsContext = createContext<BusinessSettings>(defaults);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<BusinessSettings>(defaults);

  useEffect(() => {
    supabase
      .from("tenant_settings")
      .select("whatsapp, schedule, zones")
      .eq("tenant_id", TENANT_ID)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setSettings({
            whatsapp: data.whatsapp || defaults.whatsapp,
            schedule: data.schedule || defaults.schedule,
            zones: data.zones || defaults.zones,
          });
        }
      });
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

/** Hook para consumir la configuración del negocio en cualquier componente */
export function useBusinessSettings() {
  return useContext(SettingsContext);
}
