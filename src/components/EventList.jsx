export default function EventList({ events, onDelete }) {
  if (!events.length) {
    return (
      <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm text-slate-500">
        No events yet. Create your first event above.
      </div>
    );
  }

  return (
    <ul className="mt-6 space-y-3">
      {events.map(event => (
        <li
          key={event._id}
          className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div>
            <h3 className="font-semibold text-slate-800">{event.name}</h3>
            <p className="text-sm text-slate-500">
              {event.location} •{" "}
              {new Date(event.date).toLocaleDateString()}
            </p>
            {event.description && (
              <p className="mt-1 text-sm text-slate-600">
                {event.description}
              </p>
            )}
          </div>

          <button
            onClick={() => onDelete(event._id)}
            className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-700"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
