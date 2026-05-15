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
import faviconUrl from "@/assets/favicon.webp";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
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
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
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
      { property: "og:url", content: "https://miguelflores.idenza.site" },
      // --- Twitter Card ---
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Miguel Flores | Arreglos Funerarios Lima 24h" },
      { name: "twitter:description", content: "Delivery de arreglos florales para velorio en Lima y Callao. Atención inmediata por WhatsApp." },
    ],
    links: [
      // Preconnect para fuentes y Supabase (reducen LCP hasta 300ms)
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://llasbukvdjlvwlgofgke.supabase.co", crossOrigin: "anonymous" },
      // Google Fonts cargadas de forma no bloqueante (media print -> all onload)
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap",
        media: "print",
        // @ts-expect-error onload no es un atributo estándar de link pero funciona en HTML
        onload: "this.media='all'",
      },
      { rel: "icon", type: "image/webp", href: faviconUrl },
      { rel: "sitemap", type: "application/xml", href: "https://miguelflores.idenza.site/sitemap.xml" },
      {
        rel: "stylesheet",
        href: appCss,
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
        {/* Fallback para navegadores sin JS: carga fuentes normalmente */}
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
          />
        </noscript>
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
