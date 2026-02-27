import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useAuth();
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    location: "",
    date: "",
    description: "",
  });

  async function loadEvents() {
    try {
      setError("");
      const res = await api.get("/events");
      setEvents(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to load events."
      );
    }
  }

  async function createEvent(e) {
    e.preventDefault();
    const form = e.target;

    try {
      setError("");
      setSuccess("");
      await api.post("/events", {
        title: form.name.value,
        name: form.name.value,
        location: form.location.value,
        date: form.date.value,
        description: form.description.value,
      });

      form.reset();
      setSuccess("Event added successfully.");
      loadEvents();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to create event."
      );
    }
  }

  async function deleteEvent(id) {
    try {
      setError("");
      setSuccess("");
      await api.delete(`/events/${id}`);
      setSuccess("Event deleted successfully.");
      loadEvents();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to delete event."
      );
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  function startEdit(event) {
    setEditingId(event._id);
    setEditForm({
      name: event.name || event.title || "",
      location: event.location || "",
      date: event.date ? new Date(event.date).toISOString().slice(0, 10) : "",
      description: event.description || "",
    });
    setError("");
    setSuccess("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm({ name: "", location: "", date: "", description: "" });
  }

  async function saveEdit(id) {
    try {
      setError("");
      setSuccess("");
      const payload = {
        title: editForm.name,
        name: editForm.name,
        location: editForm.location,
        date: editForm.date,
        description: editForm.description,
      };

      try {
        await api.put(`/events/${id}`, payload);
      } catch (putErr) {
        if (putErr?.response?.status === 404 || putErr?.response?.status === 405) {
          await api.patch(`/events/${id}`, payload);
        } else {
          throw putErr;
        }
      }

      setSuccess("Event updated successfully.");
      cancelEdit();
      loadEvents();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to update event."
      );
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/95 p-8 shadow-xl backdrop-blur lg:col-span-2">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Create Event</h2>
          <p className="text-sm text-slate-500">
            Add new events and manage them from the list below.
          </p>
        </div>
        <button
          onClick={logout}
          className="rounded-xl bg-rose-600 px-4 py-2 font-medium text-white shadow-sm transition hover:bg-rose-700"
        >
          Logout
        </button>
      </div>

      <form onSubmit={createEvent} className="mt-6 grid gap-4 md:grid-cols-2">
        <input name="name" placeholder="Event Name" className="input" required />
        <input name="location" placeholder="Location" className="input" required />
        <input type="date" name="date" className="input" required />
        <input
          name="description"
          placeholder="Description"
          className="input md:col-span-2"
        />
        <button className="md:col-span-2 w-full rounded-xl bg-emerald-700 py-3 font-semibold text-white shadow-md transition hover:bg-emerald-800">
          Add Event
        </button>
      </form>

      {error && (
        <p className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
          {error}
        </p>
      )}
      {success && (
        <p className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
          {success}
        </p>
      )}

      <div className="mt-8">
        <h3 className="text-lg font-bold text-slate-900">Your Events</h3>
      </div>

      <ul className="mt-3 space-y-3">
        {events.map(event => (
          <li
            key={event._id}
            className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            {editingId === event._id ? (
              <>
                <div className="grid flex-1 grid-cols-1 gap-2 md:grid-cols-2">
                  <input
                    className="input"
                    value={editForm.name}
                    onChange={e =>
                      setEditForm(prev => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Event Name"
                  />
                  <input
                    className="input"
                    value={editForm.location}
                    onChange={e =>
                      setEditForm(prev => ({ ...prev, location: e.target.value }))
                    }
                    placeholder="Location"
                  />
                  <input
                    className="input"
                    type="date"
                    value={editForm.date}
                    onChange={e =>
                      setEditForm(prev => ({ ...prev, date: e.target.value }))
                    }
                  />
                  <input
                    className="input"
                    value={editForm.description}
                    onChange={e =>
                      setEditForm(prev => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Description"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => saveEdit(event._id)}
                    className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {event.name || event.title}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {event.location} • {new Date(event.date).toLocaleDateString()}
                  </p>
                  {event.description && (
                    <p className="mt-1 text-sm text-slate-600">
                      {event.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(event)}
                    className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteEvent(event._id)}
                    className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-700"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
