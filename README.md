# 📅 Event App – Frontend

Single Page Application (SPA) for managing events.
Built with React and connected to a REST API backend.

---

## 🚀 Live Demo

🔗 https://anballem.github.io/event-app-frontend

---

## 📌 Features

- User login
- JWT authentication
- View all events
- Add new event
- Edit existing event
- Delete event
- Responsive design

---

## 🛠 Tech Stack

- React
- React Router
- Axios
- CSS / Bootstrap
- Hosted on GitHub Pages

---

## 🔐 Authentication Flow

1. User enters login credentials.
2. Frontend sends POST request to backend.
3. Backend returns JWT token.
4. Token stored in localStorage.
5. Token included in Authorization headers for protected requests.

Example:

Authorization: Bearer <token>

---

## 📂 Project Structure

src/
├── components/
├── pages/
├── services/
├── utils/
└── App.js

---

## ⚙ Installation

Clone repository:

git clone https://github.com/anballem/event-app-frontend.git

Install dependencies:

npm install

Start development server:

npm start

Build for production:

npm run build

---

## 🌐 API Connection

Update the API base URL inside:

src/services/api.js

Example:

const API_URL = "https://event-backend-iv2m.onrender.com";

---

## 🔒 Security

- JWT stored in localStorage
- Protected routes
- Logout clears token
- Error handling for expired tokens

---

## 🚀 Deployment

Deployed using GitHub Pages:

npm run build
npm run deploy

---

## 🧪 Future Improvements

- Registration page
- Pagination
- Event search/filter
- Dark mode
- Form validation improvements

---

## 👩‍💻 Author

Annette  
GitHub: https://github.com/anballem
