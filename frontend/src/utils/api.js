import axios from "axios";

const API = axios.create({ baseURL: "https://task-manager-backend-34m0.onrender.com" });

const getAuthHeaders = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return { Authorization: `Bearer ${auth?.token}` };
};

export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);

export const fetchTasks = () => API.get("/tasks", { headers: getAuthHeaders() });

export const createTask = (data) => API.post("/tasks", data, { headers: getAuthHeaders() });

export const updateTask = (id, data) => API.put(`/tasks/${id}`, data, { headers: getAuthHeaders() });

export const deleteTask = (id) => API.delete(`/tasks/${id}`, { headers: getAuthHeaders() });
