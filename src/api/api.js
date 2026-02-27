import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
});

// Attach JWT automatically
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function buildAlternateBaseUrl(baseUrl = "") {
  if (!baseUrl) return "";
  if (baseUrl.endsWith("/api")) {
    return baseUrl.slice(0, -4);
  }
  return `${baseUrl}/api`;
}

// Retry once against alternate base URL when backend prefix differs (/api vs no /api).
api.interceptors.response.use(
  response => response,
  async error => {
    const status = error?.response?.status;
    const config = error?.config;

    if (!config || status !== 404 || config._baseFallbackTried) {
      return Promise.reject(error);
    }

    const baseUrl = config.baseURL || api.defaults.baseURL || "";
    const fallbackBaseUrl = buildAlternateBaseUrl(baseUrl);

    if (!fallbackBaseUrl || fallbackBaseUrl === baseUrl) {
      return Promise.reject(error);
    }

    config._baseFallbackTried = true;
    config.baseURL = fallbackBaseUrl;

    return api.request(config);
  }
);
