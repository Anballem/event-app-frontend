const API_URL = "http://localhost:5001/api";
const tokenKey = "token";

const authContainer = document.getElementById("auth-container");
const appContainer = document.getElementById("app-container");
const eventList = document.getElementById("event-list");
const loginButton = document.getElementById("login-btn");
const logoutButton = document.getElementById("logout-btn");
const createEventButton = document.getElementById("create-event-btn");
const eventTitleInput = document.getElementById("event-title");
const locationInput = document.getElementById("location");
const descriptionInput = document.getElementById("description");
const dateInput = document.getElementById("date");

function getToken() {
  return localStorage.getItem(tokenKey);
}

function setToken(token) {
  localStorage.setItem(tokenKey, token);
}

function clearToken() {
  localStorage.removeItem(tokenKey);
}

function showAuth() {
  authContainer.classList.remove("hidden");
  appContainer.classList.add("hidden");
}

async function login() {
  try {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      // Show detailed error from backend
      alert(data.message || data.error || "Login failed: " + JSON.stringify(data));
      return;
    }

    setToken(data.token);
    showApp();
    loadEvents();
  } catch (error) {
    alert("Unable to login right now. Please check if the backend server is running at " + API_URL);
  }
}

function showApp() {
  authContainer.classList.add("hidden");
  appContainer.classList.remove("hidden");
}

function logout() {
  clearToken();
  location.reload();
}

async function loadEvents() {
  try {
    const res = await fetch(`${API_URL}/events`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });

    if (!res.ok) {
      throw new Error("Failed to load events");
    }

    const events = await res.json();
    eventList.innerHTML = "";

    if (!Array.isArray(events) || events.length === 0) {
      eventList.innerHTML = `
        <li class="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm text-slate-500">
          No events yet. Create your first event above.
        </li>
      `;
      return;
    }

    events.forEach(event => {
      const li = document.createElement("li");
      li.className =
        "flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm";

      li.innerHTML = `
        <div>
          <h3 class="font-semibold text-slate-800">${event.title}</h3>
          <p class="text-sm text-slate-500">${event.location} • ${new Date(event.date).toLocaleDateString()}</p>
          <p class="mt-1 text-sm text-slate-600">${event.description || ""}</p>
        </div>
        <button
          type="button"
          data-delete-id="${event._id}"
          class="delete-event-btn rounded-lg bg-rose-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-rose-700">
          Delete
        </button>
      `;

      eventList.appendChild(li);
    });
  } catch (error) {
    eventList.innerHTML = `
      <li class="rounded-xl border border-rose-200 bg-rose-50 px-4 py-5 text-sm text-rose-700">
        Could not load events. Check if the API server is running.
      </li>
    `;
  }
}

async function createEvent() {
  const eventData = {
    title: eventTitleInput.value.trim(),
    location: locationInput.value.trim(),
    description: descriptionInput.value.trim(),
    date: dateInput.value
  };

  if (!eventData.title || !eventData.location || !eventData.date) {
    alert("Please fill in event name, location, and date.");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(eventData)
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Failed to create event: " + (data.message || data.error || JSON.stringify(data)));
      return;
    }

    eventTitleInput.value = "";
    locationInput.value = "";
    descriptionInput.value = "";
    dateInput.value = "";
    loadEvents();
  } catch (error) {
    alert("Error creating event: " + error.message);
  }
}

async function deleteEvent(id) {
  await fetch(`${API_URL}/events/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` }
  });

  loadEvents();
}

function bindEvents() {
  loginButton?.addEventListener("click", login);
  logoutButton?.addEventListener("click", logout);
  createEventButton?.addEventListener("click", createEvent);
  eventList?.addEventListener("click", event => {
    const deleteButton = event.target.closest(".delete-event-btn");
    if (!deleteButton) {
      return;
    }
    const eventId = deleteButton.getAttribute("data-delete-id");
    if (eventId) {
      deleteEvent(eventId);
    }
  });
}

function initializeApp() {
  bindEvents();
  if (getToken()) {
    showApp();
    loadEvents();
  } else {
    showAuth();
  }
}

initializeApp();

