export default function AuthForm({ onSubmit, loading }) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl bg-white/95 p-8 shadow-xl backdrop-blur"
    >
      <h2 className="text-2xl font-bold text-slate-900">Login</h2>
      <p className="mt-1 text-sm text-slate-500">
        Sign in to access your event workspace.
      </p>

      <div className="mt-6 space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-indigo-700 py-3 font-semibold text-white transition hover:bg-indigo-800 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </div>
    </form>
  );
}
