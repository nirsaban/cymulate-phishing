import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

// Attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend sent error message → show it
    if (error.response?.data?.message) {
      alert(error.response.data.message);
    } 
    // If no response → network / CORS / server down
    else {
      alert("Network error. Please try again.");
    }

    // Reject for further handling if needed
    return Promise.reject(error);
  }
);

export default api;
