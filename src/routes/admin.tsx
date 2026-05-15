import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Plus, Pencil, Trash2, Upload, X, Search, Package, Tag, Building2, LogOut
} from "lucide-react";
import { products as seedProducts, formatPrice, type Product } from "@/components/landing/products";
import { supabase } from "@/lib/supabase";
import { useProducts, useCategories, useSettings } from "@/lib/useProducts";

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw redirect({ to: "/login" });
    }
  },
  head: () => ({ meta: [{ title: "Panel admin — Idenza" }] }),
  component: AdminPage,
});

type Tab = "productos" | "categorias" | "negocio";

function AdminPage() {
  const [tab, setTab] = useState<Tab>("productos");
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside
        className="w-60 shrink-0 border-r p-6 hidden md:block flex flex-col"
        style={{ borderColor: "#1A1A1A", backgroundColor: "#080808" }}
      >
        <div className="mb-10">
          <p className="text-[10px] uppercase mb-1" style={{ color: "#C9A84C", letterSpacing: "0.3em" }}>
            Panel
          </p>
          <h1 className="font-display text-xl">Administración</h1>
        </div>
        <nav className="space-y-1 flex-1">
          <NavBtn icon={<Package size={15} />} label="Productos" active={tab === "productos"} onClick={() => setTab("productos")} />
          <NavBtn icon={<Tag size={15} />} label="Categorías" active={tab === "categorias"} onClick={() => setTab("categorias")} />
          <NavBtn icon={<Building2 size={15} />} label="Negocio" active={tab === "negocio"} onClick={() => setTab("negocio")} />
        </nav>
        
        <div className="mt-auto pt-10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-xs uppercase tracking-[0.2em] transition-colors hover:text-red-400 text-[#9A9087]"
          >
            <LogOut size={15} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        {/* Mobile tabs */}
        <div
          className="md:hidden flex overflow-x-auto border-b items-center justify-between"
          style={{ borderColor: "#1A1A1A", backgroundColor: "#080808" }}
        >
          <div className="flex">
            {(["productos", "categorias", "negocio"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="px-4 py-4 text-[10px] uppercase tracking-[0.25em] whitespace-nowrap"
                style={{
                  color: tab === t ? "#C9A84C" : "#9A9087",
                  borderBottom: tab === t ? "1px solid #C9A84C" : "1px solid transparent",
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <button onClick={handleLogout} className="px-4 text-[#9A9087] hover:text-red-400">
            <LogOut size={16} />
          </button>
        </div>

        {tab === "productos" && <ProductsPanel />}
        {tab === "categorias" && <CategoriesPanel />}
        {tab === "negocio" && <BusinessPanel />}
      </main>
    </div>
  );
}

function NavBtn({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2.5 text-xs uppercase tracking-[0.2em] transition-colors"
      style={{
        color: active ? "#0A0A0A" : "#F0EBE3",
        backgroundColor: active ? "#C9A84C" : "transparent",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

function SectionHeader({ eyebrow, title, action }: { eyebrow: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <p className="text-[10px] uppercase mb-1" style={{ color: "#C9A84C", letterSpacing: "0.3em" }}>
          {eyebrow}
        </p>
        <h2 className="font-display text-2xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}

/* ───────────────────────── PRODUCTOS ───────────────────────── */

function ProductsPanel() {
  const { products: items, loading, addProduct, updateProduct, deleteProduct } = useProducts();
  const { categories } = useCategories();
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = items.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase())
  );

  const openNew = () => setEditing({ slug: "", name: "", category: categories[0]?.name ?? "", price: 0, image: "" });
  const openEdit = (p: Product) => setEditing({ ...p });

  const save = async () => {
    if (!editing?.name || !editing?.category) return;
    
    // Check if we're editing an existing product (it has an ID/slug)
    const exists = items.find((p) => p.slug === editing.slug);
    
    if (exists && exists.slug) {
      await updateProduct(exists.slug, editing as Product);
    } else {
      await addProduct(editing as Product);
    }
    setEditing(null);
  };

  const remove = async (slug: string) => {
    await deleteProduct(slug);
    setConfirmDelete(null);
  };

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onPickImage = async (file: File) => {
    if (!editing) return;
    setUploading(true);
    setUploadError(null);

    try {
      // Generate a unique filename: tenantId/timestamp-randomhex.ext
      const tenantId = import.meta.env.VITE_TENANT_ID;
      const ext = file.name.split(".").pop() ?? "jpg";
      const filename = `${tenantId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error } = await supabase.storage
        .from("product-images")
        .upload(filename, file, { upsert: false, contentType: file.type });

      if (error) {
        setUploadError(`Error al subir: ${error.message}`);
        return;
      }

      // Get the permanent public URL
      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(filename);

      setEditing({ ...editing, image: data.publicUrl });
    } catch (err: any) {
      setUploadError(`Error inesperado: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="Catálogo"
        title="Productos"
        action={
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.2em] hover:opacity-90"
            style={{ backgroundColor: "#C9A84C", color: "#0A0A0A" }}
          >
            <Plus size={14} /> Nuevo
          </button>
        }
      />

      <div className="flex items-center gap-3 px-4 py-3 mb-6" style={{ backgroundColor: "#0E0E0E", border: "1px solid #1A1A1A" }}>
        <Search size={16} style={{ color: "#9A9087" }} />
        <input
          value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre o categoría…"
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-[#5C5750]"
        />
        <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "#9A9087" }}>
          {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((p) => (
          <article key={p.slug} className="group flex flex-col" style={{ backgroundColor: "#0E0E0E", border: "1px solid #1A1A1A" }}>
            <div className="aspect-[4/5] overflow-hidden" style={{ backgroundColor: "#0A0A0A" }}>
              <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <p className="text-[10px] uppercase mb-1" style={{ color: "#9A9087", letterSpacing: "0.25em" }}>{p.category}</p>
              <h3 className="font-display text-base leading-tight mb-2">{p.name}</h3>
              <div className="mt-auto flex gap-2">
                <button onClick={() => openEdit(p)} className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 text-[10px] uppercase tracking-[0.2em]" style={{ border: "1px solid #2A2A2A", color: "#F0EBE3" }}>
                  <Pencil size={12} /> Editar
                </button>
                <button onClick={() => setConfirmDelete(p.slug)} className="p-2 hover:opacity-80" style={{ border: "1px solid #2A2A2A", color: "#C97070" }} aria-label="Eliminar">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {editing && (
        <Drawer title={items.find((p) => p.slug === editing.slug) ? "Editar producto" : "Nuevo producto"} onClose={() => setEditing(null)} onSave={save}>
          <Field label="Foto">
            <label
              className={`block aspect-[4/5] overflow-hidden relative group ${uploading ? "cursor-wait opacity-70" : "cursor-pointer"}`}
              style={{ backgroundColor: "#0E0E0E", border: "1px dashed #2A2A2A" }}
            >
              {editing.image && !uploading ? (
                <>
                  <img src={editing.image} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
                    <Upload size={20} style={{ color: "#C9A84C" }} />
                    <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "#F0EBE3" }}>Cambiar foto</span>
                  </div>
                </>
              ) : uploading ? (
                <div className="h-full flex flex-col items-center justify-center gap-3" style={{ color: "#C9A84C" }}>
                  <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "#9A9087" }}>Subiendo imagen…</span>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center gap-2" style={{ color: "#9A9087" }}>
                  <Upload size={22} /><span className="text-[10px] uppercase tracking-[0.2em]">Subir foto</span>
                  <span className="text-[10px] text-center px-4" style={{ color: "#5C5750" }}>JPG, PNG, WebP · Máx. 5 MB</span>
                </div>
              )}
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                className="hidden"
                disabled={uploading}
                onChange={(e) => e.target.files?.[0] && onPickImage(e.target.files[0])}
              />
            </label>
            {uploadError && (
              <p className="text-xs mt-2" style={{ color: "#F0AFA0" }}>⚠ {uploadError}</p>
            )}
          </Field>
          <Field label="Nombre"><input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="form-input" placeholder="Corona Rosa y Blanca" /></Field>
          <Field label="Categoría">
            <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="form-input">
              {categories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
              {categories.length === 0 && <option value="Arreglos">Arreglos</option>}
            </select>
          </Field>
          <Field label="Descripción">
            <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={4} className="form-input resize-none" placeholder="Detalle del arreglo, flores, tamaño…" />
          </Field>
        </Drawer>
      )}

      {confirmDelete && (
        <ConfirmModal title="Eliminar producto" onCancel={() => setConfirmDelete(null)} onConfirm={() => remove(confirmDelete)} />
      )}
    </div>
  );
}

/* ───────────────────────── CATEGORÍAS ───────────────────────── */

function CategoriesPanel() {
  const { categories: cats, loading, error: fetchError, addCategory, deleteCategory } = useCategories();
  const { products } = useProducts();
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const openModal = () => {
    setNewName("");
    setSaveError(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewName("");
    setSaveError(null);
  };

  const add = async () => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    setSaving(true);
    setSaveError(null);
    const err = await addCategory(trimmed);
    if (err) {
      setSaveError(err);
      setSaving(false);
    } else {
      setSaving(false);
      closeModal();
    }
  };

  const handleDelete = async (id: string) => {
    setConfirmDelete(null);
    const err = await deleteCategory(id);
    if (err) setSaveError(err);
  };

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <SectionHeader
        eyebrow="Organización"
        title="Categorías"
        action={
          <button
            onClick={openModal}
            className="inline-flex items-center gap-2 hover:opacity-90"
            style={{
              padding: "10px 20px",
              backgroundColor: "#C9A84C",
              color: "#0A0A0A",
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
            }}
          >
            <Plus size={14} /> Nueva categoría
          </button>
        }
      />

      {fetchError && (
        <div className="mb-4 px-4 py-3 text-sm" style={{ backgroundColor: "#2A1010", border: "1px solid #7A1F1F", color: "#F0AFA0" }}>
          ⚠ Error al cargar: {fetchError}
        </div>
      )}
      {saveError && (
        <div className="mb-4 px-4 py-3 text-sm" style={{ backgroundColor: "#2A1010", border: "1px solid #7A1F1F", color: "#F0AFA0" }}>
          ⚠ Error: {saveError}
        </div>
      )}

      {loading ? (
        <p className="text-sm" style={{ color: "#9A9087" }}>Cargando...</p>
      ) : (
        <div style={{ border: "1px solid #1A1A1A" }}>
          {cats.length === 0 && (
            <p className="px-5 py-6 text-sm" style={{ color: "#9A9087", backgroundColor: "#0E0E0E" }}>
              Sin categorías aún. Crea la primera con el botón "Nueva categoría".
            </p>
          )}
          {cats.map((c, i) => {
            const count = products.filter(p => p.category === c.name).length;
            return (
              <div
                key={c.id}
                className="flex items-center justify-between px-5 py-4"
                style={{ borderTop: i === 0 ? "none" : "1px solid #1A1A1A", backgroundColor: "#0E0E0E" }}
              >
                <div>
                  <p className="font-display text-base">{c.name}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] mt-1" style={{ color: "#9A9087" }}>
                    {count} {count === 1 ? "producto" : "productos"}
                  </p>
                </div>
                <button
                  onClick={() => count === 0 && setConfirmDelete(c.id)}
                  disabled={count > 0}
                  className="p-2 disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80"
                  style={{ border: "1px solid #2A2A2A", color: "#C97070" }}
                  title={count > 0 ? "Tiene productos asignados — no se puede eliminar" : "Eliminar categoría"}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-[11px] mt-4" style={{ color: "#9A9087" }}>
        Las categorías con productos asignados no se pueden eliminar.
      </p>

      {/* Modal: Nueva categoría */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm p-6 space-y-5"
            style={{ backgroundColor: "#0A0A0A", border: "1px solid #1A1A1A" }}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg">Nueva categoría</h3>
              <button onClick={closeModal} className="p-1 hover:opacity-70" style={{ color: "#9A9087" }}>
                <X size={18} />
              </button>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: "#9A9087" }}>
                Nombre de la categoría
              </label>
              <input
                autoFocus
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && add()}
                placeholder="Ej: Coronas, Arreglos, Lágrimas…"
                style={{
                  width: "100%",
                  background: "#0E0E0E",
                  border: "1px solid #2A2A2A",
                  color: "#F0EBE3",
                  padding: "10px 12px",
                  fontSize: "14px",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
            </div>

            {saveError && (
              <p className="text-sm" style={{ color: "#F0AFA0" }}>⚠ {saveError}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 py-2.5 text-[11px] uppercase tracking-[0.25em]"
                style={{ border: "1px solid #2A2A2A", color: "#F0EBE3" }}
              >
                Cancelar
              </button>
              <button
                onClick={add}
                disabled={saving || !newName.trim()}
                className="flex-1 py-2.5 text-[11px] uppercase tracking-[0.25em] hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: "#C9A84C", color: "#0A0A0A" }}
              >
                {saving ? "Guardando..." : "Crear"}
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <ConfirmModal
          title="Eliminar categoría"
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => handleDelete(confirmDelete)}
        />
      )}
    </div>
  );
}

/* ───────────────────────── NEGOCIO ───────────────────────── */

function BusinessPanel() {
  const { settings, loading, saveSettings } = useSettings();
  const [data, setData] = useState({
    whatsapp: "+51 994 068 553",
    schedule: "Lun a Dom · 24 horas",
    zones: "Lima Metropolitana, Callao, Ate, San Juan de Lurigancho, Comas, Los Olivos",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!loading) setData(settings);
  }, [loading, settings]);

  const handleSave = async () => {
    await saveSettings(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto">
      <SectionHeader eyebrow="Configuración" title="Datos del negocio" />

      <div className="space-y-6">
        <Field label="Número de WhatsApp">
          <input value={data.whatsapp} onChange={(e) => setData({ ...data, whatsapp: e.target.value })} className="form-input" placeholder="+51 999 999 999" />
          <p className="text-[11px] mt-2" style={{ color: "#9A9087" }}>
            Se usará en el botón flotante y todos los enlaces de contacto.
          </p>
        </Field>

        <Field label="Horario de atención">
          <input value={data.schedule} onChange={(e) => setData({ ...data, schedule: e.target.value })} className="form-input" />
        </Field>

        <Field label="Zonas de delivery">
          <textarea
            value={data.zones} onChange={(e) => setData({ ...data, zones: e.target.value })}
            rows={4} className="form-input resize-none"
            placeholder="Separadas por coma"
          />
        </Field>

        <div className="flex items-center gap-4 pt-4">
          <button
            onClick={handleSave}
            className="px-6 py-3 text-xs uppercase tracking-[0.25em] hover:opacity-90"
            style={{ backgroundColor: "#C9A84C", color: "#0A0A0A" }}
          >
            Guardar cambios
          </button>
          {saved && (
            <span className="text-[11px] uppercase tracking-[0.2em]" style={{ color: "#7BB07B" }}>
              ✓ Guardado
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── COMPARTIDOS ───────────────────────── */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: "#9A9087" }}>{label}</label>
      {children}
    </div>
  );
}

function Drawer({ title, children, onClose, onSave }: { title: string; children: React.ReactNode; onClose: () => void; onSave: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end" style={{ backgroundColor: "rgba(0,0,0,0.7)" }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md h-full overflow-y-auto" style={{ backgroundColor: "#0A0A0A", borderLeft: "1px solid #1A1A1A" }}>
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: "#1A1A1A" }}>
          <h2 className="font-display text-xl">{title}</h2>
          <button onClick={onClose} aria-label="Cerrar" className="p-1 hover:opacity-70" style={{ color: "#9A9087" }}><X size={20} /></button>
        </div>
        <div className="p-6 space-y-5">{children}</div>
        <div className="sticky bottom-0 px-6 py-4 flex gap-3 border-t" style={{ borderColor: "#1A1A1A", backgroundColor: "#0A0A0A" }}>
          <button onClick={onClose} className="flex-1 py-3 text-[11px] uppercase tracking-[0.25em]" style={{ border: "1px solid #2A2A2A", color: "#F0EBE3" }}>Cancelar</button>
          <button onClick={onSave} className="flex-1 py-3 text-[11px] uppercase tracking-[0.25em] hover:opacity-90" style={{ backgroundColor: "#C9A84C", color: "#0A0A0A" }}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

function ConfirmModal({ title, onCancel, onConfirm }: { title: string; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: "rgba(0,0,0,0.75)" }} onClick={onCancel}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm p-6" style={{ backgroundColor: "#0A0A0A", border: "1px solid #1A1A1A" }}>
        <h3 className="font-display text-lg mb-2">{title}</h3>
        <p className="text-sm mb-6" style={{ color: "#9A9087" }}>Esta acción no se puede deshacer.</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 text-[11px] uppercase tracking-[0.25em]" style={{ border: "1px solid #2A2A2A", color: "#F0EBE3" }}>Cancelar</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 text-[11px] uppercase tracking-[0.25em]" style={{ backgroundColor: "#7A1F1F", color: "#F0EBE3" }}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}

declare global {
  interface CSSStyleDeclaration { /* keep TS happy for inline style colors */ }
}
