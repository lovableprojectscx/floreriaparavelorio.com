import { useEffect, useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useBusinessSettings } from "@/lib/SettingsContext";

export function Header() {
  const { whatsapp: PHONE } = useBusinessSettings();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-14 md:h-16 transition-all"
      style={{
        backgroundColor: "rgba(10,10,10,0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: scrolled || open ? "1px solid #8B6914" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center">
          <img src="/logo.webp" alt="Florería para Velorio" className="h-8 md:h-10 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            activeOptions={{ exact: true }}
            activeProps={{ style: { color: "#F0EBE3" } }}
          >
            Inicio
          </Link>
          <Link
            to="/catalogo"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            activeProps={{ style: { color: "#F0EBE3" } }}
          >
            Catálogo
          </Link>
          <a
            href={`tel:${PHONE.replace(/\s/g, "")}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <Phone size={16} className="text-primary" />
            <span>{PHONE}</span>
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center text-foreground"
            style={{ width: 44, height: 44 }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="md:hidden absolute left-0 right-0 top-14"
          style={{
            backgroundColor: "rgba(10,10,10,0.98)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid #8B6914",
          }}
        >
          <nav className="flex flex-col px-4 py-4">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="py-3 text-base text-foreground border-b border-white/5"
            >
              Inicio
            </Link>
            <Link
              to="/catalogo"
              onClick={() => setOpen(false)}
              className="py-3 text-base text-foreground border-b border-white/5"
            >
              Catálogo
            </Link>
            <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              onClick={() => setOpen(false)}
              className="py-3 flex items-center gap-2 text-base text-foreground"
            >
              <Phone size={16} className="text-primary" />
              <span>{PHONE}</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
