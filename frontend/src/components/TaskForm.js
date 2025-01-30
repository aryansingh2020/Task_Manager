import { useState } from "react";
import { createTask } from "../utils/api";  // Import API function

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token");  // Get token from localStorage

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with title:", title);  // Debugging line

    // Check if token exists
    if (!token) {
      console.error("No token found, please log in!");
      alert("Session expired, please log in again.");
      return;
    }

    try {
      // Call the API to create the task
      const newTask = await createTask({ title, description }, token);
      console.log("Task created successfully:", newTask);  // Debugging line
      onTaskAdded();  // Notify parent to refresh task list
      setTitle("");   // Clear the form input after task creation
      setDescription("");  // Clear description
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
