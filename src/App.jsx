import { AuthProvider, useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import "./index.css";

function AppContent() {
  const { token } = useAuth();

  return token ? <Dashboard /> : <Login />;
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-100 text-slate-800">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-200/70 blur-3xl" />
          <div className="absolute top-24 -right-28 h-80 w-80 rounded-full bg-emerald-200/60 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-rose-200/60 blur-3xl" />
        </div>

        <main className="relative z-10 mx-auto w-full max-w-6xl px-4 py-10">
          <header className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Event Manager
            </p>
            <h1 className="mt-2 text-4xl font-extrabold leading-tight text-slate-900">
              Plan and manage events in one place
            </h1>
            <p className="mt-2 max-w-2xl text-slate-600">
              A cleaner dashboard with focused actions for authentication,
              event creation, and event management.
            </p>
          </header>

          <section className="grid items-start gap-6 lg:grid-cols-2">
            <AppContent />
          </section>
        </main>
      </div>
    </AuthProvider>
  );
}
