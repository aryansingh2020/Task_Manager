import { useEffect, useState } from "react";
import { fetchTasks, deleteTask } from "../utils/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../index.css";

const TaskList = ({ refresh }) => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();


  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.token;

  
  useEffect(() => {
    if (!token) {
      alert("Session expired, please log in again.");
      localStorage.removeItem("auth");
      navigate("/login");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        alert("Session expired, please log in again.");
        localStorage.removeItem("auth");
        navigate("/login");
        return;
      }
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("auth");
      navigate("/login");
      return;
    }
  }, [navigate, token]); 

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const { data } = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        alert("Error loading tasks. Please try again.");
      }
    };
    loadTasks();
  }, [refresh]); 

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - {task.status}
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
