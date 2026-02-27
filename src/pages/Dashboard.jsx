import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useAuth();
  const [events, setEvents] = useState([]);

  async function loadEvents() {
    const res = await api.get("/events");
    setEvents(res.data);
  }

  async function createEvent(e) {
    e.preventDefault();
    const form = e.target;

    await api.post("/events", {
      name: form.name.value,
      location: form.location.value,
      date: form.date.value,
      description: form.description.value,
    });

    form.reset();
    loadEvents();
  }



  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div className="rounded-2xl bg-white p-8 shadow-xl">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Create Event</h2>
        <button onClick={logout} className="text-rose-600">
          Logout
        </button>
      </div>

      <form onSubmit={createEvent} className="mt-6 grid gap-4 md:grid-cols-2">
        <input name="name" placeholder="Event Name" className="input" />
        <input name="location" placeholder="Location" className="input" />
        <input type="date" name="date" className="input" />
        <input
          name="description"
          placeholder="Description"
          className="input md:col-span-2"
        />
        <button className="md:col-span-2 rounded-xl bg-emerald-700 py-3 text-white">
          Add Event
        </button>
      </form>

      <ul className="mt-8 space-y-3">
        {events.map(event => (
          <li
            key={event._id}
            className="flex justify-between rounded-xl border p-4"
          >
            <div>
              <h3 className="font-semibold">{event.name}</h3>
              <p className="text-sm text-slate-500">
                {event.location} • {new Date(event.date).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => deleteEvent(event._id)}
              className="text-rose-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
