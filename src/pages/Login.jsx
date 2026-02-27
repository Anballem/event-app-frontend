import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const res = await api.post("/auth/login", {
      email: form.email.value,
      password: form.password.value,
    });

    login(res.data.token);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-8 shadow-xl"
    >
      <h2 className="text-2xl font-bold">Login</h2>

      <input
        name="email"
        type="email"
        placeholder="Email"
        className="mt-4 w-full rounded-xl border p-3"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        className="mt-4 w-full rounded-xl border p-3"
      />

      <button className="mt-6 w-full rounded-xl bg-indigo-700 py-3 text-white">
        Login
      </button>
    </form>
  );
}
