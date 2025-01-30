import { useState } from "react";
import { login } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(form);
      const { token, user } = data;

      // Store the authentication info in localStorage
      localStorage.setItem("auth", JSON.stringify({ isAuthenticated: true, user, token }));

      // Update the app state to reflect that the user is authenticated
      setIsAuthenticated(true);

      // Redirect to Dashboard
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
