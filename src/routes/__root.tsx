import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { SettingsProvider } from "@/lib/SettingsContext";

import appCss from "../styles.css?url";
import "../styles.css";
import socialImageUrl from "@/assets/hero-desktop.webp";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página no encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La página que buscas no existe o fue movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página no cargó correctamente
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo salió mal. Puedes intentar recargar o volver al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Intentar de nuevo
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      // --- SEO Base: Florería Miguel Flores ---
      { title: "Miguel Flores | Arreglos Funerarios en Lima · Delivery 24 horas" },
      { name: "description", content: "Arreglos florales para velorio con delivery el mismo día en Lima y Callao. Coronas, cruces y ramos. Atención inmediata por WhatsApp +51 994 068 553." },
      { name: "author", content: "Florería Miguel Flores" },
      { name: "robots", content: "index, follow" },
      { name: "geo.region", content: "PE-LIM" },
      { name: "geo.placename", content: "Lima, Perú" },
      // --- Open Graph (WhatsApp, Facebook, LinkedIn) ---
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_PE" },
      { property: "og:site_name", content: "Florería Miguel Flores" },
      { property: "og:title", content: "Miguel Flores | Arreglos Funerarios en Lima" },
      { property: "og:description", content: "Arreglos florales para velorio con delivery el mismo día. Coronas, cruces y ramos. Atención 24 horas por WhatsApp." },
      { property: "og:url", content: "https://www.floreriaparavelorio.com" },
      { property: "og:image", content: "https://www.floreriaparavelorio.com/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      // --- Twitter Card ---
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Miguel Flores | Arreglos Funerarios Lima 24h" },
      { name: "twitter:description", content: "Delivery de arreglos florales para velorio en Lima y Callao. Atención inmediata por WhatsApp." },
      { name: "twitter:image", content: "https://www.floreriaparavelorio.com/og-image.png" },
    ],
    links: [
      // Solo Supabase necesita preconnect — fuentes ya son locales
      { rel: "preconnect", href: "https://llasbukvdjlvwlgofgke.supabase.co", crossOrigin: "anonymous" },
      { rel: "icon", type: "image/webp", href: "/logo.webp" },
      { rel: "sitemap", type: "application/xml", href: "https://www.floreriaparavelorio.com/sitemap.xml" },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      {
        src: "https://idenza.site/tracker.js",
        "data-token": "ec8172d6cca43e515ece4167fc19a600bedc19385442a99c",
        "data-org": "34194fe4-e82a-4fa1-b1b9-93790ae791ab",
        defer: true,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <Outlet />
      </SettingsProvider>
    </QueryClientProvider>
  );
}
