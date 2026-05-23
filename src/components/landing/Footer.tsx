import { PHONE } from "./constants";

export function Footer() {
  return (
    <footer
      className="w-full py-10 px-4 text-center"
      style={{ backgroundColor: "#0A0A0A", borderTop: "1px solid #2A2A2A" }}
    >
      <div className="mx-auto max-w-2xl space-y-2">
        <div className="flex justify-center mb-6">
          <img src="/logo.webp" alt="Florería para Velorio" className="h-12 md:h-16 w-auto" />
        </div>
        <p className="text-sm text-muted-foreground">
          Arreglos florales para velorio con delivery el mismo día en Lima y Callao
        </p>
        <p className="text-sm text-foreground">{PHONE}</p>
        <p className="text-xs text-muted-foreground pt-3">
          © 2026 Florería para Velorio. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
