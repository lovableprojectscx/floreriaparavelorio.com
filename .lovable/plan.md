## Plan: Landing "Flores para Velorio"

Landing oscura, elegante y centrada en conversión por WhatsApp para una floristería funeraria en Lima. Sigo tu spec al pie de la letra.

### Pasos

1. **Assets e tipografía**
   - Copiar las 5 imágenes subidas a `src/assets/` (hero PC, hero móvil, sección intermedia PC/móvil, foto contacto).
   - Cargar Playfair Display + Inter desde Google Fonts vía `<link>` en `__root.tsx`.
   - Definir tokens del sistema (colores, radios, transiciones) en `src/styles.css` usando variables semánticas (`--background`, `--card`, `--accent`, `--accent-foreground`, etc.) mapeadas a los HEX que diste, en formato compatible con el theme actual.

2. **Estructura y SEO**
   - `src/routes/index.tsx`: `head()` con title, meta description, og:title/description/image (hero PC), canonical, lang `es`.
   - `<h1 hidden>` para SEO. JSON-LD `LocalBusiness` (Lima, teléfono, horario 24h).
   - Idioma del sitio: `es` en `<html lang>`.

3. **Componentes** (en `src/components/landing/`)
   - `Header.tsx` — sticky 64/56px, blur, borde dorado al hacer scroll (listener simple), CTA WhatsApp.
   - `Hero.tsx` — full viewport, imagen de fondo con `<picture>`/media query, área invisible clickeable sobre el botón "Ver arreglos" (scroll a `#catalogo`), chevron animado dorado.
   - `TrustBar.tsx` — 3 ítems con dividers, stack en móvil.
   - `Catalog.tsx` — label + H2, filter pills (scroll horizontal móvil) con estado, grid 3/2/1, 15 tarjetas (placeholders elegantes con nombre + ícono floral hasta que subas las fotos), botón "Consultar por WhatsApp" con mensaje pre-llenado por producto.
   - `Empathy.tsx` — sección con background image responsive, botón WhatsApp centrado abajo.
   - `Contact.tsx` — 2 columnas, foto + info + CTA.
   - `Footer.tsx` — centrado, dorado discreto.
   - `FloatingWhatsApp.tsx` — botón flotante con pulse animation.
   - `WhatsAppIcon.tsx` — SVG inline reutilizable.

4. **Comportamiento**
   - Todos los CTAs de WhatsApp abren `https://wa.me/51994068553` con `?text=` pre-llenado donde aplique.
   - `loading="lazy"` en imágenes de catálogo.
   - Tap targets ≥44px, scroll suave al catálogo.
   - Sin librerías nuevas (solo CSS + JS mínimo).

### Notas técnicas
- Mantengo arquitectura TanStack Start: una sola ruta `/` con secciones componentizadas (no hash-routing como páginas).
- Las 15 tarjetas usan placeholders con fondo `#161616`, ícono floral discreto y nombre del producto. Cuando subas las 15 fotos las reemplazo en una pasada.
- Tokens en `src/styles.css` para que cualquier ajuste de paleta sea de 1 línea.

### Pendiente de tu lado
- Subir las 15 fotos de productos para reemplazar placeholders.