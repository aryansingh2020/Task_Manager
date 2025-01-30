import { useState } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);
  const auth = JSON.parse(localStorage.getItem("auth"));
  const isAuthenticated = auth?.isAuthenticated;

  if (!isAuthenticated) {
    window.location.href = "/login";  // Redirect if not authenticated
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <TaskForm onTaskAdded={() => setRefresh(!refresh)} />
      <TaskList refresh={refresh} />
    </div>
  );
};

export default Dashboard;
