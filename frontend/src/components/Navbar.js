import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#333", color: "white" }}>
      <h3>Task Manager</h3>
      <div>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" style={{ marginRight: "10px", color: "white" }}>Dashboard</Link>
            <button
              onClick={handleLogout}
              style={{ cursor: "pointer", background: "red", color: "white", border: "none", padding: "5px 10px" }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: "10px", color: "white" }}>Login</Link>
            <Link to="/register" style={{ color: "white" }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
