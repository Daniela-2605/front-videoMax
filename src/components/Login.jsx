import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log('Intentando iniciar sesión con:', { username, password });
      const response = await axios.post('https://backend-video-max.vercel.app/api/users/login', {
        username,
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMessage("Credenciales incorrectas");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/registro");
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
      <button className="button" onClick={handleRegisterRedirect}>
        Regístrame
      </button>
    </div>
  );
};

export default Login;

