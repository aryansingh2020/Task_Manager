import { useState } from "react";
import { createTask } from "../utils/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // get auth token 
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.token;

  // token expiry check
  if (!token) {
    alert("Session expired, please log in again.");
    localStorage.removeItem("auth");
    navigate("/login");
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      alert("Session expired, please log in again.");
      localStorage.removeItem("auth");
      navigate("/login");
      return null;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem("auth");
    navigate("/login");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = await createTask({ title, description }, token);
      console.log("Task created successfully:", newTask);
      onTaskAdded();
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Error. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task description" required />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
