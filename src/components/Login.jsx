import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Cambié useHistory por useNavigate

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Cambié useHistory por useNavigate

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Credenciales incorrectas");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/registro"); // Redirige a la página de registro usando navigate
  };

  return (
    <div className="container">
      <h1>VideoMax</h1>
      <input
        type="text"
        placeholder="Username"
        className="input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="button" onClick={handleLogin}>
        Login
      </button>
      <p>{message}</p>

      {/* Botón para abrir la página de registro */}
      <button className="button" onClick={handleRegisterRedirect}>
        Regístrame
      </button>
    </div>
  );
};

export default Login;

