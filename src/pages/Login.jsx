import { useState } from "react";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const payload = {
      email: form.email.value,
      password: form.password.value,
    };

    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", payload);
      login(res.data.token);
    } catch (primaryErr) {
      setError(
        primaryErr?.response?.data?.message ||
          primaryErr?.response?.data?.error ||
          "Unable to sign in. Check API URL/backend route and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white/95 p-8 shadow-xl backdrop-blur"
    >
      <h2 className="text-2xl font-bold text-slate-900">Login</h2>
      <p className="mt-1 text-sm text-slate-500">
        Sign in to access your event workspace.
      </p>

      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="mt-6 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="relative mt-4">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          required
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword(prev => !prev)}
          className="absolute inset-y-0 right-0 px-4 text-slate-500 hover:text-slate-700"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current">
              <path d="M3 3l18 18" strokeWidth="2" strokeLinecap="round" />
              <path
                d="M10.6 10.6A2 2 0 0012 16a2 2 0 001.4-.6M9.9 5.1A10.9 10.9 0 0112 5c6.5 0 10 7 10 7a17.6 17.6 0 01-4.2 5.2M6.2 6.2A17.2 17.2 0 002 12s3.5 7 10 7c1.4 0 2.7-.3 3.9-.8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current">
              <path
                d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="12" r="3" strokeWidth="2" />
            </svg>
          )}
        </button>
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-indigo-700 py-3 text-white disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Login"}
      </button>
    </form>
  );
}
