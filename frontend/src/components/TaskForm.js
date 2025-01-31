import { useState } from "react";
import { createTask } from "../utils/api";

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token"); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with title:", title);

    if (!token) {
      console.error("No token found, please log in!");
      alert("Session expired, please log in again.");
      return;
    }

    try {
      const newTask = await createTask({ title, description }, token);
      console.log("Task created successfully:", newTask);
      onTaskAdded();  
      setTitle("");  
      setDescription("");  
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Error creating task. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
