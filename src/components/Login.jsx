import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/styles.css'; // Asegúrate de que la ruta del CSS esté correcta

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Validar si los campos están vacíos
    if (!username || !password) {
      setMessage("Por favor, ingresa tu usuario y contraseña.");
      return;
    }

    // Obtener los usuarios almacenados en localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Buscar el usuario en la lista
    const user = storedUsers.find(u => u.username === username && u.password === password);

    if (user) {
      setMessage("Bienvenido!");
      localStorage.setItem("userId", user.username); // Guarda el ID del usuario o algún token si es necesario
      navigate("/home"); // Redirige a la página de inicio o donde corresponda
    } else {
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


