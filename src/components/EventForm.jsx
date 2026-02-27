export default function EventForm({ onCreate, loading }) {
  return (
    <form
      onSubmit={onCreate}
      className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      <input
        name="name"
        type="text"
        placeholder="Event Name"
        required
        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
      />

      <input
        name="location"
        type="text"
        placeholder="Location"
        required
        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
      />

      <input
        name="date"
        type="date"
        required
        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
      />

      <input
        name="description"
        type="text"
        placeholder="Description"
        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 md:col-span-2"
      />

      <button
        type="submit"
        disabled={loading}
        className="md:col-span-2 rounded-xl bg-emerald-700 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60"
      >
        {loading ? "Adding..." : "Add Event"}
      </button>
    </form>
  );
}
