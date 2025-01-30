import { useEffect, useState } from "react";
import { fetchTasks, deleteTask } from "../utils/api.js";

const TaskList = ({ refresh }) => {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadTasks = async () => {
      if (!token) {
        console.error("No token found, please log in!");
        return;
      }
      const { data } = await fetchTasks(token);
      setTasks(data);
    };
    loadTasks();
  }, [refresh, token]);  // Add 'token' to the dependency array

  const handleDelete = async (id) => {
    await deleteTask(id, token);
    setTasks(tasks.filter((task) => task._id !== id));
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
