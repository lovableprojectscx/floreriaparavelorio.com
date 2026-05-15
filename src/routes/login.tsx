import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate({ to: "/admin" });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate({ to: "/admin" });
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      // No message needed on success as the auth listener will redirect
    } catch (error: any) {
      console.error(error);
      setMessage({
        text: "Correo o contraseña incorrectos.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md p-8 rounded-xl border" style={{ backgroundColor: "#0A0A0A", borderColor: "#1A1A1A" }}>
        <div className="text-center mb-8">
          <p className="text-[10px] uppercase mb-2" style={{ color: "#C9A84C", letterSpacing: "0.3em" }}>
            Acceso
          </p>
          <h1 className="font-display text-2xl text-foreground">Panel de Administración</h1>
          <p className="text-sm mt-2" style={{ color: "#9A9087" }}>
            Ingresa tus credenciales para continuar.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: "#9A9087" }}>
              Correo electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full bg-[#0E0E0E] text-[#F0EBE3] px-4 py-3 text-sm outline-none transition-colors border"
              style={{ borderColor: "#1F1F1F" }}
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: "#9A9087" }}>
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#0E0E0E] text-[#F0EBE3] px-4 py-3 text-sm outline-none transition-colors border"
              style={{ borderColor: "#1F1F1F" }}
            />
          </div>

          {message && (
            <div className="p-3 text-xs rounded bg-red-900/20 text-red-400">
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !email || !password}
            className="w-full py-3 mt-4 text-xs uppercase tracking-[0.2em] font-medium transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
            style={{ backgroundColor: "#C9A84C", color: "#0A0A0A" }}
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Iniciando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}
