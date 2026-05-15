import { PHONE } from "./constants";

export function Footer() {
  return (
    <footer
      className="w-full py-10 px-4 text-center"
      style={{ backgroundColor: "#0A0A0A", borderTop: "1px solid #2A2A2A" }}
    >
      <div className="mx-auto max-w-2xl space-y-2">
        <p className="font-display text-sm" style={{ color: "#C9A84C" }}>
          Florería Miguel Flores
        </p>
        <p className="text-sm text-muted-foreground">
          Arreglos florales para velorio con delivery el mismo día en Lima y Callao
        </p>
        <p className="text-sm text-foreground">{PHONE}</p>
        <p className="text-xs text-muted-foreground pt-3">
          © 2026 Florería Miguel Flores. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
