import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });


export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);

export const fetchTasks = (token) => 
  API.get("/tasks", { headers: { Authorization: `Bearer ${token}` } });

export const createTask = (data, token) => 
  API.post("/tasks", data, { headers: { Authorization: `Bearer ${token}` } });

export const updateTask = (id, data, token) => 
  API.put(`/tasks/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteTask = (id, token) => 
  API.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
